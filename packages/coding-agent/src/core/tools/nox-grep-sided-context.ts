import { execFile } from "node:child_process";
import path from "node:path";
import { ensureTool } from "../../utils/tools-manager.ts";
import { resolveToCwd } from "./path-utils.ts";

interface SidedContextInput {
	pattern: string;
	path?: string;
	glob?: string;
	type?: string;
	"-i"?: boolean;
	"-A"?: number;
	"-B"?: number;
}

const MAX_CONTEXT_OUTPUT_BYTES = 8 * 1024 * 1024;

export async function executeNoxGrepSidedContext(cwd: string, input: SidedContextInput, signal?: AbortSignal) {
	const rgPath = await ensureTool("rg");
	if (!rgPath) throw new Error("ripgrep (rg) is not available and could not be downloaded");
	const searchPath = resolveToCwd(input.path || ".", cwd);
	const args = ["--with-filename", "--line-number", "--hidden", "--color=never"];
	if (input["-i"]) args.push("--ignore-case");
	if (input["-A"] !== undefined) args.push("--after-context", String(input["-A"]));
	if (input["-B"] !== undefined) args.push("--before-context", String(input["-B"]));
	if (input.glob) args.push("--glob", input.glob);
	if (input.type) args.push("--type", input.type);
	args.push("--glob", "!**/.git/**");
	args.push("--", input.pattern, searchPath);

	const output = await new Promise<string>((resolve, reject) => {
		execFile(rgPath, args, { signal, maxBuffer: MAX_CONTEXT_OUTPUT_BYTES }, (error, stdout, stderr) => {
			if (!error || (error as Error & { code?: number }).code === 1) resolve(stdout);
			else reject(new Error(stderr.trim() || error.message));
		});
	});
	if (!output.trim()) return { content: [{ type: "text" as const, text: "No files found" }], details: undefined };
	const lines = output
		.trimEnd()
		.split("\n")
		.map((line) => {
			if (line === "--") return line;
			const match = /^(.*)([:-])(\d+)\2(.*)$/.exec(line);
			if (!match) throw new Error("Unexpected ripgrep context output");
			const file = path.relative(cwd, match[1]).replaceAll("\\", "/");
			return `${file}${match[2]}${match[3]}${match[2]}${match[4]}`;
		});
	return { content: [{ type: "text" as const, text: lines.join("\n") }], details: undefined };
}
