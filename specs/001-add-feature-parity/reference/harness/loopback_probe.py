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
SEARCH_MODES = frozenset({
    "glob-call", "grep-call", "glob-no-match", "grep-no-match", "glob-invalid", "grep-invalid",
    "glob-path", "grep-files-mode", "grep-content-mode", "grep-ignore-case", "grep-count-mode",
    "grep-count-multiple", "grep-count-no-match", "grep-count-limit", "grep-count-same-line",
    "grep-no-line-number", "grep-only-matching", "grep-context", "grep-after-context",
    "grep-before-context", "grep-path", "grep-path-files", "grep-glob-filter", "grep-head-limit",
    "grep-offset", "grep-head-exact", "grep-offset-end", "grep-offset-zero", "grep-type-filter",
    "grep-context-alias", "grep-multiline", "grep-multiline-no-match", "grep-multiline-files",
    "grep-multiline-explicit-files", "grep-multiline-count", "glob-two-files", "glob-recursive",
    "glob-hidden", "glob-mtime", "glob-mtime-tie", "glob-ignored", "glob-fd-ignore",
    "glob-git-metadata", "grep-ignored", "grep-fd-ignore", "grep-git-metadata", "grep-hidden",
    "grep-mtime", "grep-mtime-tie", "grep-content-multiple", "grep-content-tie",
    "grep-content-tie-reversed", "grep-content-page", "grep-files-page", "grep-files-exact",
    "grep-files-offset", "grep-files-offset-end", "grep-files-no-match", "grep-content-no-match",
    "grep-content-no-match-page",
    "grep-content-no-match-offset",
    "grep-files-no-match-offset",
    "grep-count-offset",
    "grep-count-page",
    "grep-count-exact",
    "grep-count-offset-end",
    "grep-count-no-match-offset",
    "grep-count-no-match-page",
    "grep-count-offset-zero",
    "grep-type-invalid",
    "grep-output-invalid",
    "grep-head-negative",
    "grep-offset-negative",
    "grep-count-mtime",
    "grep-count-recreate",
    "grep-head-zero",
})
NORMAL_MODES = SEARCH_MODES | {"default-tools", "glob-tools", "grep-tools"}
CATALOG_MODES = NORMAL_MODES | {"bare-tools"}
UNRESTRICTED_TOOLS_MODES = SEARCH_MODES | {"outside", "glob-tools", "grep-tools"}
NO_MATCH_MODES = {"glob-no-match", "grep-no-match", "grep-count-no-match", "grep-offset-end", "grep-multiline-no-match", "grep-files-offset-end", "grep-files-no-match", "grep-content-no-match", "grep-content-no-match-page", "grep-content-no-match-offset", "grep-files-no-match-offset", "grep-count-no-match-offset", "grep-count-no-match-page"}
NON_TXT_MATCH_MODES = {"grep-type-filter", "grep-content-page", "grep-files-page", "grep-count-page", "grep-count-offset-end", "grep-count-mtime", "grep-count-recreate"}
INVALID_MODES = {"glob-invalid", "grep-invalid", "grep-type-invalid", "grep-output-invalid", "grep-head-negative", "grep-offset-negative"}
FIXTURE_MATCH_MODES = SEARCH_MODES - NO_MATCH_MODES - INVALID_MODES - NON_TXT_MATCH_MODES
VALID_MODES = CATALOG_MODES | {"missing", "outside"}


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
    line_numbers: bool | None = None
    only_matching: bool = False
    context_lines: int | None = None
    context_side: str | None = None
    file_glob: str | None = None
    head_limit: int | None = None
    offset: int | None = None
    file_type: str | None = None
    context_alias: int | None = None
    multiline: bool = False


def sse(event: str, payload: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(payload, separators=(',', ':'))}\n\n"


