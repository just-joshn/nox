# Reference Snapshot

**Observed**: 2026-09-13
**Installed CLI**: Claude Code 2.1.270 (`observations/version.txt`)
**Host**: macOS, local terminal
**Authentication**: The CLI reported `loggedIn: true` when checked outside the sandbox on 2026-09-13. The sandboxed CLI reported `loggedIn: false` because it could not access the host credential store. Account identity is intentionally not retained here.
**Usage availability**: The user reports that the weekly usage cap is reached until its next reset. No model or tool-behavior probes were attempted after that report. The cap was not independently probed; treat affected behavior as unverified.
**Policy and connected-service capabilities**: Not inspected; treat gated behavior as unverified.

## Evidence sources

- Raw local top-level help: [observations/cli-help.txt](observations/cli-help.txt).
- Local unauthenticated US1 entry failure: [observations/us1-unauthenticated.txt](observations/us1-unauthenticated.txt).
- Local `claude auth status` check outside the sandbox: exit 0 and `loggedIn: true` on 2026-09-13; identifying fields were not retained.
- [Official CLI reference](https://code.claude.com/docs/en/cli-usage), [interactive commands](https://code.claude.com/docs/en/commands), and [documentation index](https://code.claude.com/docs/llms.txt), accessed 2026-09-13.
- Read-only local `--help` output for `auth`, `mcp`, `plugin`, `project`, `agents`, `auto-mode`, `gateway`, `import`, and `ultrareview` was inspected during this pass; it was not retained because some descriptions may include local account-dependent text in future runs.

## Boundaries

This snapshot captures discovery evidence, an earlier sandboxed unauthenticated session-entry failure, and a later authenticated status check outside the sandbox. It does not capture successful tool behavior. No provider call succeeded; no subscription flow, external-service action, reference binary inspection, or interactive session was performed. Official documentation is live and may describe features newer than 2.1.270; version-gated claims require separate confirmation. The inventory files distinguish `observed-help`, `documented`, and `gated-unverified` so they cannot be mistaken for verified parity.
