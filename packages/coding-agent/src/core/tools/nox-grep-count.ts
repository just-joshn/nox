import { execFile } from "node:child_process";
import path from "node:path";
import { ensureTool } from "../../utils/tools-manager.ts";
import { resolveToCwd } from "./path-utils.ts";

interface CountInput {
	pattern: string;
	path?: string;
	glob?: string;
	type?: string;
	multiline?: boolean;
	head_limit?: number;
	offset?: number;
	"-i"?: boolean;
}

const MAX_COUNT_OUTPUT_BYTES = 8 * 1024 * 1024;

export async function executeNoxGrepCount(cwd: string, input: CountInput, signal?: AbortSignal) {
	const rgPath = await ensureTool("rg");
	if (!rgPath) throw new Error("ripgrep (rg) is not available and could not be downloaded");
	const searchPath = resolveToCwd(input.path || ".", cwd);
	const args = ["--count", "--with-filename", "--hidden", "--color=never"];
	if (input["-i"]) args.push("--ignore-case");
	if (input.glob) args.push("--glob", input.glob);
	if (input.type) args.push("--type", input.type);
	if (input.multiline) args.push("--multiline");
	args.push("--glob", "!**/.git/**");
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
	const offset = input.offset ?? 0;
	const ordered = [...counts].sort((left, right) => (left.file < right.file ? 1 : left.file > right.file ? -1 : 0));
	const page = ordered.slice(offset, input.head_limit ? offset + input.head_limit : undefined);
	const files = counts.length
		? page.length
			? page.map(({ file, count }) => `${file}:${count}`).join("\n")
			: "No entries at this offset"
		: "No matches found";
	const pagination =
		offset > 0
			? ` with pagination = offset: ${offset}`
			: input.head_limit && counts.length > input.head_limit
				? ` with pagination = limit: ${input.head_limit}`
				: "";
	return { content: [{ type: "text" as const, text: `${files}\n\n${summary}${pagination}` }], details: undefined };
}
