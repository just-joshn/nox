/**
 * Background session management and lifecycle operations
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getAgentDir } from "../config.ts";
import { resolvePath } from "../utils/paths.ts";
import { stripBom } from "../utils/text.ts";

export type BackgroundSessionStatus = "running" | "stopped" | "completed" | "error";

export interface BackgroundSessionInfo {
	readonly id: string;
	readonly name?: string;
	readonly cwd: string;
	readonly prompt: string;
	readonly agent?: string;
	readonly status: BackgroundSessionStatus;
	readonly createdAt: number;
	readonly updatedAt: number;
	readonly exitCode?: number;
	readonly pid?: number;
	readonly logFile: string;
	readonly sessionFile: string;
}

export interface LaunchBackgroundOptions {
	readonly cwd: string;
	readonly prompt: string;
	readonly agent?: string;
	readonly name?: string;
}

export interface ListBackgroundOptions {
	readonly cwd?: string;
	readonly all?: boolean;
}

export interface BackgroundSessionManagerOptions {
	readonly agentDir?: string;
	readonly sessionsDir?: string;
}

export function redactSensitive(text: string): string {
	return text
		.replace(/sk-[a-zA-Z0-9_-]{20,}/g, "[REDACTED_API_KEY]")
		.replace(/(Bearer\s+)[a-zA-Z0-9_.-]{20,}/gi, "$1[REDACTED_TOKEN]")
		.replace(/(api[_-]?key\s*[:=]\s*["']?)[a-zA-Z0-9_.-]{8,}(["']?)/gi, "$1[REDACTED]$2");
}

function generateBackgroundId(): string {
	const timestamp = Date.now().toString(36);
	const random = Math.random().toString(36).slice(2, 8);
	return `bg-${timestamp}-${random}`;
}

export class BackgroundSessionManager {
	private readonly bgDir: string;

	constructor(options: BackgroundSessionManagerOptions = {}) {
		const agentDir = resolvePath(options.agentDir ?? getAgentDir());
		this.bgDir = options.sessionsDir ? resolvePath(options.sessionsDir) : join(agentDir, "background-sessions");
	}

	private getRecordPath(id: string): string {
		return join(this.bgDir, `${id}.json`);
	}

	private getLogPath(id: string): string {
		return join(this.bgDir, `${id}.log`);
	}

	private getSessionFilePath(id: string): string {
		return join(this.bgDir, `${id}.session.jsonl`);
	}

	private readRecord(id: string): BackgroundSessionInfo | undefined {
		const recordPath = this.getRecordPath(id);
		if (!existsSync(recordPath)) {
			return undefined;
		}
		try {
			const content = stripBom(readFileSync(recordPath, "utf-8"));
			return JSON.parse(content) as BackgroundSessionInfo;
		} catch {
			return undefined;
		}
	}

	private ensureBgDir(): void {
		if (!existsSync(this.bgDir)) {
			mkdirSync(this.bgDir, { recursive: true });
		}
	}

	private writeRecord(info: BackgroundSessionInfo): void {
		this.ensureBgDir();
		const recordPath = this.getRecordPath(info.id);
		writeFileSync(recordPath, JSON.stringify(info, null, 2), "utf-8");
	}

	async launch(options: LaunchBackgroundOptions): Promise<BackgroundSessionInfo> {
		this.ensureBgDir();
		const id = generateBackgroundId();
		const now = Date.now();
		const resolvedCwd = resolvePath(options.cwd);
		const logFile = this.getLogPath(id);
		const sessionFile = this.getSessionFilePath(id);

		// Initialize empty log and session file
		writeFileSync(logFile, `[${new Date(now).toISOString()}] Background task launched: ${options.prompt}\n`, "utf-8");
		const header = {
			type: "session",
			version: 3,
			id,
			timestamp: new Date(now).toISOString(),
			cwd: resolvedCwd,
		};
		writeFileSync(sessionFile, `${JSON.stringify(header)}\n`, "utf-8");

		const info: BackgroundSessionInfo = {
			id,
			name: options.name,
			cwd: resolvedCwd,
			prompt: options.prompt,
			agent: options.agent,
			status: "running",
			createdAt: now,
			updatedAt: now,
			logFile,
			sessionFile,
		};

		this.writeRecord(info);
		return info;
	}

	async list(options: ListBackgroundOptions = {}): Promise<BackgroundSessionInfo[]> {
		if (!existsSync(this.bgDir)) {
			return [];
		}

		const files = readdirSync(this.bgDir);
		const records: BackgroundSessionInfo[] = [];

		for (const file of files) {
			if (!file.endsWith(".json") || file.endsWith(".session.jsonl")) continue;
			const id = file.slice(0, -5);
			const record = this.readRecord(id);
			if (record) {
				if (options.cwd) {
					const filterCwd = resolvePath(options.cwd);
					if (record.cwd !== filterCwd) continue;
				}
				if (!options.all && record.status === "completed") {
					continue;
				}
				records.push(record);
			}
		}

		return records.sort((a, b) => b.createdAt - a.createdAt);
	}

	async get(id: string): Promise<BackgroundSessionInfo | undefined> {
		return this.readRecord(id);
	}

	async logs(id: string, options: { tail?: number } = {}): Promise<string> {
		const logPath = this.getLogPath(id);
		if (!existsSync(logPath)) {
			return "";
		}
		try {
			const content = stripBom(readFileSync(logPath, "utf-8"));
			if (options.tail && options.tail > 0) {
				const lines = content.split("\n");
				return lines.slice(-options.tail).join("\n");
			}
			return content;
		} catch {
			return "";
		}
	}

	async stop(id: string): Promise<boolean> {
		const record = this.readRecord(id);
		if (!record) {
			return false;
		}

		const now = Date.now();
		const updated: BackgroundSessionInfo = {
			...record,
			status: "stopped",
			updatedAt: now,
		};
		this.writeRecord(updated);
		return true;
	}

	async restart(id: string): Promise<BackgroundSessionInfo> {
		const record = this.readRecord(id);
		if (!record) {
			throw new Error(`Background session not found: ${id}`);
		}

		const now = Date.now();
		const updated: BackgroundSessionInfo = {
			...record,
			status: "running",
			exitCode: undefined,
			updatedAt: now,
		};
		this.writeRecord(updated);
		return updated;
	}

	async recordExit(id: string, exitCode: number, error?: string): Promise<BackgroundSessionInfo> {
		const record = this.readRecord(id);
		if (!record) {
			throw new Error(`Background session not found: ${id}`);
		}

		const now = Date.now();
		const status: BackgroundSessionStatus = exitCode === 0 ? "completed" : "error";
		const updated: BackgroundSessionInfo = {
			...record,
			status,
			exitCode,
			updatedAt: now,
		};
		this.writeRecord(updated);

		const logPath = this.getLogPath(id);
		const errorText = error ? `: ${redactSensitive(error)}` : "";
		const logLine = `[${new Date(now).toISOString()}] Process exited with code ${exitCode}${errorText}\n`;
		try {
			if (existsSync(logPath)) {
				const current = readFileSync(logPath, "utf-8");
				writeFileSync(logPath, `${current}${logLine}`, "utf-8");
			} else {
				writeFileSync(logPath, logLine, "utf-8");
			}
		} catch {
			// ignore log write errors
		}

		return updated;
	}

	async recover(id: string): Promise<BackgroundSessionInfo> {
		const record = this.readRecord(id);
		if (!record) {
			throw new Error(`Background session not found: ${id}`);
		}

		const now = Date.now();
		const updated: BackgroundSessionInfo = {
			...record,
			status: "running",
			exitCode: undefined,
			updatedAt: now,
		};
		this.writeRecord(updated);

		const logPath = this.getLogPath(id);
		const logLine = `[${new Date(now).toISOString()}] Background session recovered\n`;
		try {
			if (existsSync(logPath)) {
				const current = readFileSync(logPath, "utf-8");
				writeFileSync(logPath, `${current}${logLine}`, "utf-8");
			} else {
				writeFileSync(logPath, logLine, "utf-8");
			}
		} catch {
			// ignore log write errors
		}

		return updated;
	}

	async remove(id: string): Promise<boolean> {
		const recordPath = this.getRecordPath(id);
		const logPath = this.getLogPath(id);
		const sessionPath = this.getSessionFilePath(id);

		let removedAny = false;
		for (const p of [recordPath, logPath, sessionPath]) {
			if (existsSync(p)) {
				try {
					rmSync(p, { force: true });
					removedAny = true;
				} catch {
					// ignore removal errors
				}
			}
		}

		return removedAny;
	}

	async attach(id: string): Promise<{ sessionFile: string; info: BackgroundSessionInfo }> {
		const record = this.readRecord(id);
		if (!record) {
			throw new Error(`Background session not found: ${id}`);
		}
		return {
			sessionFile: record.sessionFile,
			info: record,
		};
	}
}

async function handleAgentsSubcommand(args: readonly string[], bgManager: BackgroundSessionManager): Promise<boolean> {
	const json = args.includes("--json");
	const all = args.includes("--all");
	const cwdIdx = args.indexOf("--cwd");
	const filterCwd = cwdIdx !== -1 && args[cwdIdx + 1] ? args[cwdIdx + 1] : undefined;

	const sessions = await bgManager.list({ all, cwd: filterCwd });

	if (json) {
		console.log(JSON.stringify(sessions, null, 2));
	} else if (sessions.length === 0) {
		console.log("No background sessions found.");
	} else {
		console.log("ID\tSTATUS\tCREATED\tCWD\tPROMPT");
		for (const s of sessions) {
			const date = new Date(s.createdAt).toISOString().slice(0, 19).replace("T", " ");
			const shortPrompt = s.prompt.length > 40 ? `${s.prompt.slice(0, 37)}...` : s.prompt;
			console.log(`${s.id}\t${s.status}\t${date}\t${s.cwd}\t${shortPrompt}`);
		}
	}
	process.exitCode = 0;
	return true;
}

async function handleAttachSubcommand(args: readonly string[], bgManager: BackgroundSessionManager): Promise<boolean> {
	const id = args[0];
	if (!id || id.startsWith("-")) {
		console.error("Error: attach requires a session ID");
		process.exitCode = 1;
		return true;
	}

	try {
		const session = await bgManager.attach(id);
		console.log(`Attached to session ${session.info.id}`);
		process.exitCode = 0;
	} catch (error) {
		const msg = error instanceof Error ? error.message : String(error);
		console.error(`Error: ${msg}`);
		process.exitCode = 1;
	}
	return true;
}

async function handleLogsSubcommand(args: readonly string[], bgManager: BackgroundSessionManager): Promise<boolean> {
	const id = args[0];
	if (!id || id.startsWith("-")) {
		console.error("Error: logs requires a session ID");
		process.exitCode = 1;
		return true;
	}

	const tailIdx = args.indexOf("--tail");
	const tail = tailIdx !== -1 && args[tailIdx + 1] ? parseInt(args[tailIdx + 1], 10) : undefined;

	const info = await bgManager.get(id);
	if (!info) {
		console.error(`Error: Background session not found: ${id}`);
		process.exitCode = 1;
		return true;
	}

	const content = await bgManager.logs(id, { tail });
	if (content) {
		process.stdout.write(content.endsWith("\n") ? content : `${content}\n`);
	}
	process.exitCode = 0;
	return true;
}

async function handleStopSubcommand(
	args: readonly string[],
	bgManager: BackgroundSessionManager,
	commandName: string,
): Promise<boolean> {
	const id = args[0];
	if (!id || id.startsWith("-")) {
		console.error(`Error: ${commandName} requires a session ID`);
		process.exitCode = 1;
		return true;
	}

	const stopped = await bgManager.stop(id);
	if (!stopped) {
		console.error(`Error: Background session not found: ${id}`);
		process.exitCode = 1;
		return true;
	}

	console.log(`Background session ${id} stopped.`);
	process.exitCode = 0;
	return true;
}

async function handleRespawnSubcommand(args: readonly string[], bgManager: BackgroundSessionManager): Promise<boolean> {
	if (args.includes("--all")) {
		const allSessions = await bgManager.list({ all: true });
		const stoppable = allSessions.filter((s) => s.status === "stopped" || s.status === "error");
		for (const s of stoppable) {
			await bgManager.restart(s.id);
		}
		console.log(`Respawned ${stoppable.length} background session(s).`);
		process.exitCode = 0;
		return true;
	}

	const id = args[0];
	if (!id || id.startsWith("-")) {
		console.error("Error: respawn requires a session ID or --all");
		process.exitCode = 1;
		return true;
	}

	try {
		await bgManager.restart(id);
		console.log(`Background session ${id} respawned.`);
		process.exitCode = 0;
	} catch (error) {
		const msg = error instanceof Error ? error.message : String(error);
		console.error(`Error: ${msg}`);
		process.exitCode = 1;
	}
	return true;
}

async function handleRemoveSubcommand(args: readonly string[], bgManager: BackgroundSessionManager): Promise<boolean> {
	const id = args[0];
	if (!id || id.startsWith("-")) {
		console.error("Error: rm requires a session ID");
		process.exitCode = 1;
		return true;
	}

	const removed = await bgManager.remove(id);
	if (!removed) {
		console.error(`Error: Background session not found: ${id}`);
		process.exitCode = 1;
		return true;
	}

	console.log(`Background session ${id} removed.`);
	process.exitCode = 0;
	return true;
}

export async function handleBackgroundCommand(
	args: readonly string[],
	options: { cwd?: string; agentDir?: string } = {},
): Promise<boolean> {
	const command = args[0]?.toLowerCase();
	if (!command) return false;

	if (!["agents", "attach", "logs", "stop", "kill", "respawn", "rm"].includes(command)) {
		return false;
	}

	const bgManager = new BackgroundSessionManager({ agentDir: options.agentDir });

	switch (command) {
		case "agents":
			return handleAgentsSubcommand(args.slice(1), bgManager);
		case "attach":
			return handleAttachSubcommand(args.slice(1), bgManager);
		case "logs":
			return handleLogsSubcommand(args.slice(1), bgManager);
		case "stop":
		case "kill":
			return handleStopSubcommand(args.slice(1), bgManager, command);
		case "respawn":
			return handleRespawnSubcommand(args.slice(1), bgManager);
		case "rm":
			return handleRemoveSubcommand(args.slice(1), bgManager);
		default:
			return false;
	}
}
