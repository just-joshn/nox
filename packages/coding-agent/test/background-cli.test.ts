import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { ENV_AGENT_DIR, ENV_SESSION_DIR } from "../src/config.ts";

const cliPath = resolve(__dirname, "../src/cli.ts");
const sourceResolverPath = resolve(__dirname, "../src/experimental/source-resolver.ts");

function runBackgroundCli(args: string[]) {
	const root = mkdtempSync(join(tmpdir(), "nox-background-cli-"));
	const sessionDir = join(root, "sessions");
	try {
		const result = spawnSync(process.execPath, ["--import", sourceResolverPath, cliPath, ...args], {
			cwd: root,
			env: {
				HOME: root,
				[ENV_AGENT_DIR]: join(root, "agent"),
				[ENV_SESSION_DIR]: sessionDir,
				NO_COLOR: "1",
				PATH: process.env.PATH ?? "",
			},
			encoding: "utf8",
			timeout: 10_000,
		});
		if (result.error) throw result.error;
		return {
			status: result.status,
			stdout: result.stdout,
			stderr: result.stderr,
			sessionCreated: existsSync(sessionDir),
		};
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
}

describe("background CLI preflight", () => {
	test("rejects print mode without creating a background session", () => {
		const result = runBackgroundCli(["--bg", "-p", "noop"]);
		expect(result).toEqual({
			status: 1,
			stdout: "",
			stderr:
				"--bg and --print conflict: --print cannot start an attachable background session. Background sessions are not available yet.\n",
			sessionCreated: false,
		});
	});

	test("rejects unsupported background launches explicitly", () => {
		const result = runBackgroundCli(["--bg", "noop"]);
		expect(result).toEqual({
			status: 1,
			stdout: "",
			stderr: "Error: Background sessions are not available yet\n",
			sessionCreated: false,
		});
	});
});
