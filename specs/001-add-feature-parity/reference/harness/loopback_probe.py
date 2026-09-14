"""Exercise a local CLI read cycle with a synthetic loopback message endpoint."""

import json
import os
import subprocess
import sys
import tempfile
import threading
from dataclasses import dataclass, field
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


FIXTURE_CONTENT = "alpha\nbeta\n"
EXPECTED_READ_RESULT = "1\talpha\n2\tbeta\n3\t"
EXPECTED_COMPLETION = "synthetic completion"


@dataclass
class ProbeState:
    requests: list[dict] = field(default_factory=list)
    read_path: str = "fixture.txt"
    catalog: bool = False
    tool_name: str = "Read"
    tool_pattern: str | None = None
    tool_path: str | None = None
    output_mode: str | None = None
    ignore_case: bool = False


def sse(event: str, payload: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(payload, separators=(',', ':'))}\n\n"


def message_response(model: str, kind: str, read_path: str, tool_name: str = "Read", tool_pattern: str | None = None,
                     tool_path: str | None = None, output_mode: str | None = None, ignore_case: bool = False) -> bytes:
    message = {
        "id": "msg_synthetic",
        "type": "message",
        "role": "assistant",
        "model": model,
        "content": [],
        "stop_reason": None,
        "stop_sequence": None,
        "usage": {"input_tokens": 10, "output_tokens": 0},
    }
    events = [sse("message_start", {"type": "message_start", "message": message})]
    if kind == "tool":
        block = {"type": "tool_use", "id": "toolu_synthetic", "name": tool_name, "input": {}}
        tool_input = ({"pattern": tool_pattern or "*.txt"} if tool_name == "Glob" else
                      {"pattern": tool_pattern or "alpha"} if tool_name == "Grep" else {"file_path": read_path})
        if tool_path: tool_input = {**tool_input, "path": tool_path}
        if output_mode: tool_input = {**tool_input, "output_mode": output_mode}
        if ignore_case: tool_input = {**tool_input, "-i": True}
        delta = {"type": "input_json_delta", "partial_json": json.dumps(tool_input)}
        stop_reason = "tool_use"
    else:
        block = {"type": "text", "text": ""}
        delta = {"type": "text_delta", "text": EXPECTED_COMPLETION}
        stop_reason = "end_turn"
    events.extend(
        [
            sse("content_block_start", {"type": "content_block_start", "index": 0, "content_block": block}),
            sse("content_block_delta", {"type": "content_block_delta", "index": 0, "delta": delta}),
            sse("content_block_stop", {"type": "content_block_stop", "index": 0}),
            sse(
                "message_delta",
                {
                    "type": "message_delta",
                    "delta": {"stop_reason": stop_reason, "stop_sequence": None},
                    "usage": {"output_tokens": 2},
                },
            ),
            sse("message_stop", {"type": "message_stop"}),
        ]
    )
    return "".join(events).encode()


def tool_results(request: dict) -> list[dict]:
    results = []
    for message in request.get("messages", []):
        if not isinstance(message, dict):
            continue
        content = message.get("content", [])
        if isinstance(content, list):
            results.extend(block for block in content if isinstance(block, dict) and block.get("type") == "tool_result")
    return results


def error_kind(text: str) -> str:
    lower = text.lower()
    if any(term in lower for term in ("permission", "access denied", "not allowed", "outside")):
        return "access_denied"
    if any(term in lower for term in ("not found", "no such file", "does not exist")):
        return "not_found"
    return "other"


def catalog_summary(names: list[str]) -> dict[str, bool]:
    return {name: name in names for name in ("Read", "Bash", "Edit", "Glob", "Grep")}


def search_schema_summary(tools: list[dict], name: str) -> dict[str, bool]:
    candidates = ("pattern", "path", "glob", "type", "output_mode", "head_limit", "offset",
                  "-i", "-n", "-o", "-A", "-B", "-C", "context", "multiline")
    selected = next((tool for tool in tools if isinstance(tool, dict) and tool.get("name") == name), {})
    schema = selected.get("input_schema", {})
    properties = schema.get("properties", {}) if isinstance(schema, dict) else {}
    return {key: key in properties for key in candidates}


