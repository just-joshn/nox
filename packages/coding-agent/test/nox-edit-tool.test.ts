import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createAllToolDefinitions, createCodingToolDefinitions } from "../src/core/tools/index.ts";

describe("explicit nox Edit parity tool", () => {
	let cwd: string;
	beforeEach(() => {
		cwd = mkdtempSync(join(tmpdir(), "nox-nox-edit-"));
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nbeta\n");
	});
	afterEach(() => rmSync(cwd, { recursive: true, force: true }));

	it("keeps Edit out of the default coding tool catalog", () => {
		expect(createCodingToolDefinitions(cwd).map((tool) => tool.name)).not.toContain("Edit");
	});

	it("advertises the observed Edit schema properties", () => {
		const tool = createAllToolDefinitions(cwd).Edit;
		expect(tool).toBeDefined();
		expect(tool.name).toBe("Edit");
		expect(tool.parameters.properties).toHaveProperty("file_path");
		expect(tool.parameters.properties).toHaveProperty("old_string");
		expect(tool.parameters.properties).toHaveProperty("new_string");
		expect(tool.parameters.properties).toHaveProperty("replace_all");
		expect(tool.parameters.required).toEqual(["file_path", "old_string", "new_string"]);
	});

	it("Edit replaces string and returns observed success message", async () => {
		const tool = createAllToolDefinitions(cwd).Edit;
		const result = await tool.execute(
			"call-1",
			{ file_path: "fixture.txt", old_string: "alpha", new_string: "gamma" },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{
				type: "text",
				text: "The file fixture.txt has been updated successfully. (file state is current in your context — no need to Read it back)",
			},
		]);
		expect(readFileSync(join(cwd, "fixture.txt"), "utf-8")).toBe("gamma\nbeta\n");
	});

	it("Edit with replace_all replaces multiple occurrences", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nalpha\n");
		const tool = createAllToolDefinitions(cwd).Edit;
		const result = await tool.execute(
			"call-1",
			{ file_path: "fixture.txt", old_string: "alpha", new_string: "gamma", replace_all: true },
			undefined,
			undefined,
			{} as never,
		);
		expect(result.content).toEqual([
			{
				type: "text",
				text: "The file fixture.txt has been updated. All occurrences were successfully replaced. (file state is current in your context — no need to Read it back)",
			},
		]);
		expect(readFileSync(join(cwd, "fixture.txt"), "utf-8")).toBe("gamma\ngamma\n");
	});

	it("Edit rejects identical old_string and new_string", async () => {
		const tool = createAllToolDefinitions(cwd).Edit;
		await expect(
			tool.execute(
				"call-1",
				{ file_path: "fixture.txt", old_string: "alpha", new_string: "alpha" },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow("No changes to make: old_string and new_string are exactly the same.");
	});

	it("Edit rejects string not found", async () => {
		const tool = createAllToolDefinitions(cwd).Edit;
		await expect(
			tool.execute(
				"call-1",
				{ file_path: "fixture.txt", old_string: "missing", new_string: "gamma" },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow("String to replace not found in file.\nString: missing");
	});

	it("Edit rejects multiple matches when replace_all is false", async () => {
		writeFileSync(join(cwd, "fixture.txt"), "alpha\nalpha\n");
		const tool = createAllToolDefinitions(cwd).Edit;
		await expect(
			tool.execute(
				"call-1",
				{ file_path: "fixture.txt", old_string: "alpha", new_string: "gamma" },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow(
			"Found 2 matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.\nString: alpha",
		);
	});

	it("Edit rejects missing file path", async () => {
		const tool = createAllToolDefinitions(cwd).Edit;
		await expect(
			tool.execute(
				"call-1",
				{ file_path: "absent.txt", old_string: "alpha", new_string: "gamma" },
				undefined,
				undefined,
				{} as never,
			),
		).rejects.toThrow();
	});
});
