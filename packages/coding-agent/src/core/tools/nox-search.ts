import { stat } from "node:fs/promises";
import path from "node:path";
import { Type } from "typebox";
import { createFindToolDefinition } from "./find.ts";
import { createGrepToolDefinition } from "./grep.ts";
import { executeNoxGrepCount } from "./nox-grep-count.ts";
import { executeNoxGrepMultiline } from "./nox-grep-multiline.ts";
import { executeNoxGrepOnly } from "./nox-grep-only.ts";
import { executeNoxGrepSidedContext } from "./nox-grep-sided-context.ts";
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
	head_limit: Type.Optional(Type.Integer({ minimum: 0 })),
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

export function createNoxGlobToolDefinition(cwd: string) {
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

export function createNoxGrepToolDefinition(cwd: string) {
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
			if (outputMode !== undefined && !["files_with_matches", "content", "count"].includes(outputMode))
				throw new Error("Invalid Grep output_mode");
			if (selected.head_limit !== undefined && (!Number.isInteger(selected.head_limit) || selected.head_limit < 0))
				throw new Error("Invalid Grep head_limit");
			if (selected.offset !== undefined && (!Number.isInteger(selected.offset) || selected.offset < 0))
				throw new Error("Invalid Grep offset");
			if (selected["-C"] !== undefined && (!Number.isInteger(selected["-C"]) || selected["-C"] < 0))
				throw new Error("Invalid Grep -C context");
			if (selected.context !== undefined && (!Number.isInteger(selected.context) || selected.context < 0))
				throw new Error("Invalid Grep context");
			if (selected.multiline && outputMode !== "count")
				return executeNoxGrepMultiline(ctx?.cwd || cwd, selected, signal, outputMode !== "content");
			if (outputMode === "count") return executeNoxGrepCount(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "content" && selected["-o"]) return executeNoxGrepOnly(ctx?.cwd || cwd, selected, signal);
			if (outputMode === "content" && (selected["-A"] !== undefined || selected["-B"] !== undefined))
				return executeNoxGrepSidedContext(ctx?.cwd || cwd, selected, signal);
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
			if (text === "No matches found") {
				const emptyText =
					outputMode === "content"
						? selected.offset && selected.offset > 0
							? `No matches found\n\n[Showing results with pagination = offset: ${selected.offset}]`
							: text
						: "No files found";
				return { ...result, content: [{ type: "text" as const, text: emptyText }] };
			}
			const noticeStart = result.details ? text.lastIndexOf("\n\n[") : -1;
			const matchText = noticeStart >= 0 ? text.slice(0, noticeStart) : text;
			const notice = noticeStart >= 0 ? text.slice(noticeStart) : "";
			const targetPath = selected.path ? resolveToCwd(selected.path, ctx?.cwd || cwd) : undefined;
			const directFile = targetPath ? (await stat(targetPath)).isFile() : false;
			const searchPrefix =
				targetPath && !directFile ? path.relative(ctx?.cwd || cwd, targetPath).replaceAll("\\", "/") : "";
			const prefixFile = (file: string) => (searchPrefix ? path.posix.join(searchPrefix, file) : file);
			if (outputMode === "content" || (outputMode === undefined && selected.path && !directFile)) {
				const entries = await Promise.all(
					matchText.split("\n").map(async (line, index) => {
						const match = /^(.*?)(:\d+: |-\d+- )/.exec(line);
						if (!match) return { line, file: "", mtime: -Infinity, index };
						const file = prefixFile(match[1]);
						return {
							line: `${directFile ? "" : file}${directFile ? match[2].slice(1, -1) : match[2]}${line.slice(match[0].length)}`,
							file,
							mtime: (await stat(path.join(ctx?.cwd || cwd, file))).mtimeMs,
							index,
						};
					}),
				);
				const prefixed =
					[...entries]
						.sort(
							(left, right) =>
								right.mtime - left.mtime ||
								(left.file > right.file ? -1 : left.file < right.file ? 1 : left.index - right.index),
						)
						.map(({ line }) => line)
						.join("\n") + notice;
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
			const offset = selected.offset ?? 0;
			const page = orderedFiles.slice(offset, selected.head_limit ? offset + selected.head_limit : undefined);
			const pagination =
				offset > 0
					? ` offset: ${offset}`
					: selected.head_limit !== undefined && orderedFiles.length > selected.head_limit
						? ` limit: ${selected.head_limit}`
						: "";
			return {
				...result,
				content: [
					{
						type: "text" as const,
						text:
							page.length === 0 && offset > 0
								? `No entries at this offset. [Showing results with pagination = offset: ${offset}]`
								: `Found ${page.length} file${page.length === 1 ? "" : "s"}${pagination}\n${page.join("\n")}${notice}`,
					},
				],
			};
		},
	};
}