def summarize_result(result: dict) -> dict:
    content = result.get("content", [])
    if isinstance(content, str):
        return {"is_error": bool(result.get("is_error")), "content_types": ["text"],
                "text": content if content == EXPECTED_READ_RESULT else "<redacted>",
                "text_matches_fixture": content == EXPECTED_READ_RESULT,
                "error_kind": error_kind(content) if result.get("is_error") else None}
    blocks = content if isinstance(content, list) else []
    texts = [block.get("text", "") for block in blocks if isinstance(block, dict) and block.get("type") == "text"]
    value = "\n".join(texts)
    return {"is_error": bool(result.get("is_error")), "content_types": ["text" if block.get("type") == "text" else "<redacted>" for block in blocks],
            "text": value if value == EXPECTED_READ_RESULT else "<redacted>",
            "text_matches_fixture": value == EXPECTED_READ_RESULT,
            "error_kind": error_kind(value) if result.get("is_error") else None}


def summarize_search_result(result: dict, tool_name: str = "") -> dict:
    content = result.get("content", [])
    if isinstance(content, str):
        text = content
    else:
        text = "\n".join(
            block.get("text", "") for block in content
            if isinstance(block, dict) and isinstance(block.get("text"), str)
        ) if isinstance(content, list) else ""
    expected = {"Glob": "fixture.txt", "Grep": "Found 1 file\nfixture.txt"}
    return {"is_error": bool(result.get("is_error")), "fixture_name_present": "fixture.txt" in text,
            "result_format": "fixture_match" if text == expected.get(tool_name) else
                             "nested_match" if text == "nested/fixture.txt" and tool_name == "Glob" else
                             "content_match" if text == "fixture.txt:1:alpha" and tool_name == "Grep" else
                             "count_match" if text == "fixture.txt:1\n\nFound 1 total occurrence across 1 file." and tool_name == "Grep" else
                             "no_files_found" if text == "No files found" else "<redacted>"}


def is_expected_trace(summary: dict, missing: bool = False) -> bool:
    requests = summary.get("requests", [])
    if (summary.get("exit_code") != 0 or summary.get("result") != EXPECTED_COMPLETION
            or summary.get("is_error") is not False or not summary.get("stderr_empty")
            or not summary.get("fixture_unchanged") or len(requests) != 3):
        return False
    first, second, third = requests
    result = third["tool_results"][0] if len(third["tool_results"]) == 1 else {}
    result_matches = (result.get("is_error") is True and result.get("text") == "<redacted>"
                      and result.get("text_matches_fixture") is False) if missing else (
                          result.get("is_error") is False and result.get("text_matches_fixture") is True)
    return (first["response"] == "text" and not first["tool_results"]
            and second["response"] == "tool" and "Read" in second["tool_names"]
            and not second["tool_results"] and third["response"] == "text"
            and len(third["tool_results"]) == 1 and result_matches)


def is_missing_trace(summary: dict) -> bool:
    return is_expected_trace(summary, missing=True)


def is_denied_trace(summary: dict) -> bool:
    return (summary.get("outside_unchanged") is True and is_missing_trace(summary)
            and summary["requests"][2]["tool_results"][0].get("error_kind") == "access_denied")


