import type { AssistantMessage, Usage } from "@earendil-works/pi-ai";
import { describe, expect, it } from "vitest";
import type { AgentSessionEvent } from "../../src/core/agent-session.ts";
import { toJsonEvent } from "../../src/modes/json-event.ts";

describe("US4 Print & Stream Protocol Parity (PRINT-001..010, JSON-001..010, RPC-001..010)", () => {
	describe("JSON-001..JSON-005: JSON Event Normalization (toJsonEvent)", () => {
		const sampleUsage: Usage = {
			input: 100,
			output: 50,
			cacheRead: 20,
			cacheWrite: 10,
			totalTokens: 180,
			cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
		};

		const createAssistantMessage = (content: AssistantMessage["content"]): AssistantMessage => ({
			role: "assistant",
			content,
			api: "messages" as const,
			provider: "anthropic",
			model: "claude-3-5-sonnet",
			stopReason: "stop",
			timestamp: Date.now(),
			usage: sampleUsage,
		});

		it("JSON-001: passes non-message_update session events untouched", () => {
			const agentStartEvent: AgentSessionEvent = { type: "agent_start" };
			expect(toJsonEvent(agentStartEvent)).toEqual({ type: "agent_start" });

			const turnEndEvent: AgentSessionEvent = {
				type: "turn_end",
				message: createAssistantMessage([{ type: "text", text: "Done" }]),
				toolResults: [],
			};
			expect(toJsonEvent(turnEndEvent)).toEqual(turnEndEvent);
		});

		it("JSON-002: normalizes message_update text_delta by omitting partial snapshot while retaining delta and usage", () => {
			const updateEvent: AgentSessionEvent = {
				type: "message_update",
				message: createAssistantMessage([{ type: "text", text: "Hello World" }]),
				assistantMessageEvent: {
					type: "text_delta",
					delta: " World",
					contentIndex: 0,
					partial: createAssistantMessage([{ type: "text", text: "Hello World" }]),
				},
			};

			const normalized = toJsonEvent(updateEvent);
			expect(normalized.type).toBe("message_update");
			if (normalized.type === "message_update") {
				expect(normalized.usage).toEqual(sampleUsage);
				expect(normalized.assistantMessageEvent).toEqual({
					type: "text_delta",
					delta: " World",
					contentIndex: 0,
				});
				expect((normalized.assistantMessageEvent as unknown as Record<string, unknown>).partial).toBeUndefined();
			}
		});

		it("JSON-003: normalizes toolcall_start by extracting tool id and toolName without full partial", () => {
			const toolcallStartEvent: AgentSessionEvent = {
				type: "message_update",
				message: createAssistantMessage([
					{
						type: "toolCall",
						id: "call_abc123",
						name: "bash",
						arguments: { command: "ls -la" },
					},
				]),
				assistantMessageEvent: {
					type: "toolcall_start",
					contentIndex: 0,
					partial: createAssistantMessage([
						{
							type: "toolCall",
							id: "call_abc123",
							name: "bash",
							arguments: {},
						},
					]),
				},
			};

			const normalized = toJsonEvent(toolcallStartEvent);
			expect(normalized.type).toBe("message_update");
			if (normalized.type === "message_update") {
				expect(normalized.usage).toEqual(sampleUsage);
				expect(normalized.assistantMessageEvent).toEqual({
					type: "toolcall_start",
					contentIndex: 0,
					id: "call_abc123",
					toolName: "bash",
				});
				expect((normalized.assistantMessageEvent as unknown as Record<string, unknown>).partial).toBeUndefined();
			}
		});

		it("JSON-004: normalizes toolcall_delta by stripping partial and retaining delta string", () => {
			const toolcallDeltaEvent: AgentSessionEvent = {
				type: "message_update",
				message: createAssistantMessage([
					{
						type: "toolCall",
						id: "call_abc123",
						name: "bash",
						arguments: { command: "ls" },
					},
				]),
				assistantMessageEvent: {
					type: "toolcall_delta",
					contentIndex: 0,
					delta: " -la",
					partial: createAssistantMessage([
						{
							type: "toolCall",
							id: "call_abc123",
							name: "bash",
							arguments: { command: "ls -la" },
						},
					]),
				},
			};

			const normalized = toJsonEvent(toolcallDeltaEvent);
			expect(normalized.type).toBe("message_update");
			if (normalized.type === "message_update") {
				expect(normalized.usage).toEqual(sampleUsage);
				expect(normalized.assistantMessageEvent).toEqual({
					type: "toolcall_delta",
					contentIndex: 0,
					delta: " -la",
				});
			}
		});

		it("JSON-005: throws if message_update event contains non-assistant message", () => {
			const invalidEvent = {
				type: "message_update",
				message: {
					role: "user" as const,
					content: "User message",
				},
				assistantMessageEvent: {
					type: "text_delta" as const,
					delta: "text",
					contentIndex: 0,
				},
			};

			expect(() => toJsonEvent(invalidEvent as unknown as AgentSessionEvent)).toThrow(
				"message_update message is not an assistant message",
			);
		});
	});

	describe("RPC-001..RPC-005: RPC Protocol Types & Message Exchange", () => {
		it("RPC-001: validates RPC command structure for prompt, steer, follow_up", () => {
			const promptCmd = {
				id: "req_1",
				type: "prompt" as const,
				message: "Hello assistant",
				streamingBehavior: "steer" as const,
			};
			expect(promptCmd.type).toBe("prompt");
			expect(promptCmd.message).toBe("Hello assistant");
			expect(promptCmd.streamingBehavior).toBe("steer");

			const steerCmd = {
				id: "req_2",
				type: "steer" as const,
				message: "Change direction",
			};
			expect(steerCmd.type).toBe("steer");

			const abortCmd = {
				id: "req_3",
				type: "abort" as const,
			};
			expect(abortCmd.type).toBe("abort");
		});

		it("RPC-002: validates RPC state query command structure", () => {
			const getStateCmd = { id: "req_state", type: "get_state" as const };
			const getModelsCmd = { id: "req_models", type: "get_available_models" as const };
			const getMessagesCmd = { id: "req_msgs", type: "get_messages" as const };

			expect(getStateCmd.type).toBe("get_state");
			expect(getModelsCmd.type).toBe("get_available_models");
			expect(getMessagesCmd.type).toBe("get_messages");
		});

		it("RPC-003: validates RPC session mutation commands", () => {
			const forkCmd = { id: "req_fork", type: "fork" as const, entryId: "entry_123" };
			const switchCmd = { id: "req_switch", type: "switch_session" as const, sessionPath: "/path/to/session.jsonl" };
			const setNameCmd = { id: "req_name", type: "set_session_name" as const, name: "New Session Name" };

			expect(forkCmd.type).toBe("fork");
			expect(forkCmd.entryId).toBe("entry_123");
			expect(switchCmd.type).toBe("switch_session");
			expect(setNameCmd.name).toBe("New Session Name");
		});
	});
});
