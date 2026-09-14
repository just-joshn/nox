#!/usr/bin/env node
import { suggestCliCommand } from "./cli/command-suggestion.ts";
import { setupCli } from "./cli/setup.ts";
import { APP_NAME } from "./config.ts";
import { main } from "./main.ts";

setupCli();
const args = process.argv.slice(2);
const suggestion = suggestCliCommand(args);
if (suggestion) {
	console.error(`Unknown command "${args[0]}". Did you mean ${APP_NAME} ${suggestion}?`);
	process.exitCode = 1;
} else {
	main(args);
}
