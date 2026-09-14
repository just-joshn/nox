import json
import threading
import unittest
from http.server import ThreadingHTTPServer
from urllib.error import HTTPError
from urllib.request import Request, urlopen

from loopback_probe import ProbeState, catalog_summary, is_denied_trace, is_expected_trace, is_missing_trace, make_handler, message_response, search_schema_summary, summarize_result, summarize_search_result


class LoopbackProbeTests(unittest.TestCase):
    def setUp(self):
        self.state = ProbeState()
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), make_handler(self.state))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=2)

    def post(self, path, payload):
        request = Request(
            f"http://127.0.0.1:{self.server.server_port}{path}",
            data=json.dumps(payload).encode(),
            headers={"Content-Type": "application/json"},
        )
        return urlopen(request, timeout=2)

    def test_tool_request_returns_bounded_sse_without_retaining_private_input(self):
        marker = "synthetic-private-marker"
        with self.post(
            "/v1/messages?beta=true",
            {"model": "test-model", "tools": [{"name": "Read"}], "messages": [], "system": marker},
        ) as response:
            body = response.read().decode()
            self.assertEqual(response.status, 200)
            self.assertEqual(response.headers["Content-Type"], "text/event-stream")
        self.assertIn("event: message_start", body)
        self.assertIn('"name":"Read"', body)
        self.assertIn("event: message_stop", body)
        self.assertNotIn(marker, json.dumps(self.state.requests))

    def test_unexpected_path_fails_closed(self):
        with self.assertRaises(HTTPError) as raised:
            self.post("/other", {"model": "test-model"})
        self.assertEqual(raised.exception.code, 404)
        raised.exception.close()
        self.assertEqual(self.state.requests, [])

    def test_missing_model_is_rejected_without_retaining_input(self):
        with self.assertRaises(HTTPError) as raised:
            self.post("/v1/messages?beta=true", {"system": "synthetic-private-marker"})
        self.assertEqual(raised.exception.code, 400)
        raised.exception.close()
        self.assertEqual(self.state.requests, [])

    def test_invalid_json_is_rejected(self):
        request = Request(
            f"http://127.0.0.1:{self.server.server_port}/v1/messages?beta=true",
            data=b"{",
            headers={"Content-Type": "application/json"},
        )
        with self.assertRaises(HTTPError) as raised:
            urlopen(request, timeout=2)
        self.assertEqual(raised.exception.code, 400)
        raised.exception.close()
        self.assertEqual(self.state.requests, [])

    def test_unexpected_tool_output_is_redacted(self):
        marker = "synthetic-private-marker"
        self.post("/v1/messages?beta=true", {
            "model": "test-model", "tools": [{"name": "Read"}],
            "messages": [{"content": [{"type": "tool_result", "content": marker}]}],
        }).close()
        self.assertNotIn(marker, json.dumps(self.state.requests))
        self.assertFalse(self.state.requests[0]["tool_results"][0]["text_matches_fixture"])

    def test_success_requires_exact_read_and_completion(self):
        trace = {
            "exit_code": 0, "result": "synthetic completion", "is_error": False,
            "stderr_empty": True, "fixture_unchanged": True,
            "requests": [
                {"response": "text", "tool_results": [], "tool_names": []},
                {"response": "tool", "tool_results": [], "tool_names": ["Read"]},
                {"response": "text", "tool_results": [{"is_error": False, "text_matches_fixture": True}], "tool_names": ["Read"]},
            ],
        }
        self.assertTrue(is_expected_trace(trace))
        for change in ({"fixture_unchanged": False}, {"result": "<redacted>"}, {"is_error": True}, {"stderr_empty": False}):
            self.assertFalse(is_expected_trace({**trace, **change}))
        bad_requests = [*trace["requests"]]
        bad_requests[2] = {**bad_requests[2], "tool_results": [{"is_error": True, "text_matches_fixture": True}]}
        self.assertFalse(is_expected_trace({**trace, "requests": bad_requests}))

    def test_missing_read_requires_error_without_disclosing_error_text(self):
        trace = {
            "exit_code": 0, "result": "synthetic completion", "is_error": False,
            "stderr_empty": True, "fixture_unchanged": True,
            "requests": [
                {"response": "text", "tool_results": [], "tool_names": []},
                {"response": "tool", "tool_results": [], "tool_names": ["Read"]},
                {"response": "text", "tool_results": [
                    {"is_error": True, "text": "<redacted>", "text_matches_fixture": False}
                ], "tool_names": ["Read"]},
            ],
        }
        self.assertTrue(is_missing_trace(trace))
        self.assertFalse(is_missing_trace({**trace, "fixture_unchanged": False}))
        self.assertFalse(is_missing_trace({**trace, "requests": [
            *trace["requests"][:2],
            {**trace["requests"][2], "tool_results": [
                {"is_error": False, "text": "<redacted>", "text_matches_fixture": False}
            ]},
        ]}))

    def test_denied_read_requires_unchanged_outside_file(self):
        trace = {
            "exit_code": 0, "result": "synthetic completion", "is_error": False,
            "stderr_empty": True, "fixture_unchanged": True, "outside_unchanged": True,
            "requests": [
                {"response": "text", "tool_results": [], "tool_names": []},
                {"response": "tool", "tool_results": [], "tool_names": ["Read"]},
                {"response": "text", "tool_results": [
                    {"is_error": True, "text": "<redacted>", "text_matches_fixture": False,
                     "error_kind": "access_denied"}
                ], "tool_names": ["Read"]},
            ],
        }
        self.assertTrue(is_denied_trace(trace))
        self.assertFalse(is_denied_trace({**trace, "outside_unchanged": False}))

    def test_error_summary_classifies_without_retaining_diagnostic(self):
        result = summarize_result({"is_error": True, "content": "Access denied: synthetic-private-marker"})
        self.assertEqual(result["error_kind"], "access_denied")
        self.assertEqual(result["text"], "<redacted>")
        self.assertNotIn("synthetic-private-marker", json.dumps(result))

    def test_catalog_summary_retains_only_expected_tool_presence(self):
        result = catalog_summary(["Read", "Bash", "Edit", "private-tool-name"])
        self.assertEqual(result, {"Read": True, "Bash": True, "Edit": True, "Glob": False, "Grep": False})
        self.assertNotIn("private-tool-name", json.dumps(result))

    def test_search_schema_summary_retains_only_fixed_property_presence(self):
        result = search_schema_summary([{"name": "Glob", "input_schema": {"properties": {
            "pattern": {"type": "string"}, "private-field": {"type": "string"}}}}], "Glob")
        self.assertTrue(result["pattern"])
        self.assertFalse(result["path"])
        self.assertNotIn("private-field", json.dumps(result))

    def test_search_option_call_contains_only_selected_synthetic_fields(self):
        body = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", output_mode="content")
        self.assertIn('\\"output_mode\\": \\"content\\"', body.decode())
        self.assertNotIn('\\"path\\"', body.decode())
        insensitive = message_response("test-model", "tool", "fixture.txt", "Grep", "ALPHA", ignore_case=True)
        self.assertIn('\\"-i\\": true', insensitive.decode())
        matching = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", only_matching=True)
        self.assertIn('\\"-o\\": true', matching.decode())
        context = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", context_lines=1)
        self.assertIn('\\"-C\\": 1', context.decode())
        after = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", context_side="-A")
        before = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", context_side="-B")
        self.assertIn('\\"-A\\": 1', after.decode())
        self.assertIn('\\"-B\\": 1', before.decode())
        limited = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", head_limit=1)
        self.assertIn('\\"head_limit\\": 1', limited.decode())
        offset = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", head_limit=1, offset=1)
        self.assertIn('\\"offset\\": 1', offset.decode())
        filtered = message_response("test-model", "tool", "fixture.txt", "Grep", "alpha", file_glob="*.txt")
        self.assertIn('\\"glob\\": \\"*.txt\\"', filtered.decode())
        self.assertNotIn('\\"fixture.md\\"', filtered.decode())

    def test_search_result_summary_retains_fixture_match_without_raw_text(self):
        result = summarize_search_result({"is_error": False, "content": "private fixture.txt private"})
        self.assertEqual(result, {"is_error": False, "fixture_name_present": True, "result_format": "<redacted>"})
        self.assertNotIn("private", json.dumps(result))
        self.assertEqual(summarize_search_result({"is_error": False, "content": "No files found"}),
                         {"is_error": False, "fixture_name_present": False, "result_format": "no_files_found"})

    def test_search_result_summary_recognizes_only_exact_synthetic_formats(self):
        for tool, value in (("Glob", "fixture.txt"), ("Grep", "Found 1 file\nfixture.txt")):
            self.assertEqual(summarize_search_result({"content": value}, tool)["result_format"], "fixture_match")
            self.assertEqual(summarize_search_result({"content": value + " private"}, tool)["result_format"], "<redacted>")
        self.assertEqual(summarize_search_result({"content": "nested/fixture.txt"}, "Glob")["result_format"], "nested_match")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:1:alpha"}, "Grep")["result_format"], "content_match")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:alpha"}, "Grep")["result_format"], "content_no_line")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:1:alpha\nfixture.txt-2-beta"}, "Grep")["result_format"], "content_context")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:2:alpha\nfixture.txt-3-after"}, "Grep")["result_format"], "content_after")
        self.assertEqual(summarize_search_result({"content": "fixture.txt-1-before\nfixture.txt:2:alpha"}, "Grep")["result_format"], "content_before")
        self.assertEqual(summarize_search_result({"content": "nested/fixture.txt:1:alpha"}, "Grep")["result_format"], "nested_content")
        self.assertEqual(summarize_search_result({"content": "Found 1 file\nnested/fixture.txt"}, "Grep")["result_format"], "nested_files")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:1:alpha\n\n[Showing results with pagination = limit: 1]"}, "Grep")["result_format"], "head_limited_content")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:2:alpha\n\n[Showing results with pagination = offset: 1]"}, "Grep")["result_format"], "offset_content")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:1\n\nFound 1 total occurrence across 1 file."}, "Grep")["result_format"], "count_match")
        self.assertEqual(summarize_search_result({"content": "second.txt:1\nfixture.txt:2\n\nFound 3 total occurrences across 2 files."}, "Grep")["result_format"], "count_multiple")
        self.assertEqual(summarize_search_result({"content": "No matches found\n\nFound 0 total occurrences across 0 files."}, "Grep")["result_format"], "count_no_match")
        self.assertEqual(summarize_search_result({"content": "fixture.txt:101\n\nFound 101 total occurrences across 1 file."}, "Grep")["result_format"], "count_101")


if __name__ == "__main__":
    unittest.main()
