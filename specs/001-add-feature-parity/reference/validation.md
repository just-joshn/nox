# Project validation baseline

## Aggregate production coverage (2026-09-14)

Run `npm run coverage:project` from the repository root after installing the pinned dependencies and hydrating the generated model catalog with `npm run hydrate:model-data`. The command builds offline, runs package tests with a temporary home and blocked external network, and measures the owned `src/` tree of each production workspace: chord, telemetry, ai, agent, protocol, client, server, coding-agent, tui, and session-backends/sqlite-node. Vitest uses V8 coverage for nine packages; c8 measures the TUI Node test suite. The runner combines covered and total counts across files, rejects duplicate ownership, missing or failed packages, and zero-denominator metrics, then requires at least 80% separately for lines, statements, functions, and branches.

| Metric | Covered / total | Baseline | Gate |
| --- | ---: | ---: | --- |
| Lines | 48,294 / 63,136 | 76.49% | Fail |
| Statements | 50,483 / 67,412 | 74.89% | Fail |
| Functions | 7,217 / 10,015 | 72.06% | Fail |
| Branches | 24,085 / 36,214 | 66.51% | Fail |

All ten package test suites completed successfully on this run. The command exited nonzero because the four aggregate metrics are below the required threshold. Application work must raise all four before final validation can pass.

Generated `dist/` output and model catalogs, tests and fixtures, examples, evaluations, scripts, and configuration files are excluded because they are not owned production source. Source files in `src/` are included even when untested. The AI routine suite excludes credential-backed provider tests, OAuth integration tests, live stream/token tests, and end-to-end provider tests; those require explicit live-test validation. The offline OAuth test verifies that a preexisting credential file is not read. Local loopback remains available for server integration tests; external Node sockets and fetch calls are blocked in runner child processes. This guard is not an operating-system network sandbox, so live tests remain excluded explicitly.

## Pi terminal visual capture (2026-09-14)

`npx vitest --run packages/coding-agent/test/pi-terminal-baseline.test.ts` passed six read-card request/error/visual-retry cases at 40, 80, and 120 columns in dark and light themes. The frozen fixture at `packages/coding-agent/test/__snapshots__/pi-terminal-baseline.test.ts.snap` records ANSI writes, the 24-row viewport, and cursor position generated from the Pi renderer at `0238c1144`; later runs compare against that fixture. The retry is a new successful card following an error with synthetic results, not a provider-backed recovery trace. A 1-column attempt failed before capture with `Rendered line 2 exceeds terminal width (2 > 1)`; the component-only 1-column snapshots in `pi-visual-baseline.test.ts.snap` still pass. This is partial T011 evidence, not a completed visual comparison for all workflows.

`npx vitest --run packages/coding-agent/test/pi-trust-terminal-baseline.test.ts` passed six trust-selector focus cases at 40, 80, and 120 columns in dark and light themes. The frozen `pi-trust-terminal-baseline.test.ts.snap` records ANSI writes, viewport, and cursor for initial Trust focus and Do not trust focus in a synthetic `/project`. No trust choice is persisted by this capture.

## Structured-output malformed-input preflight (2026-09-14)

The observed SUR-LIMIT-002 malformed input `--json-schema '{'` was first a failing parser test, then passed in `packages/coding-agent/test/args.test.ts` and the isolated source CLI process test `packages/coding-agent/test/json-schema-cli.test.ts`: exit 1, empty stdout, and exact stderr `Error: --json-schema is not valid JSON: JSON Parse error: Expected '}'`. The process used a temporary home and agent directory and did not dispatch a model request. Syntactically valid schema input exits 1 with `Structured output is not available yet` to avoid silently ignoring a requested contract; that behavior is an explicit temporary gap, not a reference match. The equals form is also routed through preflight to avoid extension-flag fallthrough, but its reference behavior is unobserved. Focused tests passed (88 cases), `npm run check` passed, and `npm run build` passed after network access was granted for the model catalog. The aggregate coverage gate remains below 80%, and valid structured-output scenarios remain open.

## Background/print conflict preflight (2026-09-14)

CLI-246 was first a failing parser test and then passed in `packages/coding-agent/test/args.test.ts` and the isolated source CLI process test `packages/coding-agent/test/background-cli.test.ts`. With `--bg -p noop`, nox exits 1, writes no stdout, explains that print mode cannot start an attachable background session, and creates no configured session directory. Its stderr differs from the reference because the reference advises an available background workflow that nox has not implemented; this is open as [DISC-001](discrepancies.md). A standalone `--bg noop` exits 1 with an explicit unavailable message and no session directory rather than silently dispatching; successful background launch remains unimplemented and unverified. The process used a temporary home and agent/session directories, and no model request was made.
