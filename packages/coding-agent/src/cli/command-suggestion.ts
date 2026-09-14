const COMMANDS = [
	"agents",
	"attach",
	"auth",
	"config",
	"install",
	"kill",
	"list",
	"logs",
	"remove",
	"respawn",
	"rm",
	"stop",
	"uninstall",
	"update",
] as const;

function isCloseTypo(input: string, command: string): boolean {
	if (Math.abs(input.length - command.length) > 1) return false;
	if (input.length === command.length) {
		const mismatches = [...input].flatMap((character, index) => (character === command[index] ? [] : [index]));
		if (mismatches.length === 1) return true;
		return (
			mismatches.length === 2 &&
			mismatches[1] === mismatches[0] + 1 &&
			input[mismatches[0]] === command[mismatches[1]] &&
			input[mismatches[1]] === command[mismatches[0]]
		);
	}
	const [shorter, longer] = input.length < command.length ? [input, command] : [command, input];
	let offset = 0;
	for (let index = 0; index < shorter.length; index++) {
		if (shorter[index] !== longer[index + offset]) {
			offset++;
			if (shorter[index] !== longer[index + offset]) return false;
		}
	}
	return true;
}

export function suggestCliCommand(args: readonly string[]): string | undefined {
	const candidate = args[0];
	if (!candidate || !/^[a-z][a-z-]*$/i.test(candidate)) return undefined;
	const normalized = candidate.toLowerCase();
	if (COMMANDS.some((command) => command === normalized)) return undefined;
	return COMMANDS.find((command) => isCloseTypo(normalized, command));
}
