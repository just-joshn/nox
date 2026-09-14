# Discovery Reconciliation

**Snapshot**: local release 2.1.270 on Darwin arm64, 2026-09-14. This is an open gap register, not a completeness certificate.

---

## 1. Three-Source Reconciled Inventory Summary (T006)

The capability inventory reconciles three discovery inputs: the pinned installed reference CLI (2.1.270), official documentation (147 pages indexed in [inventory-docs.md](inventory-docs.md)), and the older restored source map ([source-reconciliation.md](source-reconciliation.md)).

| Inventory Family | File Location | Total Leaves | Gated-Unverified | Reachable / Applicable | Open / Unmatched Gaps |
|---|---|---|---|---|---|
| **CLI Commands & Flags** | [inventory-cli.md](inventory-cli.md) | 566 | 142 | 424 | Nested option combinations, CLI admin subcommands |
| **Core Capabilities** | [inventory-core.md](inventory-core.md) | 13 | 4 | 9 | Model effort/budget, permission precedence |
| **Extensions & Integrations** | [inventory-extensions.md](inventory-extensions.md) | 319 | 86 | 233 | Plugin evaluation, marketplace download lifecycle |
| **Surfaces & Automation** | [inventory-surfaces.md](inventory-surfaces.md) | 195 | 86 | 109 | Remote control, cloud review, web/mobile bridges |
| **Total Reconciled** | — | **1,093** | **318** | **775** | **Tracked in source-reconciliation.md** |

### Additional Discovery Metrics
- **Official Documentation Pages**: 147 pages indexed in [inventory-docs.md](inventory-docs.md); mapped across capability files and [source-reconciliation.md](source-reconciliation.md).
- **Restored-Source Candidate Families**: 5 top-level module clusters and 35+ second-level tools/commands in [source-reconciliation.md](source-reconciliation.md) retained as `open` until corroborated or dated obsolete.
- **Broad Items Decomposed**: CLI option flags split into distinct leaf IDs per argument format; surfaces decomposed into discrete entry, interaction, failure, and cleanup leaves.

---

## 2. Three-Source Discovery Input Status

