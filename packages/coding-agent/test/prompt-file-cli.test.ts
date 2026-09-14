import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { ENV_AGENT_DIR, ENV_SESSION_DIR } from "../src/config.ts";

const cliPath = resolve(__dirname, "../src/cli.ts");
const sourceResolverPath = resolve(__dirname, "../src/experimental/source-resolver.ts");

function runCli(flag: string) {
	const root = mkdtempSync(join(tmpdir(), "nox-prompt-file-cli-"));
	const missing = join(root, "missing.txt");
	try {
		const result = spawnSync(process.execPath, ["--import", sourceResolverPath, cliPath, "-p", flag, missing, "noop"], {
			cwd: root,
			env: {
				HOME: root,
				[ENV_AGENT_DIR]: join(root, "agent"),
				[ENV_SESSION_DIR]: join(root, "sessions"),
				PI_OFFLINE: "1",
				NO_COLOR: "1",
				PATH: process.env.PATH ?? "",
			},
			encoding: "utf8",
			timeout: 10_000,
		});
		if (result.error) throw result.error;
		return { status: result.status, stdout: result.stdout, stderr: result.stderr, missing };
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
}

describe("prompt file CLI preflight", () => {
	for (const [flag, label] of [
		["--system-prompt-file", "System prompt"],
		["--append-system-prompt-file", "Append system prompt"],
	] as const) {
		test(`rejects missing ${flag} before model work`, () => {
			const result = runCli(flag);
			expect(result.status).toBe(1);
			expect(result.stdout).toBe("");
			expect(result.stderr).toBe(`Error: ${label} file not found: ${result.missing}\n`);
		});
	}
});
