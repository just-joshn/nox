import { readFile, writeFile } from "node:fs/promises";
import { type Static, Type } from "typebox";
import type { ExtensionContext, ToolDefinition } from "../extensions/types.ts";
import { resolveToCwd } from "./path-utils.ts";

export const claudeEditSchema = Type.Object({
	file_path: Type.String({ description: "The absolute path to the file to modify" }),
	old_string: Type.String({ description: "The text to replace" }),
	new_string: Type.String({ description: "The text to replace it with (must be different from old_string)" }),
	replace_all: Type.Optional(
		Type.Boolean({
			description: "Replace all occurrences of old_string (default false)",
			default: false,
		}),
	),
});

export function createClaudeEditToolDefinition(cwd: string): ToolDefinition<typeof claudeEditSchema, undefined> {
	return {
		name: "Edit",
		label: "Edit",
		description: "modify file contents in place",
		parameters: claudeEditSchema,
		promptSnippet: undefined,
		promptGuidelines: undefined,
		renderCall: undefined,
		renderResult: undefined,
		prepareArguments: undefined,
		async execute(
			_id: string,
			input: Static<typeof claudeEditSchema>,
			signal?: AbortSignal,
			_onUpdate?: (result: any) => void,
			ctx?: ExtensionContext,
		) {
			if (signal?.aborted) {
				throw new Error("Operation aborted");
			}
			if (input.old_string === input.new_string) {
				throw new Error("No changes to make: old_string and new_string are exactly the same.");
			}
			const targetCwd = ctx?.cwd || cwd;
			const targetPath = resolveToCwd(input.file_path, targetCwd);
			const content = await readFile(targetPath, "utf-8");
			if (signal?.aborted) {
				throw new Error("Operation aborted");
			}

			let count = 0;
			let idx = 0;
			while (idx <= content.length - input.old_string.length) {
				const found = content.indexOf(input.old_string, idx);
				if (found === -1) break;
				count++;
				idx = found + input.old_string.length;
			}

			if (count === 0) {
				throw new Error(`String to replace not found in file.\nString: ${input.old_string}`);
			}
			if (count > 1 && !input.replace_all) {
				throw new Error(
					`Found ${count} matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.\nString: ${input.old_string}`,
				);
			}

			const updated = input.replace_all
				? content.replaceAll(input.old_string, input.new_string)
				: content.replace(input.old_string, input.new_string);

			await writeFile(targetPath, updated, "utf-8");

			const message = input.replace_all
				? `The file ${input.file_path} has been updated. All occurrences were successfully replaced. (file state is current in your context — no need to Read it back)`
				: `The file ${input.file_path} has been updated successfully. (file state is current in your context — no need to Read it back)`;

			return {
				content: [{ type: "text" as const, text: message }],
				details: undefined,
			};
		},
	};
}
