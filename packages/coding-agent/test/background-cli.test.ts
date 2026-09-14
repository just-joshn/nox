import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { APP_NAME, ENV_AGENT_DIR, ENV_SESSION_DIR } from "../src/config.ts";

const cliPath = resolve(__dirname, "../src/cli.ts");
const sourceResolverPath = resolve(__dirname, "../src/experimental/source-resolver.ts");

function runBackgroundCli(args: string[], rootDir?: string) {
	const root = rootDir ?? mkdtempSync(join(tmpdir(), "nox-background-cli-"));
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
			root,
		};
	} finally {
		if (!rootDir) {
			rmSync(root, { recursive: true, force: true });
		}
	}
}

describe("background CLI preflight and lifecycle", () => {
	test("rejects print mode with attachable background advice", () => {
		const result = runBackgroundCli(["--bg", "-p", "noop"]);
		expect(result.status).toBe(1);
		expect(result.stdout).toBe("");
		expect(result.stderr).toBe(
			`--bg and --print conflict: --print never starts the interactive session that \`${APP_NAME} agents\` attaches to, so the job would be unattachable. The prompt is the positional — drop --print: \`${APP_NAME} --bg '<task>'\`.\n`,
		);
		expect(result.sessionCreated).toBe(false);
	});

	test("launches a background session and supports agents, logs, stop, respawn, rm subcommands", () => {
		const root = mkdtempSync(join(tmpdir(), "nox-bg-lifecycle-"));
		try {
			// 1. Launch
			const launchResult = runBackgroundCli(["--bg", "noop background task"], root);
			expect(launchResult.status).toBe(0);
			const bgId = launchResult.stdout.trim();
			expect(bgId).toMatch(/^bg-[a-z0-9]+-[a-z0-9]+$/);

			// 2. List with agents --json
			const listResult = runBackgroundCli(["agents", "--json"], root);
			expect(listResult.status).toBe(0);
			const sessions = JSON.parse(listResult.stdout);
			expect(Array.isArray(sessions)).toBe(true);
			expect(sessions.length).toBe(1);
			expect(sessions[0].id).toBe(bgId);
			expect(sessions[0].status).toBe("running");

			// 3. Read logs
			const logsResult = runBackgroundCli(["logs", bgId], root);
			expect(logsResult.status).toBe(0);
			expect(logsResult.stdout).toContain("noop background task");

			// 4. Stop
			const stopResult = runBackgroundCli(["stop", bgId], root);
			expect(stopResult.status).toBe(0);
			expect(stopResult.stdout).toContain(`Background session ${bgId} stopped.`);

			// Verify status updated to stopped
			const listStoppedResult = runBackgroundCli(["agents", "--json"], root);
			const stoppedSessions = JSON.parse(listStoppedResult.stdout);
			expect(stoppedSessions[0].status).toBe("stopped");

			// 5. Respawn
			const respawnResult = runBackgroundCli(["respawn", bgId], root);
			expect(respawnResult.status).toBe(0);
			expect(respawnResult.stdout).toContain(`Background session ${bgId} respawned.`);

			// 6. Remove
			const removeResult = runBackgroundCli(["rm", bgId], root);
			expect(removeResult.status).toBe(0);
			expect(removeResult.stdout).toContain(`Background session ${bgId} removed.`);

			// Verify empty list
			const listEmptyResult = runBackgroundCli(["agents", "--json"], root);
			expect(JSON.parse(listEmptyResult.stdout)).toEqual([]);
		} finally {
			rmSync(root, { recursive: true, force: true });
		}
	});
});
