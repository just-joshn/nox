import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { redactSensitive } from "../../src/core/background-session.ts";
import { PermissionManager, type PermissionRule } from "../../src/core/permission-manager.ts";

describe("US2 parity permissions suite (PERM-001–PERM-026)", () => {
	const workspaceDir = join(tmpdir(), "parity-perm-test");

	it("PERM-002: default/manual mode prompts on mutating tool execution and allows read-only in-scope", () => {
		const pm = new PermissionManager({ mode: "default", cwd: workspaceDir });

		// Read in-scope should allow
		const readRes = pm.evaluate({
			tool: "Read",
			params: { file_path: join(workspaceDir, "file.txt") },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(readRes.decision).toBe("allow");

		// Edit in-scope should prompt interactively
		const editRes = pm.evaluate({
			tool: "Edit",
			params: { file_path: join(workspaceDir, "file.txt") },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(editRes.decision).toBe("prompt");

		// Edit in unattended (non-interactive) mode should deny
		const unattendedRes = pm.evaluate({
			tool: "Edit",
			params: { file_path: join(workspaceDir, "file.txt") },
			cwd: workspaceDir,
			interactive: false,
		});
		expect(unattendedRes.decision).toBe("deny");
	});

	it("PERM-003: acceptEdits mode auto-approves in-scope file edits", () => {
		const pm = new PermissionManager({ mode: "acceptEdits", cwd: workspaceDir });

		const editRes = pm.evaluate({
			tool: "Edit",
			params: { file_path: join(workspaceDir, "src/index.ts") },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(editRes.decision).toBe("allow");

		// Out-of-scope edit still requires prompt/denial
		const outRes = pm.evaluate({
			tool: "Edit",
			params: { file_path: "/etc/hosts" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(outRes.decision).toBe("prompt");
	});

	it("PERM-004: plan mode allows read-only exploration and denies all file mutations", () => {
		const pm = new PermissionManager({ mode: "plan", cwd: workspaceDir });

		const readRes = pm.evaluate({
			tool: "Read",
			params: { file_path: join(workspaceDir, "doc.md") },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(readRes.decision).toBe("allow");

		const globRes = pm.evaluate({
			tool: "Glob",
			params: { pattern: "*.ts" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(globRes.decision).toBe("allow");

		const editRes = pm.evaluate({
			tool: "Edit",
			params: { file_path: join(workspaceDir, "doc.md") },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(editRes.decision).toBe("deny");
		expect(editRes.reason).toContain("plan mode");
	});

	it("PERM-006: dontAsk mode denies calls that would require interactive prompt", () => {
		const pm = new PermissionManager({ mode: "dontAsk", cwd: workspaceDir });

		const readRes = pm.evaluate({
			tool: "Read",
			params: { file_path: join(workspaceDir, "file.txt") },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(readRes.decision).toBe("allow");

		const bashRes = pm.evaluate({
			tool: "Bash",
			params: { command: "npm test" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(bashRes.decision).toBe("deny");
	});

	it("PERM-007: bypassPermissions mode allows all tool executions", () => {
		const pm = new PermissionManager({ mode: "bypassPermissions", cwd: workspaceDir });

		const bashRes = pm.evaluate({
			tool: "Bash",
			params: { command: "rm -rf dist" },
			cwd: workspaceDir,
			interactive: false,
		});
		expect(bashRes.decision).toBe("allow");
	});

	it("PERM-008 & PERM-009: precedence strictly enforces deny > ask > allow", () => {
		const rules: PermissionRule[] = [
			{ action: "allow", tool: "Bash", pattern: "npm *" },
			{ action: "ask", tool: "Bash", pattern: "npm test" },
			{ action: "deny", tool: "Bash", pattern: "npm publish" },
		];

		const pm = new PermissionManager({ mode: "default", rules, cwd: workspaceDir });

		// npm test matches allow and ask -> ask wins
		const askRes = pm.evaluate({
			tool: "Bash",
			params: { command: "npm test" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(askRes.decision).toBe("prompt");

		// npm run build matches allow only -> allow wins
		const allowRes = pm.evaluate({
			tool: "Bash",
			params: { command: "npm run build" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(allowRes.decision).toBe("allow");

		// npm publish matches allow and deny -> deny wins
		const denyRes = pm.evaluate({
			tool: "Bash",
			params: { command: "npm publish" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(denyRes.decision).toBe("deny");
	});

	it("PERM-022 & PERM-023: matches command wildcards precisely", () => {
		// Bash(ls *) with space before wildcard matches "ls" and "ls -la" but not "lsof"
		const pm1 = new PermissionManager({
			mode: "default",
			rules: [{ action: "allow", tool: "Bash", pattern: "ls *" }],
			cwd: workspaceDir,
		});
		expect(pm1.evaluate({ tool: "Bash", params: { command: "ls" }, cwd: workspaceDir }).decision).toBe("allow");
		expect(pm1.evaluate({ tool: "Bash", params: { command: "ls -la" }, cwd: workspaceDir }).decision).toBe("allow");
		expect(pm1.evaluate({ tool: "Bash", params: { command: "lsof" }, cwd: workspaceDir }).decision).not.toBe("allow");

		// Bash(ls*) without space matches "lsof" as well
		const pm2 = new PermissionManager({
			mode: "default",
			rules: [{ action: "allow", tool: "Bash", pattern: "ls*" }],
			cwd: workspaceDir,
		});
		expect(pm2.evaluate({ tool: "Bash", params: { command: "lsof" }, cwd: workspaceDir }).decision).toBe("allow");
	});

	it("CFG-023: restricted mode disables shell execution and external path access", () => {
		const pm = new PermissionManager({ mode: "restricted", cwd: workspaceDir });

		const bashRes = pm.evaluate({
			tool: "Bash",
			params: { command: "echo hello" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(bashRes.decision).toBe("deny");
		expect(bashRes.reason).toContain("restricted mode");

		const outsideRes = pm.evaluate({
			tool: "Read",
			params: { file_path: "/etc/passwd" },
			cwd: workspaceDir,
			interactive: true,
		});
		expect(outsideRes.decision).toBe("deny");
		expect(outsideRes.reason).toContain("restricted mode");
	});

	it("SEC-SECRET-001: redacts credentials, api keys, and bearer tokens from failure logs", () => {
		const sensitiveOutput =
			"API Error: failed with sk-ant-api03-1234567890abcdef12345678 and Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.token";
		const redacted = redactSensitive(sensitiveOutput);

		expect(redacted).not.toContain("sk-ant-api03-1234567890abcdef12345678");
		expect(redacted).toContain("[REDACTED_API_KEY]");
		expect(redacted).toContain("[REDACTED_TOKEN]");
	});
});
