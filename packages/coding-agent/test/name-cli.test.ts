import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { ENV_AGENT_DIR, ENV_SESSION_DIR } from "../src/config.ts";

const cliPath = resolve(__dirname, "../src/cli.ts");
const sourceResolverPath = resolve(__dirname, "../src/experimental/source-resolver.ts");

describe("name CLI preflight", () => {
	for (const flag of ["-n", "--name"]) {
		test(`rejects ${flag} without a value before startup`, () => {
			const root = mkdtempSync(join(tmpdir(), "nox-name-cli-"));
			try {
				const result = spawnSync(process.execPath, ["--import", sourceResolverPath, cliPath, flag], {
					cwd: root,
					env: {
						HOME: root,
						[ENV_AGENT_DIR]: join(root, "agent"),
						[ENV_SESSION_DIR]: join(root, "sessions"),
						PI_OFFLINE: "1",
						NO_COLOR: "1",
						PATH: process.env.PATH ?? "",
					},
					encoding: "utf8",
					timeout: 10_000,
				});
				if (result.error) throw result.error;
				expect(result.status).toBe(1);
				expect(result.stdout).toBe("");
				expect(result.stderr).toBe("error: option '-n, --name <name>' argument missing\n");
				expect(readdirSync(root)).toEqual([]);
			} finally {
				rmSync(root, { recursive: true, force: true });
			}
		});
	}
});
