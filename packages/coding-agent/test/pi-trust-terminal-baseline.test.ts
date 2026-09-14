import { getKeybindings, setKeybindings } from "@earendil-works/pi-tui";
import { describe, expect, test } from "vitest";
import { VirtualTerminal } from "../../tui/test/virtual-terminal.ts";
import { KeybindingsManager } from "../src/core/keybindings.ts";
import { TrustSelectorComponent } from "../src/modes/interactive/components/trust-selector.ts";
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

describe("frozen Pi project-trust terminal visuals", () => {
	for (const themeName of themes) {
		for (const width of widths) {
			test(`${themeName} at ${width} columns`, async () => {
				const previousKeybindings = getKeybindings();
				setKeybindings(new KeybindingsManager());
				initTheme(themeName);
				const terminal = new RecordingTerminal(width, 24);
				const ui = createInteractiveTui({
					tuiMode: "regular",
					showHardwareCursor: false,
					logDirectory: "/tmp",
					terminal,
				});
				const selector = new TrustSelectorComponent({
					cwd: "/project",
					savedDecision: null,
					projectTrusted: false,
					onSelect: () => {},
					onCancel: () => {},
				});
				ui.addChild(selector);
				ui.start();
				try {
					await terminal.waitForRender();
					const trustSelected = { viewport: terminal.getViewport(), cursor: terminal.getCursorPosition() };
					selector.handleInput("\x1b[B");
					selector.handleInput("\x1b[B");
					ui.requestRender();
					await terminal.waitForRender();
					const declineSelected = { viewport: terminal.getViewport(), cursor: terminal.getCursorPosition() };
					expect({
						width,
						theme: themeName,
						trustSelected,
						declineSelected,
						ansi: terminal.writes,
					}).toMatchSnapshot();
				} finally {
					ui.stop();
					initTheme("dark");
					setKeybindings(previousKeybindings);
				}
			});
		}
	}
});
