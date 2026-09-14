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

	it("Grep glob filters matching files by extension", async () => {
		writeFileSync(join(cwd, "fixture.md"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", glob: "*.txt" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("Grep type py filters matching Python files", async () => {
		writeFileSync(join(cwd, "fixture.py"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("type");
		const result = await tool.execute("call-1", { pattern: "alpha", type: "py" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.py" }]);
	});

	it("Grep head_limit paginates content matches", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nalpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("head_limit");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", head_limit: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "fixture.txt:1:alpha\n\n[Showing results with pagination = limit: 1]" },
		]);
	});

	it("Grep head_limit omits pagination when all matches fit", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", head_limit: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt:1:alpha" }]);
	});

	it("Grep offset paginates content matches", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nalpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("offset");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", head_limit: 1, offset: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "fixture.txt:2:alpha\n\n[Showing results with pagination = offset: 1]" },
		]);
	});

	it("Grep zero offset keeps the limit pagination marker", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nalpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", head_limit: 1, offset: 0 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "fixture.txt:1:alpha\n\n[Showing results with pagination = limit: 1]" },
		]);
	});

	it("Grep offset past all matches reports no entries", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nalpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", head_limit: 1, offset: 2 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "No entries at this offset\n\n[Showing results with pagination = offset: 2]" },
		]);
	});

	it.each([
		[undefined, "nested/fixture.txt:1:alpha"],
		["files_with_matches", "Found 1 file\nnested/fixture.txt"],
	])("Grep nested path with output mode %s preserves repository-relative paths", async (output_mode, expected) => {
		mkdirSync(join(cwd, "nested"));
		writeFileSync(join(cwd, "nested", "fixture.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", path: "nested", output_mode },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: expected }]);
	});

	it("Grep content mode omits line numbers when -n is false", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("-n");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", "-n": false },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt:alpha" }]);
	});

	it("Grep -o returns only the matching text", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha beta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("-o");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", "-o": true },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt:1:alpha" }]);
	});

	it("Grep -C includes the observed context line format", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("-C");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", "-C": 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt:1:alpha\nfixture.txt-2-beta" }]);
	});

	it("Grep context includes the observed symmetric context", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("context");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", context: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt:1:alpha\nfixture.txt-2-beta" }]);
	});

	it("Grep multiline matches a pattern spanning two lines", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty("multiline");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha\nbeta", output_mode: "content", multiline: true },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt:1:alpha\nfixture.txt:2:beta" }]);
	});

	it("Grep multiline defaults to a matching-file list", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha\nbeta", multiline: true },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("Grep multiline explicit files mode returns a matching-file list", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha\nbeta", multiline: true, output_mode: "files_with_matches" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("Grep multiline content reports no matches", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "absent-sentinel", output_mode: "content", multiline: true },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "No matches found" }]);
	});

	it.each([
		["-A", "fixture.txt:2:alpha\nfixture.txt-3-after"],
		["-B", "fixture.txt-1-before\nfixture.txt:2:alpha"],
	])("Grep %s includes only the observed side of context", async (flag, expected) => {
		writeFileSync(join(cwd, "fixture.txt"), "before\nalpha\nafter\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(tool.parameters.properties).toHaveProperty(flag);
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", [flag]: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: expected }]);
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

	it("Grep count mode reports zero occurrences without an error", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "absent-sentinel", output_mode: "count" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "No matches found\n\nFound 0 total occurrences across 0 files." },
		]);
	});

	it("Grep count mode includes matches beyond the default grep result cap", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\n".repeat(101));
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "count" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "fixture.txt:101\n\nFound 101 total occurrences across 1 file." },
		]);
	});

	it("Grep count mode counts matching lines when a line has two occurrences", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha alpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
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
