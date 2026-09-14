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


def sse(event: str, payload: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(payload, separators=(',', ':'))}\n\n"


def message_response(model: str, kind: str, read_path: str) -> bytes:
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
        block = {"type": "tool_use", "id": "toolu_synthetic", "name": "Read", "input": {}}
        delta = {"type": "input_json_delta", "partial_json": json.dumps({"file_path": read_path})}
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


def summarize_result(result: dict) -> dict:
    content = result.get("content", [])
    if isinstance(content, str):
        return {"is_error": bool(result.get("is_error")), "content_types": ["text"],
                "text": content if content == EXPECTED_READ_RESULT else "<redacted>",
                "text_matches_fixture": content == EXPECTED_READ_RESULT}
    blocks = content if isinstance(content, list) else []
    texts = [block.get("text", "") for block in blocks if isinstance(block, dict) and block.get("type") == "text"]
    value = "\n".join(texts)
    return {"is_error": bool(result.get("is_error")), "content_types": ["text" if block.get("type") == "text" else "<redacted>" for block in blocks],
            "text": value if value == EXPECTED_READ_RESULT else "<redacted>",
            "text_matches_fixture": value == EXPECTED_READ_RESULT}


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
            kind = "tool" if "Read" in names and not results else "text"
            state.requests.append(
                {"model": request["model"] if request["model"].startswith(("claude-haiku-", "claude-sonnet-"))
                 and len(request["model"]) < 80 and all(char.isalnum() or char == "-" for char in request["model"])
                 else "<redacted>",
                 "tool_names": [name if name in {"Read", "Edit", "Bash"} else "<redacted>" for name in names],
                 "response": kind, "tool_results": [summarize_result(item) for item in results]}
            )
            body = message_response(request["model"], kind, state.read_path)
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_args):
            pass

    return Handler


def main(executable: str, missing: bool = False) -> int:
    with tempfile.TemporaryDirectory(prefix="nox-loopback-read-") as root:
        fixture = Path(root, "fixture.txt")
        fixture.write_text(FIXTURE_CONTENT)
        state = ProbeState(read_path="missing.txt" if missing else "fixture.txt")
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
        command = [executable, "--bare", "-p", "Read fixture.txt", "--model", "sonnet", "--output-format", "json", "--allowedTools", "Read"]
        try:
            process = subprocess.run(command, cwd=root, env=env, capture_output=True, text=True, timeout=30)
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
    print(json.dumps(summary, indent=2))
    return 0 if (is_missing_trace(summary) if missing else is_expected_trace(summary)) else 1


if __name__ == "__main__":
    if len(sys.argv) not in (2, 3) or (len(sys.argv) == 3 and sys.argv[2] != "missing"):
        raise SystemExit("Usage: loopback_probe.py <cli-executable> [missing]")
    raise SystemExit(main(sys.argv[1], missing=len(sys.argv) == 3))
