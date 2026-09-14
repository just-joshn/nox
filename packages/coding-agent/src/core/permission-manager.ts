/**
 * Permission evaluation and access control management
 */

import { getAgentDir } from "../config.ts";
import { canonicalizePath, isSubpath, resolvePath } from "../utils/paths.ts";

export type PermissionMode =
	| "default"
	| "manual"
	| "acceptEdits"
	| "plan"
	| "auto"
	| "dontAsk"
	| "bypassPermissions"
	| "restricted";

export type PermissionAction = "allow" | "deny" | "ask";

export interface PermissionRule {
	readonly action: PermissionAction;
	readonly tool: string;
	readonly pattern?: string;
	readonly path?: string;
}

export interface PermissionEvaluationResult {
	readonly decision: "allow" | "deny" | "prompt";
	readonly reason?: string;
	readonly rule?: PermissionRule;
}

export interface ToolCallContext {
	readonly tool: string;
	readonly params?: Record<string, unknown>;
	readonly cwd: string;
	readonly interactive?: boolean;
}

export interface PermissionManagerOptions {
	readonly mode?: PermissionMode;
	readonly rules?: readonly PermissionRule[];
	readonly agentDir?: string;
	readonly cwd?: string;
	readonly allowedPaths?: readonly string[];
}

const READ_ONLY_TOOLS = new Set(["Read", "read", "Glob", "glob", "Grep", "grep", "find"]);

const MUTATING_TOOLS = new Set(["Edit", "edit", "Write", "write", "NotebookEdit"]);

function globToRegex(pattern: string): RegExp {
	if (pattern.endsWith(" *")) {
		const prefix = pattern.slice(0, -2);
		const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		return new RegExp(`^${escaped}(\\s+.*)?$`, "i");
	}
	const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
	return new RegExp(`^${escaped}$`, "i");
}

function matchesToolName(ruleTool: string, targetTool: string): boolean {
	if (ruleTool === "*" || ruleTool.toLowerCase() === targetTool.toLowerCase()) {
		return true;
	}
	if (ruleTool.includes("*")) {
		return globToRegex(ruleTool).test(targetTool);
	}
	return false;
}

function matchesCommand(rulePattern: string | undefined, command: string | undefined): boolean {
	if (!rulePattern) return true;
	if (!command) return false;
	return globToRegex(rulePattern).test(command.trim());
}

function matchesPathPattern(rulePath: string | undefined, targetPath: string | undefined, cwd: string): boolean {
	if (!rulePath) return true;
	if (!targetPath) return false;
	const resolvedTarget = resolvePath(targetPath, cwd);
	const resolvedRule = resolvePath(rulePath, cwd);
	if (resolvedTarget === resolvedRule) return true;
	if (isSubpath(resolvedRule, resolvedTarget)) return true;
	return false;
}

export class PermissionManager {
	private readonly mode: PermissionMode;
	private readonly rules: readonly PermissionRule[];
	private readonly allowedPaths: readonly string[];
	private readonly agentDir: string;

	constructor(options: PermissionManagerOptions = {}) {
		this.mode = options.mode ?? "default";
		this.rules = options.rules ?? [];
		this.agentDir = resolvePath(options.agentDir ?? getAgentDir());
		const defaultCwd = options.cwd ?? process.cwd();
		this.allowedPaths = (options.allowedPaths ?? [defaultCwd]).map((p) => canonicalizePath(resolvePath(p)));
	}

	getMode(): PermissionMode {
		return this.mode;
	}

	getRules(): readonly PermissionRule[] {
		return this.rules;
	}

	isPathInScope(filePath: string, cwd: string): boolean {
		const resolved = canonicalizePath(resolvePath(filePath, cwd));
		return this.allowedPaths.some((allowed) => resolved === allowed || isSubpath(allowed, resolved));
	}

	private findMatchingRules(context: ToolCallContext): PermissionRule[] {
		const matching: PermissionRule[] = [];
		const commandParam = typeof context.params?.command === "string" ? context.params.command : undefined;
		const pathParam =
			typeof context.params?.file_path === "string"
				? context.params.file_path
				: typeof context.params?.path === "string"
					? context.params.path
					: undefined;

		for (const rule of this.rules) {
			if (!matchesToolName(rule.tool, context.tool)) {
				continue;
			}
			if (rule.pattern && !matchesCommand(rule.pattern, commandParam)) {
				continue;
			}
			if (rule.path && !matchesPathPattern(rule.path, pathParam, context.cwd)) {
				continue;
			}
			matching.push(rule);
		}

		return matching;
	}

	evaluate(context: ToolCallContext): PermissionEvaluationResult {
		const pathParam =
			typeof context.params?.file_path === "string"
				? context.params.file_path
				: typeof context.params?.path === "string"
					? context.params.path
					: undefined;

		const inScope = pathParam ? this.isPathInScope(pathParam, context.cwd) : true;

		// 1. Restricted mode safeguards
		if (this.mode === "restricted") {
			if (context.tool.toLowerCase() === "bash" || context.tool.toLowerCase() === "webfetch") {
				return { decision: "deny", reason: "Tool denied in restricted mode" };
			}
			if (pathParam && !inScope) {
				return { decision: "deny", reason: "Path outside workspace denied in restricted mode" };
			}
		}

		// 2. Plan mode safeguards
		if (this.mode === "plan" && MUTATING_TOOLS.has(context.tool)) {
			return { decision: "deny", reason: "Modifications not allowed in plan mode" };
		}

		// 3. Bypass permissions mode
		if (this.mode === "bypassPermissions") {
			return { decision: "allow" };
		}

		// 4. Rule matching: deny > ask > allow
		const matching = this.findMatchingRules(context);
		const denyRule = matching.find((r) => r.action === "deny");
		if (denyRule) {
			return { decision: "deny", reason: "Explicit deny rule matched", rule: denyRule };
		}

		const askRule = matching.find((r) => r.action === "ask");
		if (askRule) {
			return {
				decision: context.interactive ? "prompt" : "deny",
				reason: context.interactive ? "Prompt required by ask rule" : "Unattended denial by ask rule",
				rule: askRule,
			};
		}

		const allowRule = matching.find((r) => r.action === "allow");
		if (allowRule) {
			return { decision: "allow", rule: allowRule };
		}

		// 5. Mode default resolution
		if (this.mode === "acceptEdits" && MUTATING_TOOLS.has(context.tool) && inScope) {
			return { decision: "allow", reason: "Auto-approved in acceptEdits mode" };
		}

		if (this.mode === "dontAsk") {
			if (READ_ONLY_TOOLS.has(context.tool) && inScope) {
				return { decision: "allow" };
			}
			return { decision: "deny", reason: "Interactive prompt suppressed in dontAsk mode" };
		}

		// Default / Manual mode: Read-only in-scope tools auto-allowed, mutating tools prompt
		if (READ_ONLY_TOOLS.has(context.tool) && inScope) {
			return { decision: "allow" };
		}

		return {
			decision: context.interactive ? "prompt" : "deny",
			reason: context.interactive ? "Interactive approval required" : "Unattended execution denied without rule",
		};
	}

	withAdditionalRules(additional: readonly PermissionRule[]): PermissionManager {
		return new PermissionManager({
			mode: this.mode,
			rules: [...this.rules, ...additional],
			agentDir: this.agentDir,
			allowedPaths: this.allowedPaths,
		});
	}

	withMode(newMode: PermissionMode): PermissionManager {
		return new PermissionManager({
			mode: newMode,
			rules: this.rules,
			agentDir: this.agentDir,
			allowedPaths: this.allowedPaths,
		});
	}
}
