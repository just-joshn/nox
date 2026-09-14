import type { TUI } from "@earendil-works/pi-tui";
import { describe, expect, test } from "vitest";
import { createReadToolDefinition } from "../src/core/tools/read.ts";
import { ToolExecutionComponent } from "../src/modes/interactive/components/tool-execution.ts";
import { initTheme } from "../src/modes/interactive/theme/theme.ts";

const widths = [1, 40, 80, 120] as const;
const themes = ["dark", "light"] as const;
const cwd = "/visual-fixture";
const ui = { requestRender: () => {} } as unknown as TUI;

describe("frozen Pi read-tool visuals", () => {
	for (const themeName of themes) {
		for (const width of widths) {
			test(`${themeName} at ${width} columns`, () => {
				initTheme(themeName);
				const tool = createReadToolDefinition(cwd);
				const component = new ToolExecutionComponent(
					"read",
					"visual-read",
					{ path: "notes.txt" },
					{},
					tool,
					ui,
					cwd,
				);
				const request = component.render(width);
				component.updateResult({ content: [{ type: "text", text: "one\ntwo" }], isError: false });
				const success = component.render(width);
				component.updateResult({ content: [{ type: "text", text: "No such file" }], isError: true });
				const error = component.render(width);
				expect({ width, theme: themeName, request, success, error }).toMatchSnapshot();
			});
		}
	}
});
