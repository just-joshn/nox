import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DefaultResourceLoader, loadProjectContextFiles } from "../../src/core/resource-loader.ts";
import { buildSystemPrompt } from "../../src/core/system-prompt.ts";

describe("US1 Context & Prompt Discovery Parity (US1-CONTEXT-PENDING)", () => {
	let testDir: string;

	beforeEach(() => {
		testDir = join(tmpdir(), `nox-context-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
		mkdirSync(testDir, { recursive: true });
	});

	afterEach(() => {
		try {
			rmSync(testDir, { recursive: true, force: true });
		} catch {
			// ignore cleanup errors
		}
	});

	describe("US1-CTX-NOXMD-001: Project Instructions Loading", () => {
		it("discovers and loads NOX.md in project directory", () => {
			const noxMdPath = join(testDir, "NOX.md");
			writeFileSync(noxMdPath, "# Project Instructions\nAlways use TypeScript.", "utf-8");

			const loader = new DefaultResourceLoader({ cwd: testDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBeGreaterThan(0);
			const noxFile = agentsFiles.find((f) => f.path === noxMdPath);
			expect(noxFile).toBeDefined();
			expect(noxFile?.content).toContain("Always use TypeScript.");
		});

		it("prefers NOX.override.md over NOX.md when both are present", () => {
			writeFileSync(join(testDir, "NOX.md"), "Base project instructions", "utf-8");
			writeFileSync(join(testDir, "NOX.override.md"), "Overridden instructions", "utf-8");

			const loader = new DefaultResourceLoader({ cwd: testDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBe(1);
			expect(agentsFiles[0].content).toBe("Overridden instructions");
		});

		it("loads ancestor instruction files in broad-to-specific order", () => {
			const subDir = join(testDir, "subpkg", "nested");
			mkdirSync(subDir, { recursive: true });

			writeFileSync(join(testDir, "NOX.md"), "Root instructions", "utf-8");
			writeFileSync(join(testDir, "subpkg", "NOX.md"), "Subpkg instructions", "utf-8");
			writeFileSync(join(subDir, "NOX.md"), "Nested instructions", "utf-8");

			const loader = new DefaultResourceLoader({ cwd: subDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBe(3);
			expect(agentsFiles[0].content).toBe("Root instructions");
			expect(agentsFiles[1].content).toBe("Subpkg instructions");
			expect(agentsFiles[2].content).toBe("Nested instructions");
		});

		it("strips block-level HTML comments from injected context", () => {
			const noxMdPath = join(testDir, "NOX.md");
			writeFileSync(
				noxMdPath,
				"# Title\n<!-- This is an internal comment -->\nVisible instruction.\n<!-- Another comment -->",
				"utf-8",
			);

			const loader = new DefaultResourceLoader({ cwd: testDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBe(1);
			expect(agentsFiles[0].content).toContain("Visible instruction.");
			expect(agentsFiles[0].content).not.toContain("This is an internal comment");
			expect(agentsFiles[0].content).not.toContain("Another comment");
		});
	});

	describe("US1-CTX-LOCAL-001: Local Context Override", () => {
		it("prefers .nox/local.md over NOX.md in same directory", () => {
			const noxDir = join(testDir, ".nox");
			mkdirSync(noxDir, { recursive: true });
			writeFileSync(join(testDir, "NOX.md"), "Shared team instructions", "utf-8");
			writeFileSync(join(noxDir, "local.md"), "Local user instructions override", "utf-8");

			const loader = new DefaultResourceLoader({ cwd: testDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBe(1);
			expect(agentsFiles[0].content).toBe("Local user instructions override");
		});
	});

	describe("US1-CTX-RULES-001: Path-specific Rules Discovery & Filtering", () => {
		it("discovers and loads unconditional rules from .nox/rules/", () => {
			const rulesDir = join(testDir, ".nox", "rules");
			mkdirSync(rulesDir, { recursive: true });
			writeFileSync(join(rulesDir, "general.md"), "# General Rule\nFollow standards.", "utf-8");

			const files = loadProjectContextFiles({ cwd: testDir });
			const ruleFile = files.find((f) => f.path.includes("general.md"));
			expect(ruleFile).toBeDefined();
			expect(ruleFile?.content).toContain("Follow standards.");
		});

		it("filters rules with paths frontmatter matching target files", () => {
			const rulesDir = join(testDir, ".nox", "rules");
			mkdirSync(rulesDir, { recursive: true });
			writeFileSync(
				join(rulesDir, "test-rule.md"),
				"---\npaths:\n  - '**/*.test.ts'\n---\n# Test Rule\nWrite assertions.",
				"utf-8",
			);
			writeFileSync(
				join(rulesDir, "doc-rule.md"),
				"---\npaths:\n  - '**/*.md'\n---\n# Doc Rule\nWrite clear docs.",
				"utf-8",
			);

			// Target a test file
			const testMatchedFiles = loadProjectContextFiles({
				cwd: testDir,
				targetPaths: ["packages/core/test/sample.test.ts"],
			});
			expect(testMatchedFiles.some((f) => f.path.includes("test-rule.md"))).toBe(true);
			expect(testMatchedFiles.some((f) => f.path.includes("doc-rule.md"))).toBe(false);

			// Target a doc file
			const docMatchedFiles = loadProjectContextFiles({
				cwd: testDir,
				targetPaths: ["docs/guide.md"],
			});
			expect(docMatchedFiles.some((f) => f.path.includes("test-rule.md"))).toBe(false);
			expect(docMatchedFiles.some((f) => f.path.includes("doc-rule.md"))).toBe(true);
		});
	});

	describe("US1-CTX-IMPORT-001: @path Import Expansion", () => {
		it("inlines referenced markdown files via @path imports", () => {
			const subDir = join(testDir, "shared");
			mkdirSync(subDir, { recursive: true });
			writeFileSync(join(subDir, "guidelines.md"), "Shared guidelines content.", "utf-8");
			writeFileSync(join(testDir, "NOX.md"), "# Project\n@shared/guidelines.md\nEnd of instructions.", "utf-8");

			const loader = new DefaultResourceLoader({ cwd: testDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBe(1);
			expect(agentsFiles[0].content).toContain("Shared guidelines content.");
			expect(agentsFiles[0].content).toContain("End of instructions.");
			expect(agentsFiles[0].content).not.toContain("@shared/guidelines.md");
		});

		it("handles recursive imports up to 4 hops with cycle protection", () => {
			writeFileSync(join(testDir, "hop1.md"), "Hop 1 content\n@hop2.md", "utf-8");
			writeFileSync(join(testDir, "hop2.md"), "Hop 2 content\n@hop3.md", "utf-8");
			writeFileSync(join(testDir, "hop3.md"), "Hop 3 content\n@hop4.md", "utf-8");
			writeFileSync(join(testDir, "hop4.md"), "Hop 4 content\n@hop5.md", "utf-8");
			writeFileSync(join(testDir, "hop5.md"), "Hop 5 content\n@hop1.md", "utf-8");
			writeFileSync(join(testDir, "NOX.md"), "# Root\n@hop1.md", "utf-8");

			const loader = new DefaultResourceLoader({ cwd: testDir });
			const { agentsFiles } = loader.getAgentsFiles();

			expect(agentsFiles.length).toBe(1);
			expect(agentsFiles[0].content).toContain("Hop 1 content");
			expect(agentsFiles[0].content).toContain("Hop 2 content");
			expect(agentsFiles[0].content).toContain("Hop 3 content");
			expect(agentsFiles[0].content).toContain("Hop 4 content");
			// Hop 5 is at depth > 4 hops or cyclical hop1, so it shouldn't expand indefinitely
			expect(agentsFiles[0].content).not.toMatch(/Hop 1 content.*Hop 1 content/s);
		});
	});

	describe("US1-CTX-EXCLUDES-001: Context File Excludes", () => {
		it("skips excluded context files matching noxMdExcludes", () => {
			const subDir = join(testDir, "ignored-dir");
			mkdirSync(subDir, { recursive: true });
			writeFileSync(join(testDir, "NOX.md"), "Root instructions", "utf-8");
			writeFileSync(join(subDir, "NOX.md"), "Ignored sub instructions", "utf-8");

			const files = loadProjectContextFiles({
				cwd: subDir,
				excludes: ["**/ignored-dir/**"],
			});

			expect(files.length).toBe(1);
			expect(files[0].content).toBe("Root instructions");
		});
	});

	describe("US1-CTX-PROMPT-ORDER-001: Canonical Prompt Layering", () => {
		it("assembles system prompt in canonical order", () => {
			const prompt = buildSystemPrompt({
				cwd: testDir,
				customPrompt: "Base system instructions.",
				appendSystemPrompt: "Appended instructions.",
				contextFiles: [{ path: join(testDir, "NOX.md"), content: "# Project Rules\nRule 1: Be concise." }],
				selectedTools: ["read", "bash"],
			});

			// Canonical order:
			// 1. Base / custom prompt
			// 2. Appended system prompt
			// 3. Project context files (<project_context>)
			// 4. Current working directory
			const baseIdx = prompt.indexOf("Base system instructions.");
			const appendIdx = prompt.indexOf("Appended instructions.");
			const contextIdx = prompt.indexOf("<project_context>");
			const rulesIdx = prompt.indexOf("Rule 1: Be concise.");
			const cwdIdx = prompt.indexOf("Current working directory:");

			expect(baseIdx).toBeGreaterThanOrEqual(0);
			expect(appendIdx).toBeGreaterThan(baseIdx);
			expect(contextIdx).toBeGreaterThan(appendIdx);
			expect(rulesIdx).toBeGreaterThan(contextIdx);
			expect(cwdIdx).toBeGreaterThan(rulesIdx);
		});
	});
});
