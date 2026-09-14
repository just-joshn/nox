import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fauxAssistantMessage, fauxToolCall, type ToolResultMessage } from "@earendil-works/pi-ai";
import { afterEach, describe, expect, it } from "vitest";
import { createHarness, getAssistantTexts, type Harness } from "./harness.ts";

describe("US1 parity core workflow suite", () => {
	const harnesses: Harness[] = [];

	afterEach(() => {
		while (harnesses.length > 0) {
			harnesses.pop()?.cleanup();
		}
	});

	async function createWorkflowHarness(extraOptions = {}) {
		const harness = await createHarness({
			initialActiveToolNames: ["Read", "Edit", "Bash", "Glob", "Grep"],
			allowedToolNames: ["Read", "Edit", "Bash", "Glob", "Grep"],
			...extraOptions,
		});
		harnesses.push(harness);
		return harness;
	}

	it("US1-READ-001 [US1-READ-NORMAL]: reads in-scope file with tabbed line numbers", async () => {
		const harness = await createWorkflowHarness();
		writeFileSync(join(harness.tempDir, "fixture.txt"), "alpha\nbeta\n");

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Read", { file_path: "fixture.txt" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("File read complete"),
		]);

		await harness.session.prompt("Read fixture.txt");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(false);
		expect(toolResults[0]!.content).toEqual([{ type: "text", text: "1\talpha\n2\tbeta\n3\t" }]);
		expect(getAssistantTexts(harness)).toContain("File read complete");
	});

	it("US1-READ-001 [US1-READ-MISSING]: reports tool error when reading nonexistent file", async () => {
		const harness = await createWorkflowHarness();

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Read", { file_path: "missing.txt" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("Handled missing file"),
		]);

		await harness.session.prompt("Read missing.txt");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(true);
		expect(getAssistantTexts(harness)).toContain("Handled missing file");
	});

	it("US1-SEARCH-PATH-001 [US1-SEARCH-PATH-NORMAL]: finds files matching glob pattern", async () => {
		const harness = await createWorkflowHarness();
		writeFileSync(join(harness.tempDir, "fixture.txt"), "alpha\nbeta\n");

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Glob", { pattern: "*.txt" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("Glob complete"),
		]);

		await harness.session.prompt("Find txt files");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(false);
		expect(toolResults[0]!.content).toEqual([{ type: "text", text: "fixture.txt" }]);
	});

	it("US1-SEARCH-PATH-001 [US1-SEARCH-PATH-NO-MATCH]: reports No files found when pattern has no matches", async () => {
		const harness = await createWorkflowHarness();

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Glob", { pattern: "absent-*.zzz" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("No files found"),
		]);

		await harness.session.prompt("Find zzz files");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(false);
		expect(toolResults[0]!.content).toEqual([{ type: "text", text: "No files found" }]);
	});

	it("US1-SEARCH-CONTENT-001 [US1-SEARCH-CONTENT-NORMAL]: finds text content in files", async () => {
		const harness = await createWorkflowHarness();
		writeFileSync(join(harness.tempDir, "fixture.txt"), "alpha\nbeta\n");

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Grep", { pattern: "alpha" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("Grep complete"),
		]);

		await harness.session.prompt("Search for alpha");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(false);
		expect(toolResults[0]!.content).toEqual([{ type: "text", text: "Found 1 file\nfixture.txt" }]);
	});

	it("US1-SEARCH-CONTENT-001 [US1-SEARCH-CONTENT-NO-MATCH]: reports No files found when query has no matches", async () => {
		const harness = await createWorkflowHarness();
		writeFileSync(join(harness.tempDir, "fixture.txt"), "alpha\nbeta\n");

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Grep", { pattern: "absent-sentinel" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("No matches"),
		]);

		await harness.session.prompt("Search for absent-sentinel");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(false);
		expect(toolResults[0]!.content).toEqual([{ type: "text", text: "No files found" }]);
	});

	it("US1-EDIT-001 [US1-EDIT-NORMAL]: edits file in place and updates content", async () => {
		const harness = await createWorkflowHarness();
		writeFileSync(join(harness.tempDir, "fixture.txt"), "alpha\nbeta\n");

		harness.setResponses([
			fauxAssistantMessage(
				fauxToolCall("Edit", { file_path: "fixture.txt", old_string: "alpha", new_string: "gamma" }),
				{ stopReason: "toolUse" },
			),
			fauxAssistantMessage("Edit complete"),
		]);

		await harness.session.prompt("Replace alpha with gamma");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(false);
		expect(readFileSync(join(harness.tempDir, "fixture.txt"), "utf-8")).toBe("gamma\nbeta\n");
	});

	it("US1-COMMAND-001 [US1-COMMAND-NORMAL]: executes shell command with stdout output", async () => {
		const harness = await createWorkflowHarness();

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Bash", { command: "echo hello" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("Command complete"),
		]);

		await harness.session.prompt("Echo hello");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(false);
		expect(toolResults[0]!.content).toEqual([{ type: "text", text: "hello" }]);
	});

	it("US1-FAIL-001 [US1-COMMAND-FAILURE]: executes nonzero command and records error result", async () => {
		const harness = await createWorkflowHarness();

		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Bash", { command: "echo out; echo err >&2; exit 42" }), {
				stopReason: "toolUse",
			}),
			fauxAssistantMessage("Command failed as expected"),
		]);

		await harness.session.prompt("Run failing command");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(true);
		const errorText = toolResults[0]!.content
			.filter(
				(c: unknown): c is { type: "text"; text: string } =>
					typeof c === "object" && c !== null && "type" in c && (c as { type: string }).type === "text",
			)
			.map((c) => c.text)
			.join("\n");
		expect(errorText).toContain("Exit code 42");
	});

	it("US1-DENY-001 [US1-EDIT-DENY]: denies proposed edit when intercepted by tool_call hook", async () => {
		const harness = await createWorkflowHarness({
			extensionFactories: [
				(pi: any) => {
					pi.on("tool_call", async (event: any) => {
						if (event.toolName === "Edit") {
							return { block: true, reason: "Edit denied by policy" };
						}
					});
				},
			],
		});
		writeFileSync(join(harness.tempDir, "fixture.txt"), "alpha\nbeta\n");

		harness.setResponses([
			fauxAssistantMessage(
				fauxToolCall("Edit", { file_path: "fixture.txt", old_string: "alpha", new_string: "gamma" }),
				{ stopReason: "toolUse" },
			),
			fauxAssistantMessage("Edit was denied"),
		]);

		await harness.session.prompt("Attempt edit");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(1);
		expect(toolResults[0]!.isError).toBe(true);
		expect(readFileSync(join(harness.tempDir, "fixture.txt"), "utf-8")).toBe("alpha\nbeta\n");
	});

	it("US1-RECOVER-001 [US1-COMMAND-RECOVER]: recovers from nonzero command in follow-up prompt", async () => {
		const harness = await createWorkflowHarness();

		// Turn 1: fails
		harness.setResponses([
			fauxAssistantMessage(fauxToolCall("Bash", { command: "exit 1" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("Turn 1 failed"),
		]);
		await harness.session.prompt("Fail first");

		// Turn 2: recovers with successful command
		harness.appendResponses([
			fauxAssistantMessage(fauxToolCall("Bash", { command: "echo recovered" }), { stopReason: "toolUse" }),
			fauxAssistantMessage("Turn 2 recovered"),
		]);
		await harness.session.prompt("Now recover");

		const toolResults = harness.session.messages.filter((m): m is ToolResultMessage => m.role === "toolResult");
		expect(toolResults).toHaveLength(2);
		expect(toolResults[0]!.isError).toBe(true);
		expect(toolResults[1]!.isError).toBe(false);
		expect(toolResults[1]!.content).toEqual([{ type: "text", text: "recovered" }]);
		expect(getAssistantTexts(harness)).toContain("Turn 2 recovered");
	});
});
