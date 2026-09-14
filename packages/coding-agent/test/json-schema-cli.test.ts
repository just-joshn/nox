import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { ENV_AGENT_DIR } from "../src/config.ts";

const cliPath = resolve(__dirname, "../src/cli.ts");
const sourceResolverPath = resolve(__dirname, "../src/experimental/source-resolver.ts");

function runSchemaCli(schema: string): { status: number | null; stdout: string; stderr: string } {
	const root = mkdtempSync(join(tmpdir(), "nox-schema-cli-"));
	try {
		const result = spawnSync(
			process.execPath,
			["--import", sourceResolverPath, cliPath, "-p", "--json-schema", schema, "noop"],
			{
				cwd: root,
				env: { HOME: root, [ENV_AGENT_DIR]: join(root, "agent"), NO_COLOR: "1", PATH: process.env.PATH ?? "" },
				encoding: "utf8",
				timeout: 10_000,
			},
		);
		if (result.error) throw result.error;
		return { status: result.status, stdout: result.stdout, stderr: result.stderr };
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
}

describe("structured-output CLI preflight", () => {
	test("rejects the observed malformed schema before printing a result", () => {
		const result = runSchemaCli("{");
		expect(result).toEqual({
			status: 1,
			stdout: "",
			stderr: "Error: --json-schema is not valid JSON: JSON Parse error: Expected '}'\n",
		});
	});

	test("does not silently run with a valid but unsupported schema", () => {
		const result = runSchemaCli('{"type":"object"}');
		expect(result).toEqual({ status: 1, stdout: "", stderr: "Error: Structured output is not available yet\n" });
	});
});
