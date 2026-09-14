import path from "node:path";
import { Type } from "typebox";
import { executeClaudeGrepCount } from "./claude-grep-count.ts";
import { executeClaudeGrepOnly } from "./claude-grep-only.ts";
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
	"-n": Type.Optional(Type.Boolean()),
	"-o": Type.Optional(Type.Boolean()),
	"-C": Type.Optional(Type.Integer({ minimum: 0 })),
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
				"-n"?: boolean;
				"-o"?: boolean;
				"-C"?: number;
			};
			const outputMode = selected.output_mode;
			if (outputMode === "count") return executeClaudeGrepCount(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "content" && selected["-o"])
				return executeClaudeGrepOnly(ctx?.cwd || cwd, selected, signal);
			const result = await grep.execute(
				id,
				{ ...input, ignoreCase: selected["-i"], context: selected["-C"] },
				signal,
				onUpdate,
				ctx,
			);
			const text = resultText(result);
			if (text === "No matches found")
				return { ...result, content: [{ type: "text" as const, text: "No files found" }] };
			if (outputMode === "content") {
				return {
					...result,
					content: [
						{
							type: "text" as const,
							text:
								selected["-n"] === false
									? text.replaceAll(/:\d+: /g, ":")
									: text.replaceAll(/(:\d+:|-\d+-) /g, "$1"),
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
