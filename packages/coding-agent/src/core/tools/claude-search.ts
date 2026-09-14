import path from "node:path";
import { Type } from "typebox";
import { createFindToolDefinition } from "./find.ts";
import { createGrepToolDefinition } from "./grep.ts";

const globSchema = Type.Object({
	pattern: Type.String(),
	path: Type.Optional(Type.String()),
});

const grepSchema = Type.Object({
	pattern: Type.String(),
	path: Type.Optional(Type.String()),
	glob: Type.Optional(Type.String()),
	output_mode: Type.Optional(
		Type.Union([Type.Literal("files_with_matches"), Type.Literal("content"), Type.Literal("count")]),
	),
	"-i": Type.Optional(Type.Boolean()),
});

function resultText(result: { content: Array<{ type: string; text?: string }> }): string {
	return result.content
		.filter((block) => block.type === "text")
		.map((block) => block.text ?? "")
		.join("\n");
}

export function createClaudeGlobToolDefinition(cwd: string) {
	const find = createFindToolDefinition(cwd);
	return {
		...find,
		name: "Glob",
		label: "Glob",
		parameters: globSchema,
		renderCall: undefined,
		renderResult: undefined,
		async execute(...args: Parameters<typeof find.execute>) {
			const [id, input, signal, onUpdate, ctx] = args;
			const result = await find.execute(id, input, signal, onUpdate, ctx);
			const text = resultText(result);
			const relativePath = input.path ? path.normalize(input.path).replaceAll("\\", "/") : "";
			const output =
				text === "No files found matching pattern"
					? "No files found"
					: relativePath
						? text
								.split("\n")
								.map((line) => path.posix.join(relativePath, line))
								.join("\n")
						: text;
			return {
				...result,
				content: [{ type: "text" as const, text: output }],
			};
		},
	};
}

export function createClaudeGrepToolDefinition(cwd: string) {
	const grep = createGrepToolDefinition(cwd);
	return {
		...grep,
		name: "Grep",
		label: "Grep",
		parameters: grepSchema,
		renderCall: undefined,
		renderResult: undefined,
		async execute(...args: Parameters<typeof grep.execute>) {
			const [id, input, signal, onUpdate, ctx] = args;
			const selected = input as typeof input & {
				output_mode?: "files_with_matches" | "content" | "count";
				"-i"?: boolean;
			};
			const outputMode = selected.output_mode;
			const result = await grep.execute(id, { ...input, ignoreCase: selected["-i"] }, signal, onUpdate, ctx);
			const text = resultText(result);
			if (text === "No matches found")
				return {
					...result,
					content: [
						{
							type: "text" as const,
							text:
								outputMode === "count"
									? "No matches found\n\nFound 0 total occurrences across 0 files."
									: "No files found",
						},
					],
				};
			if (outputMode === "content") {
				return { ...result, content: [{ type: "text" as const, text: text.replaceAll(/:(\d+): /g, ":$1:") }] };
			}
			if (outputMode === "count") {
				const files = text
					.split("\n")
					.map((line) => /^(.*):\d+: /.exec(line)?.[1])
					.filter((file): file is string => !!file);
				const counts = [...new Set(files)].map(
					(file) => [file, files.filter((candidate) => candidate === file).length] as const,
				);
				const fileCount = counts.length;
				const summary = `Found ${files.length} total occurrence${files.length === 1 ? "" : "s"} across ${fileCount} file${fileCount === 1 ? "" : "s"}.`;
				return {
					...result,
					content: [
						{
							type: "text" as const,
							text: `${counts.map(([file, count]) => `${file}:${count}`).join("\n")}\n\n${summary}`,
						},
					],
				};
			}
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
						type: "text" as const,
						text: `Found ${files.length} file${files.length === 1 ? "" : "s"}\n${files.join("\n")}`,
					},
				],
			};
		},
	};
}
