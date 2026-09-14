import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = (path: string): string => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		reporters: process.env.GITHUB_ACTIONS ? ["dot", "github-actions"] : ["dot"],
	},
	resolve: {
		conditions: ["source"],
		alias: [
			{ find: /^@earendil-works\/chord$/, replacement: src("../chord/src/index.ts") },
			{ find: /^@earendil-works\/chord\/context$/, replacement: src("../chord/src/context/index.ts") },
			{ find: /^@earendil-works\/pi-agent-core$/, replacement: src("../agent/src/index.ts") },
			{ find: /^@earendil-works\/pi-ai$/, replacement: src("../ai/src/index.ts") },
			{ find: /^@earendil-works\/pi-ai\/(.+)$/, replacement: `${src("../ai/src/")}$1.ts` },
			{ find: /^@earendil-works\/pi-telemetry$/, replacement: src("../telemetry/src/index.ts") },
			{ find: /^@earendil-works\/pi-protocol$/, replacement: src("../protocol/src/index.ts") },
		],
	},
	ssr: { resolve: { conditions: ["source"] } },
});
