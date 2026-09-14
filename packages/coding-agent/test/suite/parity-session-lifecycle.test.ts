import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fauxAssistantMessage } from "@earendil-works/pi-ai";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SessionManager } from "../../src/core/session-manager.ts";
import { createHarness, getAssistantTexts, getUserTexts, type Harness } from "./harness.ts";

describe("US2 parity session lifecycle suite", () => {
	const harnesses: Harness[] = [];
	let testDir: string;

	beforeEach(() => {
		testDir = join(tmpdir(), `pi-session-suite-${Date.now()}-${Math.random().toString(36).slice(2)}`);
		mkdirSync(testDir, { recursive: true });
	});

	afterEach(() => {
		while (harnesses.length > 0) {
			harnesses.pop()?.cleanup();
		}
		if (existsSync(testDir)) {
			rmSync(testDir, { recursive: true, force: true });
		}
	});

	it("US2-SESSION-001 [US2-SESSION-NEW]: creates and persists a file-backed session with header and turns", async () => {
		const sessionDir = join(testDir, "sessions");
		const sessionManager = SessionManager.create(testDir, sessionDir);
		const harness = await createHarness({ sessionManager });
		harnesses.push(harness);

		harness.setResponses([fauxAssistantMessage("Hello from session 1")]);

		await harness.session.prompt("Hi");

		expect(getUserTexts(harness)).toContain("Hi");
		expect(getAssistantTexts(harness)).toContain("Hello from session 1");

		// Verify session file exists on disk
		const sessionFile = sessionManager.getSessionFile();
		expect(sessionFile).toBeDefined();
		expect(existsSync(sessionFile!)).toBe(true);

		const content = readFileSync(sessionFile!, "utf8");
		const lines = content
			.trim()
			.split("\n")
			.map((line) => JSON.parse(line));
		expect(lines.length).toBeGreaterThanOrEqual(3); // header + user message + assistant message
		expect(lines[0].type).toBe("session");
		expect(lines[0].id).toBe(sessionManager.getSessionId());
	});

	it("US2-SESSION-002 [US2-SESSION-RESUME]: opens and resumes an existing session from disk with full history", async () => {
		const sessionDir = join(testDir, "sessions");
		const sessionManager = SessionManager.create(testDir, sessionDir);
		const harness1 = await createHarness({ sessionManager });
		harnesses.push(harness1);

		harness1.setResponses([fauxAssistantMessage("Turn 1 response")]);
		await harness1.session.prompt("Turn 1 question");

		const sessionFile = sessionManager.getSessionFile()!;
		expect(existsSync(sessionFile)).toBe(true);

		// Now resume the session from sessionFile
		const resumedSessionManager = SessionManager.open(sessionFile, sessionDir);
		const entries = resumedSessionManager.getEntries();
		expect(entries.length).toBeGreaterThan(1);

		const harness2 = await createHarness({ sessionManager: resumedSessionManager });
		harnesses.push(harness2);

		expect(getUserTexts(harness2)).toContain("Turn 1 question");
		expect(getAssistantTexts(harness2)).toContain("Turn 1 response");

		// Continue the conversation in resumed session
		harness2.setResponses([fauxAssistantMessage("Turn 2 response")]);
		await harness2.session.prompt("Turn 2 question");

		expect(getUserTexts(harness2)).toContain("Turn 2 question");
		expect(getAssistantTexts(harness2)).toContain("Turn 2 response");
	});

	it("US2-SESSION-003 [US2-SESSION-FORK]: forks an existing session into an isolated branch without mutating original", async () => {
		const sessionDir = join(testDir, "sessions");
		const originalSessionManager = SessionManager.create(testDir, sessionDir);
		const harness1 = await createHarness({ sessionManager: originalSessionManager });
		harnesses.push(harness1);

		harness1.setResponses([fauxAssistantMessage("Original turn response")]);
		await harness1.session.prompt("Original prompt");

		const originalFile = originalSessionManager.getSessionFile()!;
		const originalFileContent = readFileSync(originalFile, "utf8");

		// Fork from the original session
		const forkedSessionManager = SessionManager.forkFrom(originalFile, testDir, sessionDir);
		expect(forkedSessionManager.getSessionId()).not.toBe(originalSessionManager.getSessionId());

		const forkedFile = forkedSessionManager.getSessionFile()!;
		expect(forkedFile).not.toBe(originalFile);
		expect(existsSync(forkedFile)).toBe(true);

		const forkedHeader = forkedSessionManager.getHeader();
		expect(forkedHeader?.parentSession).toBe(originalFile);

		// Now prompt in the forked session
		const harness2 = await createHarness({ sessionManager: forkedSessionManager });
		harnesses.push(harness2);

		expect(getUserTexts(harness2)).toContain("Original prompt");

		harness2.setResponses([fauxAssistantMessage("Forked branch response")]);
		await harness2.session.prompt("Forked branch prompt");

		expect(getUserTexts(harness2)).toContain("Forked branch prompt");
		expect(getAssistantTexts(harness2)).toContain("Forked branch response");

		// Verify original file was not mutated by the forked session turns
		expect(readFileSync(originalFile, "utf8")).toBe(originalFileContent);
	});

	it("US2-SESSION-004 [US2-SESSION-RENAME]: assigns and updates custom session name metadata", async () => {
		const sessionDir = join(testDir, "sessions");
		const sessionManager = SessionManager.create(testDir, sessionDir);
		const harness = await createHarness({ sessionManager });
		harnesses.push(harness);

		harness.setResponses([fauxAssistantMessage("Ready")]);
		await harness.session.prompt("Start");

		expect(sessionManager.getSessionName()).toBeUndefined();

		harness.session.setSessionName("feature-parity-investigation");
		expect(sessionManager.getSessionName()).toBe("feature-parity-investigation");

		// Reopen session and verify the custom name persisted
		const reopened = SessionManager.open(sessionManager.getSessionFile()!, sessionDir);
		expect(reopened.getSessionName()).toBe("feature-parity-investigation");
	});

	it("US2-SESSION-005 [US2-SESSION-COMPACTION]: compacts session message history and continues conversation", async () => {
		const sessionDir = join(testDir, "sessions");
		const sessionManager = SessionManager.create(testDir, sessionDir);
		const harness = await createHarness({
			sessionManager,
			settings: { compaction: { keepRecentTokens: 1 } },
		});
		harnesses.push(harness);

		// Turn 1
		harness.setResponses([fauxAssistantMessage("Long detailed answer 1")]);
		await harness.session.prompt("Prompt 1");

		// Turn 2
		harness.appendResponses([fauxAssistantMessage("Long detailed answer 2")]);
		await harness.session.prompt("Prompt 2");

		expect(harness.session.messages.length).toBeGreaterThanOrEqual(4);

		// Perform manual compaction
		harness.appendResponses([fauxAssistantMessage("Summary of turn 1"), fauxAssistantMessage("Prefix of turn 2")]);
		const result = await harness.session.compact("Focus on turn details");
		expect(result.summary).toContain("Summary of turn 1");

		// History is compacted: user and assistant messages replaced by summary
		expect(harness.session.messages.length).toBeLessThan(4);

		// Can continue conversation post-compaction
		harness.appendResponses([fauxAssistantMessage("Post-compaction response")]);
		await harness.session.prompt("Prompt 3");

		expect(getAssistantTexts(harness)).toContain("Post-compaction response");
	});

	it("US2-SESSION-006 [US2-SESSION-IN-MEMORY]: runs ephemeral session without creating files on disk", async () => {
		const sessionManager = SessionManager.inMemory(testDir);
		const harness = await createHarness({ sessionManager });
		harnesses.push(harness);

		expect(sessionManager.getSessionFile()).toBeUndefined();

		harness.setResponses([fauxAssistantMessage("Ephemeral response")]);
		await harness.session.prompt("Ephemeral prompt");

		expect(getUserTexts(harness)).toContain("Ephemeral prompt");
		expect(getAssistantTexts(harness)).toContain("Ephemeral response");
		expect(sessionManager.getSessionFile()).toBeUndefined();
	});
});
