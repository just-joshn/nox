import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
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

	it("Glob returns two matching files in the observed order", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "*.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt\nsecond.txt" }]);
	});

	it("Glob recursive pattern includes root and nested paths", async () => {
		mkdirSync(join(cwd, "nested"));
		writeFileSync(join(cwd, "nested", "fixture.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "**/*.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt\nnested/fixture.txt" }]);
	});

	it.each([
		["visible file is older", 1_600_000_000, 1_700_000_000, "fixture.txt\n.hidden.txt"],
		["hidden file is older", 1_700_000_000, 1_600_000_000, ".hidden.txt\nfixture.txt"],
	])("Glob orders hidden and visible matches by mtime when %s", async (_case, visibleTime, hiddenTime, expected) => {
		writeFileSync(join(cwd, ".hidden.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), visibleTime, visibleTime);
		utimesSync(join(cwd, ".hidden.txt"), hiddenTime, hiddenTime);
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "*.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: expected }]);
	});

	it("Glob preserves find order when modification times tie", async () => {
		writeFileSync(join(cwd, ".hidden.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), 1_600_000_000, 1_600_000_000);
		utimesSync(join(cwd, ".hidden.txt"), 1_600_000_000, 1_600_000_000);
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "*.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: ".hidden.txt\nfixture.txt" }]);
	});

	it("Glob includes a file ignored by the repository", async () => {
		writeFileSync(join(cwd, ".gitignore"), "ignored.txt\n");
		writeFileSync(join(cwd, "ignored.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "*.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt\nignored.txt" }]);
	});

	it("Glob includes a file excluded by .ignore", async () => {
		writeFileSync(join(cwd, ".ignore"), "ignored.txt\n");
		writeFileSync(join(cwd, "ignored.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "*.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt\nignored.txt" }]);
	});

	it("Glob includes a matching file inside git metadata", async () => {
		mkdirSync(join(cwd, ".git"));
		writeFileSync(join(cwd, ".git", "inner.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "**/*.txt" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt\n.git/inner.txt" }]);
	});

	it("Glob keeps the result-limit notice after ordering matches", async () => {
		for (let index = 0; index < 1001; index++) writeFileSync(join(cwd, `extra-${index}.txt`), "alpha\n");
		const tool = createAllToolDefinitions(cwd).Glob;
		const result = await tool.execute("call-1", { pattern: "*.txt" }, undefined, undefined, {} as never);
		expect(result.content[0]).toMatchObject({
			type: "text",
			text: expect.stringContaining("1000 results limit reached"),
		});
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

	it("Grep excludes a matching file ignored by the repository", async () => {
		mkdirSync(join(cwd, ".git"));
		writeFileSync(join(cwd, ".gitignore"), "ignored.txt\n");
		writeFileSync(join(cwd, "ignored.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute("call-1", { pattern: "alpha" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("Grep excludes a matching file listed in .ignore", async () => {
		writeFileSync(join(cwd, ".ignore"), "ignored.txt\n");
		writeFileSync(join(cwd, "ignored.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute("call-1", { pattern: "alpha" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it.each([
		["hidden file is newer", 1_600_000_000, 1_700_000_000, "Found 2 files\n.hidden.txt\nfixture.txt"],
		["visible file is newer", 1_700_000_000, 1_600_000_000, "Found 2 files\nfixture.txt\n.hidden.txt"],
	])("Grep orders matching files by descending mtime when %s", async (_case, visibleTime, hiddenTime, expected) => {
		writeFileSync(join(cwd, ".hidden.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), visibleTime, visibleTime);
		utimesSync(join(cwd, ".hidden.txt"), hiddenTime, hiddenTime);
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute("call-1", { pattern: "alpha" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: expected }]);
	});

	it("Grep orders equal-mtime hidden and visible files as observed", async () => {
		writeFileSync(join(cwd, ".hidden.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), 1_600_000_000, 1_600_000_000);
		utimesSync(join(cwd, ".hidden.txt"), 1_600_000_000, 1_600_000_000);
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute("call-1", { pattern: "alpha" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "Found 2 files\n.hidden.txt\nfixture.txt" }]);
	});

	it("Grep excludes a matching file inside git metadata", async () => {
		execFileSync("git", ["init", "-q", cwd]);
		writeFileSync(join(cwd, ".git", "inner.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute("call-1", { pattern: "alpha" }, undefined, undefined, {} as never);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("Grep keeps the match-limit notice after ordering files", async () => {
		for (let index = 0; index < 101; index++) writeFileSync(join(cwd, `extra-${index}.txt`), "alpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute("call-1", { pattern: "alpha" }, undefined, undefined, {} as never);
		expect(result.content[0]).toMatchObject({
			type: "text",
			text: expect.stringContaining("100 matches limit reached"),
		});
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

	it.each([
		["second file is newer", 1_600_000_000, 1_700_000_000, "second.txt:1:alpha\nfixture.txt:1:alpha"],
		["fixture file is newer", 1_700_000_000, 1_600_000_000, "fixture.txt:1:alpha\nsecond.txt:1:alpha"],
	])(
		"Grep content mode orders files by descending mtime when %s",
		async (_case, fixtureTime, secondTime, expected) => {
			writeFileSync(join(cwd, "second.txt"), "alpha\nbeta\n");
			utimesSync(join(cwd, "fixture.txt"), fixtureTime, fixtureTime);
			utimesSync(join(cwd, "second.txt"), secondTime, secondTime);
			const tool = createAllToolDefinitions(cwd).Grep;
			const result = await tool.execute(
				"call-1",
				{ pattern: "alpha", output_mode: "content" },
				undefined,
				undefined,
				{} as never,
			);
			expect(result.content).toEqual([{ type: "text", text: expected }]);
		},
	);

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

	it("Grep content mode uses descending path order when file times tie", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), 1_600_000_000, 1_600_000_000);
		utimesSync(join(cwd, "second.txt"), 1_600_000_000, 1_600_000_000);
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "second.txt:1:alpha\nfixture.txt:1:alpha" }]);
	});

	it("Grep content head limit selects the newest file first", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), 1_600_000_000, 1_600_000_000);
		utimesSync(join(cwd, "second.txt"), 1_700_000_000, 1_700_000_000);
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", head_limit: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "second.txt:1:alpha\n\n[Showing results with pagination = limit: 1]" },
		]);
	});

	it("Grep files mode head limit selects the newest file and annotates the header", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), 1_600_000_000, 1_600_000_000);
		utimesSync(join(cwd, "second.txt"), 1_700_000_000, 1_700_000_000);
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "files_with_matches", head_limit: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file limit: 1\nsecond.txt" }]);
	});

	it("Grep files mode omits the limit header when all files fit", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "files_with_matches", head_limit: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("Grep files mode offset selects the second file and annotates the header", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\nbeta\n");
		utimesSync(join(cwd, "fixture.txt"), 1_600_000_000, 1_600_000_000);
		utimesSync(join(cwd, "second.txt"), 1_700_000_000, 1_700_000_000);
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "files_with_matches", head_limit: 1, offset: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "Found 1 file offset: 1\nfixture.txt" }]);
	});

	it("Grep files mode reports no entries when offset passes the last file", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\nbeta\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "files_with_matches", head_limit: 1, offset: 2 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "No entries at this offset. [Showing results with pagination = offset: 2]" },
		]);
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

	it("Grep multiline count counts a spanning match once", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha\nbeta", multiline: true, output_mode: "count" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "fixture.txt:1\n\nFound 1 total occurrence across 1 file." },
		]);
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

	it.each([
		[undefined, undefined],
		[1, undefined],
		[1, 0],
	])("Grep count mode reports one occurrence with head_limit %s and offset %s", async (head_limit, offset) => {
		const tool = createAllToolDefinitions(cwd).Grep;
		expect(JSON.stringify(tool.parameters.properties.output_mode)).toContain("count");
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "count", head_limit, offset },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "fixture.txt:1\n\nFound 1 total occurrence across 1 file." },
		]);
	});

	it("Grep count mode excludes git metadata like file-list mode", async () => {
		execFileSync("git", ["init", "-q", cwd]);
		writeFileSync(join(cwd, ".git", "inner.txt"), "alpha\n");
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

	it.each([undefined, 1])("Grep count mode reports zero occurrences with head_limit %s", async (head_limit) => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "absent-sentinel", output_mode: "count", head_limit },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "No matches found\n\nFound 0 total occurrences across 0 files." },
		]);
	});

	it("Grep zero-match count keeps the offset annotation", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "absent-sentinel", output_mode: "count", head_limit: 1, offset: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{
				type: "text",
				text: "No matches found\n\nFound 0 total occurrences across 0 files. with pagination = offset: 1",
			},
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

	it("Grep count mode pages file rows while keeping whole-result totals", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\n");
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "count", head_limit: 1, offset: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{
				type: "text",
				text: "fixture.txt:1\n\nFound 2 total occurrences across 2 files. with pagination = offset: 1",
			},
		]);
	});

	it("Grep count mode marks a limited file page while keeping whole-result totals", async () => {
		writeFileSync(join(cwd, "second.txt"), "alpha\n");
		utimesSync(join(cwd, "fixture.txt"), 1_700_000_000, 1_700_000_000);
		utimesSync(join(cwd, "second.txt"), 1_600_000_000, 1_600_000_000);
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "count", head_limit: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "second.txt:1\n\nFound 2 total occurrences across 2 files. with pagination = limit: 1" },
		]);
	});

	it("Grep count mode names an offset page past the last file", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "count", head_limit: 1, offset: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{
				type: "text",
				text: "No entries at this offset\n\nFound 1 total occurrence across 1 file. with pagination = offset: 1",
			},
		]);
	});

	it.each(["Glob", "Grep"])("%s rejects an invalid bracket pattern", async (name) => {
		const tool = createAllToolDefinitions(cwd)[name as ToolName];
		await expect(tool.execute("call-1", { pattern: "[" }, undefined, undefined, {} as never)).rejects.toThrow();
	});

	it("Grep rejects an unknown file type", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		await expect(
			tool.execute("call-1", { pattern: "alpha", type: "notatype" }, undefined, undefined, {} as never),
		).rejects.toThrow();
	});

	it("Grep rejects an unsupported output mode", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		await expect(
			tool.execute("call-1", { pattern: "alpha", output_mode: "bogus" } as never, undefined, undefined, {} as never),
		).rejects.toThrow();
	});

	it.each([-1, 1.5])("Grep rejects an invalid head limit %s", async (head_limit) => {
		const tool = createAllToolDefinitions(cwd).Grep;
		await expect(
			tool.execute(
				"call-1",
				{ pattern: "alpha", output_mode: "content", head_limit },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow();
	});

	it.each([-1, 1.5])("Grep rejects an invalid offset %s", async (offset) => {
		const tool = createAllToolDefinitions(cwd).Grep;
		await expect(
			tool.execute(
				"call-1",
				{ pattern: "alpha", output_mode: "content", offset },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow();
	});

	it("Grep rejects negative -C context", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		await expect(
			tool.execute(
				"call-1",
				{ pattern: "alpha", output_mode: "content", "-C": -1 },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow();
	});

	it("Grep rejects negative context alias", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		await expect(
			tool.execute(
				"call-1",
				{ pattern: "alpha", output_mode: "content", context: -1 },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow();
	});

	it("Grep rejects negative -A context", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		await expect(
			tool.execute(
				"call-1",
				{ pattern: "alpha", output_mode: "content", "-A": -1 },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow();
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

	it("Grep content mode treats a zero head limit as unbounded", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "alpha", output_mode: "content", head_limit: 0 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "fixture.txt:1:alpha" }]);
	});

	it.each([undefined, 1])(
		"Grep content mode keeps the observed no-match text with head_limit %s",
		async (head_limit) => {
			const tool = createAllToolDefinitions(cwd).Grep;
			const result = await tool.execute(
				"call-1",
				{ pattern: "absent-sentinel", output_mode: "content", head_limit },
				undefined,
				undefined,
				{} as never,
			);
			expect(result.content).toEqual([{ type: "text", text: "No matches found" }]);
		},
	);

	it("Grep content no-match offset retains the pagination notice", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "absent-sentinel", output_mode: "content", head_limit: 1, offset: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{ type: "text", text: "No matches found\n\n[Showing results with pagination = offset: 1]" },
		]);
	});

	it("Grep file-list no-match offset keeps the no-files text", async () => {
		const tool = createAllToolDefinitions(cwd).Grep;
		const result = await tool.execute(
			"call-1",
			{ pattern: "absent-sentinel", output_mode: "files_with_matches", head_limit: 1, offset: 1 },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([{ type: "text", text: "No files found" }]);
	});
});
