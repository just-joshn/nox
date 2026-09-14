import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONFIG_DIR_NAME } from "../../src/config.ts";
import { DefaultResourceLoader, loadProjectContextFiles } from "../../src/core/resource-loader.ts";
import { SettingsManager } from "../../src/core/settings-manager.ts";

describe("US3 Configuration & Settings Parity (CFG-001..CFG-025)", () => {
	let testDir: string;
	let userDir: string;
	let projectDir: string;

	beforeEach(() => {
		testDir = join(tmpdir(), `nox-cfg-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
		userDir = join(testDir, "user", "agent");
		projectDir = join(testDir, "project");
		mkdirSync(userDir, { recursive: true });
		mkdirSync(join(projectDir, CONFIG_DIR_NAME), { recursive: true });
	});

	afterEach(() => {
		try {
			rmSync(testDir, { recursive: true, force: true });
		} catch {
			// ignore cleanup errors
		}
	});

	describe("CFG-001..CFG-005: Scope Precedence & Deep Merging", () => {
		it("CFG-001: project settings override user settings for matching primitive fields", () => {
			writeFileSync(
				join(userDir, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-haiku", steeringMode: "all" }),
				"utf-8",
			);
			writeFileSync(
				join(projectDir, CONFIG_DIR_NAME, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-5-sonnet" }),
				"utf-8",
			);

			const manager = SettingsManager.create(projectDir, userDir);

			expect(manager.getDefaultModel()).toBe("anthropic/claude-3-5-sonnet");
			expect(manager.getSteeringMode()).toBe("all");
		});

		it("CFG-002: deep merges nested configuration objects with project-level precedence", () => {
			writeFileSync(
				join(userDir, "settings.json"),
				JSON.stringify({
					compaction: { enabled: true, reserveTokens: 8192, keepRecentTokens: 10000 },
					retry: { enabled: true, maxRetries: 3, baseDelayMs: 2000 },
				}),
				"utf-8",
			);
			writeFileSync(
				join(projectDir, CONFIG_DIR_NAME, "settings.json"),
				JSON.stringify({
					compaction: { reserveTokens: 16384 },
					retry: { maxRetries: 5 },
				}),
				"utf-8",
			);

			const manager = SettingsManager.create(projectDir, userDir);
			const compaction = manager.getCompactionSettings();
			const retry = manager.getRetrySettings();

			expect(compaction.enabled).toBe(true);
			expect(compaction.reserveTokens).toBe(16384);
			expect(compaction.keepRecentTokens).toBe(10000);
			expect(retry.enabled).toBe(true);
			expect(retry.maxRetries).toBe(5);
			expect(retry.baseDelayMs).toBe(2000);
		});

		it("CFG-003: untrusted project ignores project settings entirely and falls back to user settings", () => {
			writeFileSync(
				join(userDir, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-haiku", steeringMode: "all" }),
				"utf-8",
			);
			writeFileSync(
				join(projectDir, CONFIG_DIR_NAME, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-5-sonnet", steeringMode: "one-at-a-time" }),
				"utf-8",
			);

			const manager = SettingsManager.create(projectDir, userDir, { projectTrusted: false });
			expect(manager.isProjectTrusted()).toBe(false);

			expect(manager.getDefaultModel()).toBe("anthropic/claude-3-haiku");
			expect(manager.getSteeringMode()).toBe("all");
		});

		it("CFG-004: project trust change and reload dynamically applies project settings", async () => {
			writeFileSync(
				join(userDir, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-haiku" }),
				"utf-8",
			);
			writeFileSync(
				join(projectDir, CONFIG_DIR_NAME, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-5-sonnet" }),
				"utf-8",
			);

			const manager = SettingsManager.create(projectDir, userDir, { projectTrusted: false });
			expect(manager.getDefaultModel()).toBe("anthropic/claude-3-haiku");

			manager.setProjectTrusted(true);
			await manager.reload();

			expect(manager.isProjectTrusted()).toBe(true);
			expect(manager.getDefaultModel()).toBe("anthropic/claude-3-5-sonnet");
		});

		it("CFG-005: in-memory settings support initialization without disk IO", () => {
			const manager = SettingsManager.inMemory({
				defaultModel: "anthropic/claude-3-haiku",
				steeringMode: "all",
			});

			expect(manager.getDefaultModel()).toBe("anthropic/claude-3-haiku");
			expect(manager.getSteeringMode()).toBe("all");
			expect(manager.isProjectTrusted()).toBe(true);
		});
	});

	describe("CFG-006..CFG-010: Error Handling & Diagnostics", () => {
		it("CFG-006: reports parse errors for malformed user settings.json without crashing", () => {
			writeFileSync(join(userDir, "settings.json"), "{ invalid-json: true", "utf-8");

			const manager = SettingsManager.create(projectDir, userDir);
			const errors = manager.drainErrors();

			expect(errors.length).toBeGreaterThan(0);
			const userError = errors.find((e) => e.scope === "global");
			expect(userError).toBeDefined();
			expect(userError?.error.message).toContain("JSON");
			// Returns safe empty default
			expect(manager.getDefaultModel()).toBeUndefined();
		});

		it("CFG-007: reports parse errors for malformed project settings.json and preserves user settings", () => {
			writeFileSync(
				join(userDir, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-haiku" }),
				"utf-8",
			);
			writeFileSync(join(projectDir, CONFIG_DIR_NAME, "settings.json"), "{ broken project json", "utf-8");

			const manager = SettingsManager.create(projectDir, userDir);
			const errors = manager.drainErrors();

			expect(errors.length).toBeGreaterThan(0);
			const projectError = errors.find((e) => e.scope === "project");
			expect(projectError).toBeDefined();
			expect(projectError?.error.message).toContain("JSON");
			// User settings still take effect
			expect(manager.getDefaultModel()).toBe("anthropic/claude-3-haiku");
		});

		it("CFG-008: migrates legacy queueMode to steeringMode automatically", () => {
			writeFileSync(join(userDir, "settings.json"), JSON.stringify({ queueMode: "all" }), "utf-8");

			const manager = SettingsManager.create(projectDir, userDir);
			expect(manager.getSteeringMode()).toBe("all");
		});

		it("CFG-009: migrates legacy websockets boolean to transport enum", () => {
			writeFileSync(join(userDir, "settings.json"), JSON.stringify({ websockets: true }), "utf-8");

			const manager = SettingsManager.create(projectDir, userDir);
			expect(manager.getTransport()).toBe("websocket");
		});

		it("CFG-010: migrates legacy retry.maxDelayMs to retry.provider.maxRetryDelayMs", () => {
			writeFileSync(join(userDir, "settings.json"), JSON.stringify({ retry: { maxDelayMs: 45000 } }), "utf-8");

			const manager = SettingsManager.create(projectDir, userDir);
			expect(manager.getProviderRetrySettings().maxRetryDelayMs).toBe(45000);
		});
	});

	describe("CFG-011..CFG-015: Settings Mutation & Persistence", () => {
		it("CFG-011: mutating global setting updates in-memory copy and persists to storage", async () => {
			const manager = SettingsManager.create(projectDir, userDir);
			manager.setSteeringMode("all");
			await manager.flush();

			expect(manager.getSteeringMode()).toBe("all");

			// Reload from disk in a fresh instance
			const freshManager = SettingsManager.create(projectDir, userDir);
			expect(freshManager.getSteeringMode()).toBe("all");
		});

		it("CFG-012: setting default model persists cleanly", async () => {
			const manager = SettingsManager.create(projectDir, userDir);
			manager.setDefaultModel("anthropic/claude-3-5-sonnet");
			await manager.flush();

			expect(manager.getDefaultModel()).toBe("anthropic/claude-3-5-sonnet");

			const freshManager = SettingsManager.create(projectDir, userDir);
			expect(freshManager.getDefaultModel()).toBe("anthropic/claude-3-5-sonnet");
		});

		it("CFG-013: global settings and project settings getters return clean snapshots", () => {
			writeFileSync(
				join(userDir, "settings.json"),
				JSON.stringify({ defaultModel: "anthropic/claude-3-haiku" }),
				"utf-8",
			);
			writeFileSync(join(projectDir, CONFIG_DIR_NAME, "settings.json"), JSON.stringify({ theme: "dark" }), "utf-8");

			const manager = SettingsManager.create(projectDir, userDir);
			expect(manager.getGlobalSettings().defaultModel).toBe("anthropic/claude-3-haiku");
			expect(manager.getProjectSettings().theme).toBe("dark");
		});
	});

	describe("CFG-016..CFG-025: Context Loader & Exclusions Integration", () => {
		it("CFG-016: respects noxMdExcludes patterns to skip excluded instruction files", () => {
			writeFileSync(join(projectDir, "NOX.md"), "Project instructions", "utf-8");
			const subDir = join(projectDir, "generated");
			mkdirSync(subDir, { recursive: true });
			writeFileSync(join(subDir, "NOX.md"), "Generated instructions to ignore", "utf-8");

			const files = loadProjectContextFiles({
				cwd: subDir,
				agentDir: userDir,
				excludes: ["**/generated/**"],
			});

			// Only root NOX.md is loaded, generated/NOX.md is excluded
			expect(files.some((f) => f.path.includes("generated"))).toBe(false);
			expect(files.some((f) => f.path === join(projectDir, "NOX.md"))).toBe(true);
		});

		it("CFG-017: handles recursive import loops without crashing (depth limit 4)", () => {
			writeFileSync(join(projectDir, "a.md"), "File A imports B\n@b.md", "utf-8");
			writeFileSync(join(projectDir, "b.md"), "File B imports A\n@a.md", "utf-8");
			writeFileSync(join(projectDir, "NOX.md"), "# Instructions\n@a.md", "utf-8");

			const loader = new DefaultResourceLoader({ cwd: projectDir, agentDir: userDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBe(1);
			expect(agentsFiles[0].content).toContain("File A imports B");
			expect(agentsFiles[0].content).toContain("File B imports A");
		});
	});
});
