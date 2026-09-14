import { execFile } from "node:child_process";
import path from "node:path";
import { ensureTool } from "../../utils/tools-manager.ts";
import { resolveToCwd } from "./path-utils.ts";

interface OnlyMatchingInput {
	pattern: string;
	path?: string;
	glob?: string;
	type?: string;
	"-i"?: boolean;
	"-n"?: boolean;
}

const MAX_MATCH_OUTPUT_BYTES = 8 * 1024 * 1024;

export async function executeNoxGrepOnly(cwd: string, input: OnlyMatchingInput, signal?: AbortSignal) {
	const rgPath = await ensureTool("rg");
	if (!rgPath) throw new Error("ripgrep (rg) is not available and could not be downloaded");
	const searchPath = resolveToCwd(input.path || ".", cwd);
	const showLine = input["-n"] !== false;
	const args = ["--only-matching", "--with-filename", "--hidden", "--color=never"];
	if (showLine) args.push("--line-number");
	if (input["-i"]) args.push("--ignore-case");
	if (input.glob) args.push("--glob", input.glob);
	if (input.type) args.push("--type", input.type);
	args.push("--glob", "!**/.git/**");
	args.push("--", input.pattern, searchPath);

	const output = await new Promise<string>((resolve, reject) => {
		execFile(rgPath, args, { signal, maxBuffer: MAX_MATCH_OUTPUT_BYTES }, (error, stdout, stderr) => {
			if (!error || (error as Error & { code?: number }).code === 1) resolve(stdout);
			else reject(new Error(stderr.trim() || error.message));
		});
	});
	if (!output.trim()) return { content: [{ type: "text" as const, text: "No files found" }], details: undefined };
	const lines = output
		.trimEnd()
		.split("\n")
		.map((line) => {
			const match = showLine ? /^(.*):(\d+):(.*)$/.exec(line) : /^(.*?):(.*)$/.exec(line);
			if (!match) throw new Error("Unexpected ripgrep match output");
			const file = path.relative(cwd, match[1]).replaceAll("\\", "/");
			return showLine ? `${file}:${match[2]}:${match[3]}` : `${file}:${match[2]}`;
		});
	return { content: [{ type: "text" as const, text: lines.join("\n") }], details: undefined };
}
