# Reference Snapshot

**Observed**: 2026-09-13
**Installed CLI**: Claude Code 2.1.270 (`observations/version.txt`)
**Host**: macOS, local terminal
**Authentication**: The CLI reported `loggedIn: true` when checked outside the sandbox on 2026-09-13. The sandboxed CLI reported `loggedIn: false` because it could not access the host credential store. Account identity is intentionally not retained here.
**Usage availability**: The user reports that the weekly usage cap is reached until its next reset. No model or tool-behavior probes were attempted after that report. The cap was not independently probed; treat affected behavior as unverified.
**Policy and connected-service capabilities**: Not inspected; treat gated behavior as unverified.

## Snapshot refresh: 2026-09-14

- Installed release remains 2.1.270 on Darwin arm64. Raw [version](observations/version-2026-09-14.txt) and [top-level help](observations/cli-help-2026-09-14.txt) were captured without a model call.
- The earlier authenticated status and user-reported weekly usage cap remain the last available account observations. Neither status nor remaining quota was re-probed in this refresh. Policy and connected-service availability remain unknown.
- The [current official documentation index](https://code.claude.com/docs/llms.txt) was inspected on 2026-09-14. Its live pages can be newer than the installed binary; every such candidate needs a version and availability check.
- The older [restored source tree](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src/src) was inspected remotely for module-family discovery. It was not cloned or copied; its files do not establish current behavior.
- Read-only nested help was captured for [auth](observations/help-auth-2026-09-14.txt), [MCP](observations/help-mcp-2026-09-14.txt), [plugins](observations/help-plugin-2026-09-14.txt), [project](observations/help-project-2026-09-14.txt), [agents](observations/help-agents-2026-09-14.txt), [auto mode](observations/help-auto-mode-2026-09-14.txt), [gateway](observations/help-gateway-2026-09-14.txt), [import](observations/help-import-2026-09-14.txt), and [ultrareview](observations/help-ultrareview-2026-09-14.txt). Help text only establishes command discovery, not functional parity.

## Evidence sources

- Raw local top-level help: [observations/cli-help.txt](observations/cli-help.txt).
- Local unauthenticated US1 entry failure: [observations/us1-unauthenticated.txt](observations/us1-unauthenticated.txt).
- Local `claude auth status` check outside the sandbox: exit 0 and `loggedIn: true` on 2026-09-13; identifying fields were not retained.
- [Official CLI reference](https://code.claude.com/docs/en/cli-usage), [interactive commands](https://code.claude.com/docs/en/commands), and [documentation index](https://code.claude.com/docs/llms.txt), accessed 2026-09-13.
- Read-only local `--help` output for `auth`, `mcp`, `plugin`, `project`, `agents`, `auto-mode`, `gateway`, `import`, and `ultrareview` was inspected during this pass; it was not retained because some descriptions may include local account-dependent text in future runs.

## Boundaries

This snapshot captures discovery evidence, an earlier sandboxed unauthenticated session-entry failure, and a later authenticated status check outside the sandbox. It does not capture successful tool behavior. No provider call succeeded; no subscription flow, external-service action, reference binary inspection, or interactive session was performed. Official documentation is live and may describe features newer than 2.1.270; version-gated claims require separate confirmation. The inventory files distinguish `observed-help`, `documented`, and `gated-unverified` so they cannot be mistaken for verified parity.
