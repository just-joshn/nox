#!/usr/bin/env node
import { suggestCliCommand } from "./cli/command-suggestion.ts";
import { setupCli } from "./cli/setup.ts";
import { APP_NAME } from "./config.ts";
import { main } from "./main.ts";

setupCli();
const args = process.argv.slice(2);
const suggestion = suggestCliCommand(args);
const optionEnd = args.indexOf("--");
const options = optionEnd < 0 ? args : args.slice(0, optionEnd);
const missingPromptFileValue = options.find(
	(arg, index) =>
		(arg === "--system-prompt-file" || arg === "--append-system-prompt-file") &&
		(options[index + 1] === undefined || options[index + 1].startsWith("--")),
);
if (suggestion) {
	console.error(
		`✘ unknown command "${args[0]}"\n  └ Did you mean ${APP_NAME} ${suggestion}?\n\nRun ${APP_NAME} --help to list commands, or ${APP_NAME} -p "${args[0]}" to send as a prompt.`,
	);
	process.exitCode = 1;
} else if (missingPromptFileValue) {
	console.error(`error: option '${missingPromptFileValue} <file>' argument missing`);
	process.exitCode = 1;
} else {
	main(args);
}
