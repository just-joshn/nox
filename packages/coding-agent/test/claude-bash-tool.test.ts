import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createAllToolDefinitions, createCodingToolDefinitions } from "../src/core/tools/index.ts";

describe("explicit Claude Bash tool", () => {
	let cwd: string;
	beforeEach(() => {
		cwd = mkdtempSync(join(tmpdir(), "nox-claude-bash-"));
	});
	afterEach(() => rmSync(cwd, { recursive: true, force: true }));

	it("keeps Bash out of the default coding tool catalog", () => {
		expect(createCodingToolDefinitions(cwd).map((tool) => tool.name)).not.toContain("Bash");
	});

	it("advertises the observed Bash schema properties", () => {
		const tool = createAllToolDefinitions(cwd).Bash;
		expect(tool).toBeDefined();
		expect(tool.name).toBe("Bash");
		expect(tool.parameters.properties).toHaveProperty("command");
		expect(tool.parameters.properties).toHaveProperty("timeout");
		expect(tool.parameters.properties).toHaveProperty("description");
		expect(tool.parameters.properties).toHaveProperty("run_in_background");
		expect(tool.parameters.properties).toHaveProperty("dangerouslyDisableSandbox");
		expect(tool.parameters.required).toEqual(["command"]);
	});

	it("Bash executes normal command and returns stdout", async () => {
		const tool = createAllToolDefinitions(cwd).Bash;
		const result = await tool.execute("call-1", { command: "echo hello" }, undefined, undefined, undefined as never);
		expect(result.content).toEqual([{ type: "text", text: "hello" }]);
	});

	it("Bash rejects nonzero exit with observed exit code format", async () => {
		const tool = createAllToolDefinitions(cwd).Bash;
		await expect(
			tool.execute(
				"call-1",
				{ command: "echo out; echo err >&2; exit 42" },
				undefined,
				undefined,
				undefined as never,
			),
		).rejects.toThrow(/Exit code 42/);
	});

	it("Bash handles timeout with observed exit code 143 format", async () => {
		const tool = createAllToolDefinitions(cwd).Bash;
		await expect(
			tool.execute("call-1", { command: "sleep 5", timeout: 500 }, undefined, undefined, undefined as never),
		).rejects.toThrow(/Exit code 143/);
	});
});
