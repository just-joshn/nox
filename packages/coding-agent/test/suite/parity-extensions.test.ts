import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONFIG_DIR_NAME } from "../../src/config.ts";
import { createEventBus } from "../../src/core/event-bus.ts";
import {
	expandPromptTemplate,
	loadPromptTemplates,
	parseCommandArgs,
	substituteArgs,
} from "../../src/core/prompt-templates.ts";
import { formatSkillsForPrompt, loadSkills } from "../../src/core/skills.ts";
import { createSyntheticSourceInfo } from "../../src/core/source-info.ts";

describe("US3 Extensions, Skills & Custom Commands Parity (EXT-001..EXT-025)", () => {
	let testDir: string;
	let userDir: string;
	let projectDir: string;

	beforeEach(() => {
		testDir = join(tmpdir(), `nox-ext-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
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

	describe("EXT-SKILL-001..EXT-SKILL-005: Skills Discovery, Validation & Formatting", () => {
		it("EXT-SKILL-001: discovers skills from project and global skills directories", () => {
			const projectSkillDir = join(projectDir, CONFIG_DIR_NAME, "skills", "test-skill");
			mkdirSync(projectSkillDir, { recursive: true });
			writeFileSync(
				join(projectSkillDir, "SKILL.md"),
				"---\nname: test-skill\ndescription: A test skill for code review\n---\n# Test Skill Instructions",
				"utf-8",
			);

			const globalSkillDir = join(userDir, "skills", "global-helper");
			mkdirSync(globalSkillDir, { recursive: true });
			writeFileSync(
				join(globalSkillDir, "SKILL.md"),
				"---\nname: global-helper\ndescription: A global helper skill\n---\n# Global Helper Instructions",
				"utf-8",
			);

			const result = loadSkills({
				cwd: projectDir,
				agentDir: userDir,
				skillPaths: [],
				includeDefaults: true,
			});

			expect(result.skills.length).toBe(2);
			const names = result.skills.map((s) => s.name);
			expect(names).toContain("test-skill");
			expect(names).toContain("global-helper");
			expect(result.diagnostics.length).toBe(0);
		});

		it("EXT-SKILL-002: validates skill names and descriptions against Agent Skills specification", () => {
			const invalidSkillDir = join(projectDir, CONFIG_DIR_NAME, "skills", "Invalid_Name");
			mkdirSync(invalidSkillDir, { recursive: true });
			writeFileSync(
				join(invalidSkillDir, "SKILL.md"),
				"---\nname: Invalid_Name!\ndescription: Invalid name with uppercase and symbols\n---\n# Content",
				"utf-8",
			);

			const result = loadSkills({
				cwd: projectDir,
				agentDir: userDir,
				skillPaths: [],
				includeDefaults: true,
			});

			expect(result.diagnostics.length).toBeGreaterThan(0);
			expect(result.diagnostics[0].message).toContain("invalid characters");

			// Now test skill without description (strictly rejected)
			const noDescSkillDir = join(projectDir, CONFIG_DIR_NAME, "skills", "no-desc");
			mkdirSync(noDescSkillDir, { recursive: true });
			writeFileSync(join(noDescSkillDir, "SKILL.md"), "---\nname: no-desc\n---\n# Content", "utf-8");

			const result2 = loadSkills({
				cwd: projectDir,
				agentDir: userDir,
				skillPaths: [],
				includeDefaults: true,
			});

			expect(result2.skills.find((s) => s.name === "no-desc")).toBeUndefined();
			expect(result2.diagnostics.some((d) => d.message.includes("description is required"))).toBe(true);
		});

		it("EXT-SKILL-003: parses disable-model-invocation and excludes from system prompt formatting", () => {
			const manualSkillDir = join(projectDir, CONFIG_DIR_NAME, "skills", "manual-deploy");
			mkdirSync(manualSkillDir, { recursive: true });
			writeFileSync(
				join(manualSkillDir, "SKILL.md"),
				"---\nname: manual-deploy\ndescription: Deployment script\ndisable-model-invocation: true\n---\n# Content",
				"utf-8",
			);

			const autoSkillDir = join(projectDir, CONFIG_DIR_NAME, "skills", "auto-lint");
			mkdirSync(autoSkillDir, { recursive: true });
			writeFileSync(
				join(autoSkillDir, "SKILL.md"),
				"---\nname: auto-lint\ndescription: Lint checker\n---\n# Content",
				"utf-8",
			);

			const result = loadSkills({
				cwd: projectDir,
				agentDir: userDir,
				skillPaths: [],
				includeDefaults: true,
			});

			expect(result.skills.length).toBe(2);
			const promptXml = formatSkillsForPrompt(result.skills);

			expect(promptXml).toContain("auto-lint");
			expect(promptXml).not.toContain("manual-deploy");
		});

		it("EXT-SKILL-004: detects skill collisions and records diagnostic", () => {
			const projectSkillDir = join(projectDir, CONFIG_DIR_NAME, "skills", "shared-skill");
			mkdirSync(projectSkillDir, { recursive: true });
			writeFileSync(
				join(projectSkillDir, "SKILL.md"),
				"---\nname: shared-skill\ndescription: Project version\n---\n# Project",
				"utf-8",
			);

			const globalSkillDir = join(userDir, "skills", "shared-skill");
			mkdirSync(globalSkillDir, { recursive: true });
			writeFileSync(
				join(globalSkillDir, "SKILL.md"),
				"---\nname: shared-skill\ndescription: Global version\n---\n# Global",
				"utf-8",
			);

			const result = loadSkills({
				cwd: projectDir,
				agentDir: userDir,
				skillPaths: [],
				includeDefaults: true,
			});

			// Only one skill is loaded, collision diagnostic emitted
			expect(result.skills.length).toBe(1);
			expect(result.diagnostics.some((d) => d.type === "collision")).toBe(true);
		});

		it("EXT-SKILL-005: respects .gitignore rules within skill directories", () => {
			const skillDir = join(projectDir, CONFIG_DIR_NAME, "skills");
			const ignoredDir = join(skillDir, "ignored-skill");
			mkdirSync(ignoredDir, { recursive: true });
			writeFileSync(join(skillDir, ".gitignore"), "ignored-skill/\n", "utf-8");
			writeFileSync(
				join(ignoredDir, "SKILL.md"),
				"---\nname: ignored-skill\ndescription: Should not be loaded\n---\n# Content",
				"utf-8",
			);

			const result = loadSkills({
				cwd: projectDir,
				agentDir: userDir,
				skillPaths: [],
				includeDefaults: true,
			});

			expect(result.skills.find((s) => s.name === "ignored-skill")).toBeUndefined();
		});
	});

	describe("EXT-CMD-001..EXT-CMD-005: Custom Prompt Commands & Argument Substitution", () => {
		it("EXT-CMD-001: discovers prompt templates from project and global prompts directories", () => {
			const projectPromptsDir = join(projectDir, CONFIG_DIR_NAME, "prompts");
			mkdirSync(projectPromptsDir, { recursive: true });
			writeFileSync(
				join(projectPromptsDir, "review.md"),
				"---\ndescription: Code review template\nargumentHint: [path]\n---\nPlease review the code at $1.",
				"utf-8",
			);

			const templates = loadPromptTemplates({
				cwd: projectDir,
				agentDir: userDir,
				promptPaths: [],
				includeDefaults: true,
			});

			expect(templates.length).toBe(1);
			expect(templates[0].name).toBe("review");
			expect(templates[0].description).toBe("Code review template");
			expect(templates[0].argumentHint).toBe("[path]");
		});

		it("EXT-CMD-002: parses command arguments respecting bash-style quotes", () => {
			const parsed = parseCommandArgs("src/main.ts \"error with spaces\" 'single quoted' trailing");
			expect(parsed).toEqual(["src/main.ts", "error with spaces", "single quoted", "trailing"]);
		});

		it("EXT-CMD-003: substitutes positional and all-args placeholders ($1, $2, $@, $ARGUMENTS)", () => {
			const template = "Refactor $1 with method $2 for target $@ (all: $ARGUMENTS)";
			const args = ["UserService", "optimize", "production", "v2"];
			const substituted = substituteArgs(template, args);

			expect(substituted).toBe(
				"Refactor UserService with method optimize for target UserService optimize production v2 (all: UserService optimize production v2)",
			);
		});

		// biome-ignore lint/suspicious/noTemplateCurlyInString: template syntax test
		it("EXT-CMD-004: supports default values and slice syntax (${1:-default}, ${@:2})", () => {
			// biome-ignore lint/suspicious/noTemplateCurlyInString: template syntax test
			const templateWithDefaults = "Run tests on ${1:-all} with verbosity ${2:-low}";
			expect(substituteArgs(templateWithDefaults, [])).toBe("Run tests on all with verbosity low");
			expect(substituteArgs(templateWithDefaults, ["unit"])).toBe("Run tests on unit with verbosity low");

			// biome-ignore lint/suspicious/noTemplateCurlyInString: template syntax test
			const templateWithSlice = "Command: $1, Options: ${@:2}";
			expect(substituteArgs(templateWithSlice, ["build", "--minify", "--sourcemap"])).toBe(
				"Command: build, Options: --minify --sourcemap",
			);
		});

		it("EXT-CMD-005: expandPromptTemplate expands registered template command and leaves non-matching input untouched", () => {
			const templates = [
				{
					name: "test",
					description: "Run tests",
					content: "Run test suite on $1",
					filePath: "/fake/test.md",
					sourceInfo: createSyntheticSourceInfo("/fake/test.md", { source: "local" }),
				},
			];

			const expanded = expandPromptTemplate("/test core", templates);
			expect(expanded).toBe("Run test suite on core");

			const nonMatching = expandPromptTemplate("/unknown command", templates);
			expect(nonMatching).toBe("/unknown command");

			const plainText = expandPromptTemplate("just a normal message", templates);
			expect(plainText).toBe("just a normal message");
		});
	});

	describe("EXT-HOOK-001..EXT-HOOK-005: Event Bus Lifecycle & Hook Isolation", () => {
		it("EXT-HOOK-001: emit delivers data to subscribed event handlers", () => {
			const bus = createEventBus();
			const received: unknown[] = [];

			bus.on("tool_call", (data) => {
				received.push(data);
			});

			bus.emit("tool_call", { tool: "bash", command: "ls" });
			expect(received).toEqual([{ tool: "bash", command: "ls" }]);
		});

		it("EXT-HOOK-002: unsubscribe function stops event delivery", () => {
			const bus = createEventBus();
			const received: unknown[] = [];

			const unsubscribe = bus.on("agent_start", (data) => {
				received.push(data);
			});

			bus.emit("agent_start", { step: 1 });
			expect(received.length).toBe(1);

			unsubscribe();
			bus.emit("agent_start", { step: 2 });
			expect(received.length).toBe(1);
		});

		it("EXT-HOOK-003: handler errors are isolated and do not prevent other handlers from executing", () => {
			const bus = createEventBus();
			const received: string[] = [];

			bus.on("turn_end", () => {
				throw new Error("Faulty extension handler");
			});

			bus.on("turn_end", () => {
				received.push("healthy-extension");
			});

			expect(() => {
				bus.emit("turn_end", { turnId: "123" });
			}).not.toThrow();

			expect(received).toEqual(["healthy-extension"]);
		});

		it("EXT-HOOK-004: clear removes all registered listeners", () => {
			const bus = createEventBus();
			const received: unknown[] = [];

			bus.on("message", (data) => {
				received.push(data);
			});

			bus.clear();
			bus.emit("message", { text: "hello" });
			expect(received.length).toBe(0);
		});
	});
});
