import type { Api, Model } from "@earendil-works/pi-ai";
import { describe, expect, it } from "vitest";
import { isValidThinkingLevel } from "../../src/cli/args.ts";
import { calculateContextTokens, estimateTokens } from "../../src/core/compaction/index.ts";
import {
	defaultModelPerProvider,
	findExactModelReferenceMatch,
	resolveModelScopeFromModels,
} from "../../src/core/model-resolver.ts";

describe("US2 parity model controls suite (MODEL-001–MODEL-017)", () => {
	const mockModels: Model<Api>[] = [
		{
			id: "claude-opus-4-8",
			provider: "anthropic",
			name: "Claude Opus 4.8",
			api: "anthropic-messages",
			baseUrl: "https://api.anthropic.com",
			input: ["text", "image"],
			contextWindow: 200000,
			maxTokens: 8192,
			reasoning: true,
			cost: { input: 15, output: 75, cacheRead: 1.5, cacheWrite: 18.75 },
		},
		{
			id: "claude-sonnet-5",
			provider: "anthropic",
			name: "Claude Sonnet 5",
			api: "anthropic-messages",
			baseUrl: "https://api.anthropic.com",
			input: ["text", "image"],
			contextWindow: 200000,
			maxTokens: 8192,
			reasoning: true,
			cost: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
		},
		{
			id: "gemini-3.1-pro-preview",
			provider: "google",
			name: "Gemini 3.1 Pro",
			api: "google-genai",
			baseUrl: "https://generativelanguage.googleapis.com",
			input: ["text", "image"],
			contextWindow: 1000000,
			maxTokens: 8192,
			reasoning: true,
			cost: { input: 1.25, output: 5, cacheRead: 0.3, cacheWrite: 1.25 },
		},
	];

	it("MODEL-001 & MODEL-002: resolves exact model reference and canonical provider/modelId", () => {
		// Bare model ID
		const matchBare = findExactModelReferenceMatch("claude-sonnet-5", mockModels);
		expect(matchBare).toBeDefined();
		expect(matchBare?.id).toBe("claude-sonnet-5");
		expect(matchBare?.provider).toBe("anthropic");

		// Canonical provider/modelId
		const matchCanonical = findExactModelReferenceMatch("google/gemini-3.1-pro-preview", mockModels);
		expect(matchCanonical).toBeDefined();
		expect(matchCanonical?.id).toBe("gemini-3.1-pro-preview");
		expect(matchCanonical?.provider).toBe("google");

		// Case-insensitive lookup
		const matchCase = findExactModelReferenceMatch("ANTHROPIC/CLAUDE-OPUS-4-8", mockModels);
		expect(matchCase).toBeDefined();
		expect(matchCase?.id).toBe("claude-opus-4-8");
	});

	it("MODEL-003: provides default model definitions across known providers", () => {
		expect(defaultModelPerProvider.anthropic).toBeDefined();
		expect(defaultModelPerProvider.google).toBeDefined();
		expect(defaultModelPerProvider.openai).toBeDefined();
	});

	it("MODEL-009 & MODEL-010: validates thinking and reasoning levels", () => {
		expect(isValidThinkingLevel("off")).toBe(true);
		expect(isValidThinkingLevel("minimal")).toBe(true);
		expect(isValidThinkingLevel("low")).toBe(true);
		expect(isValidThinkingLevel("medium")).toBe(true);
		expect(isValidThinkingLevel("high")).toBe(true);
		expect(isValidThinkingLevel("xhigh")).toBe(true);
		expect(isValidThinkingLevel("max")).toBe(true);
		expect(isValidThinkingLevel("invalid-level")).toBe(false);
	});

	it("MODEL-013: resolves model scope with thinking level annotation", () => {
		const result = resolveModelScopeFromModels(["anthropic/claude-sonnet-5:high"], mockModels);
		expect(result.scopedModels.length).toBe(1);
		expect(result.scopedModels[0].model.id).toBe("claude-sonnet-5");
		expect(result.scopedModels[0].thinkingLevel).toBe("high");

		const plainResult = resolveModelScopeFromModels(["google/gemini-3.1-pro-preview"], mockModels);
		expect(plainResult.scopedModels.length).toBe(1);
		expect(plainResult.scopedModels[0].model.id).toBe("gemini-3.1-pro-preview");
		expect(plainResult.scopedModels[0].thinkingLevel).toBeUndefined();
	});

	it("Context token estimation and budget calculation", () => {
		const message = { role: "user", content: "Hello world from the model controls test suite!" } as any;
		const tokens = estimateTokens(message);
		expect(tokens).toBeGreaterThan(0);

		const usage = {
			input: 500,
			output: 100,
			cacheWrite: 50,
			cacheRead: 200,
			totalTokens: 850,
		} as any;
		const contextTokens = calculateContextTokens(usage);
		expect(contextTokens).toBe(850);
	});
});
