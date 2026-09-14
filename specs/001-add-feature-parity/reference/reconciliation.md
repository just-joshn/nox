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

## US1 delivery slice registry

`US1-CORE-2026-09-14` is an immutable delivery slice containing exactly these leaf IDs: `US1-READ-001`, `US1-SEARCH-PATH-001`, `US1-SEARCH-CONTENT-001`, `US1-EDIT-001`, `US1-COMMAND-001`, `US1-DENY-001`, `US1-FAIL-001`, and `US1-RECOVER-001`. Newly discovered leaves do not silently expand this set; add a new slice ID or an explicit versioned amendment before including them in a checkpoint. Slice membership bounds T016–T019 but does not itself establish evidence, verification, constitutional completion, or parity completion.

## First US1 slice gate

The offline TOOL-002/003 slice is now specific enough for T131–T133. Nox already implements lower-case `find` and `grep` in `packages/coding-agent/src/core/tools/find.ts` and `grep.ts`; `core/tools/index.ts` registers them, `core/sdk.ts` selects the active catalog, and `cli/args.ts` parses `--tools`. `utils/tools-manager.ts` only locates the underlying fd/rg executables, so the older T017 target is stale for these leaves. The observed reference catalog excludes upper-case `Glob`/`Grep` by default and exposes each when explicitly selected. Nox defaults to `read,bash,edit,write`; that default must stay intact while parity aliases are added. Existing search output (`No files found matching pattern` and `No matches found`) differs from the synthetic reference's `No files found`; the alias should preserve existing Pi tool behavior. Matching tests belong under `packages/coding-agent/test/` and should exercise tool definitions and selection without a provider call.

Stable tracking IDs are listed in [inventory-core.md](inventory-core.md), with scenarios in [scenarios.md](scenarios.md). Synthetic localhost Messages responses drove installed Read, Glob, and Grep tool calls in disposable repositories while external network remained blocked; the [validation log](validation.md) distinguishes the observed local result shapes from real-service and interactive cases. The user's reported weekly cap still gates model-account probes. Other leaves below remain pending unless their row says otherwise.

| Leaf ID | Observation and scenario | nox target | Evidence task | Implementation and verification task |
|---------|--------------------------|------------|---------------|--------------------------------------|
| US1-READ-001 | `US1-READ-NORMAL`, `US1-READ-MISSING`, and `US1-READ-OUTSIDE` synthetic loopback traces; exact diagnostics, interactive permission, and real-service cases remain open | `packages/coding-agent/src/core/tools/nox-read.ts` | T054 / T100 | T278 plus T014 workflow coverage; T013 and T320 gates remain open |
| US1-SEARCH-PATH-001 | `US1-SEARCH-PATH-NORMAL/NO-MATCH/INVALID` synthetic loopback traces; exact invalid diagnostic and interactive/real-service behavior remain open | `packages/coding-agent/src/core/tools/nox-search.ts` and `find.ts` | T055 and TOOL-002 option traces | T130–T134 and later option slices; remaining parity gates open |
| US1-SEARCH-CONTENT-001 | `US1-SEARCH-CONTENT-NORMAL/NO-MATCH/INVALID` synthetic loopback traces; exact invalid diagnostic and interactive/real-service behavior remain open | `packages/coding-agent/src/core/tools/nox-search.ts` and `grep.ts` | T061 and TOOL-003 option traces | T130–T185; remaining parity gates open |
| US1-EDIT-001 | `US1-EDIT-NORMAL` and focused error traces recorded; interactive permission and real-service cases remain open | `packages/coding-agent/src/core/tools/nox-edit.ts` | T056 and edit observation tasks | T279 plus T014 workflow coverage; T013 and T320 gates remain open |
| US1-COMMAND-001 | `US1-COMMAND-NORMAL` and focused nonzero/timeout traces recorded; broader permission and real-service cases remain open | `packages/coding-agent/src/core/tools/nox-bash.ts` | T057 and Bash observation tasks | T280 plus T014 workflow coverage; T013 and T320 gates remain open |
| US1-DENY-001 | Local policy-denial workflow recorded for parent `US1-EDIT-001`; matched interactive reference evidence remains open | `packages/coding-agent/src/core/agent-session.ts` | T058 | T014 workflow coverage; T013 and T320 gates remain open |
| US1-FAIL-001 | Local nonzero-command workflow recorded for parent `US1-COMMAND-001`; remaining matched-reference scope stays open | `packages/coding-agent/src/core/tools/nox-bash.ts` | T059 and Bash nonzero observation | T280 plus T014 workflow coverage; T013 and T320 gates remain open |
| US1-RECOVER-001 | Local multi-turn recovery workflow recorded for parent `US1-COMMAND-001`; matched interactive reference evidence remains open | `packages/coding-agent/src/core/agent-session.ts` | T060 | T014 workflow coverage; T013 and T320 gates remain open |

T002–T006 remain open, so this delivery slice does not establish complete inventory coverage. T054–T061 have recorded synthetic or isolated observations, but exact diagnostics, interactive permission behavior, real-service comparison, or matched-reference interaction evidence remain open as identified per leaf above. The local workflow tests are historical evidence, not checkpoint closure. T013 and T016–T019 remain open until every slice leaf has a valid executable mapping and all applicable evidence, visual, discrepancy, verification, and T320 gates pass. An unqualified complete-parity claim remains blocked until every inventoried leaf passes its required verification.
