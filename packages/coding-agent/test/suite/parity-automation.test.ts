import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CONFIG_DIR_NAME } from "../../src/config.ts";
import {
	getProjectTrustOptions,
	hasTrustRequiringProjectResources,
	ProjectTrustStore,
} from "../../src/core/trust-manager.ts";
import { canonicalizePath, isSubpath } from "../../src/utils/paths.ts";

describe("US4 Automation, Worktrees & Admin Parity (SURF-WORKTREE-001..010, SURF-ADMIN-001..010)", () => {
	let testDir: string;
	let agentDir: string;

	beforeEach(() => {
		testDir = join(tmpdir(), `nox-auto-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
		agentDir = join(testDir, "agent");
		mkdirSync(agentDir, { recursive: true });
	});

	afterEach(() => {
		try {
			rmSync(testDir, { recursive: true, force: true });
		} catch {
			// ignore cleanup errors
		}
	});

	describe("SURF-ADMIN-001..SURF-ADMIN-005: Project Trust Management", () => {
		it("SURF-ADMIN-001: detects when a project has trust-requiring resources", () => {
			const projectDir = join(testDir, "project-with-settings");
			mkdirSync(join(projectDir, CONFIG_DIR_NAME), { recursive: true });
			writeFileSync(join(projectDir, CONFIG_DIR_NAME, "settings.json"), "{}", "utf-8");

			expect(hasTrustRequiringProjectResources(projectDir)).toBe(true);

			const cleanProjectDir = join(testDir, "clean-project");
			mkdirSync(cleanProjectDir, { recursive: true });
			expect(hasTrustRequiringProjectResources(cleanProjectDir)).toBe(false);
		});

		it("SURF-ADMIN-002: saves and loads project trust decisions", () => {
			const projectPath = join(testDir, "trusted-repo");
			mkdirSync(projectPath, { recursive: true });

			const store = new ProjectTrustStore(agentDir);
			expect(store.get(projectPath)).toBeNull();

			store.set(projectPath, true);
			expect(store.get(projectPath)).toBe(true);
			const entry = store.getEntry(projectPath);
			expect(entry?.decision).toBe(true);
			expect(entry?.path).toBe(canonicalizePath(projectPath));
		});

		it("SURF-ADMIN-003: inherits trust decision from nearest ancestor directory", () => {
			const parentPath = join(testDir, "org-repos");
			const subRepo = join(parentPath, "repo-a", "subpkg");
			mkdirSync(subRepo, { recursive: true });

			const store = new ProjectTrustStore(agentDir);
			store.set(parentPath, true);

			const subTrust = store.getEntry(subRepo);
			expect(subTrust?.decision).toBe(true);
			expect(subTrust?.path).toBe(canonicalizePath(parentPath));
		});

		it("SURF-ADMIN-004: generates standard project trust prompt options", () => {
			const projectPath = join(testDir, "some-repo");
			mkdirSync(projectPath, { recursive: true });

			const options = getProjectTrustOptions(projectPath, { includeSessionOnly: true });

			expect(options.length).toBeGreaterThanOrEqual(4);
			const trustOption = options.find((o) => o.label === "Trust");
			expect(trustOption).toBeDefined();
			expect(trustOption?.trusted).toBe(true);

			const denyOption = options.find((o) => o.label === "Do not trust");
			expect(denyOption).toBeDefined();
			expect(denyOption?.trusted).toBe(false);
		});
	});

	describe("SURF-WORKTREE-001..SURF-WORKTREE-005: Worktree & Path Containment", () => {
		it("SURF-WORKTREE-001: isSubpath accurately identifies subpath containment", () => {
			const parent = join(testDir, "workspace");
			const child = join(parent, "nested", "file.ts");
			const outside = join(testDir, "other", "file.ts");

			expect(isSubpath(parent, child)).toBe(true);
			expect(isSubpath(parent, outside)).toBe(false);
			expect(isSubpath(parent, parent)).toBe(true);
		});

		it("SURF-WORKTREE-002: handles non-canonical paths with traversal segments", () => {
			const parent = join(testDir, "workspace");
			const escaping = join(parent, "..", "workspace", "nested");
			const realEscaping = join(parent, "..", "outside");

			expect(isSubpath(parent, escaping)).toBe(true);
			expect(isSubpath(parent, realEscaping)).toBe(false);
		});
	});
});
