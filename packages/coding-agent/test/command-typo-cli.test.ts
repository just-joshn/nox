import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { APP_NAME, ENV_AGENT_DIR, ENV_SESSION_DIR } from "../src/config.ts";

const cliPath = resolve(__dirname, "../src/cli.ts");
const sourceResolverPath = resolve(__dirname, "../src/experimental/source-resolver.ts");

function runCli(args: string[]) {
	const root = mkdtempSync(join(tmpdir(), "nox-command-typo-"));
	const sessionDir = join(root, "sessions");
	try {
		const result = spawnSync(process.execPath, ["--import", sourceResolverPath, cliPath, ...args], {
			cwd: root,
			env: {
				HOME: root,
				[ENV_AGENT_DIR]: join(root, "agent"),
				[ENV_SESSION_DIR]: sessionDir,
				NO_COLOR: "1",
				PI_OFFLINE: "1",
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
			homeEntries: readdirSync(root),
		};
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
}

describe("command typo preflight", () => {
	test("suggests update and exits before session creation", () => {
		const result = runCli(["udpate"]);
		expect(result.status).toBe(1);
		expect(result.stdout).toBe("");
		expect(result.stderr).toBe(
			`✘ unknown command "udpate"\n  └ Did you mean ${APP_NAME} update?\n\nRun ${APP_NAME} --help to list commands, or ${APP_NAME} -p "udpate" to send as a prompt.\n`,
		);
		expect(result.stderr).not.toContain("No API key found");
		expect(result.sessionCreated).toBe(false);
		expect(result.homeEntries).toEqual([]);
	});

	test("leaves an unrelated prompt on the existing path", () => {
		const result = runCli(["Explain this project"]);
		expect(result.status).toBe(1);
		expect(result.stderr).toContain("No API key found");
		expect(result.stderr).not.toContain("Did you mean");
	});
});
