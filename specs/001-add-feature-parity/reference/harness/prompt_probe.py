"""Inspect synthetic system-prompt markers through a local Messages endpoint."""

import json
import os
import queue
import subprocess
import sys
import tempfile
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from loopback_probe import EXPECTED_COMPLETION, message_response


REPLACE = "REPLACE_SENTINEL"
APPEND = "APPEND_SENTINEL"


def summarize_system(system: object) -> dict[str, bool]:
    if isinstance(system, str):
        text = system
    elif isinstance(system, list):
        text = "\n".join(
            block.get("text", "") for block in system
            if isinstance(block, dict) and isinstance(block.get("text"), str)
        )
    else:
        text = ""
    replace_at = text.find(REPLACE)
    append_at = text.find(APPEND)
    return {
        "replace_present": replace_at >= 0,
        "append_present": append_at >= 0,
        "replace_before_append": replace_at >= 0 and append_at > replace_at,
    }


def make_handler(observations: queue.Queue):
    class Handler(BaseHTTPRequestHandler):
        def do_POST(self):
            if self.path != "/v1/messages?beta=true":
                self.send_error(404)
                return
            try:
                length = int(self.headers.get("content-length", "0"))
                if not 0 < length <= 2_000_000:
                    self.send_error(413)
                    return
                request = json.loads(self.rfile.read(length))
                if not isinstance(request, dict) or not isinstance(request.get("model"), str):
                    self.send_error(400)
                    return
            except (ValueError, json.JSONDecodeError):
                self.send_error(400)
                return
            observations.put(summarize_system(request.get("system")))
            body = message_response(request["model"], "text", "")
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def log_message(self, *_args):
            pass

    return Handler


def main(executable: str) -> int:
    observations = queue.Queue()
    server = ThreadingHTTPServer(("127.0.0.1", 0), make_handler(observations))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with tempfile.TemporaryDirectory(prefix="nox-loopback-prompt-") as home:
            env = {
                "HOME": home,
                "XDG_CONFIG_HOME": home,
                "PATH": os.environ.get("PATH", ""),
                "NO_COLOR": "1",
                "ANTHROPIC_API_KEY": "sk-ant-api03-synthetic",
                "ANTHROPIC_BASE_URL": f"http://127.0.0.1:{server.server_port}",
            }
            command = [executable, "--bare", "-p", "noop", "--model", "sonnet", "--output-format", "json",
                       "--system-prompt", REPLACE, "--append-system-prompt", APPEND]
            process = subprocess.run(command, cwd=home, env=env, capture_output=True, text=True, timeout=30)
        try:
            result = json.loads(process.stdout)
        except json.JSONDecodeError:
            result = {}
        requests = []
        while not observations.empty():
            requests.append(observations.get_nowait())
        summary = {
            "exit_code": process.returncode,
            "result_matches_fixture": result.get("result") == EXPECTED_COMPLETION,
            "stderr_empty": not process.stderr,
            "requests": requests,
        }
        print(json.dumps(summary, indent=2))
        return 0 if (summary["exit_code"] == 0 and summary["result_matches_fixture"]
                     and any(item["replace_before_append"] for item in requests)) else 1
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: prompt_probe.py <cli-executable>")
    raise SystemExit(main(sys.argv[1]))
