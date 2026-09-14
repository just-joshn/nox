# Discovery Reconciliation

**Snapshot**: local release 2.1.270, 2026-09-13. This is an open gap register, not a completeness certificate.

| Source | Current capture | Remaining gap |
|--------|-----------------|---------------|
| Local top-level help | 65 option rows and 18 command-family rows in [inventory-cli.md](inventory-cli.md) | Option values, combinations, aliases, failure behavior, and command-specific flags |
| Local command-family help | Auth, MCP, plugin, project, agents, auto-mode, gateway, import, and ultrareview subfamily names in [inventory-cli.md](inventory-cli.md) | Every nested help page, subcommand option, and behavior trace |
| [Official CLI reference](https://code.claude.com/docs/en/cli-usage) | 12 documented-only flags seeded in [inventory-cli.md](inventory-cli.md) | Full line-by-line flag reconciliation; CLI docs explicitly state help is incomplete |
| [Official interactive commands](https://code.claude.com/docs/en/commands) | Core command domains noted in [inventory-core.md](inventory-core.md) | Every command, alias, argument, gating rule, and keyboard shortcut as a leaf |
| [Official documentation index](https://code.claude.com/docs/llms.txt) | 147 linked pages captured in [inventory-docs.md](inventory-docs.md), plus domain seeds in the three capability files | Classify every page, map applicable content to leaf IDs, and resolve version-specific behavior |
| [Older restored source tree](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src/src) | Top-level and selected tool/command directory seeds recorded in [source-reconciliation.md](source-reconciliation.md) | Enumerate remaining candidate files remotely, map to current capabilities or dated obsolete/duplicate rationale; no code copying |
| Pi baseline | Existing TUI source paths identified in [plan.md](../plan.md) | Terminal-state captures and explicit visual comparison matrix |

## Open evidence and access gaps

1. Authentication is available to the CLI outside the sandbox. The user's weekly usage cap is reportedly reached, so real-service model behavior remains `gated-unverified`. A synthetic loopback Messages fixture now captures a partial read tool cycle without account usage; managed policy and service connections were not inspected.
2. No interactive reference session or paid model call was run. Interactive command and tool behavior remains undocumented at leaf level.
3. No extension fixture or external connection was run. Precedence, lifecycle, and failure cases remain unobserved.
4. No remote, browser, IDE, desktop, mobile, enterprise, or hosted flow was exercised. Product availability cannot be inferred from documentation alone.
5. The SUR-LIMIT-002 malformed-JSON and CLI-246 background/print conflict variants have isolated nox/reference CLI comparisons in [validation.md](validation.md). Valid structured output, successful background launch, and every full capability leaf remain unverified.

## First US1 slice gate

Stable tracking IDs are listed in [inventory-core.md](inventory-core.md), with pending scenarios in [scenarios.md](scenarios.md). Only an earlier sandboxed read request was probed; it exited before tool dispatch because that sandbox could not access the host credentials ([observation](observations/us1-unauthenticated.txt)). A later status check outside the sandbox reported `loggedIn: true`. No model-backed probe followed because the user reported the weekly usage cap. No other leaf was probed, and the sandbox failure does not establish normal, tool-failure, denial, or recovery behavior. The target paths below are existing nox files, not claims that parity is implemented.

| Leaf ID | Observation and scenario | nox target | Evidence task | Implementation and verification task |
|---------|--------------------------|------------|---------------|--------------------------------------|
| US1-READ-001 | `US1-READ-NORMAL` partial synthetic loopback trace; missing-path, permission, and real-service cases pending | `packages/coding-agent/src/utils/tools-manager.ts` | T054 / T100 | T013 must create after normal/failure observations |
| US1-SEARCH-PATH-001 | `US1-SEARCH-PATH-NORMAL/NO-MATCH/INVALID` pending; not probed | `packages/coding-agent/src/utils/tools-manager.ts` | T055 | T013 must create after normal/failure observations |
| US1-SEARCH-CONTENT-001 | `US1-SEARCH-CONTENT-NORMAL/NO-MATCH/INVALID` pending; not probed | `packages/coding-agent/src/utils/tools-manager.ts` | T061 | T013 must create after normal/failure observations |
| US1-EDIT-001 | `US1-EDIT-NORMAL` pending | `packages/coding-agent/src/utils/tools-manager.ts` | T056 | T013 must create after normal/failure observations |
| US1-COMMAND-001 | `US1-COMMAND-NORMAL` pending | `packages/coding-agent/src/utils/tools-manager.ts` | T057 | T013 must create after normal/failure observations |
| US1-DENY-001 | `US1-EDIT-DENY` pending; parent `US1-EDIT-001`; not probed | `packages/coding-agent/src/core/agent-session.ts` | T058 | T013 must create after denial observation |
| US1-FAIL-001 | `US1-COMMAND-FAILURE` pending; parent `US1-COMMAND-001`; not probed | `packages/coding-agent/src/core/agent-session.ts` | T059 | T013 must create after command-failure observation |
| US1-RECOVER-001 | `US1-COMMAND-RECOVER` pending; parent `US1-COMMAND-001`; not probed | `packages/coding-agent/src/core/agent-session.ts` | T060 | T013 must create after command-recovery observation |

T002–T006 remain open. T054's normal read has a synthetic loopback trace, while its failure/permission cases and real-service comparison remain open. T055–T061 still require either safe matched loopback fixtures or restored reference usage. T013 cannot yet create complete evidence-based implementation tasks for this slice, so T016–T018 remain blocked. An unqualified 100% parity claim is blocked until every leaf has passing verification.
