import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fauxAssistantMessage } from "@earendil-works/pi-ai";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BackgroundSessionManager } from "../../src/core/background-session.ts";
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

	describe("Background Session Lifecycle (SUR-BG-003, SUR-BG-011–016)", () => {
		it("SUR-BG-003: launches a background session with persistent record and log file", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({
				cwd: testDir,
				prompt: "Run tests in background",
				name: "test-bg-task",
			});

			expect(info.id).toBeDefined();
			expect(info.id.length).toBeGreaterThan(0);
			expect(info.status).toBe("running");
			expect(info.name).toBe("test-bg-task");
			expect(info.prompt).toBe("Run tests in background");
			expect(existsSync(info.logFile)).toBe(true);
			expect(existsSync(info.sessionFile)).toBe(true);
		});

		it("SUR-BG-012: lists background sessions with optional cwd filter and completion states", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const subDir = join(testDir, "subproject");
			mkdirSync(subDir, { recursive: true });

			const session1 = await bgManager.launch({ cwd: testDir, prompt: "Task 1" });
			const session2 = await bgManager.launch({ cwd: subDir, prompt: "Task 2" });

			const allSessions = await bgManager.list({ all: true });
			expect(allSessions.length).toBe(2);
			expect(allSessions.some((s) => s.id === session1.id)).toBe(true);

			const subDirSessions = await bgManager.list({ cwd: subDir });
			expect(subDirSessions.length).toBe(1);
			expect(subDirSessions[0].id).toBe(session2.id);
		});

		it("SUR-BG-011: attaches to a background session restoring session file", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Attachable task" });

			const attached = await bgManager.attach(info.id);
			expect(attached.info.id).toBe(info.id);
			expect(existsSync(attached.sessionFile)).toBe(true);
		});

		it("SUR-BG-013: reads logs from a background session", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Log task" });

			const logs = await bgManager.logs(info.id);
			expect(typeof logs).toBe("string");
		});

		it("SUR-BG-014: stops an active background session", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Stoppable task" });
			expect(info.status).toBe("running");

			const stopped = await bgManager.stop(info.id);
			expect(stopped).toBe(true);

			const updated = await bgManager.get(info.id);
			expect(updated?.status).toBe("stopped");
		});

		it("SUR-BG-015: restarts a stopped background session", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Restartable task" });
			await bgManager.stop(info.id);

			const restarted = await bgManager.restart(info.id);
			expect(restarted.id).toBe(info.id);
			expect(restarted.status).toBe("running");
		});

		it("SUR-BG-016: removes a stopped background session and cleans up records", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Removable task" });
			await bgManager.stop(info.id);

			const removed = await bgManager.remove(info.id);
			expect(removed).toBe(true);

			const check = await bgManager.get(info.id);
			expect(check).toBeUndefined();
		});

		it("SUR-BG-017: records unexpected exit with status, exitCode, and redacted error log", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Crashable task" });

			const updated = await bgManager.recordExit(
				info.id,
				1,
				"Process failed with token: sk-ant-api03-secretkey1234567890abcdef123456",
			);
			expect(updated.status).toBe("error");
			expect(updated.exitCode).toBe(1);

			const log = await bgManager.logs(info.id);
			expect(log).toContain("Process exited with code 1");
			expect(log).toContain("[REDACTED_API_KEY]");
			expect(log).not.toContain("secretkey1234567890abcdef123456");
		});

		it("SUR-BG-018: recovers a failed session into running state", async () => {
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Recoverable task" });
			await bgManager.recordExit(info.id, 1, "Crash");

			const recovered = await bgManager.recover(info.id);
			expect(recovered.status).toBe("running");
			expect(recovered.exitCode).toBeUndefined();

			const log = await bgManager.logs(info.id);
			expect(log).toContain("Background session recovered");
		});

		it("handleBackgroundCommand: handles agents, attach, logs, stop, respawn, and rm subcommands", async () => {
			const { handleBackgroundCommand } = await import("../../src/core/background-session.ts");
			const bgManager = new BackgroundSessionManager({ agentDir: testDir });
			const info = await bgManager.launch({ cwd: testDir, prompt: "Command task" });

			// agents command
			const agentsHandled = await handleBackgroundCommand(["agents", "--json"], { agentDir: testDir });
			expect(agentsHandled).toBe(true);

			// logs command
			const logsHandled = await handleBackgroundCommand(["logs", info.id], { agentDir: testDir });
			expect(logsHandled).toBe(true);

			// stop command
			const stopHandled = await handleBackgroundCommand(["stop", info.id], { agentDir: testDir });
			expect(stopHandled).toBe(true);
			const stoppedRecord = await bgManager.get(info.id);
			expect(stoppedRecord?.status).toBe("stopped");

			// respawn command
			const respawnHandled = await handleBackgroundCommand(["respawn", info.id], { agentDir: testDir });
			expect(respawnHandled).toBe(true);
			const restartedRecord = await bgManager.get(info.id);
			expect(restartedRecord?.status).toBe("running");

			// rm command
			const rmHandled = await handleBackgroundCommand(["rm", info.id], { agentDir: testDir });
			expect(rmHandled).toBe(true);
			const deletedRecord = await bgManager.get(info.id);
			expect(deletedRecord).toBeUndefined();
		});
	});
});
