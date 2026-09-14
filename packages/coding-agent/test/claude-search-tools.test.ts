import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { ToolName } from "../src/core/tools/index.ts";
import { createAllToolDefinitions, createCodingToolDefinitions } from "../src/core/tools/index.ts";

describe("explicit Claude search tools", () => {
	let cwd: string;
	beforeEach(() => {
		cwd = mkdtempSync(join(tmpdir(), "nox-claude-search-"));
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nbeta\n");
	});
	afterEach(() => rmSync(cwd, { recursive: true, force: true }));

	it("keeps Glob and Grep out of the default catalog", () => {
		expect(createCodingToolDefinitions(cwd).map((tool) => tool.name)).not.toContain("Glob");
		expect(createCodingToolDefinitions(cwd).map((tool) => tool.name)).not.toContain("Grep");
	});

	it.each([
		["Glob", "*.txt", "fixture.txt"],
		["Grep", "alpha", "Found 1 file\nfixture.txt"],
		["Glob", "absent-*.zzz", "No files found"],
		["Grep", "absent-sentinel", "No files found"],
	])("%s returns the observed result for %s", async (name, pattern, expected) => {
		const tool = createAllToolDefinitions(cwd)[name as ToolName];
		expect(tool?.name).toBe(name);
		const result = await tool.execute("call-1", { pattern }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: expected }]);
	});

	it("Grep -i matches an uppercase query against lowercase content", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("-i");
		const result = await tool.execute("call-1", { pattern: "ALPHA", "-i": true }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("Grep count mode reports one occurrence", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(JSON.stringify(tool.parameters.properties.output_mode)).toContain("count");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "count" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "fixture.txt:1\n\nFound 1 total occurrence across 1 file." },
		]);
	});

	it("Grep count mode reports per-file and total occurrences", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nalpha\n");
		writeFileSync(join(cwd, "second.txt"), "alpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "count" },
			undefined,
			undefined,
			{} as never,
		);
		const text = result.content[0]?.type === "text" ? result.content[0].text : "";
		const [files, summary] = text.split("\n\n");
		expect(files.split("\n").sort()).toEqual(["fixture.txt:2", "second.txt:1"]);
		expect(summary).toBe("Found 3 total occurrences across 2 files.");
	});

	it.each(["Glob", "Grep"])("%s rejects an invalid bracket pattern", async (name) => {
		const tool = createAllToolDefinitions(cwd)[name as ToolName];
		await expect(tool.execute("call-1", { pattern: "[" }, undefined, undefined, {} as never)).rejects.toThrow();
	});

	it("Glob preserves the search path in its result", async () => {
		mkdirSync(join(cwd, "nested"));
		writeFileSync(join(cwd, "nested", "fixture.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Glob;
		expect(Object.keys(tool.parameters.properties).sort()).toEqual(["path", "pattern"]);
		const result = await tool.execute(
			"call-1",
			{ pattern: "*.txt", path: "nested" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "nested/fixture.txt" }]);
	});

	it.each([
		["files_with_matches", "Found 1 file\nfixture.txt"],
		["content", "fixture.txt:1:alpha"],
	])("Grep output_mode %s returns the observed format", async (output_mode, expected) => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("output_mode");
		const result = await tool.execute("call-1", { pattern: "alpha", output_mode }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: expected }]);
	});
});