def make_handler(state: ProbeState):
    class Handler(BaseHTTPRequestHandler):
        def do_POST(self):
            if self.path != "/v1/messages?beta=true":
                self.send_error(404)
                return
            try:
                length = int(self.headers.get("content-length", "0"))
                if length < 1 or length > 2_000_000:
                    self.send_error(413)
                    return
                request = json.loads(self.rfile.read(length))
                if not isinstance(request, dict) or not isinstance(request.get("model"), str):
                    self.send_error(400)
                    return
                if not isinstance(request.get("tools", []), list) or not isinstance(request.get("messages", []), list):
                    self.send_error(400)
                    return
            except (ValueError, json.JSONDecodeError):
                self.send_error(400)
                return
            if len(state.requests) >= 5:
                self.send_error(429)
                return
            names = [tool.get("name") for tool in request.get("tools", []) if isinstance(tool, dict)]
            results = tool_results(request)
            kind = "tool" if state.tool_name in names and not results else "text"
            state.requests.append(
                {"model": request["model"] if request["model"].startswith(("claude-haiku-", "claude-sonnet-"))
                 and len(request["model"]) < 80 and all(char.isalnum() or char == "-" for char in request["model"])
                 else "<redacted>",
                 "tool_names": [name if name in {"Read", "Edit", "Bash"} else "<redacted>" for name in names],
                 "response": kind, "tool_results": [summarize_search_result(item, state.tool_name) if state.tool_name in {"Glob", "Grep"}
                                                     else summarize_result(item) for item in results],
                 **({"catalog": catalog_summary(names)} if state.catalog else {}),
                 **({"search_schema": search_schema_summary(request["tools"], state.tool_name)}
                    if state.catalog and state.tool_name in {"Glob", "Grep"} else {})}
            )
            body = message_response(request["model"], kind, state.read_path, state.tool_name, state.tool_pattern,
                                    state.tool_path, state.output_mode, state.ignore_case)
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_args):
            pass

    return Handler


def prepare_workspace(root: str, mode: str) -> tuple[Path, Path, Path | None]:
    workspace = Path(root, "workspace") if mode == "outside" else Path(root)
    workspace.mkdir(exist_ok=True)
    subprocess.run(["git", "init", "-q"], cwd=workspace, check=True, capture_output=True)
    fixture = workspace / "fixture.txt"
    fixture.write_text(FIXTURE_CONTENT)
    if mode == "glob-path":
        (workspace / "nested").mkdir()
        (workspace / "nested" / "fixture.txt").write_text(FIXTURE_CONTENT)
    outside = Path(root, "outside.txt") if mode == "outside" else None
    if outside:
        outside.write_text("synthetic outside content\n")
    return workspace, fixture, outside