| Source | Current Capture | Remaining Gap |
|--------|-----------------|---------------|
| **Local top-level help** | 65 option rows and 18 command-family rows in [inventory-cli.md](inventory-cli.md) | Option values, combinations, aliases, failure behavior, and command-specific flags |
| **Local command-family help** | Auth, MCP, plugin, project, agents, auto-mode, gateway, import, and ultrareview subfamily names in [inventory-cli.md](inventory-cli.md) | Every nested help page, subcommand option, and behavior trace |
| **[Official CLI reference](https://code.claude.com/docs/en/cli-usage)** | 12 documented-only flags seeded in [inventory-cli.md](inventory-cli.md) | Full line-by-line flag reconciliation; CLI docs explicitly state help is incomplete |
| **[Official interactive commands](https://code.claude.com/docs/en/commands)** | Core command domains noted in [inventory-core.md](inventory-core.md) | Every command, alias, argument, gating rule, and keyboard shortcut as a leaf |
| **[Official documentation index](https://code.claude.com/docs/llms.txt)** | 147 linked pages captured in [inventory-docs.md](inventory-docs.md), plus domain seeds in capability files | Classify every page, map applicable content to leaf IDs, and resolve version-specific behavior |
| **[Older restored source tree](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src/src)** | Top-level and tool/command directory seeds recorded in [source-reconciliation.md](source-reconciliation.md) | Enumerate remaining candidate files remotely, map to current capabilities or dated obsolete/duplicate rationale; no code copying |
| **Pi visual baseline** | Existing TUI source paths identified in [plan.md](../plan.md) and [pi-visuals.md](pi-visuals.md) | 800-cell predeclared visual matrix; 20 captured baseline fixture tests passing |

---

## 3. Open Evidence and Access Gaps

1. Authentication is available to the CLI outside the sandbox. The user's weekly usage cap is reportedly reached, so real-service model behavior remains `gated-unverified`. A synthetic loopback Messages fixture now captures a partial read tool cycle without account usage; managed policy and service connections were not inspected.
2. No interactive reference session or paid model call was run. Interactive command and tool behavior remains undocumented at leaf level.
3. No extension fixture or external connection was run. Precedence, lifecycle, and failure cases remain unobserved.
4. No remote, browser, IDE, desktop, mobile, enterprise, or hosted flow was exercised. Product availability cannot be inferred from documentation alone.
5. The SUR-LIMIT-002 malformed-JSON and CLI-246 background/print conflict variants have isolated nox/reference CLI comparisons in [validation.md](validation.md). Valid structured output, successful background launch, and every full capability leaf remain unverified.

---

## 4. Delivery Slice Registries

### Registered Delivery Slices
- `US1-CORE-2026-09-14`: Immutable delivery slice containing exactly `US1-READ-001`, `US1-SEARCH-PATH-001`, `US1-SEARCH-CONTENT-001`, `US1-EDIT-001`, `US1-COMMAND-001`, `US1-DENY-001`, `US1-FAIL-001`, and `US1-RECOVER-001`.
- `US1-CONTEXT-PENDING`: Context-discovery and prompt-handling delivery slice (T321–T324).
- `US3-CONFIG-PENDING`: Configuration, settings, and instructions delivery slice (T325–T327).
- `US4-SURFACE-PENDING`: Print, worktree, and remote surfaces delivery slice (T328–T331).

---

## 5. First US1 Slice Gate (`US1-CORE-2026-09-14`)

The offline TOOL-002/003 slice is now specific enough for T131–T133. Nox implements lower-case `find` and `grep` in `packages/coding-agent/src/core/tools/find.ts` and `grep.ts`; `core/tools/index.ts` registers them, `core/sdk.ts` selects the active catalog, and `cli/args.ts` parses `--tools`. `utils/tools-manager.ts` locates the underlying fd/rg executables. Nox defaults to `read,bash,edit,write`; that default stays intact while parity aliases are added.

| Leaf ID | Observation and Scenario | nox Target | Evidence Task | Implementation and Verification Task | Status |
|---|---|---|---|---|---|
| `US1-READ-001` | `US1-READ-NORMAL`, `US1-READ-MISSING`, and `US1-READ-OUTSIDE` synthetic loopback traces; exact diagnostics and interactive permission open | `packages/coding-agent/src/core/tools/nox-read.ts` | T054 / T100 | T278 plus T014 workflow coverage | Implemented; verified locally |
| `US1-SEARCH-PATH-001` | `US1-SEARCH-PATH-NORMAL/NO-MATCH/INVALID` synthetic loopback traces | `packages/coding-agent/src/core/tools/nox-search.ts` and `find.ts` | T055 and TOOL-002 traces | T130–T134 option slices | Implemented; verified locally |
| `US1-SEARCH-CONTENT-001` | `US1-SEARCH-CONTENT-NORMAL/NO-MATCH/INVALID` synthetic loopback traces | `packages/coding-agent/src/core/tools/nox-search.ts` and `grep.ts` | T061 and TOOL-003 traces | T130–T185 option slices | Implemented; verified locally |
| `US1-EDIT-001` | `US1-EDIT-NORMAL` and focused error traces recorded | `packages/coding-agent/src/core/tools/nox-edit.ts` | T056 | T279 plus T014 workflow coverage | Implemented; verified locally |
| `US1-COMMAND-001` | `US1-COMMAND-NORMAL` and focused nonzero/timeout traces recorded | `packages/coding-agent/src/core/tools/nox-bash.ts` | T057 | T280 plus T014 workflow coverage | Implemented; verified locally |
| `US1-DENY-001` | Local policy-denial workflow recorded for parent `US1-EDIT-001` | `packages/coding-agent/src/core/agent-session.ts` | T058 | T014 workflow coverage | Implemented; verified locally |
| `US1-FAIL-001` | Local nonzero-command workflow recorded for parent `US1-COMMAND-001` | `packages/coding-agent/src/core/tools/nox-bash.ts` | T059 | T280 plus T014 workflow coverage | Implemented; verified locally |
| `US1-RECOVER-001` | Local multi-turn recovery workflow recorded for parent `US1-COMMAND-001` | `packages/coding-agent/src/core/agent-session.ts` | T060 | T014 workflow coverage | Implemented; verified locally |

T002–T006 mapping counts are recorded above. T013 and T016–T019 remain open until every slice leaf has a valid executable mapping and all applicable visual, discrepancy, verification, and T320 gates pass. An unqualified complete-parity claim remains blocked until every inventoried leaf passes its required verification.
