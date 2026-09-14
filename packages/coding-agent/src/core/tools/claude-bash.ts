import { type Static, Type } from "typebox";
import type { ExtensionContext, ToolDefinition } from "../extensions/types.ts";
import { type BashRenderState, type BashToolDetails, type BashToolOptions, createBashToolDefinition } from "./bash.ts";

export const claudeBashSchema = Type.Object({
	command: Type.String({ description: "The command to execute" }),
	timeout: Type.Optional(Type.Number({ description: "Optional timeout in milliseconds (max 600000)" })),
	description: Type.Optional(
		Type.String({
			description: "Clear, concise description of what this command does in active voice.",
		}),
	),
	run_in_background: Type.Optional(
		Type.Boolean({ description: "Set to true to run this command in the background." }),
	),
	dangerouslyDisableSandbox: Type.Optional(
		Type.Boolean({
			description: "Set this to true to dangerously override sandbox mode and run commands without sandboxing.",
		}),
	),
});

export function createClaudeBashToolDefinition(
	cwd: string,
	options?: BashToolOptions,
): ToolDefinition<typeof claudeBashSchema, BashToolDetails | undefined, BashRenderState> {
	const bash = createBashToolDefinition(cwd, options);
	return {
		...bash,
		name: "Bash",
		label: "Bash",
		description: "execute shell commands",
		parameters: claudeBashSchema,
		promptSnippet: undefined,
		promptGuidelines: undefined,
		renderCall: undefined,
		renderResult: undefined,
		prepareArguments: undefined,
		async execute(
			id: string,
			input: Static<typeof claudeBashSchema>,
			signal?: AbortSignal,
			onUpdate?: (result: any) => void,
			ctx?: ExtensionContext,
		) {
			const timeoutSeconds = input.timeout !== undefined ? Math.ceil(input.timeout / 1000) : undefined;
			try {
				const result = await bash.execute(
					id,
					{ command: input.command, timeout: timeoutSeconds },
					signal,
					onUpdate,
					(ctx?.sessionManager ? ctx : undefined) as ExtensionContext,
				);
				const content = result.content.map((block) => {
					if (block.type !== "text" || !block.text) return block;
					return { ...block, text: block.text.replace(/\r?\n$/, "") };
				});
				return {
					...result,
					content,
				};
			} catch (err) {
				if (err instanceof Error) {
					const match = err.message.match(/Command exited with code (\d+)/);
					if (match) {
						const code = match[1];
						const output = err.message.replace(/\n\n\[Command exited with code \d+\]/, "").trim();
						throw new Error(`Exit code ${code}\n${output}`.trim());
					}
					const timeoutMatch = err.message.match(/Command timed out after (\d+) seconds/);
					if (timeoutMatch) {
						const secs = timeoutMatch[1];
						throw new Error(`Exit code 143\nCommand timed out after ${secs}s`);
					}
				}
				throw err;
			}
		},
	};
}
