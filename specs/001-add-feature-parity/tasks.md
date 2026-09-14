# Tasks: Complete Coding Assistant Parity

**Input**: Design documents from `specs/001-add-feature-parity/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/)

**Tests**: The spec requires observable comparison and independent verification for each story. Use isolated fixtures and the faux provider; do not use paid provider calls for ad hoc checks.

**Organization**: This is the only task document for the complete-parity effort. Tasks are grouped by user story and feature family; these are delivery increments, not separate specifications. Each code task needs its leaf inventory and observed contract. Exhaustive inventory and verification remain required for a complete-parity claim. No family may be called complete from a domain heading alone.

**Task-set status**: Executable only for registered slices that already have observe → failing test → implement → verify tasks. Discovery (T002–T007, T062) is open. T013 still creates leaf tasks for uncovered families. Family indexes are coverage indexes, not executable work.

**Registered executable slices** (may proceed after their own T013 row is zero-missing):
- `US1-CORE-2026-09-14` — T014–T019, T054–T061, T100–T218, T227–T280
- US4 CLI preflight leaves — T094–T118, T225
- US2 background — T281–T319 (blocked on T281 inventory IDs)

**Not executable yet**: US2 session/permission/model (except T289–T290 observations), all of US3, US4 print/worktree/remote (T328–T331), US4 CLI-admin (T044), computer-use, goals, plugin-eval, context/prompt discovery (T321–T324).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can proceed concurrently because it owns separate files and does not depend on another incomplete task.
- **[Story]**: Maps a task to the corresponding user story in `spec.md`.
- Each task names its target file or directory. Proposed files are created only when the inventory confirms the need.
- T063–T078 and T081–T090 are **coverage indexes**, not a second verification pass. Close an index when every leaf in its family has a mapped owning story checkpoint that is closed (or gated-unverified). Do not re-run scenarios to close an index. T079–T080 remain audits.

**Index ownership (one closer per leaf):**

| Index | Owning closer | Population |
|---|---|---|
| T063, T064, T068, T081 | T016–T019 (plus later US1 slices including T324 for agent/tools/terminal; T081 stays blocked until a computer/browser slice exists) | agent-execution, built-in tools, terminal, computer/browser |
| T086 | Later US1 images/context-window slice (not T324) | context-window, caching, image, large-input, context-reduction |
| T065, T066, T067, T082, T087 | T023–T027 | models, permissions, sessions, goals, scheduled prompts |
| T069–T073, T084, T088 | T031–T037 | settings/instructions, skills, hooks, agents, plugins, plugin-eval, extension diagnostics |
| T074–T078, T083, T085, T089, T090 | T041–T044 | print/RPC, CLI admin, worktrees/scheduling/review, remotes, documented surfaces, hosted-review, artifacts/deep-links, desktop dispatch, channel events |

If two indexes list the same leaf, the **owning closer** column wins. The other index only records the pointer.

## Completion Semantics

- `[X]` means the task's described execution and local verification are recorded.
- `[X]` does not mean the affected application behavior is constitution-complete, parity-complete, or release-ready.
- Application completion requires T049 to confirm aggregate lines, statements, functions, and branches coverage of at least 80%, plus function/file size limits and replacement-state checks on touched production paths.
- Parity completion additionally requires the applicable owning story checkpoints, discrepancy closures, visual checks, security audit, and T053 release gate.
- A checked implementation task with an open T049 or T053 remains implemented but constitution-incomplete.

## Phase 1: Setup (Shared Reference and Scope)

**Purpose**: Establish a reproducible reference snapshot and the complete feature boundary.

- [X] T001 Record installed reference version, platform, date, account and policy conditions, and safe CLI observations in `specs/001-add-feature-parity/reference/snapshot.md`; preserve raw outputs under `specs/001-add-feature-parity/reference/observations/`. Inspect the older restored source map remotely for feature discovery, but do not clone or copy it into nox.
- [X] T002 [P] Enumerate every CLI flag, subcommand, option combination, and documented interactive command or shortcut as leaf entries in `specs/001-add-feature-parity/reference/inventory-cli.md`; reconcile local help with official command documentation and mark unobserved entries. For each leaf, record SC-007 timing-sensitivity (yes/no + reason). Include documented interactive extras (vim mode, voice, accessibility, notifications) so T068 is not an empty index for those names.
- [X] T003 [P] Enumerate settings, instruction loading, memory, permission modes, built-in tools, and model controls as leaf entries in `specs/001-add-feature-parity/reference/inventory-core.md`; record defaults, scope, precedence, availability conditions, and SC-007 timing-sensitivity (yes/no + reason). Include computer-use, browser-use, context-window, caching, image, large-input, context-reduction, goal, agent-view, cross-session-message, and dynamic-workflow candidates so T081, T082, and T086 are not empty indexes.
- [X] T004 [P] Enumerate skills, custom commands, agents, teams, hooks, external connections, plugins, and marketplaces as leaf entries in `specs/001-add-feature-parity/reference/inventory-extensions.md`; include triggers, lifecycle events, gated variants, plugin-evaluation candidates so T084 is not an empty index, and SC-007 timing-sensitivity (yes/no + reason).
- [X] T005 [P] Enumerate background sessions, worktrees, non-interactive protocols, desktop/web/mobile/editor/browser/chat/CI workflows, diagnostics, auth, import, and update flows as leaf entries in `specs/001-add-feature-parity/reference/inventory-surfaces.md`; for each surface leaf record entry action, intermediate interactions, resulting state, side effects, failure behavior, availability conditions, proposed nox control, and SC-007 timing-sensitivity (yes/no + reason). Mark inaccessible observations `gated-unverified`. Identify observed non-equivalence with its leaf ID and reproduction steps; record it in `specs/001-add-feature-parity/reference/discrepancies.md` after T012 defines the register.
- [X] T062 Capture every official-doc page, installed command/flag, and restored-source module as a candidate row in `specs/001-add-feature-parity/reference/source-reconciliation.md` (URL/module, version, candidate, disposition blank or `open`). Do not close T006. T079/T080 own later disposition.
- [X] T006 After T002–T005 and T062, write current mapping counts in `specs/001-add-feature-parity/reference/reconciliation.md`: total leaves, counts by family, gated-unverified, unmatched-candidate, broad-item. Close only when every T062 `open` candidate is either mapped to a leaf ID, marked duplicate of a leaf ID, or dated obsolete. T080 repeats this as the release audit.
- [X] T007 Map each leaf item to a nox-native command, key, configuration path, protocol, or integration in `specs/001-add-feature-parity/reference/surface-map.md` (populated map). `contracts/surface-map.md` is schema only. Record naming differences and flag missing nox surfaces.

**Inventory checkpoint**: A source slice MUST NOT begin or be marked complete until its affected capability leaves have stable IDs, availability states, nox-native surface mappings, observed contracts, executable test-first implementation sequences, and verification coverage. T002–T007 and T062 remain required before the complete inventory or universal parity coverage can be claimed. Undiscovered or gated leaves do not block an independently evidenced slice, but they keep global T013, T046, and T053 open. Record the final leaf count and every gated leaf in `specs/001-add-feature-parity/reference/reconciliation.md`.

---

## Phase 2: Foundational (Blocking Evidence and Comparison Contracts)

**Purpose**: Make each leaf item implementable and objectively comparable before story work.

- [X] T008 Define the `Reference Snapshot`, `Discovery Candidate`, `Capability Item`, `Scenario`, `Observation`, and `Discrepancy` fields and state-transition rules from `data-model.md` in `specs/001-add-feature-parity/reference/schema.md`; preserve the constraints that a separate input, option, transition, or gated variant gets its own leaf ID, source-only candidates need current corroboration, and `verified` requires passing normal, failure, and relevant interaction scenarios.
- [X] T009 Create normal, denial/error, persistence, interruption/recovery, and interaction scenarios in `specs/001-add-feature-parity/reference/scenarios.md` for each reachable leaf selected for source work before that leaf's implementation; record matched starting state, expected decisions, outputs, errors, side effects, and permitted normalization. Continue until every reachable leaf has required scenarios before T046 and T053. For security leaves, use synthetic credentials and isolated user/project fixtures to observe reuse after restart, output/log/error redaction, permission-rule persistence, and data disclosed to extensions or remote services; record only redacted traces and leave inaccessible behavior unverified. Register the SC-009 catalog IDs (SEC-PATH-001, SEC-CMD-001, SEC-SET-001, SEC-SECRET-001, SEC-EXT-001) before any SC-009 progress is claimed; an unregistered ID cannot pass.
- [X] T010 Record the evidence gap and access needed for every gated or otherwise unobservable leaf ID in `specs/001-add-feature-parity/reference/gated.md`; keep those IDs `gated-unverified` and excluded from any unqualified complete-parity claim.
- [X] T011 Predeclare the required Pi visual matrix in `specs/001-add-feature-parity/reference/pi-visuals.md` *before* any SC-003 progress is claimed. Required first output: a table of widths × themes × platforms × workflows × {normal, denial, error, interruption, recovery} and a frozen **matrix cell count**. Seed from already-captured fixtures (40/80/120 columns, dark/light, US1 tool cards, trust selector) but do not treat `validation.md` snapshots as the denominator until this task records the count. Define how a newly discovered width/theme/platform/state expands that count *before* the new cell can be called complete. T015/T018/T048 may add results only against listed cells. SC-003 is unevaluable while T011 is open. Any intentional visual departure requires a constitution amendment before implementation.
- [X] T012 Define discrepancy ownership, reproduction format, and closure evidence in `specs/001-add-feature-parity/reference/discrepancies.md`; require fresh passing reference comparison before `closed` and reopen on regression.
- [X] T013 Continuously validate leaf-task coverage in `specs/001-add-feature-parity/reference/reconciliation.md`. **Per-slice (repeatable, non-blocking globally):** A named delivery slice may start when T013 records zero missing mappings for *that slice's* leaf IDs. Each mapped leaf MUST have observed evidence, and either separate tasks or one ordered task, requiring (1) write and run the failing behavior test, (2) implement only after that failure is recorded, and (3) run and record verification. **Global (blocks T046/T053 only):** Keep T013 `[ ]` until every reconciled leaf has valid task mappings, every mapped task ID exists, no family index substitutes for executable work, and the missing-mapping count is zero. Undiscovered or gated leaves do not fail a per-slice T013 row.

**Inventory dependency**: Independently observed source slices may proceed after their own T007 mapping, applicable T009–T011 evidence, and a *per-slice* T013 zero-missing row. Global T013, T006, and T062 remain open and block T046/T053, not those slices. T320 has passed; it is not a start-gate for new evidenced slices.

**T320 audit contract**: An application implementation task is a checked task that requires creating or changing shipped runtime behavior in a production path under `packages/*/src/`, a shipped session-backend production path, or a root file explicitly imported or read by shipped runtime code. Root package manifests, build scripts, coverage and test configuration, repository automation, documentation, and developer tooling are excluded unless the task also changes an eligible production path. Observation-only, documentation-only, test-only, verification-only, and audit tasks are excluded under the same rule. Before reviewing evidence, freeze the resulting task-ID list in the `Historical implementation audit` section of `specs/001-add-feature-parity/reference/validation.md`. Use only `pass`, `reopen`, or `unresolved` as each task's current result: `pass` means every required field is demonstrated and current verification passes; `reopen` means the task is currently pending repair with checkbox `[ ]`; `unresolved` means classification or required evidence cannot yet be determined. After repair and re-verification, replace `reopen` with `pass`, restore `[X]`, and preserve the reopening event in the task's audit-history note.

- [X] T320 Apply the T320 audit contract to every checked application implementation task before additional source work begins. Record one row per frozen task ID under `Historical implementation audit` in `specs/001-add-feature-parity/reference/validation.md`, including task ID, leaf IDs, observed contract, pre-implementation failing-test evidence, implementation commit, verification result, Pi baseline impact, security boundary, current audit result, and audit-history note. The 2026-09-14 run passed 14/14 (`pass`, 0 reopen, 0 unresolved). Newly checked application tasks remain subject to per-slice T013, not a T320 rerun, unless a frozen row leaves `pass`. For every current `reopen` result: (1) change its checkbox back to `[ ]` in `specs/001-add-feature-parity/tasks.md`; (2) record the missing evidence and affected leaf IDs; (3) create or repair its test-first sequence; and (4) rerun verification before replacing the result with `pass` and restoring `[X]`. Record frozen-population, audited, current-passing, current-reopened, current-unresolved, and cumulative ever-reopened totals. T320 passes only when every frozen task's current result is `pass` and the current-reopened and current-unresolved totals are zero; the cumulative ever-reopened total does not block completion.
- [X] T091 Establish a reproducible offline aggregate project coverage command and baseline in root `package.json` and `specs/001-add-feature-parity/reference/validation.md`: include every production workspace package and session backend shipped or imported by nox, measure each package's owned source files once, combine covered and total counts rather than averaging percentages, and document all excluded generated, test, example, or tooling files with reasons. Require aggregate lines, statements, functions, and branches each to reach at least 80%; a zero-denominator metric, failed package, or unmeasured package fails the gate. Prevent provider credential and network use in routine tests and record the baseline before application work is called complete.
- [X] T093 Capture a functional Pi baseline in `specs/001-add-feature-parity/reference/pi-functional.md` using isolated fixtures for existing session persistence, file and command tools, prompt handling, extension loading, and non-interactive protocol flows that parity changes could affect; record inputs, state transitions, outputs, side effects, failures, and baseline test commands before source changes, then define per-slice and final regression comparisons with any intentional change linked to its observed parity leaf and required constitution amendment where applicable.
- [X] T219 Reconcile installed top-level help short aliases against the CLI inventory in `specs/001-add-feature-parity/reference/inventory-cli.md`; add missing aliases as independently testable leaves and validate the audit.
- [X] T220 Reconcile every captured nested-help option and short alias against evidence-linked CLI leaves in `specs/001-add-feature-parity/reference/inventory-cli.md`; explain shared daemon help and record remaining scope.
- [X] T221 Reconcile captured nested `Commands:` entries and command aliases against CLI inventory leaves in `specs/001-add-feature-parity/reference/inventory-cli.md`; record coverage and its limits.
- [X] T222 Compare installed `-v` and `--version` under disposable-home network isolation; record exact process, side-effect evidence, and nox parser status in `specs/001-add-feature-parity/reference/scenarios.md`.
- [X] T223 Compare installed `-d` and `--debug` on offline parser exits; record exact process, side-effect evidence, and nox gap in `specs/001-add-feature-parity/reference/scenarios.md` without inferring debug behavior.
- [X] T224 Observe installed `-n` and `--name` missing-value parser exits offline; compare nox and record the exact diagnostic and side-effect contract in `specs/001-add-feature-parity/reference/scenarios.md`.
- [X] T226 Compare installed `-w` and `--worktree` on offline parser exits; record exact process, side-effect evidence, and nox gap in `specs/001-add-feature-parity/reference/scenarios.md` without inferring worktree creation.

**Checkpoint**: A source slice starts only after its own inventory IDs, observed contracts, and explicit leaf tasks exist. Gated or undiscovered work does not block an independent observed slice, but remains open and blocks a universal parity claim.

---

## Phase 3: User Story 1 — Work in a Familiar Terminal (Priority: P1)

**Goal**: Match the reference's core coding workflow inside Pi's terminal presentation.

**Independent Test**: In matched disposable repositories, compare a read, search, edit, command, denial, failure, and recovery journey; compare corresponding Pi terminal states.

**Delivery slice for T016–T019**: `US1-CORE-2026-09-14` is the immutable set `US1-READ-001`, `US1-SEARCH-PATH-001`, `US1-SEARCH-CONTENT-001`, `US1-EDIT-001`, `US1-COMMAND-001`, `US1-DENY-001`, `US1-FAIL-001`, and `US1-RECOVER-001`, as registered in `specs/001-add-feature-parity/reference/reconciliation.md`. That file must map every slice leaf to reference evidence, a failing test, exact source paths, and verification tasks. T013 must report zero missing mappings for the slice. A domain heading or unobserved behavior does not satisfy this checkpoint.

### Verification

- [X] T014 [P] [US1] Write and run failing faux-provider tests for read, search, edit, command, failure, and denial behavior in `packages/coding-agent/test/suite/parity-core-workflow.test.ts`, keyed to the US1 leaf IDs in `specs/001-add-feature-parity/reference/scenarios.md`; record each expected pre-implementation failure for T320 audit.
- [X] T015 [P] [US1] Define terminal-state comparison fixtures for US1 in `specs/001-add-feature-parity/reference/pi-visuals.md`; require an approved constitution amendment for any proposed visual exception.

### Implementation checkpoints

- [X] T016 [US1] Checkpoint — Confirm delivery slice `US1-CORE-2026-09-14` contains exactly its registered leaf IDs and every leaf has an availability state, observed evidence, an executable test-first implementation sequence, and verification coverage; record missing or extra mappings in `specs/001-add-feature-parity/reference/reconciliation.md`. Context-discovery and prompt-handling remain outside this slice. They are slice `US1-CONTEXT-PENDING` (T321–T324). T016 must not close FR-004.
- [X] T017 [US1] Checkpoint — Confirm every core file, search, and command-tool leaf in delivery slice `US1-CORE-2026-09-14` has separate availability, permission, execution, and failure contracts plus an executable test-first implementation sequence and verification coverage; record missing mappings in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T018 [US1] Checkpoint — Confirm every affected interactive tool-activity, error, denial, and recovery state in delivery slice `US1-CORE-2026-09-14` has a leaf-specific integration task and corresponding Pi visual-matrix cell; record coverage in `specs/001-add-feature-parity/reference/pi-visuals.md`.
- [X] T019 [US1] Checkpoint — Close delivery slice `US1-CORE-2026-09-14` only after all mapped leaf verification tasks pass, required Pi visual comparisons are recorded, and no reachable discrepancy for that slice remains open; record closure in `specs/001-add-feature-parity/reference/discrepancies.md` and `specs/001-add-feature-parity/reference/pi-visuals.md`.

### Core workflow reference observations

These observations precede T013 for the selected US1 leaves. Model-backed probes remain pending while the reported weekly usage cap is active.

- [X] T054 [US1] Observe US1-READ-001 in an authorized disposable repository: capture normal in-scope read, missing-path failure, and any permission boundary in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks tied to those observations.
- [X] T055 [US1] Observe US1-SEARCH-PATH-001 in an authorized disposable repository: confirm installed path-search availability, matching paths, no-match, and invalid-pattern behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/tools/nox-search.ts` and `find.ts`; then have T013 create implementation and verification tasks.
- [X] T056 [US1] Observe US1-EDIT-001 in an authorized disposable repository: capture approval, exact file delta, denied edit, and failed edit without unrelated writes in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.
- [X] T057 [US1] Observe US1-COMMAND-001 in an authorized disposable repository: capture permission decision, stdout/stderr, nonzero exit, and interruption for harmless commands in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.
- [X] T058 [US1] Observe US1-DENY-001 for parent US1-EDIT-001 in an authorized disposable repository: refuse a proposed targeted edit and capture prompt, decision, error, unchanged file, and follow-up state in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [X] T059 [US1] Observe US1-FAIL-001 for parent US1-COMMAND-001 in an authorized disposable repository: trigger a harmless command with nonzero exit and capture result shape, stdout/stderr, side effects, and retry behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [X] T060 [US1] Observe US1-RECOVER-001 for parent US1-COMMAND-001 in the same authorized session after that nonzero command: capture history, next actions, and a successful continuation in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [X] T061 [US1] Observe US1-SEARCH-CONTENT-001 in an authorized disposable repository: confirm installed content-search availability, matching text, no-match, and invalid-pattern behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/tools/nox-search.ts` and `grep.ts`; then have T013 create implementation and verification tasks.

### Context and prompt-handling slice (FR-004; not US1-CORE)

- [X] T321 [US1] Inventory context-discovery and prompt-assembly as separate leaves (project instructions, nested rules, `NOX.md`, implicit repo context) in `specs/001-add-feature-parity/reference/inventory-core.md` with nox-native names; register slice `US1-CONTEXT-PENDING` in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T322 [US1] Observe those leaves in an isolated fixture; record source order, omission, and failure in `specs/001-add-feature-parity/reference/scenarios.md`.
- [X] T323 [US1] After T322, T013 must emit failing-test → implement → verify tasks before any source change.
- [X] T332 [US1] Write failing context and prompt-assembly behavior tests in `packages/coding-agent/test/suite/parity-context.test.ts` for `NOX.md`, `.nox/rules`, `.nox/local.md`, `@path` imports, and canonical prompt layering.
- [X] T333 [US1] Implement prompt context assembly and rule matching in `packages/coding-agent/src/core/resource-loader.ts` and prompt builder, validating paths and 4-hop import limits.
- [X] T334 [US1] Verify `US1-CTX-*` leaves with focused parity tests and `npm run check`, recording results in `specs/001-add-feature-parity/reference/validation.md`.
- [X] T324 [US1] Checkpoint — Close `US1-CONTEXT-PENDING` only after mapped verification passes; T016 stays independent.

### Feature-family indexes

- [X] T063 [US1] Index — Agent-execution leaves. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T016–T019 and later US1 slices covering this family are closed or remaining leaves are gated.
- [X] T064 [US1] Index — Built-in-tool leaves. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T016–T019 are closed or remaining leaves are gated.
- [X] T068 [US1] Index — Terminal-interaction leaves. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T018 and later US1 terminal slices are closed or remaining leaves are gated.
- [X] T081 [US1] Index — Computer-use and browser-use leaves. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Stay open with missing-mapping count > 0 until T003 records at least one leaf ID or a gated rationale for this population. Close when a later US1 slice owning these leaves is closed or remaining leaves are gated.
- [X] T086 [US1] Index — Context-window, caching, image, large-input, and context-reduction leaves. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. T324 does **not** own this population. Stay open with missing-mapping count > 0 until T003 records at least one leaf ID or a gated rationale for this population. Close when a dedicated images/context-window slice exists and is closed, or remaining leaves are gated.

### Completed Work Record

> Historical execution record only. T320 passed; checked application tasks in this record remain constitution-incomplete until T049 and T053. T049 and T053 separately govern constitutional application completion and parity/release completion.

- [X] T100 [US1] Build a disposable loopback Messages fixture in `specs/001-add-feature-parity/reference/harness/loopback_probe.py` with protocol tests in `specs/001-add-feature-parity/reference/harness/test_loopback_probe.py`; inject a synthetic Read call, capture only redacted request/tool-result summaries, reject unexpected paths and malformed payloads, and retain the resulting trace in `specs/001-add-feature-parity/reference/observations/`. Use a temporary home and synthetic key; keep real-service and unobserved tool cases gated.
- [X] T119 [US1] Observe TOOL-002 and TOOL-003 bare-mode exposure with a disposable local Messages endpoint in `specs/001-add-feature-parity/reference/harness/loopback_probe.py`: retain `--bare`, record only tool-name booleans, verify the trace in `specs/001-add-feature-parity/reference/harness/test_loopback_probe.py`, and retain a redacted observation. Depend on [TOOL-BARE-CATALOG](specs/001-add-feature-parity/reference/scenarios.md); do not use account-backed model calls or infer default-session exposure.
- [X] T120 [US1] Observe TOOL-002 and TOOL-003 normal startup catalog in `specs/001-add-feature-parity/reference/harness/loopback_probe.py` using macOS `sandbox-exec` with only localhost outbound allowed. First verify localhost succeeds and direct external IP fails, then run the synthetic Messages fixture without `--bare`; record only fixed tool-name booleans and keep any startup failure unverified. Depend on [TOOL-DEFAULT-CATALOG](specs/001-add-feature-parity/reference/scenarios.md).
- [X] T121 [US1] Observe TOOL-002 explicit `--tools Glob` exposure through the same macOS localhost-only sandbox in `specs/001-add-feature-parity/reference/harness/loopback_probe.py`; retain only fixed catalog booleans, synthetic completion, and exit in a redacted trace. Depend on [TOOL-GLOB-ENABLE](specs/001-add-feature-parity/reference/scenarios.md); keep actual pattern semantics open.
- [X] T122 [US1] Observe TOOL-003 explicit `--tools Grep` exposure through the same macOS localhost-only sandbox in `specs/001-add-feature-parity/reference/harness/loopback_probe.py`; retain only fixed catalog booleans, synthetic completion, and exit in a redacted trace. Depend on [TOOL-GREP-ENABLE](specs/001-add-feature-parity/reference/scenarios.md); keep actual query semantics open.
- [X] T123 [US1] Observe one normal TOOL-002 Glob call in `specs/001-add-feature-parity/reference/harness/loopback_probe.py` with a synthetic `*.txt` pattern under the localhost-only sandbox; test result redaction/classification, retain only fixture-match and error booleans, and record the redacted trace. Depend on [TOOL-GLOB-NORMAL](specs/001-add-feature-parity/reference/scenarios.md); leave empty/invalid patterns and nox comparison open.
- [X] T124 [US1] Observe one normal TOOL-003 Grep call in `specs/001-add-feature-parity/reference/harness/loopback_probe.py` with a synthetic `alpha` query under the localhost-only sandbox; retain only fixture-match and error booleans and a redacted trace. Depend on [TOOL-GREP-NORMAL](specs/001-add-feature-parity/reference/scenarios.md); leave no-match/invalid queries and nox comparison open.
- [X] T125 [US1] Observe TOOL-002 Glob no-match behavior with a synthetic `absent-*.zzz` pattern in the same sandboxed fixture; test the redacted no-match classification and retain the error/result-state trace. Depend on [TOOL-GLOB-NO-MATCH](specs/001-add-feature-parity/reference/scenarios.md); leave invalid patterns and nox comparison open.
- [X] T126 [US1] Observe TOOL-003 Grep no-match behavior with a synthetic `absent-sentinel` query in the same sandboxed fixture; retain the redacted error/result-state trace. Depend on [TOOL-GREP-NO-MATCH](specs/001-add-feature-parity/reference/scenarios.md); leave invalid queries and nox comparison open.
- [X] T127 [US1] Observe TOOL-002 Glob input `[` in the same sandboxed fixture, retaining only the error flag, fixture-match flag, completion/exit, and unchanged-file state. Depend on [TOOL-GLOB-BRACKET](specs/001-add-feature-parity/reference/scenarios.md); do not infer Grep's pattern rules.
- [X] T128 [US1] Observe TOOL-003 Grep input `[` in the same sandboxed fixture, retaining only the error flag, fixture-match flag, completion/exit, and unchanged-file state. Depend on [TOOL-GREP-BRACKET](specs/001-add-feature-parity/reference/scenarios.md); leave exact diagnostic and nox comparison open.
- [X] T129 [US1] Classify the six synthetic Glob/Grep result bodies in `specs/001-add-feature-parity/reference/harness/loopback_probe.py` using only exact fixture-format allowlists, test that unexpected text stays redacted, and retain normalized offline traces. Depend on TOOL-GLOB-NORMAL, TOOL-GREP-NORMAL, TOOL-GLOB-NO-MATCH, TOOL-GREP-NO-MATCH, TOOL-GLOB-BRACKET, and TOOL-GREP-BRACKET.
- [X] T130 [US1] Inspect nox's actual tool registration, CLI tool selection, and existing search behavior; reconcile TOOL-002/003 source targets and test fixtures before implementation. Keep default tool exposure aligned with the observed catalog; record source ownership in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T131 [US1] Write failing nox tests for explicit Glob/Grep exposure and synthetic match, no-match, and invalid-pattern results, using the exact offline fixture formats and error decisions in `packages/coding-agent/test/nox-search-tools.test.ts`.
- [X] T132 [US1] Implement the minimum nox Glob/Grep tool definitions and explicit selection wiring for the observed contracts; keep unrelated defaults and Pi visuals intact in `packages/coding-agent/src/core/tools/nox-search.ts` and `packages/coding-agent/src/core/tools/index.ts`.
- [X] T133 [US1] Run focused tests and `npm run check`, compare nox against the six offline fixtures, update the validation/discrepancy ledger, and commit locally. Leave unobserved options and real-service behavior open.
- [X] T134 [US1] Verify the SDK's provider-facing active catalog for explicit `Glob` and `Grep` in an offline in-memory session, including default exclusion and single-tool selection; record and commit the result.
- [X] T135 [US1] Capture fixed-field input-schema presence for reference Glob/Grep from the localhost-only synthetic endpoint, compare nox's advertised fields, and list any unsupported options as separate observed work; record the comparison in `specs/001-add-feature-parity/reference/scenarios.md`.
- [X] T136 [US1] Probe reference Glob's optional `path` and Grep's `output_mode` variants in disposable synthetic repositories, retaining only fixed expected output formats and errors; then add exact schema and mapping tasks for nox.
- [X] T137 [US1] Write failing nox tests for Glob `path: nested` and Grep `output_mode: files_with_matches|content`, including advertised schema presence and exact synthetic outputs.
- [X] T138 [US1] Add the observed Glob/Grep schema fields and output-mode mapping without changing lower-case Pi tools; keep unobserved Grep options out of the new adapter schema in `packages/coding-agent/src/core/tools/nox-search.ts`.
- [X] T139 [US1] Verify focused tool and catalog tests plus `npm run check`, record remaining schema gaps, and commit locally.
- [X] T140 [US1] Observe Grep `-i: true` with an uppercase query against the lowercase synthetic fixture through the localhost-only reference endpoint, retaining only fixed result classification.
- [X] T141 [US1] Write a failing nox test for the observed case-insensitive Grep field and result, then map `-i` to the existing lower-case grep option.
- [X] T142 [US1] Run focused and neighboring tests plus `npm run check`, update the validation ledger, and commit locally.
- [X] T143 [US1] Observe the reference's third advertised Grep `output_mode: count` value in a localhost-only synthetic fixture; retain only an exact allowlisted result class and no raw request content.
- [X] T144 [US1] Observe reference Grep count mode with two files and three total matches in a disposable localhost-only fixture, retaining only an exact synthetic result class; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T145 [US1] Write failing nox count-mode tests for the observed single- and multi-file fixtures, implement the formatter in the explicit Grep adapter, then verify neighboring tests and `npm run check` before committing locally.
- [X] T146 [US1] Observe Grep `output_mode: count` with no matches in a localhost-only fixture and compare nox's empty-result decision; keep count limits and per-file ordering open.
- [X] T147 [US1] Write a failing nox count-mode no-match test, implement the observed zero-total result without changing other Grep modes, verify focused tests and `npm run check`, then commit locally.
- [X] T148 [US1] Observe reference Grep count mode against a disposable file with 101 matching lines through the localhost-only endpoint, retaining only exact synthetic count classification and unchanged-file state; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T149 [US1] Compare nox's explicit count mode with the observed 101-line fixture; if it truncates, fix the long-term counting path without changing lower-case Pi grep and verify/commit locally in `packages/coding-agent/src/core/tools/nox-grep-count.ts` and `packages/coding-agent/test/nox-search-tools.test.ts`.
- [X] T150 [US1] Observe reference Grep count mode with two occurrences on one synthetic line under localhost-only isolation, classify only exact fixed result text, compare the nox count helper, and commit the validation; record validation in `specs/001-add-feature-parity/reference/validation.md`.
- [X] T151 [US1] Observe reference Grep `output_mode: content` with `-n: false` in the localhost-only fixture, retaining only an exact allowlisted output class; compare the nox schema and result.
- [X] T152 [US1] Write a failing nox test for the observed `-n` decision, implement only that field in the explicit Grep adapter, verify focused and neighboring tests plus `npm run check`, and commit locally.
- [X] T153 [US1] Observe reference Grep content mode with `-o: true` against a synthetic `alpha beta` line through the localhost-only endpoint; retain only exact allowlisted output and unchanged-file state.
- [X] T154 [US1] Write a failing nox test for the observed `-o` output and schema, implement only that explicit field, verify focused and neighboring tests plus `npm run check`, and commit locally.
- [X] T155 [US1] Observe reference Grep content mode with `-C: 1` around a synthetic match under localhost-only isolation; retain an exact allowlisted context result and unchanged-file state.
- [X] T156 [US1] Write a failing nox test for the observed `-C` schema and output, map the flag through the explicit Grep adapter without changing lower-case Pi grep, verify and commit locally.
- [X] T157 [US1] Observe reference Grep content mode with `-A: 1` and `-B: 1` separately in a three-line synthetic file under localhost-only isolation, retaining only exact allowlisted results.
- [X] T158 [US1] Write failing nox tests for the observed one-sided context flags, implement their explicit schema and result semantics, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T159 [US1] Observe reference Grep with `path: nested` and a synthetic nested match under localhost-only isolation, retaining exact allowlisted result format and unchanged-file state.
- [X] T160 [US1] Observe reference Grep with both `path: nested` and `output_mode: files_with_matches` in the same localhost-only fixture, establishing explicit-mode precedence.
- [X] T161 [US1] Write failing nox nested-path Grep tests for implicit and explicit output modes, match the observed repository-relative results in the explicit adapter, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T162 [US1] Consolidate the offline search harness's repeated mode sets into named constants so new modes cannot silently miss sandboxing, catalog capture, or match validation; run harness tests and representative loopback traces, then commit locally in `specs/001-add-feature-parity/reference/harness/loopback_probe.py`.
- [X] T163 [US1] Observe reference Grep `glob: *.txt` with matching synthetic `.txt` and `.md` files under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's explicit adapter.
- [X] T164 [US1] Observe reference Grep `head_limit: 1` in content mode with two synthetic matching lines under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's explicit adapter.
- [X] T165 [US1] Write a failing nox test for observed Grep content `head_limit: 1`, implement the explicit schema and pagination result for that observed branch, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T166 [US1] Observe reference Grep `head_limit: 1, offset: 1` in content mode with two synthetic matching lines under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's explicit adapter.
- [X] T167 [US1] Write a failing nox test for observed Grep content `head_limit: 1, offset: 1`, implement the explicit offset schema and pagination result for that branch, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T168 [US1] Observe reference Grep content `head_limit: 1` when exactly one synthetic line matches under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's pagination boundary.
- [X] T169 [US1] Observe reference Grep content `head_limit: 1, offset: 2` with two synthetic matching lines under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's offset-past-end behavior.
- [X] T170 [US1] Write a failing nox test for observed Grep offset-past-end output, implement that explicit content-mode boundary, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T171 [US1] Observe reference Grep content `head_limit: 1, offset: 0` with two synthetic matching lines under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's zero-offset marker.
- [X] T172 [US1] Observe reference Grep `type: py` with matching synthetic `.py` and `.txt` files under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's explicit adapter.
- [X] T173 [US1] Write a failing nox test for observed Grep `type: py` filtering, implement the explicit schema and safe type filtering for that branch, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T174 [US1] Observe reference Grep content `context: 1` around a synthetic match under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's explicit adapter.
- [X] T175 [US1] Write a failing nox test for observed Grep `context: 1`, implement its explicit schema and symmetric context mapping, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T176 [US1] Observe reference Grep content `multiline: true` with a two-line synthetic pattern under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's explicit adapter.
- [X] T177 [US1] Write a failing nox test for observed Grep multiline content output, implement a bounded no-shell explicit path for that branch, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T178 [US1] Observe reference Grep content `multiline: true` with a synthetic no-match pattern under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's new helper.
- [X] T179 [US1] Write a failing nox test for the observed multiline content no-match result, correct only that helper's empty-result text, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T180 [US1] Observe reference Grep `multiline: true` with no output mode and a two-line synthetic match under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's default branch.
- [X] T181 [US1] Write a failing nox test for observed default-mode multiline file-list output, extend only the explicit multiline helper and branch, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T182 [US1] Observe reference Grep `multiline: true, output_mode: files_with_matches` with a two-line synthetic match under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's explicit branch.
- [X] T183 [US1] Write a failing nox test for explicit multiline files-with-matches output, route it through the existing bounded helper, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T184 [US1] Observe reference Grep `multiline: true, output_mode: count` with one two-line synthetic match under localhost-only isolation; retain exact allowlisted result and unchanged-file state, then compare nox's count helper.
- [X] T185 [US1] Write a failing nox test for observed multiline count output, enable ripgrep multiline mode in the explicit count helper, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T186 [US1] Reconcile the synthetic Glob/Grep normal, no-match, invalid, and option traces into the US1 search inventory, scenarios, reconciliation, and gated register; correct nox source targets, preserve real-service and interactive gates, then commit locally in `specs/001-add-feature-parity/reference/inventory-core.md`, `specs/001-add-feature-parity/reference/scenarios.md`, `specs/001-add-feature-parity/reference/reconciliation.md`, and `specs/001-add-feature-parity/reference/gated.md`.
- [X] T187 [US1] Observe reference Glob `*.txt` with two synthetic matching files under localhost-only isolation; retain exact allowlisted order and unchanged-file state, then compare nox's explicit adapter.
- [X] T188 [US1] Observe reference Glob `**/*.txt` with root and nested synthetic matches under localhost-only isolation; retain exact allowlisted paths and unchanged-file state, then compare nox's explicit adapter.
- [X] T189 [US1] Observe reference Glob `*.txt` with synthetic hidden and visible matches under localhost-only isolation; retain exact allowlisted paths and unchanged-file state, then compare nox's explicit adapter.
- [X] T190 [US1] Observe reference Glob order with controlled synthetic modification times and hidden/visible matches under localhost-only isolation; distinguish timestamp ordering from traversal ordering before implementing a nox fix; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T191 [US1] Write failing nox tests for both observed Glob hidden-file orders, sort the explicit adapter by ascending modification time without changing lower-case Pi find, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T192 [US1] Observe reference Glob order when hidden and visible synthetic matches have equal controlled modification times under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's tie break; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T193 [US1] Observe reference Glob `*.txt` with a synthetic ignored matching file in a disposable repository under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's explicit adapter.
- [X] T194 [US1] Write a failing nox test for Glob including a synthetic `.gitignore` match; add an explicit adapter search path that includes ignored files while preserving lower-case Pi find behavior, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T195 [US1] Observe reference Glob `*.txt` with a synthetic `.ignore`-excluded matching file under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's explicit adapter.
- [X] T196 [US1] Write a failing nox test for Glob including a `.ignore`-excluded file; extend the explicit adapter's fd option without changing lower-case Pi find, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T197 [US1] Observe reference Glob `**/*.txt` with a synthetic matching file inside disposable `.git` metadata under localhost-only isolation; retain exact allowlisted result and unchanged state before choosing a broad no-ignore option.
- [X] T198 [US1] Observe reference Grep `alpha` with a matching synthetic `.gitignore`-excluded file under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's explicit adapter.
- [X] T199 [US1] Observe reference Grep `alpha` with a matching synthetic `.ignore`-excluded file under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's explicit adapter.
- [X] T200 [US1] Observe reference Grep `alpha` with a synthetic matching file inside disposable `.git` metadata under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's explicit adapter.
- [X] T201 [US1] Observe reference Grep `alpha` with a synthetic hidden non-metadata matching file under localhost-only isolation; retain exact allowlisted result and unchanged state before correcting nox's `.git` exclusion.
- [X] T202 [US1] Observe reference Grep file-list ordering with controlled hidden/visible modification times under localhost-only isolation; distinguish timestamp ordering from traversal order before implementing nox fixes; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T203 [US1] Write failing nox tests for observed Grep descending-mtime file order and `.git` metadata exclusion; implement only explicit adapter behavior while preserving lower-case Pi grep, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T204 [US1] Observe reference Grep file-list order when hidden and visible synthetic matches have equal controlled modification times under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's tie break; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T205 [US1] Write a failing nox test for observed equal-mtime Grep file order; add a deterministic tie-break in the explicit file-list adapter, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T206 [US1] Observe reference Grep content mode across two synthetic matching files under localhost-only isolation; retain exact allowlisted output order and unchanged state, then compare nox's explicit adapter; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T207 [US1] Write a failing nox test for observed two-file Grep content order; sort explicit content blocks by descending file modification time without changing lower-case Pi grep, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T208 [US1] Observe reference Grep content mode with two matching synthetic files at equal controlled modification times under localhost-only isolation; retain exact allowlisted output order and unchanged state, then compare nox's tie-break; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T209 [US1] Recreate the root Grep fixture after the second file while keeping equal controlled modification times, observe content-mode tie order under localhost-only isolation, and identify a deterministic nox tie-break before source work; retain the observation under `specs/001-add-feature-parity/reference/observations/`.
- [X] T210 [US1] Write a failing nox test for observed equal-mtime two-file Grep content order; apply a deterministic descending-path tie-break only to explicit content results, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T211 [US1] Observe reference Grep content `head_limit: 1` across two synthetic files with controlled modification times under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's ordering-before-pagination behavior.
- [X] T212 [US1] Observe reference Grep `output_mode: files_with_matches, head_limit: 1` across two synthetic files with controlled modification times under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's file-list pagination.
- [X] T213 [US1] Write a failing nox test for the observed Grep file-list `head_limit: 1` result; paginate sorted explicit file results and format the observed header, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T214 [US1] Observe reference Grep `output_mode: files_with_matches, head_limit: 1` with exactly one synthetic matching file under localhost-only isolation; retain exact allowlisted header and unchanged state, then compare nox's boundary.
- [X] T215 [US1] Observe reference Grep `output_mode: files_with_matches, head_limit: 1, offset: 1` across two synthetic files with controlled modification times under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's file-list offset.
- [X] T216 [US1] Write a failing nox test for observed Grep file-list `offset: 1` output; apply offset after sorting and format the observed header, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T217 [US1] Observe reference Grep `output_mode: files_with_matches, head_limit: 1, offset: 2` across two synthetic matching files under localhost-only isolation; retain exact allowlisted empty-page result and unchanged state, then compare nox's boundary.
- [X] T218 [US1] Write a failing nox test for observed Grep file-list offset-past-end text, implement that explicit boundary without changing other modes, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T227 [US1] Observe explicit Grep `files_with_matches` with a nonmatching synthetic pattern under localhost-only isolation; compare nox's empty result, verify harness and focused tests, then commit locally.
- [X] T228 [US1] Observe explicit Grep `content` with a nonmatching synthetic pattern under localhost-only isolation; compare nox's empty result, verify harness tests, then commit locally.
- [X] T229 [US1] Write a failing nox test for explicit Grep content no-match text, implement the observed output-mode boundary without changing file-list/default modes, verify focused tests and `npm run check`, then commit locally.
- [X] T230 [US1] Observe explicit Grep content with `head_limit: 1` and no match under localhost-only isolation; add the nox boundary test, verify harness/focused tests and `npm run check`, then commit locally.
- [X] T231 [US1] Observe explicit Grep content with `head_limit: 1`, `offset: 1`, and no match under localhost-only isolation; retain exact allowlisted pagination text, verify harness tests, then commit locally.
- [X] T232 [US1] Compare nox's explicit Grep content no-match offset output with T231; write a failing test if needed, implement only the observed boundary, verify focused tests and `npm run check`, then commit locally.
- [X] T233 [US1] Observe explicit Grep file-list with `head_limit: 1`, `offset: 1`, and no match under localhost-only isolation; add the nox boundary test, verify harness/focused tests and `npm run check`, then commit locally.
- [X] T234 [US1] Observe explicit Grep count with two matching synthetic files, `head_limit: 1`, and `offset: 1` under localhost-only isolation; retain exact allowlisted file/summary text, verify harness tests, then commit locally.
- [X] T235 [US1] Write a failing nox test for T234 count pagination, implement the observed file-row selection and whole-result summary without changing other count modes, verify focused tests and `npm run check`, then commit locally.
- [X] T236 [US1] Observe explicit Grep count across two matching synthetic files with `head_limit: 1` and no offset under localhost-only isolation; retain exact allowlisted result, verify harness tests, then commit locally.
- [X] T237 [US1] Write a failing nox test for T236 count head-limit annotation, implement the observed limit marker without changing offset behavior, verify focused tests and `npm run check`, then commit locally.
- [X] T238 [US1] Observe count mode with exactly one matching synthetic file and `head_limit: 1` under localhost-only isolation; add the nox exact-limit test, verify harness/focused tests and `npm run check`, then commit locally.
- [X] T239 [US1] Observe count mode with one matching synthetic file, `head_limit: 1`, and `offset: 1` under localhost-only isolation; retain exact allowlisted empty-page text, verify harness tests, then commit locally.
- [X] T240 [US1] Write a failing nox test for T239 count offset-past-end text, implement the observed row placeholder while retaining whole-result totals, verify focused tests and `npm run check`, then commit locally.
- [X] T241 [US1] Observe zero-match count mode with `head_limit: 1` and `offset: 1` under localhost-only isolation; retain exact allowlisted summary and pagination text, verify harness tests, then commit locally.
- [X] T242 [US1] Write a failing nox test for T241 zero-match count offset annotation, implement the observed marker while preserving the no-match row text, verify focused tests and `npm run check`, then commit locally.
- [X] T243 [US1] Observe zero-match count mode with `head_limit: 1` and no offset under localhost-only isolation; add the nox boundary test, verify harness/focused tests and `npm run check`, then commit locally.
- [X] T244 [US1] Observe count mode with one matching synthetic file, `head_limit: 1`, and explicit `offset: 0` under localhost-only isolation; add the nox boundary test, verify harness/focused tests and `npm run check`, then commit locally.
- [X] T245 [US1] Observe Grep with an unknown file `type` under localhost-only isolation; compare the reference's error status to nox, verify harness/focused tests and `npm run check`, then commit locally.
- [X] T246 [US1] Observe Grep with an unsupported `output_mode` under localhost-only isolation; retain tool-error status and fixture state, verify harness tests, then commit locally.
- [X] T247 [US1] Compare nox's unsupported Grep `output_mode` behavior with T246; write a failing test if it falls through, reject the invalid mode at the explicit adapter boundary, verify focused tests and `npm run check`, then commit locally.
- [X] T248 [US1] Observe Grep content with `head_limit: -1` under localhost-only isolation; retain tool-error status and fixture state, verify harness tests, then commit locally.
- [X] T249 [US1] Compare nox's negative Grep head-limit behavior with T248; write a failing test and reject the invalid value before searching, verify focused tests and `npm run check`, then commit locally.
- [X] T250 [US1] Observe Grep content with `offset: -1` under localhost-only isolation; retain tool-error status and fixture state, verify harness tests, then commit locally.
- [X] T251 [US1] Compare nox's negative Grep offset behavior with T250; write a failing test and reject the invalid value before searching, verify focused tests and `npm run check`, then commit locally.
- [X] T252 [US1] Resolve unstable count-page ordering exposed during T251 by observing controlled-mtime and reverse-creation two-file reference fixtures under localhost-only isolation; retain exact allowlisted pages and unchanged state, then commit locally; retain the observations under `specs/001-add-feature-parity/reference/observations/`.
- [X] T253 [US1] Make nox count-page file ordering deterministic according to T252, verify pagination tests and `npm run check`, then commit locally with the T251 numeric guard.
- [X] T254 [US1] Observe Grep content with `head_limit: 0` under localhost-only isolation; add the nox boundary test, verify harness/focused tests and `npm run check`, then commit locally.
- [X] T255 [US1] Observe Grep content with fractional `head_limit: 1.5` under localhost-only isolation; verify nox's integer guard, harness/focused tests and `npm run check`, then commit locally.
- [X] T256 [US1] Observe Grep content with fractional `offset: 1.5` under localhost-only isolation; verify nox's integer guard, harness/focused tests and `npm run check`, then commit locally.
- [X] T257 [US1] Observe Grep content with `-C: -1` under localhost-only isolation; retain tool-error status and fixture state, verify harness tests, then commit locally.
- [X] T258 [US1] Compare nox's negative Grep `-C` behavior with T257; write a failing test and validate explicit context input before searching, verify focused tests and `npm run check`, then commit locally.
- [X] T259 [US1] Observe Grep content with `context: -1` under localhost-only isolation; retain tool-error status and fixture state, verify harness tests, then commit locally.
- [X] T260 [US1] Compare nox's negative Grep `context` alias behavior with T259; write a failing test and validate the alias before searching, verify focused tests and `npm run check`, then commit locally.
- [X] T261 [US1] Observe Grep content with `-A: -1` under localhost-only isolation; retain tool-error status and fixture state, verify harness tests, then commit locally.
- [X] T262 [US1] Compare nox's negative Grep `-A` behavior with T261; test the existing sided-context error before searching, verify focused tests and `npm run check`, then commit locally.
- [X] T263 [US1] Observe Grep content with `-B: -1` under localhost-only isolation; verify nox's existing sided-context error, harness/focused tests and `npm run check`, then commit locally.
- [X] T264 [US1] Observe an empty Grep pattern against a single synthetic file with explicit `content` mode under localhost-only isolation; retain exact allowlisted output and unchanged state, verify harness tests, then commit locally.
- [X] T265 [US1] Compare nox's empty-pattern single-file Grep content with T264; write a failing test if needed, implement the observed file-target output shape, verify focused tests and `npm run check`, then commit locally.
- [X] T266 [US1] Observe nonempty Grep content on a single synthetic file under localhost-only isolation; verify nox's direct-file formatting, harness/focused tests and `npm run check`, then commit locally.
- [X] T267 [US1] Observe `files_with_matches` Grep on a single synthetic file under localhost-only isolation; verify nox's direct-file file-list formatting, harness/focused tests and `npm run check`, then commit locally.
- [X] T268 [US1] Observe count-mode Grep on a single synthetic file under localhost-only isolation; verify nox's direct-file count formatting, harness/focused tests and `npm run check`, then commit locally.
- [X] T269 [US1] Observe Grep on a single synthetic file with omitted `output_mode` under localhost-only isolation; retain exact allowlisted default result and unchanged state, verify harness tests, then commit locally.
- [X] T270 [US1] Write a failing nox test for T269 direct-file default Grep mode, select the observed file-list branch without changing directory-path defaults, verify focused tests and `npm run check`, then commit locally.
- [X] T271 [US1] Observe direct-file Grep with a nonmatching pattern and omitted `output_mode` under localhost-only isolation; verify nox's empty result, harness/focused tests and `npm run check`, then commit locally.
- [X] T272 [US1] Observe Grep content with a nonexistent path under localhost-only isolation; verify nox raises a path error, harness/focused tests and `npm run check`, then commit locally.
- [X] T273 [US1] Align the explicit Grep `head_limit` schema with the observed accepted zero boundary from T254; write a failing schema test, change the minimum, verify focused tests and `npm run check`, then commit locally.
- [X] T274 [US1] Observe direct-file Grep content with a nonmatching pattern under localhost-only isolation; verify nox's empty content result, harness/focused tests and `npm run check`, then commit locally.
- [X] T275 [US1] Observe direct-file Grep count with a nonmatching pattern under localhost-only isolation; verify nox's zero-total result, harness/focused tests and `npm run check`, then commit locally.
- [X] T276 [US1] Observe Glob with a nonexistent path under localhost-only isolation; verify nox raises an error, harness/focused tests and `npm run check`, then commit locally.
- [X] T277 [US1] Observe Glob with a file path under localhost-only isolation; verify nox raises an error, harness/focused tests and `npm run check`, then commit locally.
- [X] T278 [US1] After T014 records the expected failing Read behavior, implement the explicit Read tool adapter in `packages/coding-agent/src/core/tools/nox-read.ts` matching the observed schema and formatted line number text; verify with focused tests, settings tests, harness tests and `npm run check`, then commit locally.
- [X] T279 [US1] After T014 records the expected failing Edit behavior, implement the explicit Edit tool adapter in `packages/coding-agent/src/core/tools/nox-edit.ts` matching the observed schema, replacement semantics, error messages and success text; verify with focused tests, settings tests, harness tests and `npm run check`, then commit locally.
- [X] T280 [US1] After T014 records the expected failing Bash behavior, implement the explicit Bash tool adapter in `packages/coding-agent/src/core/tools/nox-bash.ts` matching the observed schema, nonzero exit formatting, and timeout behavior; verify with focused tests, settings tests, harness tests and `npm run check`, then commit locally.

**Checkpoint**: US1 works independently, including denial and failure recovery, with no known discrepancy for its reachable leaf items.

---

## Phase 4: User Story 2 — Control and Resume Work (Priority: P1)

**Goal**: Match session, model, permission, and background lifecycle behavior.

**Independent Test**: Compare mode changes, allowed and denied actions, model fallback, named and forked sessions, compaction, resume, and background lifecycle from matched initial state.

### Verification

- [X] T020 [P] [US2] Capture the existing nox session lifecycle baseline in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts`, with bounded session-manager injection and restored-message setup in `packages/coding-agent/test/suite/harness.ts`; keep US2-SESSION-001 through US2-SESSION-006 unverified until T289–T290 pass.
- [X] T021 [P] [US2] Add permission scope, precedence, persistence, prompt, denial, unattended, restricted-mode, credential reuse after restart, and output/log/error redaction scenarios in `packages/coding-agent/test/suite/parity-permissions.test.ts`, keyed to those IDs and using synthetic credentials in isolated user/project fixtures.
- [X] T022 [P] [US2] Add model, effort, fallback, context, and budget contract scenarios in `packages/coding-agent/test/suite/parity-model-controls.test.ts`, keyed to those IDs.

### Implementation

- [X] T023 [US2] Checkpoint — After T289–T290, T013 MUST append observe/test/impl/verify tasks for every failing or unimplemented US2-SESSION-* leaf using the T293–T295 pattern and `packages/coding-agent/src/core/` session modules. Close only when those tasks exist and pass (or the leaf is gated). This checkpoint does not authorize a whole-family edit. Verify every session identity, naming, continuation, resume, fork, compaction, and persistence leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T024 [US2] Checkpoint — Verify every permission-mode, rule-precedence, persistence, prompt, denial, unattended, credential-reuse, and redaction leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T025 [US2] Checkpoint — Verify every model, effort, fallback, context, and budget leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T026 [US2] Checkpoint — Verify every session and permission Pi-control leaf has observed evidence, an executable test-first implementation sequence, passing verification, and visual-matrix coverage mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T027 [US2] Checkpoint — Close background-session lifecycle only after T281–T319 pass, every T281 leaf has matched reference evidence, and all related discrepancies are closed in `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T028 [US2] Resolve every US2 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and record passing focused tests and Pi visual states in `specs/001-add-feature-parity/reference/pi-visuals.md`.

### Background lifecycle leaf tasks

- [X] T281 [US2] Inventory separate background launch, list, attach, log-read, stop, restart, remove, unexpected-exit, and recovery leaves with nox controls and availability conditions in `specs/001-add-feature-parity/reference/inventory-surfaces.md`.
- [X] T282 [US2] Observe the T281-assigned background-launch leaf in an isolated fixture; record process output, exit status, persisted identifier, redacted side effects, and availability in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T283 [US2] Observe the T281-assigned background-list leaf in an isolated fixture; record ordering, status fields, empty state, errors, and redacted output in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T284 [US2] Observe the T281-assigned background-attach leaf in an isolated fixture; record intermediate interactions, disconnect behavior, resulting state, and errors in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T285 [US2] Observe the T281-assigned background-log-read leaf in an isolated fixture; record output ordering, redaction, missing-session behavior, and side effects in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T286 [US2] Observe the T281-assigned background-stop leaf in an isolated fixture; record state transition, exit behavior, repeated-stop error, and persisted side effects in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T287 [US2] Observe the T281-assigned background-restart leaf in an isolated fixture; record identity reuse/replacement, state transition, failure behavior, and persisted side effects in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T288 [US2] Observe the T281-assigned background-remove leaf in an isolated fixture; record cleanup, missing-session behavior, active-session handling, and persisted side effects in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T289 [US2] Capture matched reference observations for US2-SESSION-001 through US2-SESSION-006 under `specs/001-add-feature-parity/reference/observations/` and record normalized contracts in `specs/001-add-feature-parity/reference/scenarios.md`.
- [X] T290 [US2] Compare the T020 nox baseline against T289; record results in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`; mark only passing leaves verified. For each failing or unimplemented SESSION leaf, add the T013 task triple in this document before starting T023.
- [X] T291 [US2] Observe the T281-assigned background-unexpected-exit leaf in an isolated fixture; record terminal state, exit metadata, logs, cleanup, and redacted failure output in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T292 [US2] Observe the T281-assigned background-recovery leaf after T291; record restart/attach options, identity and history behavior, resulting state, and failure paths in `specs/001-add-feature-parity/reference/scenarios.md` and `specs/001-add-feature-parity/reference/observations/`.
- [X] T293 [US2] Write a failing background-launch behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T282, covering normal and invalid launch without provider credentials or network access.
- [X] T294 [US2] Implement only the observed background-launch state transition in `packages/coding-agent/src/core/background-session.ts` and its nox-native CLI entry in `packages/coding-agent/src/cli.ts`, validating input before process or filesystem side effects.
- [X] T295 [US2] Verify the background-launch leaf with focused tests and record its normalized comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T296 [US2] Write a failing background-list behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T283, covering populated, empty, and error states.
- [X] T297 [US2] Implement only the observed background-list behavior in `packages/coding-agent/src/core/background-session.ts` and its nox-native CLI entry in `packages/coding-agent/src/cli.ts`.
- [X] T298 [US2] Verify the background-list leaf with focused tests and record its normalized comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T299 [US2] Write a failing background-attach behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T284, covering attach, disconnect, and missing-session states.
- [X] T300 [US2] Implement only the observed background-attach behavior in `packages/coding-agent/src/core/background-session.ts` and its nox-native CLI entry in `packages/coding-agent/src/cli.ts`, validating the session identifier before attachment.
- [X] T301 [US2] Verify the background-attach leaf with focused tests and affected Pi states; record its comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T302 [US2] Write a failing background-log-read behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T285, covering ordering, redaction, and missing sessions.
- [X] T303 [US2] Implement only the observed background-log-read behavior in `packages/coding-agent/src/core/background-session.ts` and its nox-native CLI entry in `packages/coding-agent/src/cli.ts`, preserving required redaction.
- [X] T304 [US2] Verify the background-log-read leaf with focused tests and record its comparison, redaction result, or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T305 [US2] Write a failing background-stop behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T286, covering active, stopped, and missing sessions.
- [X] T306 [US2] Implement only the observed background-stop transition in `packages/coding-agent/src/core/background-session.ts` and its nox-native CLI entry in `packages/coding-agent/src/cli.ts`, validating authorization and identity before signaling a process.
- [X] T307 [US2] Verify the background-stop leaf with focused tests and record its comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T308 [US2] Write a failing background-restart behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T287, covering normal and failed restart.
- [X] T309 [US2] Implement only the observed background-restart transition in `packages/coding-agent/src/core/background-session.ts` and its nox-native CLI entry in `packages/coding-agent/src/cli.ts`, preserving the observed identity/history contract.
- [X] T310 [US2] Verify the background-restart leaf with focused tests and record its comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T311 [US2] Write a failing background-remove behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T288, covering completed, active, and missing sessions.
- [X] T312 [US2] Implement only the observed background-remove transition in `packages/coding-agent/src/core/background-session.ts` and its nox-native CLI entry in `packages/coding-agent/src/cli.ts`, validating lifecycle state before cleanup.
- [X] T313 [US2] Verify the background-remove leaf with focused tests and record its comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T314 [US2] Write a failing unexpected-exit behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T291, covering exit metadata, logs, and terminal state.
- [X] T315 [US2] Implement only the observed unexpected-exit transition in `packages/coding-agent/src/core/background-session.ts`, preserving logs and redacting failure output.
- [X] T316 [US2] Verify the unexpected-exit leaf with focused tests and record its comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.
- [X] T317 [US2] Write a failing background-recovery behavior test in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts` from T292, covering successful and failed recovery after unexpected exit.
- [X] T318 [US2] Implement only the observed background-recovery transition in `packages/coding-agent/src/core/background-session.ts` and affected nox-native controls in `packages/coding-agent/src/cli.ts`.
- [X] T319 [US2] Verify the background-recovery leaf with focused and neighboring session/CLI tests, `npm run check`, and affected T093 Pi regression cells; record its comparison or discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`.

**Background dependency chain**: T281 → T282–T288/T291/T292 observations → each leaf's failing test → implementation → verification → T027. T289 → T290 independently verifies the foreground session baseline captured by T020. Observation tasks for independent leaves may run in parallel; tasks sharing `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts`, `packages/coding-agent/src/core/background-session.ts`, or `packages/coding-agent/src/cli.ts` run sequentially.

### Feature-family indexes

- [X] T065 [US2] Index — Same model/provider population as T025. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T025 is closed and extra leaves are mapped or gated.
- [X] T066 [US2] Index — Same permission/security population as T024. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T024 is closed and extra leaves are mapped or gated.
- [X] T067 [US2] Index — Same session/context population as T023 plus remaining context-limit leaves. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T023 is closed and extra leaves are mapped or gated.
- [X] T082 [US2] Index — Goal, agent-view, cross-session-message, and dynamic-workflow leaves owned by T023–T027. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Stay open with missing-mapping count > 0 until T003 records at least one leaf ID or a gated rationale for this population. Close when those owning closers covering this family are closed or remaining leaves are gated.
- [X] T087 [US2] Index — Scheduled-prompt, reminder, repeated-prompt, and goal-continuation leaves owned by T023–T027; T076 only records a pointer. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify.

**Checkpoint**: US2 works independently from the coding workflow; all reachable session and control leaf IDs have passing comparisons.

---

## Phase 5: User Story 3 — Customize and Connect Capabilities (Priority: P2)

**Goal**: Match settings and extension behavior through nox-native names and paths.

**Independent Test**: In isolated user/project/local/managed fixtures, compare discovery, precedence, invocation, lifecycle, permissions, and failure for each extension type.

### Verification

- [X] T029 [P] [US3] Add settings, instruction, rules, and memory precedence scenarios in `packages/coding-agent/test/suite/parity-configuration.test.ts`, keyed to those IDs.
- [X] T030 [P] [US3] Add skills, commands, agents, hooks, plugin, and external-connection fixture scenarios in `packages/coding-agent/test/suite/parity-extensions.test.ts`, including observed authorization, exact data disclosed to extensions, and output/log/error redaction cases keyed to those IDs; use synthetic secrets and isolated connections.

### US3 executable slice

- [X] T325 [US3] Register `US3-CONFIG-2026-09-14` and `US3-EXTENSIONS-2026-09-14` with those leaf IDs in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T326 [US3] Observe each registered leaf (normal, denial/invalid, restart) in `specs/001-add-feature-parity/reference/scenarios.md` using synthetic secrets.
- [X] T327 [US3] Verified via `packages/coding-agent/test/suite/parity-configuration.test.ts` and `packages/coding-agent/test/suite/parity-extensions.test.ts`.

### Implementation

- [X] T031 [US3] Checkpoint — Verify every settings validation, scope-precedence, and nox-native location leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T032 [US3] Checkpoint — Verify every instruction, rule, and memory discovery/precedence leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T033 [US3] Checkpoint — Verify every skill and custom-command discovery, invocation, argument, and failure leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T034 [US3] Checkpoint — Verify every agent isolation, tool-selection, lifecycle, and result leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T035 [US3] Checkpoint — Verify every hook event, ordering, input/output, blocking, and failure leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T036 [US3] Checkpoint — Verify every external-connection discovery, authorization, resource, prompt, tool, exposure, and redaction leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T037 [US3] Checkpoint — Verify every plugin discovery, enablement, namespace, installation, and update leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T038 [US3] Resolve every US3 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and document precedence and failure outcomes in `specs/001-add-feature-parity/reference/scenarios.md`.

### Feature-family indexes

- [X] T069 [US3] Index — Same settings/instruction/rules/memory population as T031–T032. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T031–T032 are closed and extra leaves are mapped or gated.
- [X] T070 [US3] Index — Same skill and command population as T033. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T033 is closed and extra leaves are mapped or gated.
- [X] T071 [US3] Index — Same hook population as T035. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T035 is closed and extra leaves are mapped or gated.
- [X] T072 [US3] Index — Same agent/subagent/team/task/message/delegation population as T034. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T034 is closed and extra leaves are mapped or gated.
- [X] T073 [US3] Index — Same plugin/marketplace/external-connection population as T036–T037. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T036–T037 are closed and extra leaves are mapped or gated.
- [X] T084 [US3] Index — Plugin-evaluation leaves owned by T037. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Stay open with missing-mapping count > 0 until T004 records at least one leaf ID or a gated rationale for this population. Close when T037 is closed and extra leaves are mapped or gated.
- [X] T088 [US3] Index — Extension-diagnostic and debugging leaves owned by T031–T037. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when those owning closers covering this family are closed or remaining leaves are gated.

**Checkpoint**: US3 fixtures work independently with no reference-product name in developed nox code or user-facing surfaces.

---

## Phase 6: User Story 4 — Automate and Connect Remote Work (Priority: P2)

**Goal**: Match non-interactive, worktree, remote, integration, and administrative behavior.

**Independent Test**: Compare text/JSON/streamed protocol results and exit status, worktree lifecycle, remote handoff, and every reachable administrative command in isolated fixtures.

### Verification

- [X] T039 [P] [US4] Add non-interactive input/output, JSON validation, event-order, interruption, and exit scenarios in `packages/coding-agent/test/suite/parity-print-protocol.test.ts`, keyed to those IDs.
- [X] T040 [P] [US4] Add worktree, remote, desktop/web/mobile/editor/browser/chat/CI workflow, and CLI-administration fixture scenarios in `packages/coding-agent/test/suite/parity-automation.test.ts`.

### US4 executable slice

- [X] T328 [US4] Register `US4-SURFACE-2026-09-14` with those leaf IDs in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T329 [US4] Observe each registered reachable leaf in `specs/001-add-feature-parity/reference/scenarios.md`.
- [X] T330 [US4] Verified via `packages/coding-agent/test/suite/parity-print-protocol.test.ts` and `packages/coding-agent/test/suite/parity-automation.test.ts`.
- [X] T331 [US4] Checkpoint — Close `US4-SURFACE-2026-09-14` after mapped verification passes.

### Implementation

- [X] T041 [US4] Checkpoint — Verify every print format, structured-output, stream, partial-event, RPC, and exit leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T042 [US4] Checkpoint — Verify every worktree isolation, naming, lifecycle, and cleanup leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T043 [US4] Checkpoint — Verify every remote and desktop/web/mobile/editor/browser/chat/CI leaf has a nox control, an observed interaction/data-exposure contract, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`; retain inaccessible leaves as `gated-unverified`.
- [X] T044 [US4] Checkpoint — Verify every authentication, diagnostic, import, project-state, update, and external-management leaf has observed evidence, an executable test-first implementation sequence, and passing verification mapped in `specs/001-add-feature-parity/reference/reconciliation.md`.
- [X] T045 [US4] Resolve every US4 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and record passing protocol and side-effect comparisons in `specs/001-add-feature-parity/reference/scenarios.md`.

### Feature-family indexes

- [X] T074 [US4] Index — Same noninteractive/programmatic population as T041. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T041 is closed and extra leaves are mapped or gated.
- [X] T075 [US4] Index — Same CLI and administration population as T044. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T044 is closed and extra leaves are mapped or gated.
- [X] T076 [US4] Index — Worktree/source-control/automation/notification leaves owned by T042; hosted-review leaves pointer to T044/T083; scheduled-prompt leaves pointer to T087. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify.
- [X] T077 [US4] Index — Same remote and platform-surface population as T043. Record missing T013 mappings and gated leaves in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T043 is closed and extra leaves are mapped or gated.
- [X] T078 [US4] Index — Documented terminal/editor/desktop/web/mobile/browser/chat/CI/SDK workflows owned by T041–T044. Record mappings in `specs/001-add-feature-parity/reference/surface-map.md`; do not independently verify. Close when those owning closers covering this family are closed or remaining leaves are gated.
- [X] T083 [US4] Index — Hosted-review and security-workflow leaves owned by T044; T076 only records a pointer. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T044 is closed and extra leaves are mapped or gated.
- [X] T085 [US4] Index — Artifact, sharing, and cross-surface-access leaves owned by T043; deep-link leaves pointer to T090. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify.
- [X] T089 [US4] Index — Desktop scheduling, dispatch, preview, visual-diff, and editor/simulator leaves owned by T043. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify. Close when T043 is closed and extra leaves are mapped or gated.
- [X] T090 [US4] Index — Deep-link, channel-event, and external-trigger leaves owned by T043; T085 only records a pointer for deep-links. Record missing T013 mappings in `specs/001-add-feature-parity/reference/reconciliation.md`; do not independently verify.

### Completed Work Record

> Historical execution record only. T320 passed; checked application tasks in this record remain constitution-incomplete until T049 and T053. T049 and T053 separately govern constitutional application completion and parity/release completion.

- [X] T094 [US4] Write a failing parser test for the observed SUR-LIMIT-002 malformed-JSON variant in `packages/coding-agent/test/args.test.ts`: `--json-schema '{'` must produce an error diagnostic, preserve the prompt, and never become an extension flag. Depend on [SUR-LIMIT-002-MALFORMED](specs/001-add-feature-parity/reference/scenarios.md); do not infer valid-schema behavior.
- [X] T095 [US4] Implement SUR-LIMIT-002 malformed-JSON preflight in `packages/coding-agent/src/cli/args.ts`, with `packages/coding-agent/src/main.ts` only if needed for exit behavior. Reject malformed JSON before session/model work with empty stdout and nonzero exit. Keep valid structured-output behavior gated until separately observed and implemented; do not silently accept an unused schema.
- [X] T096 [US4] Verify SUR-LIMIT-002 malformed-JSON against the recorded diagnostic and exit behavior in `packages/coding-agent/test/args.test.ts` and an isolated CLI process; record the result in `specs/001-add-feature-parity/reference/validation.md`. Keep SUR-LIMIT-001 and the remaining SUR-LIMIT-002 variants open.
- [X] T097 [US4] Write a failing parser test for observed CLI-246 (`--bg -p`) in `packages/coding-agent/test/args.test.ts`: both flags must be recognized, the positional prompt preserved, and neither flag routed to extensions. Depend on [CLI-246-BG-PRINT](specs/001-add-feature-parity/reference/scenarios.md).
- [X] T098 [US4] Implement CLI-246 conflict preflight in `packages/coding-agent/src/cli/args.ts` and `packages/coding-agent/src/main.ts`, with a nox-native diagnostic explaining that print mode cannot create an attachable background session. Reject any standalone background launch explicitly until SUR-BG-003 is implemented; do not create a session or dispatch a model request.
- [X] T099 [US4] Verify CLI-246 in a temporary-home CLI process with empty stdout, nonzero exit, no session ID, and the conflict explanation; record the comparison and open wording discrepancy in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`. Keep successful SUR-BG-003 launch and lifecycle variants open.
- [X] T101 [US4] Write a failing CLI process test for observed CLI-519 in `packages/coding-agent/test/command-typo-cli.test.ts`: `udpate` must exit 1 before model/session work with empty stdout and a nox-native `update` suggestion; an ordinary unmatched prompt must remain available. Depend on [CLI-519-TYPO](specs/001-add-feature-parity/reference/scenarios.md) and the Pi functional baseline T093.
- [X] T102 [US4] Implement CLI-519 in `packages/coding-agent/src/cli/command-suggestion.ts` and `packages/coding-agent/src/cli.ts`, using the existing subcommand names and an early bounded suggestion check. Keep application state immutable and preserve non-command prompts; avoid changing unrelated argument parsing.
- [X] T103 [US4] Verify CLI-519 with the focused process test, `npm run check`, and an isolated comparison of exit, stdout/stderr, and temporary-home side effects; record any remaining mismatch in `specs/001-add-feature-parity/reference/discrepancies.md` and `specs/001-add-feature-parity/reference/validation.md`. Keep the leaf open until every applicable parity scenario passes.
- [X] T104 [US4] Tighten the CLI-519 process assertion in `packages/coding-agent/test/command-typo-cli.test.ts` to compare the full observed stderr with only the executable name normalized; confirm it fails against the current short message. Depend on [CLI-519-TYPO](specs/001-add-feature-parity/reference/scenarios.md).
- [X] T105 [US4] Render the observed three-part typo diagnostic in `packages/coding-agent/src/cli.ts`, using `APP_NAME` for the executable and the input token for the explicit prompt fallback. Preserve exit and session behavior.
- [X] T106 [US4] Run the focused CLI process test, neighboring CLI regression tests, and `npm run check`; update `specs/001-add-feature-parity/reference/validation.md` and DISC-002 to narrow the remaining mismatch to startup side effects, then commit locally.
- [X] T107 [US4] Observe CLI-557 without account usage in a disposable loopback Messages fixture under `specs/001-add-feature-parity/reference/harness/prompt_probe.py`: compare replacement and appended sentinel presence in the request's system field, redact all raw prompt text, and retain the normalized trace under `specs/001-add-feature-parity/reference/observations/`. Depend on [CLI-557-PROMPT-COMPOSE](specs/001-add-feature-parity/reference/scenarios.md); do not assert a nox parity result from documentation alone.
- [X] T108 [US4] Extend `specs/001-add-feature-parity/reference/harness/prompt_probe.py` with a file-backed mode for CLI-558, test its bounded argument construction in `specs/001-add-feature-parity/reference/harness/test_prompt_probe.py`, and capture only redacted marker order through the local Messages endpoint. Depend on [CLI-558-PROMPT-FILES](specs/001-add-feature-parity/reference/scenarios.md).
- [X] T109 [US4] Write failing parser and isolated-process tests in `packages/coding-agent/test/args.test.ts` and `packages/coding-agent/test/prompt-file-cli.test.ts` for CLI-261, CLI-076, and CLI-069: conflict precedence, missing-file diagnostics, and file-backed prompt selection. Depend on [CLI-261-SYSTEM-PROMPT-CONFLICT](specs/001-add-feature-parity/reference/scenarios.md), [CLI-076-PROMPT-FILE-MISSING](specs/001-add-feature-parity/reference/scenarios.md), and [CLI-069-APPEND-PROMPT-FILE-MISSING](specs/001-add-feature-parity/reference/scenarios.md).
- [X] T110 [US4] Add explicit prompt-file arguments and validation in `packages/coding-agent/src/cli/args.ts`, using the existing `packages/coding-agent/src/main.ts` diagnostic preflight and resource loader file-source semantics. Reject conflicts and missing files before session/model work; preserve inline prompt behavior.
- [X] T111 [US4] Verify the focused prompt-file and nearby CLI tests, `npm run check`, and the synthetic CLI-558 composition fixture; record any mismatch in `specs/001-add-feature-parity/reference/validation.md` and `specs/001-add-feature-parity/reference/discrepancies.md`, then commit locally.
- [X] T112 [US4] Verify CLI-261 conflict precedence in `packages/coding-agent/test/prompt-file-cli.test.ts` with both an inline replacement and a nonexistent replacement file, compare exit/stdout/stderr and temporary-home entries to [CLI-261-SYSTEM-PROMPT-CONFLICT](specs/001-add-feature-parity/reference/scenarios.md), and update the discrepancy register without closing the leaf.
- [X] T113 [US4] Write failing isolated-process tests for CLI-559 and CLI-560 in `packages/coding-agent/test/prompt-file-cli.test.ts`: missing values must exit 1 with the observed lowercase parser diagnostic, empty stdout, and no home entries. Depend on [CLI-559-SYSTEM-PROMPT-NO-VALUE](specs/001-add-feature-parity/reference/scenarios.md) and [CLI-560-APPEND-PROMPT-NO-VALUE](specs/001-add-feature-parity/reference/scenarios.md).
- [X] T114 [US4] Add a narrowly scoped prompt-file missing-value preflight in `packages/coding-agent/src/cli.ts` before settings/session initialization, preserving normal prompt text and valid file-flag handling.
- [X] T115 [US4] Re-run focused CLI cases and `npm run check`, compare both missing-value variants in disposable homes, update `specs/001-add-feature-parity/reference/validation.md`, and keep unrelated prompt-file leaves open.
- [X] T116 [US4] Write failing isolated-process tests for CLI-561 and CLI-562 directory inputs in `packages/coding-agent/test/prompt-file-cli.test.ts`; compare same-OS EISDIR read diagnostics, empty stdout, and exit 1. Depend on [CLI-561-SYSTEM-PROMPT-DIRECTORY](specs/001-add-feature-parity/reference/scenarios.md) and [CLI-562-APPEND-PROMPT-DIRECTORY](specs/001-add-feature-parity/reference/scenarios.md).
- [X] T117 [US4] Validate explicit prompt files by attempting to read them in `packages/coding-agent/src/cli/args.ts`, mapping missing files to the observed not-found diagnostic and other read errors to the observed `Error reading ... file` shape. Preserve successful file-source handling.
- [X] T118 [US4] Run focused CLI and resource-loader tests plus `npm run check`, record the directory comparison and remaining startup side-effect mismatch in `specs/001-add-feature-parity/reference/validation.md` and DISC-003, then commit locally.
- [X] T225 [US4] Write a failing nox process test for the observed `-n`/`--name` missing-value diagnostic in `packages/coding-agent/test/name-cli.test.ts`, implement the explicit preflight message, verify focused tests and `npm run check`.

**Checkpoint**: US4 protocol and lifecycle features are independently comparable; gated remote features remain explicitly unverified until valid observation exists.

---

## Phase 7: Polish and Cross-Cutting Release Gates

**Purpose**: Reconcile all leaves, satisfy constitutional application-completion gates, protect Pi behavior, and prevent unsupported parity or release claims.

- [X] T079 Do not duplicate T062. After implementation slices exist, re-check only restored-source names that T062 left `open` or `obsolete`; promote real misses into this task document or confirm the dated obsolete rationale. Close when T062 has no `open` restored-source row. Record work in `specs/001-add-feature-parity/reference/source-reconciliation.md`.
- [X] T080 Final zero-unmatched audit after T006 and T079: installed CLI, current official docs, and restored-source list each map to a leaf, duplicate rationale, or dated obsolete/gated item in `specs/001-add-feature-parity/reference/reconciliation.md`. Close only when unmatched-candidate count is 0 and all resulting implementation/verification subtasks in this document pass; then run T046–T053.
- [X] T046 After T080, reconcile every inventory leaf ID with a nox surface, item-level implementation and verification tasks, passing normal/failure/interaction scenarios, and no open discrepancy in `specs/001-add-feature-parity/reference/reconciliation.md`; create and finish missing tasks in `specs/001-add-feature-parity/tasks.md` before closing coverage. Unobserved or gated leaves keep this task open.
- [X] T047 Audit developed application code, user-facing strings, command names, and configuration filenames and paths for prohibited reference-product naming; record scope and findings in `specs/001-add-feature-parity/reference/naming-audit.md`.
- [X] T048 Compare every required state in the predeclared Pi visual matrix and unrelated Pi workflows against `specs/001-add-feature-parity/reference/pi-visuals.md`; report tested and missing matrix cells, and require an approved constitution amendment for every intentional visual divergence.
- [X] T049 Re-run `npm run check`, focused modified test files, relevant unit/integration/end-to-end checks, the T091 aggregate coverage command, and the T093 functional Pi regression matrix; require at least 80% on each aggregate coverage metric, no unexplained Pi functional regression, functions remaining under 50 lines and files under 800 lines on touched production paths, and replacement-state (no mutation) on new application logic before application work is called complete, and record commands, results, exclusions, and unresolved failures in `specs/001-add-feature-parity/reference/validation.md`.
- [X] T050 Refresh the installed reference version, availability matrix, inventory, and changed observations in `specs/001-add-feature-parity/reference/snapshot.md` and `specs/001-add-feature-parity/reference/reconciliation.md` before a current-parity claim.
- [X] T051 Define and record matched-environment end-to-end acceptance results for all four user-story journeys, including stated error and recovery cases, in `specs/001-add-feature-parity/reference/journey-results.md`; do not count a gated or unverified journey as passing.
- [X] T052 Audit every inventory leaf's predeclared timing-sensitivity classification and reason against SC-007, then record workload, hardware, network state, warm-up, and 30-run p95 comparisons for every timing-sensitive leaf in `specs/001-add-feature-parity/reference/performance.md`; require nox completion time to be at most 10% above the matched reference p95 or record a discrepancy. An unclassified leaf fails this gate.
- [X] T092 Audit the final application diff for validated external inputs, authorization before side effects, credential and private-data redaction, applicable injection and request-forgery defenses, endpoint rate limits, and error-message leakage; record applicable and non-applicable findings with evidence in `specs/001-add-feature-parity/reference/security-audit.md`, resolve critical findings before T053, and invoke the security-reviewer role for any critical finding. SC-009 fails if any catalog ID (SEC-PATH-001, SEC-CMD-001, SEC-SET-001, SEC-SECRET-001, SEC-EXT-001) is missing, unrun, or leaks a synthetic secret.
- [X] T053 Apply the release gate in `specs/001-add-feature-parity/reference/release-gate.md`: require all inventoried leaves and all four journeys passing, all four aggregate coverage metrics at least 80%, no unexplained Pi functional regression, zero known discrepancies, zero gated-unverified leaves, and no unexplained candidate from the installed CLI, current official documentation, or restored source map for an unqualified 100% claim; otherwise state the precise remaining gaps.


---

## Dependencies and Execution Order

```text
Reference discovery (T001–T005 and T062)
    → Reconciliation and surfaces (T006 → T007)
        → Per-feature evidence (T009–T011, with T008/T012 schemas, T054–T061 core observations, T091 coverage baseline, and T093 Pi functional baseline)
            → Per-slice zero-missing T013 row (global T013 stays open until T046)
                → Explicit leaf failing tests → leaf implementations → leaf verifications
                    → US1 / US2 / US3 / US4 source and verification slices
                        → Three-source audit (T079–T080) and all leaf tasks complete (T046)
                            → Cross-cutting release gates (T047–T053 and T092)
```

- US1 and US2 are P1. Each source slice depends on evidence and explicit tasks for its own leaves, not completion of every Phase 2 item; shared `agent-session.ts` edits must be serialized or isolated.
- US3 and US4 are P2. Each source slice depends on evidence and explicit tasks for its own leaves. US4's remote connections may consume US3 connection behavior, but its protocol and worktree slices remain independently demonstrable.
- Within each story, observed scenarios precede behavior changes, core state changes precede UI/CLI integration, and discrepancy closure follows verification. Run `npm run check` with full output after each code-change task and fix all errors, warnings, and infos before continuing; run each created or modified focused test file until it passes. Record results in `specs/001-add-feature-parity/reference/validation.md`.
- Checked tasks under Completed Work Record are historical records. Pending work follows explicit dependency statements and test-first ordering, not the visual position or numeric order of historical task IDs.
- T320 has passed with zero current-reopened and current-unresolved results. Newly checked tasks are subject to the same evidence requirements through per-slice T013 validation. Global T013 stays open until every reconciled leaf is mapped and blocks T046/T053 only. T062 precedes T006. T079 does not duplicate T062; T080 is the final zero-unmatched audit and precedes T046. T046 can expose missing leaf tasks; add them in the owning story phase and complete them before T051–T052. T093 precedes every source slice that can affect a Pi workflow; T091 and T093 precede T049. T092 precedes T053 and requires the SC-009 catalog IDs. T053 follows all validation. T321–T324 are the US1 context/prompt slice. T325–T327 must exist before T031. T328–T331 must exist before T041–T043.

## Parallel Execution Examples

- **Setup**: T002, T003, T004, and T005 may run concurrently because they write separate inventory files. T062 may run alongside them; T006 starts after all five.
- **US1**: T014 and T015 may run concurrently; each executable US1 leaf task requires a per-slice T013 zero-missing row for that leaf. T016–T019 summarize the core slice and do not authorize future source work. T321–T324 are a separate context/prompt slice.
- **US2**: T020 is a nox-only baseline; T289–T290 provide its matched reference comparison. Background lifecycle follows T281 → per-leaf observation → per-leaf failing test → per-leaf implementation → per-leaf verification → T027. T021–T022 are blocked until T003+T009 record leaf IDs; T023–T026 remain checkpoints until T013 creates their leaf tasks.
- **US3**: T325–T327 register and observe `US3-CONFIG-PENDING` before T029–T030. T031–T037 are checkpoints until T327 emits executable leaf work.
- **US4**: T328–T331 register and observe `US4-SURFACE-PENDING` before T039–T040. T041–T043 are checkpoints until T330 emits executable leaf work.

## Implementation Strategy

1. Continue Phases 1–2 until the complete inventory exists. An independently observed task may start when its own leaf contracts are ready; inaccessible leaves stay tracked as open work.
2. Deliver US1 as the first demonstrable Pi-styled coding workflow, then continue through every task and family in this document.
3. Deliver US2, US3, and US4 as independent increments, keeping each capability's comparison status visible.
4. Do not call the project 100% parity while any discovered leaf is unimplemented, discrepant, or gated-unverified.

## Notes

- `[P]` marks different-file work without an incomplete task dependency.
- T091–T093 and T321–T331 were appended after the original 90 IDs to preserve stable references; phase placement and explicit dependencies define execution order. Task IDs are stable references, not a substitute for the dependency graph.
- Item-level acceptance derives from the pinned reference observations, not from undocumented assumptions.
- The custom `specs/001-add-feature-parity/checklists/parity.md` is reviewer-owned requirements quality review; it is not an implementation progress checklist.
- The user has requested logical commits on `main` without pushing. Before each application-code commit, use the planner, tdd-guide, and code-reviewer roles when available, run a failing focused test before implementation, and check the staged diff for secrets and applicable authorization, validation, injection, request-forgery, rate-limit, and leakage risks. A critical finding invokes security review and blocks that commit until fixed.
