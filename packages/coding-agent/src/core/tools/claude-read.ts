import { type Static, Type } from "typebox";
import type { ExtensionContext } from "../extensions/types.ts";
import { createReadToolDefinition, type ReadToolOptions } from "./read.ts";

export const claudeReadSchema = Type.Object({
	file_path: Type.String({ description: "The absolute path to the file to read" }),
	offset: Type.Optional(
		Type.Integer({
			description: "The line number to start reading from. Only provide if the file is too large to read at once",
			minimum: 0,
		}),
	),
	limit: Type.Optional(
		Type.Integer({
			description: "The number of lines to read. Only provide if the file is too large to read at once.",
			exclusiveMinimum: 0,
		}),
	),
	pages: Type.Optional(
		Type.String({
			description:
				'Page range for PDF files (e.g., "1-5", "3", "10-20"). Only applicable to PDF files. Maximum 20 pages per request.',
		}),
	),
});

export function createClaudeReadToolDefinition(cwd: string, options?: ReadToolOptions) {
	const read = createReadToolDefinition(cwd, options);
	return {
		...read,
		name: "Read",
		label: "Read",
		description: "read files, images, PDFs, notebooks",
		parameters: claudeReadSchema,
		promptSnippet: undefined,
		promptGuidelines: undefined,
		renderCall: undefined,
		renderResult: undefined,
		prepareArguments: undefined,
		async execute(
			id: string,
			input: Static<typeof claudeReadSchema>,
			signal?: AbortSignal,
			onUpdate?: (result: any) => void,
			ctx?: ExtensionContext,
		) {
			const result = await read.execute(
				id,
				{ path: input.file_path, offset: input.offset, limit: input.limit },
				signal,
				onUpdate,
				ctx as ExtensionContext,
			);
			const startLine = input.offset ? Math.max(1, input.offset) : 1;
			const content = result.content.map((block) => {
				if (block.type !== "text" || !block.text) return block;
				const text = block.text;
				const noticeStart = text.lastIndexOf("\n\n[");
				const body = noticeStart >= 0 && text.endsWith("]") ? text.slice(0, noticeStart) : text;
				const lines = body.split("\n");
				const formatted = lines.map((line, idx) => `${startLine + idx}\t${line}`).join("\n");
				return { ...block, text: formatted };
			});
			return {
				...result,
				content,
			};
		},
	};
}
