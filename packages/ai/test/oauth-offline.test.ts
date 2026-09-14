import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, it, vi } from "vitest";

const homes: string[] = [];

afterEach(() => {
	vi.unstubAllEnvs();
	for (const home of homes.splice(0)) rmSync(home, { recursive: true, force: true });
});

it("does not read home credentials during offline tests", async () => {
	const home = mkdtempSync(join(tmpdir(), "nox-offline-auth-"));
	homes.push(home);
	const agentDir = join(home, ".pi", "agent");
	mkdirSync(agentDir, { recursive: true });
	const authPath = join(agentDir, "auth.json");
	const content = JSON.stringify({ anthropic: { type: "api_key", key: "synthetic-do-not-use" } });
	writeFileSync(authPath, content);
	vi.stubEnv("HOME", home);
	vi.stubEnv("PI_OFFLINE", "1");
	vi.resetModules();
	const { resolveApiKey } = await import("./oauth.ts");
	expect(await resolveApiKey("anthropic")).toBeUndefined();
	expect(readFileSync(authPath, "utf8")).toBe(content);
});
