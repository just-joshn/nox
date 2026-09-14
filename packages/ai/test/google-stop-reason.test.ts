import { FinishReason } from "@google/genai";
import { expect, it } from "vitest";
import { mapStopReason } from "../src/api/google-shared.ts";

it("maps a tool-call limit finish to an error", () => {
	expect(mapStopReason(FinishReason.TOO_MANY_TOOL_CALLS)).toBe("error");
});
