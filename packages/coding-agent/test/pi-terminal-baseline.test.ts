import { describe, expect, test } from "vitest";
import { VirtualTerminal } from "../../tui/test/virtual-terminal.ts";
import { createReadToolDefinition } from "../src/core/tools/read.ts";
import { ToolExecutionComponent } from "../src/modes/interactive/components/tool-execution.ts";
import { createInteractiveTui } from "../src/modes/interactive/interactive-mode.ts";
import { initTheme } from "../src/modes/interactive/theme/theme.ts";

class RecordingTerminal extends VirtualTerminal {
	readonly writes: string[] = [];

	override write(data: string): void {
		this.writes.push(data);
		super.write(data);
	}
}

const widths = [40, 80, 120] as const;
const themes = ["dark", "light"] as const;
const cwd = "/visual-fixture";

describe("frozen Pi terminal read-tool visuals", () => {
	for (const themeName of themes) {
		for (const width of widths) {
			test(`${themeName} at ${width} columns`, async () => {
				initTheme(themeName);
				const terminal = new RecordingTerminal(width, 24);
				const ui = createInteractiveTui({
					tuiMode: "regular",
					showHardwareCursor: false,
					logDirectory: "/tmp",
					terminal,
				});
				const component = new ToolExecutionComponent(
					"read",
					"visual-read",
					{ path: "notes.txt" },
					{},
					createReadToolDefinition(cwd),
					ui,
					cwd,
				);
				ui.addChild(component);
				ui.start();
				try {
					await terminal.waitForRender();
					const request = { viewport: terminal.getViewport(), cursor: terminal.getCursorPosition() };
					component.updateResult({ content: [{ type: "text", text: "No such file" }], isError: true });
					ui.requestRender();
					await terminal.waitForRender();
					const error = { viewport: terminal.getViewport(), cursor: terminal.getCursorPosition() };
					const retry = new ToolExecutionComponent(
						"read",
						"visual-read-retry",
						{ path: "notes.txt" },
						{},
						createReadToolDefinition(cwd),
						ui,
						cwd,
					);
					ui.addChild(retry);
					retry.updateResult({ content: [{ type: "text", text: "one\ntwo" }], isError: false });
					ui.requestRender();
					await terminal.waitForRender();
					const recovery = { viewport: terminal.getViewport(), cursor: terminal.getCursorPosition() };
					expect({ width, theme: themeName, request, error, recovery, ansi: terminal.writes }).toMatchSnapshot();
				} finally {
					ui.stop();
					initTheme("dark");
				}
			});
		}
	}
});
