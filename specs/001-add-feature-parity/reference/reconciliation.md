# Discovery Reconciliation

**Snapshot**: local release 2.1.270, 2026-09-13. This is an open gap register, not a completeness certificate.

| Source | Current capture | Remaining gap |
|--------|-----------------|---------------|
| Local top-level help | 65 option rows and 18 command-family rows in [inventory-cli.md](inventory-cli.md) | Option values, combinations, aliases, failure behavior, and command-specific flags |
| Local command-family help | Auth, MCP, plugin, project, agents, auto-mode, gateway, import, and ultrareview subfamily names in [inventory-cli.md](inventory-cli.md) | Every nested help page, subcommand option, and behavior trace |
| [Official CLI reference](https://code.claude.com/docs/en/cli-usage) | 12 documented-only flags seeded in [inventory-cli.md](inventory-cli.md) | Full line-by-line flag reconciliation; CLI docs explicitly state help is incomplete |
| [Official interactive commands](https://code.claude.com/docs/en/commands) | Core command domains noted in [inventory-core.md](inventory-core.md) | Every command, alias, argument, gating rule, and keyboard shortcut as a leaf |
| [Official documentation index](https://code.claude.com/docs/llms.txt) | 147 linked pages captured in [inventory-docs.md](inventory-docs.md), plus domain seeds in the three capability files | Classify every page, map applicable content to leaf IDs, and resolve version-specific behavior |
| Pi baseline | Existing TUI source paths identified in [plan.md](../plan.md) | Terminal-state captures and explicit visual comparison matrix |

## Open evidence and access gaps

1. The host account, subscription, managed policy, and service connections were not inspected. Gated features remain `gated-unverified`.
2. No interactive reference session or paid model call was run. Interactive command and tool behavior remains undocumented at leaf level.
3. No extension fixture or external connection was run. Precedence, lifecycle, and failure cases remain unobserved.
4. No remote, browser, IDE, desktop, mobile, enterprise, or hosted flow was exercised. Product availability cannot be inferred from documentation alone.
5. No nox implementation has been compared against these surfaces. Every discovered capability remains unverified.

T002–T006 remain open. T013 cannot yet replace broad story tasks with a complete leaf-specific set. An unqualified 100% parity claim is blocked.
