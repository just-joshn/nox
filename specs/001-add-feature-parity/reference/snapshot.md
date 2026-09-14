# Reference Snapshot

**Observed**: 2026-09-13
**Installed CLI**: Claude Code 2.1.270 (`observations/version.txt`)
**Host**: macOS, local terminal
**Account, subscription, policy, and connected-service capabilities**: Not inspected; treat gated behavior as unverified.

## Evidence sources

- Raw local top-level help: [observations/cli-help.txt](observations/cli-help.txt).
- Local unauthenticated US1 entry failure: [observations/us1-unauthenticated.txt](observations/us1-unauthenticated.txt).
- [Official CLI reference](https://code.claude.com/docs/en/cli-usage), [interactive commands](https://code.claude.com/docs/en/commands), and [documentation index](https://code.claude.com/docs/llms.txt), accessed 2026-09-13.
- Read-only local `--help` output for `auth`, `mcp`, `plugin`, `project`, `agents`, `auto-mode`, `gateway`, `import`, and `ultrareview` was inspected during this pass; it was not retained because some descriptions may include local account-dependent text in future runs.

## Boundaries

This snapshot captures discovery evidence and one unauthenticated session-entry failure, not tool behavior for every feature. No provider call succeeded; no subscription flow, external-service action, reference binary inspection, or interactive session was performed. Official documentation is live and may describe features newer than 2.1.270; version-gated claims require separate confirmation. The inventory files distinguish `observed-help`, `documented`, and `gated-unverified` so they cannot be mistaken for verified parity.
