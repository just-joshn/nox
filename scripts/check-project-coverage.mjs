import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const METRICS = ["lines", "statements", "functions", "branches"];
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OWNERS = ["chord", "telemetry", "ai", "agent", "protocol", "client", "server", "coding-agent", "tui", "session-backends/sqlite-node"];

function countCoverage(values) {
	const counts = Object.values(values).flat();
	return { covered: counts.filter((count) => count > 0).length, total: counts.length };
}

export function summarizeIstanbulFile(path, entry) {
	const lineHits = Object.entries(entry.statementMap).reduce((lines, [id, statement]) => {
		const line = statement.start.line;
		return { ...lines, [line]: Math.max(lines[line] ?? 0, entry.s[id] ?? 0) };
	}, {});
	return {
		path: resolve(path),
		lines: countCoverage(lineHits),
		statements: countCoverage(entry.s),
		functions: countCoverage(entry.f),
		branches: countCoverage(entry.b),
	};
}

export function aggregateCoverage(reports, expectedOwners) {
	const expected = new Set(expectedOwners);
	const owners = reports.map((report) => report.owner);
	if (new Set(owners).size !== owners.length || owners.some((owner) => !expected.has(owner))) {
		throw new Error("Unexpected or duplicate package in coverage reports");
	}
	for (const owner of expected) {
		if (!owners.includes(owner)) throw new Error(`Missing package: ${owner}`);
	}
	const files = reports.flatMap((report) => report.files ?? []);
	for (const report of reports) {
		if (!Array.isArray(report.files) || report.files.length === 0) {
			throw new Error(`Unmeasured package: ${report.owner}`);
		}
	}
	if (new Set(files.map((file) => file.path)).size !== files.length) {
		throw new Error("Duplicate source ownership in coverage reports");
	}
	const result = Object.fromEntries(METRICS.map((metric) => {
		const value = files.reduce((sum, file) => {
			const item = file[metric];
			if (!item || !Number.isInteger(item.covered) || !Number.isInteger(item.total) || item.covered < 0 || item.total < item.covered) {
				throw new Error(`Invalid or unmeasured ${metric} coverage for ${file.path}`);
			}
			return { covered: sum.covered + item.covered, total: sum.total + item.total };
		}, { covered: 0, total: 0 });
		if (value.total === 0) throw new Error(`Zero denominator for ${metric}`);
		return [metric, { ...value, pct: (value.covered / value.total) * 100 }];
	}));
	const failedMetrics = METRICS.filter((metric) => result[metric].pct < 80);
	return { ...result, failedMetrics, passes: failedMetrics.length === 0 };
}

function childEnvironment(home) {
	const allowed = ["PATH", "TMPDIR", "TMP", "TEMP", "LANG", "LC_ALL", "TZ", "SystemRoot", "COMSPEC", "PATHEXT"];
	const entries = allowed.filter((key) => process.env[key] !== undefined).map((key) => [key, process.env[key]]);
	return {
		...Object.fromEntries(entries),
		HOME: home,
		XDG_CONFIG_HOME: home,
		PI_AGENT_DIR: join(home, "pi-agent"),
		PI_OFFLINE: "1",
		NO_COLOR: "1",
		NODE_OPTIONS: `--import=${join(ROOT, "scripts", "offline-test-guard.mjs")}`,
	};
}

function runOwner(owner, scratch) {
	const cwd = join(ROOT, "packages", owner);
	const output = join(scratch, owner.replaceAll("/", "-"));
	const bin = join(ROOT, "node_modules", ".bin", owner === "tui" ? "c8" : "vitest");
	const tests = owner === "tui" ? readdirSync(join(cwd, "test")).filter((name) => name.endsWith(".test.ts")).map((name) => join("test", name)) : [];
	const excludedAiTests = owner === "ai"
		? readdirSync(join(cwd, "test")).filter((name) => name.endsWith(".test.ts") && (
			name === "stream.test.ts" || name === "tokens.test.ts" || name === "openrouter-oauth.test.ts" ||
			name.endsWith("-e2e.test.ts") || readFileSync(join(cwd, "test", name), "utf8").includes('from "./oauth.ts"')
		)).map((name) => `--exclude=test/${name}`)
		: [];
	const args = owner === "tui"
		? ["--all", "--include", "src/**/*.ts", "--reporter=json", `--reports-dir=${output}`, "node", "--test", "--test-reporter=dot", ...tests]
		: ["--run", "--reporter=dot", "--bail=1", "--testTimeout=5000", "--coverage", "--coverage.provider=v8", "--coverage.reporter=json", `--coverage.reportsDirectory=${output}`, "--coverage.include=src/**/*.{ts,tsx}", "--coverage.all=true", ...excludedAiTests];
	const run = spawnSync(bin, args, { cwd, env: childEnvironment(scratch), stdio: "inherit", timeout: 120000 });
	if (run.error || run.status !== 0) throw new Error(`Coverage tests failed for ${owner}: ${run.error?.message ?? run.status}`);
	const coverage = JSON.parse(readFileSync(join(output, "coverage-final.json"), "utf8"));
	const sourceRoot = join(cwd, "src") + sep;
	const files = Object.entries(coverage)
		.filter(([path]) => path.startsWith(sourceRoot) && /\.tsx?$/.test(path) && !path.endsWith(".d.ts"))
		.map(([path, entry]) => summarizeIstanbulFile(path, entry));
	return { owner, files };
}

function main() {
	const scratch = mkdtempSync(join(tmpdir(), "nox-project-coverage-"));
	try {
		const build = spawnSync("npm", ["run", "build:offline"], { cwd: ROOT, env: childEnvironment(scratch), stdio: "inherit", timeout: 120000 });
		if (build.error || build.status !== 0) throw new Error(`Offline build failed: ${build.error?.message ?? build.status}`);
		const reports = OWNERS.map((owner) => runOwner(owner, scratch));
		const result = aggregateCoverage(reports, OWNERS);
		for (const metric of METRICS) {
			const value = result[metric];
			process.stdout.write(`${metric}: ${value.covered}/${value.total} (${value.pct.toFixed(2)}%)\n`);
		}
		if (!result.passes) throw new Error(`Coverage below 80%: ${result.failedMetrics.join(", ")}`);
	} finally {
		rmSync(scratch, { recursive: true, force: true });
	}
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
