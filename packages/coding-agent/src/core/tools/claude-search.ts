import { stat } from "node:fs/promises";
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
	const find = createFindToolDefinition(cwd, { includeIgnored: true });
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
			const noticeStart = result.details ? text.lastIndexOf("\n\n[") : -1;
			const matchText = noticeStart >= 0 ? text.slice(0, noticeStart) : text;
			const notice = noticeStart >= 0 ? text.slice(noticeStart) : "";
			const relativePath = input.path ? path.normalize(input.path).replaceAll("\\", "/") : "";
			const searchRoot = resolveToCwd(input.path || ".", ctx?.cwd || cwd);
			const matches =
				matchText === "No files found matching pattern"
					? []
					: await Promise.all(
							matchText.split("\n").map(async (file, index) => ({
								file,
								index,
								mtime: (await stat(path.join(searchRoot, file))).mtimeMs,
							})),
						);
			const ordered = [...matches].sort((left, right) => left.mtime - right.mtime || left.index - right.index);
			const output =
				matchText === "No files found matching pattern"
					? "No files found"
					: relativePath
						? ordered.map(({ file }) => path.posix.join(relativePath, file)).join("\n")
						: ordered.map(({ file }) => file).join("\n");
			return {
				...result,
				content: [{ type: "text" as const, text: output + notice }],
			};
		},
	};
}

export function createClaudeGrepToolDefinition(cwd: string) {
	const grep = createGrepToolDefinition(cwd, { excludeGitMetadata: true });
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
			if (selected.multiline && outputMode !== "count")
				return executeClaudeGrepMultiline(ctx?.cwd || cwd, selected, signal, outputMode !== "content");
			if (outputMode === "count") return executeClaudeGrepCount(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "content" && selected["-o"])
				return executeClaudeGrepOnly(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "content" && (selected["-A"] !== undefined || selected["-B"] !== undefined))
				return executeClaudeGrepSidedContext(ctx?.cwd || cwd, selected, signal);
			const typedGrep = selected.type
				? createGrepToolDefinition(cwd, { fileType: selected.type, excludeGitMetadata: true })
				: grep;
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
			const noticeStart = result.details ? text.lastIndexOf("\n\n[") : -1;
			const matchText = noticeStart >= 0 ? text.slice(0, noticeStart) : text;
			const notice = noticeStart >= 0 ? text.slice(noticeStart) : "";
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
					matchText
						.split("\n")
						.map((line) => prefixFile(line.split(":", 1)[0]))
						.filter(Boolean),
				),
			];
			const datedFiles = await Promise.all(
				files.map(async (file) => ({
					file,
					mtime: (await stat(path.join(ctx?.cwd || cwd, file))).mtimeMs,
				})),
			);
			const orderedFiles = [...datedFiles]
				.sort(
					(left, right) =>
						right.mtime - left.mtime || (left.file < right.file ? -1 : left.file > right.file ? 1 : 0),
				)
				.map(({ file }) => file);
			return {
				...result,
				content: [
					{
						type: "text" as const,
						text: `Found ${orderedFiles.length} file${orderedFiles.length === 1 ? "" : "s"}\n${orderedFiles.join("\n")}${notice}`,
					},
				],
			};
		},
	};
}
