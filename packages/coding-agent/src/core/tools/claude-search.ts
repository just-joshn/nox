import path from "node:path";
import { Type } from "typebox";
import { executeClaudeGrepCount } from "./claude-grep-count.ts";
import { executeClaudeGrepMultiline } from "./claude-grep-multiline.ts";
import { executeClaudeGrepOnly } from "./claude-grep-only.ts";
import { executeClaudeGrepSidedContext } from "./claude-grep-sided-context.ts";
import { createFindToolDefinition } from "./find.ts";
import { createGrepToolDefinition } from "./grep.ts";
import { resolveToCwd } from "./path-utils.ts";

const globSchema = Type.Object({
	pattern: Type.String(),
	path: Type.Optional(Type.String()),
});

const grepSchema = Type.Object({
	pattern: Type.String(),
	path: Type.Optional(Type.String()),
	glob: Type.Optional(Type.String()),
	type: Type.Optional(Type.String({ minLength: 1 })),
	head_limit: Type.Optional(Type.Integer({ minimum: 1 })),
	offset: Type.Optional(Type.Integer({ minimum: 0 })),
	output_mode: Type.Optional(
		Type.Union([Type.Literal("files_with_matches"), Type.Literal("content"), Type.Literal("count")]),
	),
	"-i": Type.Optional(Type.Boolean()),
	"-n": Type.Optional(Type.Boolean()),
	"-o": Type.Optional(Type.Boolean()),
	"-C": Type.Optional(Type.Integer({ minimum: 0 })),
	context: Type.Optional(Type.Integer({ minimum: 0 })),
	multiline: Type.Optional(Type.Boolean()),
	"-A": Type.Optional(Type.Integer({ minimum: 0 })),
	"-B": Type.Optional(Type.Integer({ minimum: 0 })),
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
				head_limit?: number;
				offset?: number;
				type?: string;
				"-i"?: boolean;
				"-n"?: boolean;
				"-o"?: boolean;
				"-C"?: number;
				context?: number;
				multiline?: boolean;
				"-A"?: number;
				"-B"?: number;
			};
			const outputMode = selected.output_mode;
			if (outputMode === "content" && selected.multiline)
				return executeClaudeGrepMultiline(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "count") return executeClaudeGrepCount(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "content" && selected["-o"])
				return executeClaudeGrepOnly(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "content" && (selected["-A"] !== undefined || selected["-B"] !== undefined))
				return executeClaudeGrepSidedContext(ctx?.cwd || cwd, selected, signal);
			const typedGrep = selected.type ? createGrepToolDefinition(cwd, { fileType: selected.type }) : grep;
			const result = await typedGrep.execute(
				id,
				{
					...input,
					ignoreCase: selected["-i"],
					context: selected["-C"] ?? selected.context,
				},
				signal,
				onUpdate,
				ctx,
			);
			const text = resultText(result);
			if (text === "No matches found")
				return { ...result, content: [{ type: "text" as const, text: "No files found" }] };
			const searchPrefix = selected.path
				? path.relative(ctx?.cwd || cwd, resolveToCwd(selected.path, ctx?.cwd || cwd)).replaceAll("\\", "/")
				: "";
			const prefixFile = (file: string) => (searchPrefix ? path.posix.join(searchPrefix, file) : file);
			if (outputMode === "content" || (outputMode === undefined && selected.path)) {
				const prefixed = text
					.split("\n")
					.map((line) =>
						line.replace(
							/^(.*?)(:\d+: |-\d+- )/,
							(_match, file: string, separator: string) => `${prefixFile(file)}${separator}`,
						),
					)
					.join("\n");
				const formatted =
					selected["-n"] === false
						? prefixed.replaceAll(/:\d+: /g, ":")
						: prefixed.replaceAll(/(:\d+:|-\d+-) /g, "$1");
				const lines = formatted.split("\n");
				const offset = selected.offset ?? 0;
				const limited = lines
					.slice(offset, selected.head_limit ? offset + selected.head_limit : undefined)
					.join("\n");
				const pagination =
					offset > 0
						? `offset: ${offset}`
						: selected.head_limit && lines.length > selected.head_limit
							? `limit: ${selected.head_limit}`
							: undefined;
				return {
					...result,
					content: [
						{
							type: "text" as const,
							text: pagination
								? `${limited || "No entries at this offset"}\n\n[Showing results with pagination = ${pagination}]`
								: limited,
						},
					],
				};
			}
			const files = [
				...new Set(
					text
						.split("\n")
						.map((line) => prefixFile(line.split(":", 1)[0]))
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
