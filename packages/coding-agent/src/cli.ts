#!/usr/bin/env node
import { suggestCliCommand } from "./cli/command-suggestion.ts";
import { setupCli } from "./cli/setup.ts";
import { APP_NAME } from "./config.ts";
import { main } from "./main.ts";

setupCli();
const args = process.argv.slice(2);
const suggestion = suggestCliCommand(args);
if (suggestion) {
	console.error(
		`✘ unknown command "${args[0]}"\n  └ Did you mean ${APP_NAME} ${suggestion}?\n\nRun ${APP_NAME} --help to list commands, or ${APP_NAME} -p "${args[0]}" to send as a prompt.`,
	);
	process.exitCode = 1;
} else {
	main(args);
}
