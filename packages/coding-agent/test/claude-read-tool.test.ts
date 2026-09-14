import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createAllToolDefinitions, createCodingToolDefinitions } from "../src/core/tools/index.ts";

describe("explicit Claude Read tool", () => {
	let cwd: string;
	beforeEach(() => {
		cwd = mkdtempSync(join(tmpdir(), "nox-claude-read-"));
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nbeta\n");
	});
	afterEach(() => rmSync(cwd, { recursive: true, force: true }));

	it("keeps Read out of the default coding tool catalog", () => {
		expect(createCodingToolDefinitions(cwd).map((tool) => tool.name)).not.toContain("Read");
	});

	it("advertises the observed Read schema properties", () => {
		const tool = createAllToolDefinitions(cwd).Read;
		expect(tool).toBeDefined();
		expect(tool.name).toBe("Read");
		expect(tool.parameters.properties).toHaveProperty("file_path");
		expect(tool.parameters.properties).toHaveProperty("offset");
		expect(tool.parameters.properties).toHaveProperty("limit");
		expect(tool.parameters.properties).toHaveProperty("pages");
		expect(tool.parameters.required).toContain("file_path");
	});

	it("Read formats file contents with line numbers and tabs matching observed trace", async () => {
		const tool = createAllToolDefinitions(cwd).Read;
		const result = await tool.execute("call-1", { file_path: "fixture.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "1\talpha\n2\tbeta\n3\t" }]);
	});

	it("Read rejects a missing file path", async () => {
		const tool = createAllToolDefinitions(cwd).Read;
		await expect(
			tool.execute("call-1", { file_path: "absent-file.txt" }, undefined, undefined, {} as never),
		).rejects.toThrow();
	});

	it("Read respects offset and limit with correct line numbers", async () => {
		writeFileSync(join(cwd, "lines.txt"), "line1\nline2\nline3\nline4\nline5\n");
		const tool = createAllToolDefinitions(cwd).Read;
		const result = await tool.execute(
			"call-1",
			{ file_path: "lines.txt", offset: 2, limit: 2 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "2\tline2\n3\tline3" }]);
	});
});