def main(executable: str, mode: str = "normal") -> int:
    with tempfile.TemporaryDirectory(prefix="nox-loopback-read-") as root:
        workspace, fixture, outside = prepare_workspace(root, mode)
        read_path = "../outside.txt" if outside else "missing.txt" if mode == "missing" else "fixture.txt"
        selected_tool = {"glob-tools": "Glob", "grep-tools": "Grep", "glob-call": "Glob", "grep-call": "Grep",
                         "glob-no-match": "Glob", "grep-no-match": "Grep", "glob-invalid": "Glob", "grep-invalid": "Grep",
                         "glob-path": "Glob", "grep-files-mode": "Grep", "grep-content-mode": "Grep",
                         "grep-ignore-case": "Grep", "grep-count-mode": "Grep"}.get(mode)
        state = ProbeState(read_path=read_path,
                           catalog=mode in {"bare-tools", "default-tools", "glob-tools", "grep-tools", "glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"},
                           tool_name=selected_tool if mode in {"glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"} else "Read",
                           tool_pattern="absent-*.zzz" if mode == "glob-no-match" else "absent-sentinel" if mode == "grep-no-match" else "[" if mode in {"glob-invalid", "grep-invalid"} else "ALPHA" if mode == "grep-ignore-case" else None,
                           tool_path="nested" if mode == "glob-path" else None,
                           output_mode="files_with_matches" if mode == "grep-files-mode" else "content" if mode == "grep-content-mode" else "count" if mode == "grep-count-mode" else None,
                           ignore_case=mode == "grep-ignore-case")
        server = ThreadingHTTPServer(("127.0.0.1", 0), make_handler(state))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        env = {
            "HOME": root,
            "XDG_CONFIG_HOME": root,
            "PATH": os.environ.get("PATH", ""),
            "NO_COLOR": "1",
            "ANTHROPIC_API_KEY": "sk-ant-api03-synthetic",
            "ANTHROPIC_BASE_URL": f"http://127.0.0.1:{server.server_port}",
        }
        command = [executable, *([] if mode in {"default-tools", "glob-tools", "grep-tools", "glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"} else ["--bare"]),
                   "-p", f"Read {read_path}", "--model", "sonnet", "--output-format", "json"]
        if selected_tool:
            command.extend(["--tools", selected_tool])
        if mode in {"default-tools", "glob-tools", "grep-tools", "glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"}:
            if sys.platform != "darwin":
                raise SystemExit("default-tools requires the verified macOS sandbox")
            profile = '(version 1)(allow default)(deny network*)(allow network-outbound (remote ip "localhost:*"))'
            command = ["sandbox-exec", "-p", profile, *command]
        if mode not in {"outside", "glob-tools", "grep-tools", "glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"}: command.extend(["--allowedTools", "Read"])
        try:
            process = subprocess.run(command, cwd=workspace, env=env, capture_output=True, text=True, timeout=30)
            output = json.loads(process.stdout)
            if not isinstance(output, dict):
                raise ValueError("CLI result is not an object")
            summary = {
                "exit_code": process.returncode,
                "result": EXPECTED_COMPLETION if output.get("result") == EXPECTED_COMPLETION else "<redacted>",
                "is_error": output.get("is_error") if isinstance(output.get("is_error"), bool) else None,
                "stderr_empty": not process.stderr,
                "requests": state.requests,
                "fixture_unchanged": fixture.read_text() == FIXTURE_CONTENT,
                "outside_unchanged": outside.read_text() == "synthetic outside content\n" if outside else None,
            }
        except (json.JSONDecodeError, ValueError):
            summary = {
                "error": "InvalidCliJson",
                "exit_code": process.returncode,
                "requests": state.requests,
            }
        except subprocess.TimeoutExpired:
            summary = {"error": "CliTimeout", "requests": state.requests}
        finally:
            server.shutdown()
            server.server_close()
    matched = is_denied_trace(summary) if mode == "outside" else is_missing_trace(summary) if mode == "missing" else is_expected_trace(summary)
    if mode in {"glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"}:
        requests = summary.get("requests", [])
        matched = (summary.get("exit_code") == 0 and summary.get("result") == EXPECTED_COMPLETION
                   and summary.get("stderr_empty") is True and summary.get("fixture_unchanged") is True
                   and len(requests) == 3 and requests[1]["response"] == "tool"
                   and len(requests[2]["tool_results"]) == 1
                   and requests[2]["tool_results"][0].get("fixture_name_present") is (mode in {"glob-call", "grep-call", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"})
                   and isinstance(requests[2]["tool_results"][0].get("is_error"), bool)
                   and (mode in {"glob-invalid", "grep-invalid"} or requests[2]["tool_results"][0]["is_error"] is False))
    elif selected_tool:
        matched = (summary.get("exit_code") == 0 and summary.get("result") == EXPECTED_COMPLETION
                   and summary.get("stderr_empty") is True and any(
                       request.get("catalog", {}).get(selected_tool) is True
                       for request in summary.get("requests", [])
                   ))
    if mode in {"bare-tools", "default-tools"}:
        matched = matched and any(
            request.get("catalog", {}).get("Read") is True
            and request["catalog"].get("Glob") is False
            and request["catalog"].get("Grep") is False
            for request in summary.get("requests", [])
        )
    if state.catalog:
        summary = {**summary, "requests": [
            {key: value for key, value in request.items() if key != "tool_names"}
            for request in summary.get("requests", [])
        ]}
    print(json.dumps(summary, indent=2))
    return 0 if matched else 1


if __name__ == "__main__":
    if len(sys.argv) not in (2, 3) or (len(sys.argv) == 3 and sys.argv[2] not in {"missing", "outside", "bare-tools", "default-tools", "glob-tools", "grep-tools", "glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid", "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode"}):
        raise SystemExit("Usage: loopback_probe.py <cli-executable> [missing|outside|bare-tools|default-tools|glob-tools|grep-tools|glob-call|grep-call|glob-no-match|grep-no-match|glob-invalid|grep-invalid|glob-path|grep-files-mode|grep-content-mode|grep-ignore-case|grep-count-mode]")
    raise SystemExit(main(sys.argv[1], mode=sys.argv[2] if len(sys.argv) == 3 else "normal"))