def message_response(model: str, kind: str, read_path: str, tool_name: str = "Read", tool_pattern: str | None = None,
                     tool_path: str | None = None, output_mode: str | None = None, ignore_case: bool = False,
                     line_numbers: bool | None = None, only_matching: bool = False,
                     context_lines: int | None = None, context_side: str | None = None,
                     file_glob: str | None = None, head_limit: int | None = None,
                     offset: int | None = None, file_type: str | None = None,
                     context_alias: int | None = None, multiline: bool = False) -> bytes:
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
        if line_numbers is not None: tool_input = {**tool_input, "-n": line_numbers}
        if only_matching: tool_input = {**tool_input, "-o": True}
        if context_lines is not None: tool_input = {**tool_input, "-C": context_lines}
        if context_side in {"-A", "-B"}: tool_input = {**tool_input, context_side: 1}
        if file_glob: tool_input = {**tool_input, "glob": file_glob}
        if head_limit is not None: tool_input = {**tool_input, "head_limit": head_limit}
        if offset is not None: tool_input = {**tool_input, "offset": offset}
        if file_type: tool_input = {**tool_input, "type": file_type}
        if context_alias is not None: tool_input = {**tool_input, "context": context_alias}
        if multiline: tool_input = {**tool_input, "multiline": True}
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
                             "content_no_line" if text == "fixture.txt:alpha" and tool_name == "Grep" else
                             "content_context" if text == "fixture.txt:1:alpha\nfixture.txt-2-beta" and tool_name == "Grep" else
                             "content_after" if text == "fixture.txt:2:alpha\nfixture.txt-3-after" and tool_name == "Grep" else
                             "content_before" if text == "fixture.txt-1-before\nfixture.txt:2:alpha" and tool_name == "Grep" else
                             "nested_content" if text == "nested/fixture.txt:1:alpha" and tool_name == "Grep" else
                             "nested_files" if text == "Found 1 file\nnested/fixture.txt" and tool_name == "Grep" else
                             "head_limited_content" if text == "fixture.txt:1:alpha\n\n[Showing results with pagination = limit: 1]" and tool_name == "Grep" else
                             "offset_content" if text == "fixture.txt:2:alpha\n\n[Showing results with pagination = offset: 1]" and tool_name == "Grep" else
                             "offset_end" if text == "No entries at this offset\n\n[Showing results with pagination = offset: 2]" and tool_name == "Grep" else
                             "python_match" if text == "Found 1 file\nfixture.py" and tool_name == "Grep" else
                             "multiline_content" if text == "fixture.txt:1:alpha\nfixture.txt:2:beta" and tool_name == "Grep" else
                             "glob_two_files" if text == "fixture.txt\nsecond.txt" and tool_name == "Glob" else
                             "glob_recursive" if text == "fixture.txt\nnested/fixture.txt" and tool_name == "Glob" else
                             "glob_hidden" if text == "fixture.txt\n.hidden.txt" and tool_name == "Glob" else
                             "glob_mtime" if text == ".hidden.txt\nfixture.txt" and tool_name == "Glob" else
                             "glob_ignored" if text == "fixture.txt\nignored.txt" and tool_name == "Glob" else
                             "glob_git_metadata" if text == "fixture.txt\n.git/inner.txt" and tool_name == "Glob" else
                             "grep_hidden" if text == "Found 2 files\n.hidden.txt\nfixture.txt" and tool_name == "Grep" else
                             "grep_mtime" if text == "Found 2 files\nfixture.txt\n.hidden.txt" and tool_name == "Grep" else
                             "grep_content_multiple" if text == "second.txt:1:alpha\nfixture.txt:1:alpha" and tool_name == "Grep" else
                             "grep_content_page" if text == "second.txt:1:alpha\n\n[Showing results with pagination = limit: 1]" and tool_name == "Grep" else
                             "grep_files_page" if text == "Found 1 file limit: 1\nsecond.txt" and tool_name == "Grep" else
                             "grep_files_offset" if text == "Found 1 file offset: 1\nfixture.txt" and tool_name == "Grep" else
                             "grep_files_offset_end" if text == "No entries at this offset. [Showing results with pagination = offset: 2]" and tool_name == "Grep" else
                             "no_matches_found" if text == "No matches found" and tool_name == "Grep" else
                             "no_matches_offset" if text == "No matches found\n\n[Showing results with pagination = offset: 1]" and tool_name == "Grep" else
                             "count_match" if text == "fixture.txt:1\n\nFound 1 total occurrence across 1 file." and tool_name == "Grep" else
                             "count_offset" if text == "fixture.txt:1\n\nFound 2 total occurrences across 2 files. with pagination = offset: 1" and tool_name == "Grep" else
                             "count_page" if text == "second.txt:1\n\nFound 2 total occurrences across 2 files. with pagination = limit: 1" and tool_name == "Grep" else
                             "count_offset_end" if text == "No entries at this offset\n\nFound 1 total occurrence across 1 file. with pagination = offset: 1" and tool_name == "Grep" else
                             "count_no_match_offset" if text == "No matches found\n\nFound 0 total occurrences across 0 files. with pagination = offset: 1" and tool_name == "Grep" else
                             "count_multiple" if text == "second.txt:1\nfixture.txt:2\n\nFound 3 total occurrences across 2 files." and tool_name == "Grep" else
                             "count_no_match" if text == "No matches found\n\nFound 0 total occurrences across 0 files." and tool_name == "Grep" else
                             "count_101" if text == "fixture.txt:101\n\nFound 101 total occurrences across 1 file." and tool_name == "Grep" else
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
                                    state.tool_path, state.output_mode, state.ignore_case, state.line_numbers,
                                    state.only_matching, state.context_lines, state.context_side, state.file_glob,
                                    state.head_limit, state.offset, state.file_type, state.context_alias,
                                    state.multiline)
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
    fixture.write_text("before\nalpha\nafter\n" if mode in {"grep-after-context", "grep-before-context"} else "alpha beta\n" if mode == "grep-only-matching" else "alpha alpha\n" if mode == "grep-count-same-line" else "alpha\n" * 101 if mode == "grep-count-limit" else "alpha\nalpha\n" if mode == "grep-count-multiple" else FIXTURE_CONTENT)
    if mode in {"grep-count-multiple", "grep-count-offset", "grep-count-page", "grep-count-mtime", "grep-count-recreate"}:
        (workspace / "second.txt").write_text("alpha\n")
    if mode == "grep-count-recreate":
        fixture.unlink()
        fixture.write_text(FIXTURE_CONTENT)
    if mode == "grep-count-mtime":
        os.utime(fixture, (1_700_000_000, 1_700_000_000))
        os.utime(workspace / "second.txt", (1_600_000_000, 1_600_000_000))
    if mode in {"glob-two-files", "grep-content-multiple", "grep-content-tie", "grep-content-tie-reversed", "grep-content-page", "grep-files-page", "grep-files-offset", "grep-files-offset-end"}:
        (workspace / "second.txt").write_text(FIXTURE_CONTENT)
    if mode in {"grep-content-multiple", "grep-content-page", "grep-files-page", "grep-files-offset", "grep-files-offset-end"}:
        os.utime(fixture, (1_600_000_000, 1_600_000_000))
        os.utime(workspace / "second.txt", (1_700_000_000, 1_700_000_000))
    if mode == "grep-content-tie":
        os.utime(fixture, (1_600_000_000, 1_600_000_000))
        os.utime(workspace / "second.txt", (1_600_000_000, 1_600_000_000))
    if mode == "grep-content-tie-reversed":
        fixture.unlink()
        fixture.write_text(FIXTURE_CONTENT)
        os.utime(workspace / "second.txt", (1_600_000_000, 1_600_000_000))
        os.utime(fixture, (1_600_000_000, 1_600_000_000))
    if mode in {"glob-hidden", "glob-mtime", "glob-mtime-tie", "grep-hidden", "grep-mtime", "grep-mtime-tie"}:
        (workspace / ".hidden.txt").write_text(FIXTURE_CONTENT)
    if mode == "glob-mtime":
        os.utime(workspace / ".hidden.txt", (1_600_000_000, 1_600_000_000))
        os.utime(fixture, (1_700_000_000, 1_700_000_000))
    if mode == "grep-mtime":
        os.utime(workspace / ".hidden.txt", (1_600_000_000, 1_600_000_000))
        os.utime(fixture, (1_700_000_000, 1_700_000_000))
    if mode in {"glob-mtime-tie", "grep-mtime-tie"}:
        os.utime(workspace / ".hidden.txt", (1_600_000_000, 1_600_000_000))
        os.utime(fixture, (1_600_000_000, 1_600_000_000))
    if mode in {"glob-ignored", "grep-ignored"}:
        (workspace / ".gitignore").write_text("ignored.txt\n")
        (workspace / "ignored.txt").write_text(FIXTURE_CONTENT)
    if mode in {"glob-fd-ignore", "grep-fd-ignore"}:
        (workspace / ".ignore").write_text("ignored.txt\n")
        (workspace / "ignored.txt").write_text(FIXTURE_CONTENT)
    if mode in {"glob-git-metadata", "grep-git-metadata"}:
        (workspace / ".git" / "inner.txt").write_text(FIXTURE_CONTENT)
    if mode == "grep-glob-filter":
        (workspace / "fixture.md").write_text(FIXTURE_CONTENT)
    if mode == "grep-type-filter":
        (workspace / "fixture.py").write_text(FIXTURE_CONTENT)
    if mode in {"grep-head-limit", "grep-offset", "grep-offset-end", "grep-offset-zero"}:
        fixture.write_text("alpha\nalpha\n")
    if mode in {"glob-path", "glob-recursive", "grep-path", "grep-path-files"}:
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
        selected_tool = "Glob" if mode.startswith("glob-") else "Grep" if mode.startswith("grep-") else None
        state = ProbeState(read_path=read_path,
                           catalog=mode in CATALOG_MODES,
                           tool_name=selected_tool if mode in SEARCH_MODES else "Read",
                           tool_pattern="absent-*.zzz" if mode == "glob-no-match" else "absent-sentinel" if mode in {"grep-no-match", "grep-count-no-match", "grep-multiline-no-match", "grep-files-no-match", "grep-content-no-match", "grep-content-no-match-page", "grep-content-no-match-offset", "grep-files-no-match-offset", "grep-count-no-match-offset", "grep-count-no-match-page"} else "[" if mode in {"glob-invalid", "grep-invalid"} else "ALPHA" if mode == "grep-ignore-case" else "alpha\nbeta" if mode in {"grep-multiline", "grep-multiline-files", "grep-multiline-explicit-files", "grep-multiline-count"} else "**/*.txt" if mode in {"glob-recursive", "glob-git-metadata"} else None,
                           tool_path="nested" if mode in {"glob-path", "grep-path", "grep-path-files"} else None,
                           output_mode="files_with_matches" if mode in {"grep-files-mode", "grep-path-files", "grep-multiline-explicit-files", "grep-files-page", "grep-files-exact", "grep-files-offset", "grep-files-offset-end", "grep-files-no-match", "grep-files-no-match-offset"} else "content" if mode in {"grep-content-mode", "grep-content-multiple", "grep-content-tie", "grep-content-tie-reversed", "grep-content-page", "grep-no-line-number", "grep-only-matching", "grep-context", "grep-context-alias", "grep-after-context", "grep-before-context", "grep-head-limit", "grep-offset", "grep-head-exact", "grep-offset-end", "grep-offset-zero", "grep-multiline", "grep-multiline-no-match", "grep-content-no-match", "grep-content-no-match-page", "grep-content-no-match-offset", "grep-head-negative", "grep-offset-negative", "grep-head-zero"} else "count" if mode in {"grep-count-mode", "grep-count-multiple", "grep-count-no-match", "grep-count-limit", "grep-count-same-line", "grep-multiline-count", "grep-count-offset", "grep-count-page", "grep-count-exact", "grep-count-offset-end", "grep-count-no-match-offset", "grep-count-no-match-page", "grep-count-offset-zero", "grep-count-mtime", "grep-count-recreate"} else "bogus" if mode == "grep-output-invalid" else None,
                           ignore_case=mode == "grep-ignore-case",
                           line_numbers=False if mode == "grep-no-line-number" else None,
                           only_matching=mode == "grep-only-matching",
                           context_lines=1 if mode == "grep-context" else None,
                           context_side="-A" if mode == "grep-after-context" else "-B" if mode == "grep-before-context" else None,
                           file_glob="*.txt" if mode == "grep-glob-filter" else None,
                           head_limit=1 if mode in {"grep-head-limit", "grep-offset", "grep-head-exact", "grep-offset-end", "grep-offset-zero", "grep-content-page", "grep-files-page", "grep-files-exact", "grep-files-offset", "grep-files-offset-end", "grep-content-no-match-page", "grep-content-no-match-offset", "grep-files-no-match-offset", "grep-count-offset", "grep-count-page", "grep-count-exact", "grep-count-offset-end", "grep-count-no-match-offset", "grep-count-no-match-page", "grep-count-offset-zero", "grep-count-mtime", "grep-count-recreate"} else -1 if mode == "grep-head-negative" else 0 if mode == "grep-head-zero" else None,
                           offset=1 if mode in {"grep-offset", "grep-files-offset", "grep-content-no-match-offset", "grep-files-no-match-offset", "grep-count-offset", "grep-count-offset-end", "grep-count-no-match-offset"} else 2 if mode in {"grep-offset-end", "grep-files-offset-end"} else 0 if mode in {"grep-offset-zero", "grep-count-offset-zero"} else -1 if mode == "grep-offset-negative" else None,
                           file_type="py" if mode == "grep-type-filter" else "notatype" if mode == "grep-type-invalid" else None,
                           context_alias=1 if mode == "grep-context-alias" else None,
                           multiline=mode in {"grep-multiline", "grep-multiline-no-match", "grep-multiline-files", "grep-multiline-explicit-files", "grep-multiline-count"})
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
        command = [executable, *([] if mode in NORMAL_MODES else ["--bare"]),
                   "-p", f"Read {read_path}", "--model", "sonnet", "--output-format", "json"]
        if selected_tool:
            command.extend(["--tools", selected_tool])
        if mode in NORMAL_MODES:
            if sys.platform != "darwin":
                raise SystemExit("default-tools requires the verified macOS sandbox")
            profile = '(version 1)(allow default)(deny network*)(allow network-outbound (remote ip "localhost:*"))'
            command = ["sandbox-exec", "-p", profile, *command]
        if mode not in UNRESTRICTED_TOOLS_MODES: command.extend(["--allowedTools", "Read"])
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
                "fixture_unchanged": fixture.read_text() == ("before\nalpha\nafter\n" if mode in {"grep-after-context", "grep-before-context"} else "alpha beta\n" if mode == "grep-only-matching" else "alpha alpha\n" if mode == "grep-count-same-line" else "alpha\n" * 101 if mode == "grep-count-limit" else "alpha\nalpha\n" if mode in {"grep-count-multiple", "grep-head-limit", "grep-offset", "grep-offset-end", "grep-offset-zero"} else FIXTURE_CONTENT),
                "second_unchanged": (workspace / "second.txt").read_text() == (FIXTURE_CONTENT if mode in {"glob-two-files", "grep-content-multiple", "grep-content-tie", "grep-content-tie-reversed", "grep-content-page", "grep-files-page", "grep-files-offset", "grep-files-offset-end"} else "alpha\n") if mode in {"grep-count-multiple", "grep-count-offset", "grep-count-page", "grep-count-mtime", "grep-count-recreate", "glob-two-files", "grep-content-multiple", "grep-content-tie", "grep-content-tie-reversed", "grep-content-page", "grep-files-page", "grep-files-offset", "grep-files-offset-end"} else None,
                "count_mtime_unchanged": (fixture.stat().st_mtime == 1_700_000_000 and
                                           (workspace / "second.txt").stat().st_mtime == 1_600_000_000)
                                          if mode == "grep-count-mtime" else None,
                "content_mtime_unchanged": (fixture.stat().st_mtime == 1_600_000_000 and
                                            (workspace / "second.txt").stat().st_mtime == 1_700_000_000)
                                           if mode in {"grep-content-multiple", "grep-content-page", "grep-files-page", "grep-files-offset", "grep-files-offset-end"} else None,
                "content_tie_unchanged": (fixture.stat().st_mtime == 1_600_000_000 and
                                          (workspace / "second.txt").stat().st_mtime == 1_600_000_000)
                                         if mode in {"grep-content-tie", "grep-content-tie-reversed"} else None,
                "markdown_unchanged": (workspace / "fixture.md").read_text() == FIXTURE_CONTENT
                                      if mode == "grep-glob-filter" else None,
                "python_unchanged": (workspace / "fixture.py").read_text() == FIXTURE_CONTENT
                                    if mode == "grep-type-filter" else None,
                "hidden_unchanged": (workspace / ".hidden.txt").read_text() == FIXTURE_CONTENT
                                    if mode in {"glob-hidden", "glob-mtime", "glob-mtime-tie", "grep-hidden", "grep-mtime", "grep-mtime-tie"} else None,
                "mtime_unchanged": (fixture.stat().st_mtime == 1_700_000_000 and
                                    (workspace / ".hidden.txt").stat().st_mtime == 1_600_000_000)
                                   if mode in {"glob-mtime", "grep-mtime"} else None,
                "mtime_tie_unchanged": (fixture.stat().st_mtime == 1_600_000_000 and
                                        (workspace / ".hidden.txt").stat().st_mtime == 1_600_000_000)
                                       if mode in {"glob-mtime-tie", "grep-mtime-tie"} else None,
                "ignored_unchanged": ((workspace / ".gitignore").read_text() == "ignored.txt\n" and
                                      (workspace / "ignored.txt").read_text() == FIXTURE_CONTENT)
                                     if mode in {"glob-ignored", "grep-ignored"} else None,
                "fd_ignore_unchanged": ((workspace / ".ignore").read_text() == "ignored.txt\n" and
                                         (workspace / "ignored.txt").read_text() == FIXTURE_CONTENT)
                                        if mode in {"glob-fd-ignore", "grep-fd-ignore"} else None,
                "metadata_unchanged": (workspace / ".git" / "inner.txt").read_text() == FIXTURE_CONTENT
                                      if mode in {"glob-git-metadata", "grep-git-metadata"} else None,
                "nested_unchanged": (workspace / "nested" / "fixture.txt").read_text() == FIXTURE_CONTENT
                                    if mode in {"glob-path", "glob-recursive", "grep-path", "grep-path-files"} else None,
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
    if mode in SEARCH_MODES:
        requests = summary.get("requests", [])
        matched = ((mode not in {"grep-count-multiple", "grep-count-offset", "grep-count-page", "grep-count-mtime", "grep-count-recreate", "glob-two-files", "grep-content-multiple", "grep-content-tie", "grep-content-tie-reversed", "grep-content-page", "grep-files-page", "grep-files-offset", "grep-files-offset-end"} or summary.get("second_unchanged") is True)
                   and (mode != "grep-count-mtime" or summary.get("count_mtime_unchanged") is True)
                   and (mode not in {"grep-content-multiple", "grep-content-page", "grep-files-page", "grep-files-offset", "grep-files-offset-end"} or summary.get("content_mtime_unchanged") is True)
                   and (mode not in {"grep-content-tie", "grep-content-tie-reversed"} or summary.get("content_tie_unchanged") is True)
                   and (mode != "grep-glob-filter" or summary.get("markdown_unchanged") is True)
                   and (mode != "grep-type-filter" or summary.get("python_unchanged") is True)
                   and (mode not in {"glob-hidden", "glob-mtime", "glob-mtime-tie", "grep-hidden", "grep-mtime", "grep-mtime-tie"} or summary.get("hidden_unchanged") is True)
                   and (mode not in {"glob-mtime", "grep-mtime"} or summary.get("mtime_unchanged") is True)
                   and (mode not in {"glob-mtime-tie", "grep-mtime-tie"} or summary.get("mtime_tie_unchanged") is True)
                   and (mode not in {"glob-ignored", "grep-ignored"} or summary.get("ignored_unchanged") is True)
                   and (mode not in {"glob-fd-ignore", "grep-fd-ignore"} or summary.get("fd_ignore_unchanged") is True)
                   and (mode not in {"glob-git-metadata", "grep-git-metadata"} or summary.get("metadata_unchanged") is True)
                   and (mode not in {"glob-path", "glob-recursive", "grep-path", "grep-path-files"} or summary.get("nested_unchanged") is True)
                   and summary.get("exit_code") == 0 and summary.get("result") == EXPECTED_COMPLETION
                   and summary.get("stderr_empty") is True and summary.get("fixture_unchanged") is True
                   and len(requests) == 3 and requests[1]["response"] == "tool"
                   and len(requests[2]["tool_results"]) == 1
                   and requests[2]["tool_results"][0].get("fixture_name_present") is (mode in FIXTURE_MATCH_MODES)
                   and isinstance(requests[2]["tool_results"][0].get("is_error"), bool)
                   and (mode in INVALID_MODES or requests[2]["tool_results"][0]["is_error"] is False))
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
    if len(sys.argv) not in (2, 3) or (len(sys.argv) == 3 and sys.argv[2] not in VALID_MODES):
        raise SystemExit("Usage: loopback_probe.py <cli-executable> [" + "|".join(sorted(VALID_MODES)) + "]")
    raise SystemExit(main(sys.argv[1], mode=sys.argv[2] if len(sys.argv) == 3 else "normal"))
