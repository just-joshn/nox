import { createFindToolDefinition } from "./find.ts";
import { createGrepToolDefinition } from "./grep.ts";

function resultText(result: { content: Array<{ type: string; text?: string }> }): string {
	return result.content
		.filter((block) => block.type === "text")
		.map((block) => block.text ?? "")
		.join("\n");
}

export function createClaudeGlobToolDefinition(cwd: string): ReturnType<typeof createFindToolDefinition> {
	const find = createFindToolDefinition(cwd);
	return {
		...find,
		name: "Glob",
		label: "Glob",
		async execute(id, input, signal, onUpdate, ctx) {
			const result = await find.execute(id, input, signal, onUpdate, ctx);
			const text = resultText(result);
			return {
				...result,
				content: [{ type: "text", text: text === "No files found matching pattern" ? "No files found" : text }],
			};
		},
	};
}

export function createClaudeGrepToolDefinition(cwd: string): ReturnType<typeof createGrepToolDefinition> {
	const grep = createGrepToolDefinition(cwd);
	return {
		...grep,
		name: "Grep",
		label: "Grep",
		async execute(id, input, signal, onUpdate, ctx) {
			const result = await grep.execute(id, input, signal, onUpdate, ctx);
			const text = resultText(result);
			if (text === "No matches found") return { ...result, content: [{ type: "text", text: "No files found" }] };
			const files = [
				...new Set(
					text
						.split("\n")
						.map((line) => line.split(":", 1)[0])
						.filter(Boolean),
				),
			];
			return {
				...result,
				content: [
					{
						type: "text",
						text: `Found ${files.length} file${files.length === 1 ? "" : "s"}\n${files.join("\n")}`,
					},
				],
			};
		},
	};
}
