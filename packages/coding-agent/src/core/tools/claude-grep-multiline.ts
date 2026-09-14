import { execFile } from "node:child_process";
import path from "node:path";
import { ensureTool } from "../../utils/tools-manager.ts";
import { resolveToCwd } from "./path-utils.ts";

interface MultilineInput {
	pattern: string;
	path?: string;
	glob?: string;
	type?: string;
	"-i"?: boolean;
}

const MAX_OUTPUT_BYTES = 8 * 1024 * 1024;

export async function executeClaudeGrepMultiline(cwd: string, input: MultilineInput, signal?: AbortSignal) {
	const rgPath = await ensureTool("rg");
	if (!rgPath) throw new Error("ripgrep (rg) is not available and could not be downloaded");
	const searchPath = resolveToCwd(input.path || ".", cwd);
	const args = ["--multiline", "--line-number", "--with-filename", "--hidden", "--color=never"];
	if (input["-i"]) args.push("--ignore-case");
	if (input.glob) args.push("--glob", input.glob);
	if (input.type) args.push("--type", input.type);
	args.push("--", input.pattern, searchPath);

	const output = await new Promise<string>((resolve, reject) => {
		execFile(rgPath, args, { signal, maxBuffer: MAX_OUTPUT_BYTES }, (error, stdout, stderr) => {
			if (!error || (error as Error & { code?: number }).code === 1) resolve(stdout);
			else reject(new Error(stderr.trim() || error.message));
		});
	});
	const lines = output
		.replace(/\n$/, "")
		.split("\n")
		.filter(Boolean)
		.map((line) => {
			const match = /^(.*?):(\d+):(.*)$/.exec(line);
			if (!match) throw new Error("Unexpected ripgrep multiline output");
			return `${path.relative(cwd, match[1]).replaceAll("\\", "/")}:${match[2]}:${match[3]}`;
		});
	return {
		content: [{ type: "text" as const, text: lines.length ? lines.join("\n") : "No files found" }],
		details: undefined,
	};
}
