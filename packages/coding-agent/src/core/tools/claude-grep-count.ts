import { execFile } from "node:child_process";
import path from "node:path";
import { ensureTool } from "../../utils/tools-manager.ts";
import { resolveToCwd } from "./path-utils.ts";

interface CountInput {
	pattern: string;
	path?: string;
	glob?: string;
	"-i"?: boolean;
}

const MAX_COUNT_OUTPUT_BYTES = 8 * 1024 * 1024;

export async function executeClaudeGrepCount(cwd: string, input: CountInput, signal?: AbortSignal) {
	const rgPath = await ensureTool("rg");
	if (!rgPath) throw new Error("ripgrep (rg) is not available and could not be downloaded");
	const searchPath = resolveToCwd(input.path || ".", cwd);
	const args = ["--count-matches", "--with-filename", "--hidden", "--color=never"];
	if (input["-i"]) args.push("--ignore-case");
	if (input.glob) args.push("--glob", input.glob);
	args.push("--", input.pattern, searchPath);

	const output = await new Promise<string>((resolve, reject) => {
		execFile(rgPath, args, { signal, maxBuffer: MAX_COUNT_OUTPUT_BYTES }, (error, stdout, stderr) => {
			if (!error || (error as Error & { code?: number }).code === 1) resolve(stdout);
			else reject(new Error(stderr.trim() || error.message));
		});
	});
	const counts = output
		.trim()
		.split("\n")
		.filter(Boolean)
		.map((line) => {
			const match = /^(.*):(\d+)$/.exec(line);
			if (!match) throw new Error("Unexpected ripgrep count output");
			const file = path.relative(cwd, match[1]).replaceAll("\\", "/");
			return { file, count: Number(match[2]) };
		});
	const total = counts.reduce((sum, entry) => sum + entry.count, 0);
	const summary = `Found ${total} total occurrence${total === 1 ? "" : "s"} across ${counts.length} file${counts.length === 1 ? "" : "s"}.`;
	const files = counts.length ? counts.map(({ file, count }) => `${file}:${count}`).join("\n") : "No matches found";
	return { content: [{ type: "text" as const, text: `${files}\n\n${summary}` }], details: undefined };
}
