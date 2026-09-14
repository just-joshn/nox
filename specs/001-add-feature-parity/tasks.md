# Tasks: Complete Coding Assistant Parity

**Input**: Design documents from `specs/001-add-feature-parity/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/)

**Tests**: The spec requires observable comparison and independent verification for each story. Use isolated fixtures and the faux provider; do not use paid provider calls for ad hoc checks.

**Organization**: This is the only task document for the complete-parity effort. Tasks are grouped by user story and feature family; these are delivery increments, not separate specifications. Each code task needs its leaf inventory and observed contract. Exhaustive inventory and verification remain required for a complete-parity claim. No family may be called complete from a domain heading alone.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can proceed concurrently because it owns separate files and does not depend on another incomplete task.
- **[Story]**: Maps a task to the corresponding user story in `spec.md`.
- Each task names its target file or directory. Proposed files are created only when the inventory confirms the need.

## Phase 1: Setup (Shared Reference and Scope)

**Purpose**: Establish a reproducible reference snapshot and the complete feature boundary.

- [ ] T001 Record installed reference version, platform, date, account and policy conditions, and safe CLI observations in `specs/001-add-feature-parity/reference/snapshot.md`; preserve raw outputs under `specs/001-add-feature-parity/reference/observations/`. Inspect the older restored source map remotely for feature discovery, but do not clone or copy it into nox.
- [ ] T002 [P] Enumerate every CLI flag, subcommand, option combination, and documented interactive command or shortcut as leaf entries in `specs/001-add-feature-parity/reference/inventory-cli.md`; reconcile local help with official command documentation and mark unobserved entries.
- [ ] T003 [P] Enumerate settings, instruction loading, memory, permission modes, built-in tools, and model controls as leaf entries in `specs/001-add-feature-parity/reference/inventory-core.md`; record defaults, scope, precedence, and availability conditions.
- [ ] T004 [P] Enumerate skills, custom commands, agents, teams, hooks, external connections, plugins, and marketplaces as leaf entries in `specs/001-add-feature-parity/reference/inventory-extensions.md`; include triggers, lifecycle events, and gated variants.
- [ ] T005 [P] Enumerate background sessions, worktrees, non-interactive protocols, desktop/web/mobile/editor/browser/chat/CI workflows, diagnostics, auth, import, and update flows as leaf entries in `specs/001-add-feature-parity/reference/inventory-surfaces.md`; for each surface leaf record entry action, intermediate interactions, resulting state, side effects, failure behavior, availability conditions, and proposed nox control. Mark inaccessible observations `gated-unverified`. Identify observed non-equivalence with its leaf ID and reproduction steps; record it in `specs/001-add-feature-parity/reference/discrepancies.md` after T012 defines the register.
- [ ] T006 Reconcile T002–T005 against the official documentation index and installed command tree in `specs/001-add-feature-parity/reference/reconciliation.md`; list every unmatched source entry and split any broad item that can fail independently.
- [ ] T007 Map each leaf item to a nox-native command, key, configuration path, protocol, or integration in `specs/001-add-feature-parity/reference/surface-map.md`; record naming differences and flag missing nox surfaces.

**Checkpoint**: Every discovered capability has a stable leaf ID and explicit availability state. The inventory is a coverage target, not a verified implementation.

---

## Phase 2: Foundational (Blocking Evidence and Comparison Contracts)

**Purpose**: Make each leaf item implementable and objectively comparable before story work.

- [ ] T008 Define the `Reference Snapshot`, `Capability Item`, `Scenario`, `Observation`, and `Discrepancy` fields and state-transition rules from `data-model.md` in `specs/001-add-feature-parity/reference/schema.md`; preserve the constraints that a separate input, option, transition, or gated variant gets its own leaf ID and `verified` requires passing normal, failure, and relevant interaction scenarios.
- [ ] T009 Create normal, denial/error, persistence, interruption/recovery, and interaction scenarios for every reachable leaf ID in `specs/001-add-feature-parity/reference/scenarios.md`; record matched starting state, expected decisions, outputs, errors, side effects, and permitted normalization before implementation. For security leaves, use synthetic credentials and isolated user/project fixtures to observe reuse after restart, output/log/error redaction, permission-rule persistence, and data disclosed to extensions or remote services; record only redacted traces and leave inaccessible behavior unverified.
- [ ] T010 Record the evidence gap and access needed for every gated or otherwise unobservable leaf ID in `specs/001-add-feature-parity/reference/gated.md`; keep those IDs `gated-unverified` and excluded from any unqualified complete-parity claim.
- [ ] T011 Predeclare the required Pi visual matrix in `specs/001-add-feature-parity/reference/pi-visuals.md`: every affected workflow and its relevant normal, denial, error, and recovery states across supported terminal widths and themes, including prompts, menus, tool results, and errors. Capture reference states, identify any proposed intentional departure, and require a constitution amendment before its implementation.
- [ ] T012 Define discrepancy ownership, reproduction format, and closure evidence in `specs/001-add-feature-parity/reference/discrepancies.md`; require fresh passing reference comparison before `closed` and reopen on regression.
- [ ] T013 Expand every family task below into explicit implementation and verification subtasks in this `tasks.md` for each reachable, observed leaf; each subtask names its leaf ID, observed contract, target file, dependency, and passing scenario before source implementation. Start with the read/search/edit/command/denial/failure/recovery leaves. Add discovery or access subtasks for gated leaves without inventing contracts. T046 cannot close until every inventory leaf has item-level task and scenario coverage.

**Checkpoint**: A source slice starts only after its own inventory IDs, observed contracts, and explicit leaf tasks exist. Gated or undiscovered work does not block an independent observed slice, but remains open and blocks a universal parity claim.

---

## Phase 3: User Story 1 — Work in a Familiar Terminal (Priority: P1)

**Goal**: Match the reference's core coding workflow inside Pi's terminal presentation.

**Independent Test**: In matched disposable repositories, compare a read, search, edit, command, denial, failure, and recovery journey; compare corresponding Pi terminal states.

**Evidence checkpoint**: Before T016–T018, `specs/001-add-feature-parity/reference/reconciliation.md` must list the stable leaf IDs for the US1 read/search/edit/command/denial/failure/recovery behaviors, each ID's reference observation and normal/failure scenarios from `specs/001-add-feature-parity/reference/scenarios.md`, target source file, explicit implementation and verification subtask created by T013, and dependency. A domain heading or an unobserved behavior does not satisfy this checkpoint.

### Verification

- [ ] T014 [P] [US1] Add faux-provider and isolated repository scenarios for read, search, edit, command, failure, and denial behavior in `packages/coding-agent/test/suite/parity-core-workflow.test.ts`, keyed to the US1 leaf IDs in `specs/001-add-feature-parity/reference/scenarios.md`.
- [ ] T015 [P] [US1] Define terminal-state comparison fixtures for US1 in `specs/001-add-feature-parity/reference/pi-visuals.md`; require an approved constitution amendment for any proposed visual exception.

### Implementation

- [ ] T016 [US1] Implement the observed context-discovery and prompt-handling leaf contracts in `packages/coding-agent/src/core/resource-loader.ts` and `packages/coding-agent/src/core/agent-session.ts` without changing unrelated Pi loading behavior.
- [ ] T017 [US1] Implement observed tool availability, approval handoff, execution result, and failure semantics for core file/search/command tools in `packages/coding-agent/src/utils/tools-manager.ts` and `packages/coding-agent/src/core/agent-session.ts`.
- [ ] T018 [US1] Integrate observed tool activity, error, and recovery states into existing Pi components in `packages/coding-agent/src/modes/interactive/components/tool-execution.ts` and `packages/coding-agent/src/modes/interactive/interactive-mode.ts`.
- [ ] T019 [US1] Resolve every US1 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md`, run the focused tests in `packages/coding-agent/test/suite/parity-core-workflow.test.ts`, and document Pi visual comparison results in `specs/001-add-feature-parity/reference/pi-visuals.md`.

**Checkpoint**: US1 works independently, including denial and failure recovery, with no known discrepancy for its reachable leaf items.

---

## Phase 4: User Story 2 — Control and Resume Work (Priority: P1)

**Goal**: Match session, model, permission, and background lifecycle behavior.

**Independent Test**: Compare mode changes, allowed and denied actions, model fallback, named and forked sessions, compaction, resume, and background lifecycle from matched initial state.

### Verification

- [ ] T020 [P] [US2] Add faux-provider session, compaction, fork, resume, and background-state scenarios in `packages/coding-agent/test/suite/parity-session-lifecycle.test.ts`, keyed to US2 leaf IDs.
- [ ] T021 [P] [US2] Add permission scope, precedence, persistence, prompt, denial, unattended, restricted-mode, credential reuse after restart, and output/log/error redaction scenarios in `packages/coding-agent/test/suite/parity-permissions.test.ts`, keyed to observed US2 leaf IDs and using synthetic credentials in isolated user/project fixtures.
- [ ] T022 [P] [US2] Add model, effort, fallback, context, and budget contract scenarios in `packages/coding-agent/test/suite/parity-model-controls.test.ts`, keyed to US2 leaf IDs.

### Implementation

- [ ] T023 [US2] Implement observed session identity, naming, continuation, resume, fork, compaction, and persistence transitions in `packages/coding-agent/src/core/session-manager.ts` and `packages/coding-agent/src/core/agent-session.ts`.
- [ ] T024 [US2] Implement observed permission modes, scope and rule precedence, persistence, prompting, denial, and unattended decisions in a nox-named module at `packages/coding-agent/src/core/permissions.ts`, integrated through `packages/coding-agent/src/core/agent-session.ts`; match observed credential storage/reuse and secret redaction in their owning modules.
- [ ] T025 [US2] Implement observed model, effort, fallback, context, and budget selection in `packages/coding-agent/src/cli/args.ts` and `packages/coding-agent/src/core/agent-session.ts`.
- [ ] T026 [US2] Implement observed session and permission controls with existing Pi visual components in `packages/coding-agent/src/modes/interactive/interactive-mode.ts` and `packages/coding-agent/src/modes/interactive/components/session-selector.ts`.
- [ ] T027 [US2] Implement observed background session lifecycle and recovery in a nox-named module at `packages/coding-agent/src/core/background-session.ts` and expose its CLI controls in `packages/coding-agent/src/cli.ts`.
- [ ] T028 [US2] Resolve every US2 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and record passing focused tests and Pi visual states in `specs/001-add-feature-parity/reference/pi-visuals.md`.

**Checkpoint**: US2 works independently from the coding workflow; all reachable session and control leaf IDs have passing comparisons.

---

## Phase 5: User Story 3 — Customize and Connect Capabilities (Priority: P2)

**Goal**: Match settings and extension behavior through nox-native names and paths.

**Independent Test**: In isolated user/project/local/managed fixtures, compare discovery, precedence, invocation, lifecycle, permissions, and failure for each extension type.

### Verification

- [ ] T029 [P] [US3] Add settings, instruction, rules, and memory precedence scenarios in `packages/coding-agent/test/suite/parity-configuration.test.ts`, keyed to US3 leaf IDs.
- [ ] T030 [P] [US3] Add skills, commands, agents, hooks, plugin, and external-connection fixture scenarios in `packages/coding-agent/test/suite/parity-extensions.test.ts`, including observed authorization, exact data disclosed to extensions, and output/log/error redaction cases keyed to US3 leaf IDs; use synthetic secrets and isolated connections.

### Implementation

- [ ] T031 [US3] Implement observed settings validation, scope precedence, and nox-native configuration locations in `packages/coding-agent/src/core/settings-manager.ts` and `packages/coding-agent/src/config.ts`.
- [ ] T032 [US3] Implement observed instruction, rules, and memory discovery and precedence in `packages/coding-agent/src/core/resource-loader.ts`; retain nox-native filenames and paths.
- [ ] T033 [US3] Implement observed skill and custom-command discovery, invocation, argument, and failure behavior in `packages/coding-agent/src/core/skills.ts` and `packages/coding-agent/src/core/slash-commands.ts`.
- [ ] T034 [US3] Implement observed agent isolation, tool selection, lifecycle, and result behavior in a nox-named module at `packages/coding-agent/src/core/subagents.ts`, integrated through `packages/coding-agent/src/core/agent-session.ts`.
- [ ] T035 [US3] Implement observed hook events, ordering, input/output, blocking, and failure behavior in a nox-named module at `packages/coding-agent/src/core/hooks.ts`.
- [ ] T036 [US3] Implement observed external-connection discovery, authorization, resource, prompt, tool, and data-exposure behavior in a nox-named module at `packages/coding-agent/src/core/connections.ts`; preserve observed secret redaction in logs and errors.
- [ ] T037 [US3] Implement observed plugin discovery, enablement, namespace, installation, and update behavior in a nox-named module at `packages/coding-agent/src/core/plugins.ts` and expose management commands in `packages/coding-agent/src/cli.ts`.
- [ ] T038 [US3] Resolve every US3 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and document precedence and failure outcomes in `specs/001-add-feature-parity/reference/scenarios.md`.

**Checkpoint**: US3 fixtures work independently with no reference-product name in developed nox code or user-facing surfaces.

---

## Phase 6: User Story 4 — Automate and Connect Remote Work (Priority: P2)

**Goal**: Match non-interactive, worktree, remote, integration, and administrative behavior.

**Independent Test**: Compare text/JSON/streamed protocol results and exit status, worktree lifecycle, remote handoff, and every reachable administrative command in isolated fixtures.

### Verification

- [ ] T039 [P] [US4] Add non-interactive input/output, JSON validation, event-order, interruption, and exit scenarios in `packages/coding-agent/test/suite/parity-print-protocol.test.ts`, keyed to US4 leaf IDs.
- [ ] T040 [P] [US4] Add worktree, remote, desktop/web/mobile/editor/browser/chat/CI workflow, and CLI-administration fixture scenarios in `packages/coding-agent/test/suite/parity-automation.test.ts`; compare each surface's entry action, intermediate interactions, result, failure, and exact data disclosed to remote services using synthetic secrets and isolated connections. Key each to US4 leaf IDs and keep gated cases unverified until observed.

### Implementation

- [ ] T041 [US4] Implement observed print-mode formats, structured output validation, streaming, partial events, and exit behavior in `packages/coding-agent/src/modes/print-mode.ts` and `packages/coding-agent/src/modes/rpc/rpc-mode.ts`.
- [ ] T042 [US4] Implement observed worktree isolation, naming, and cleanup in a nox-named module at `packages/coding-agent/src/core/worktrees.ts` and expose controls in `packages/coding-agent/src/cli.ts`.
- [ ] T043 [US4] Close the remote and desktop/web/mobile/editor/browser/chat/CI domain checkpoint only after T013-created leaf implementation and verification tasks pass for every observed workflow; each leaf must have its own nox terminal or CLI control, target file under `packages/coding-agent/src/core/` or `packages/coding-agent/src/cli/`, interaction sequence, availability rule, data-exposure contract, and passing scenario. Keep inaccessible observations `gated-unverified` and observed mismatches open in `specs/001-add-feature-parity/reference/discrepancies.md` until resolved.
- [ ] T044 [US4] Implement observed authentication, diagnostics, import, project state, update, external-connection management, and hosted-review command behavior in `packages/coding-agent/src/cli.ts` and domain modules under `packages/coding-agent/src/cli/` as identified by the leaf inventory.
- [ ] T045 [US4] Resolve every US4 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and record passing protocol and side-effect comparisons in `specs/001-add-feature-parity/reference/scenarios.md`.

**Checkpoint**: US4 protocol and lifecycle features are independently comparable; gated remote features remain explicitly unverified until valid observation exists.

---

## Phase 7: Polish and Cross-Cutting Release Gates

**Purpose**: Reconcile all leaves, protect Pi behavior, and prevent unsupported parity claims.

- [ ] T046 Reconcile every inventory leaf ID with a nox surface, item-level implementation and verification tasks, passing normal/failure/interaction scenarios, and no open discrepancy in `specs/001-add-feature-parity/reference/reconciliation.md`; create and finish missing tasks in `specs/001-add-feature-parity/tasks.md` before closing coverage. Unobserved or gated leaves keep this task open.
- [ ] T047 Audit developed application code, user-facing strings, command names, and configuration filenames and paths for prohibited reference-product naming; record scope and findings in `specs/001-add-feature-parity/reference/naming-audit.md`.
- [ ] T048 Compare every required state in the predeclared Pi visual matrix and unrelated Pi workflows against `specs/001-add-feature-parity/reference/pi-visuals.md`; report tested and missing matrix cells, and require an approved constitution amendment for every intentional visual divergence.
- [ ] T049 Re-run `npm run check`, focused modified test files, and appropriate non-e2e coverage according to `AGENTS.md` for the final integrated state; record commands, results, and unresolved failures in `specs/001-add-feature-parity/reference/validation.md`.
- [ ] T050 Refresh the installed reference version, availability matrix, inventory, and changed observations in `specs/001-add-feature-parity/reference/snapshot.md` and `specs/001-add-feature-parity/reference/reconciliation.md` before a current-parity claim.
- [ ] T051 Define and record matched-environment end-to-end acceptance results for all four user-story journeys, including stated error and recovery cases, in `specs/001-add-feature-parity/reference/journey-results.md`; do not count a gated or unverified journey as passing.
- [ ] T052 Record workload, hardware, network state, warm-up, and 30-run p95 comparisons for every timing-sensitive leaf in `specs/001-add-feature-parity/reference/performance.md`; require nox completion time to be at most 10% above the matched reference p95 or record a discrepancy.
- [ ] T053 Apply the release gate in `specs/001-add-feature-parity/reference/release-gate.md`: require all inventoried leaves and all four journeys passing, zero known discrepancies, and zero gated-unverified leaves for an unqualified 100% claim; otherwise state the precise remaining gaps.

---

## Dependencies and Execution Order

```text
Reference discovery (T001–T007, continuing as new leaves are found)
    → Per-feature evidence (T008–T012 and T054–T061 for core workflow leaf IDs)
        → Explicit implementation and verification tasks (T013 for observed IDs)
            → US1 / US2 / US3 / US4 source and verification slices
                → Full inventory and all leaf tasks complete (T046)
                    → Cross-cutting release gates (T047–T053)
```

- US1 and US2 are P1. Each source slice depends on evidence and explicit tasks for its own leaves, not completion of every Phase 2 item; shared `agent-session.ts` edits must be serialized or isolated.
- US3 and US4 are P2. Each source slice depends on evidence and explicit tasks for its own leaves. US4's remote connections may consume US3 connection behavior, but its protocol and worktree slices remain independently demonstrable.
- Within each story, observed scenarios precede behavior changes, core state changes precede UI/CLI integration, and discrepancy closure follows verification. Run `npm run check` with full output after each code-change task and fix all errors, warnings, and infos before continuing; run each created or modified focused test file until it passes. Record results in `specs/001-add-feature-parity/reference/validation.md`.
- T046 can expose missing leaf tasks. Such tasks are added in the owning story phase and completed before T051–T052. T053 follows all validation.

## Parallel Execution Examples

- **Setup**: T002, T003, T004, and T005 may run concurrently because they write separate inventory files. T006 starts after all four.
- **US1**: T014 and T015 may run concurrently; T016–T018 then use their evidence and visual baseline.
- **US2**: T020, T021, and T022 may run concurrently in separate test files. T023–T027 follow the corresponding contract evidence.
- **US3**: T029 and T030 may run concurrently; T031–T037 are split by configuration and extension ownership, with shared `agent-session.ts` integration serialized.
- **US4**: T039 and T040 may run concurrently; print protocol, worktree, remote, and administrative slices use separate domain files before CLI integration.

## Implementation Strategy

1. Continue Phases 1–2 until the complete inventory exists. An independently observed task may start when its own leaf contracts are ready; inaccessible leaves stay tracked as open work.
2. Deliver US1 as the first demonstrable Pi-styled coding workflow, then continue through every task and family in this document.
3. Deliver US2, US3, and US4 as independent increments, keeping each capability's comparison status visible.
4. Do not call the project 100% parity while any discovered leaf is unimplemented, discrepant, or gated-unverified.

## Notes

- `[P]` marks different-file work without an incomplete task dependency.
- Item-level acceptance derives from the pinned reference observations, not from undocumented assumptions.
- The custom `checklists/parity.md` is reviewer-owned requirements quality review; it is not an implementation progress checklist.
- Commits occur only on explicit user request under `AGENTS.md`.

## Core Workflow Reference Evidence Tasks

These tasks are listed after the original 53 IDs to preserve stable task numbering. They precede T013 for the selected US1 leaves and do not authorize source implementation without observed normal, failure, and relevant interaction contracts. An earlier sandboxed read request failed before tool dispatch because credentials were inaccessible there. Authentication was later confirmed outside the sandbox, but the user reported a weekly usage cap; no model-backed probes should run until usage is restored. The other leaves were not probed.

- [ ] T054 [US1] Observe US1-READ-001 in an authorized disposable repository: capture normal in-scope read, missing-path failure, and any permission boundary in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks tied to those observations.
- [ ] T055 [US1] Observe US1-SEARCH-PATH-001 in an authorized disposable repository: confirm installed path-search availability, matching paths, no-match, and invalid-pattern behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.
- [ ] T056 [US1] Observe US1-EDIT-001 in an authorized disposable repository: capture approval, exact file delta, denied edit, and failed edit without unrelated writes in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.
- [ ] T057 [US1] Observe US1-COMMAND-001 in an authorized disposable repository: capture permission decision, stdout/stderr, nonzero exit, and interruption for harmless commands in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.
- [ ] T058 [US1] Observe US1-DENY-001 for parent US1-EDIT-001 in an authorized disposable repository: refuse a proposed targeted edit and capture prompt, decision, error, unchanged file, and follow-up state in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [ ] T059 [US1] Observe US1-FAIL-001 for parent US1-COMMAND-001 in an authorized disposable repository: trigger a harmless command with nonzero exit and capture result shape, stdout/stderr, side effects, and retry behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [ ] T060 [US1] Observe US1-RECOVER-001 for parent US1-COMMAND-001 in the same authorized session after that nonzero command: capture history, next actions, and a successful continuation in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [ ] T061 [US1] Observe US1-SEARCH-CONTENT-001 in an authorized disposable repository: confirm installed content-search availability, matching text, no-match, and invalid-pattern behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.

## Complete Feature-Family Task Register

These tasks keep every currently identified family in this one document. Each requires discovery, clean-room behavior contracts, nox implementation, and matched verification for all its leaves. T013 adds leaf-level subtasks here as observations become available; a family task cannot close while a leaf is missing, gated, or discrepant. The current [official documentation index](https://code.claude.com/docs/llms.txt), installed 2.1.270 command tree, and older [restored source map](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src) are all discovery inputs. Only current documentation and observed current behavior establish a parity contract. No source code from the restored tree enters nox.

- [ ] T062 [US1] Reconcile every official documentation page, linked reference page, installed command and flag, and restored-source feature module against the feature-family table in `plan.md`; record URL/module path, version, candidate capability, duplicate mapping, and unmatched gap in `reference/source-reconciliation.md`. Add every unmatched capability to this task document and inventory before closing T006.
- [ ] T063 [US1] Specify the clean-room agent-turn state machine in `contracts/observable-behavior.md`: inputs, context and instruction precedence, planning, tool selection, streaming events, retries, interruption, completion, usage accounting, and nondeterministic output normalization. Implement each observed leaf in `packages/agent/src/` and `packages/coding-agent/src/core/`; verify matched traces and Pi states in focused tests and `reference/scenarios.md`.
- [ ] T064 [US1] Inventory and contract every built-in tool family in `reference/inventory-core.md`, including file read/write/edit, path and content search, shell/PowerShell, web retrieval/search, notebook editing, language-server actions, user questions, tool discovery, and mode/worktree/task controls. Implement observed input validation, permissions, output, limits, cancellation, and errors in owning `packages/coding-agent/src/core/` and `packages/coding-agent/src/utils/` modules; verify each leaf with isolated fixtures.
- [ ] T065 [US2] Contract model/provider selection, aliases, effort, thinking, budgets, fallback, capability limits, transport, and usage display in `reference/scenarios.md`. Implement observed leaves in `packages/ai/src/` and `packages/coding-agent/src/core/agent-session.ts`; verify normal, unavailable, rate-limited, and restart cases without paid ad-hoc test calls.
- [ ] T066 [US2] Contract trust, permission modes/rules, managed policy, sandbox boundaries, restricted operation, credential reuse, secret redaction, and unattended decisions in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/permissions.ts` and owning security modules; verify allow, deny, policy-blocked, restart, and data-disclosure cases with synthetic secrets.
- [ ] T067 [US2] Contract session identity, history, rename, resume, fork, rewind, compaction, auto memory, background state, and cross-surface continuation in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/session-manager.ts` and related owning modules; verify persistence, crash, changed-repository, and context-limit cases.
- [ ] T068 [US1] Inventory all interactive commands, input/editor behavior, keybindings, vim mode, output styles, themes, accessibility, help/status, notifications, and voice/buddy behavior in `reference/inventory-cli.md`. Implement functional controls in `packages/coding-agent/src/modes/interactive/` using Pi visual primitives; verify each normal, prompt, denial, error, and recovery cell in `reference/pi-visuals.md`.
- [ ] T069 [US3] Contract settings scopes, validation, precedence, environment overrides, managed policy, migrations, instruction files, rules, and memory in `reference/scenarios.md`. Implement observed leaves through nox-native names in `packages/coding-agent/src/config.ts` and `packages/coding-agent/src/core/`; verify conflicts, invalid values, restart, and isolation.
- [ ] T070 [US3] Contract skills, built-in and custom commands, argument processing, discovery, invocation, and lifecycle in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/skills.ts` and command owners; verify duplicate names, disabled entries, errors, and precedence.
- [ ] T071 [US3] Inventory every hook event, matcher, input/output schema, command and prompt hook, asynchronous behavior, ordering, blocking, and failure policy in `reference/inventory-extensions.md`. Implement observed leaves in `packages/coding-agent/src/core/hooks.ts`; verify ordering, cancellation, invalid output, restart, and secret exposure.
- [ ] T072 [US3] Contract built-in/custom agents, subagents, teams, task state, messages, delegation, concurrency, isolation, and coordination in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/` and `packages/agent/src/`; verify success, partial failure, cancellation, overlapping edits, and resume.
- [ ] T073 [US3] Contract plugins, marketplaces, MCP servers/tools/resources/prompts, external authentication, discovery, enablement, installation, update, and removal in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/` and `packages/coding-agent/src/cli/`; verify scope, offline/error, permission, redaction, and lifecycle cases.
- [ ] T074 [US4] Contract noninteractive text/JSON/streaming input and output, structured schemas, partial messages, budgets, event ordering, RPC/SDK-style control, and exit statuses in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/modes/print-mode.ts`, `packages/coding-agent/src/modes/rpc/`, and relevant protocol owners; verify malformed input, backpressure, interruption, and failures.
- [ ] T075 [US4] Contract CLI startup, every subcommand and flag, auth/setup, diagnostics, update, import, project state, external management, and administrative errors in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/cli/` under nox-native names; verify help, defaults, invalid combinations, exit codes, and state changes.
- [ ] T076 [US4] Contract worktrees, repository/source-control operations, background agents, local scheduling/loops, cloud routines, triggers, hosted review, and notifications in `reference/scenarios.md`. Implement each observed leaf in `packages/coding-agent/src/core/` and CLI controls; verify isolation, side effects, logs, cancellation, restart, and cleanup.
- [ ] T077 [US4] Contract remote control, cloud/web sessions, teleport/handoff, desktop/mobile/editor/browser/chat/CI connections, channels, enterprise gateways, self-hosted runners, artifacts, and deep links in `reference/scenarios.md`. Implement every observed workflow through a nox terminal/CLI control and necessary connected-service bridge in `packages/coding-agent/src/`; verify entry, intermediate interactions, state, data disclosure, failure, disconnect, and resume. Keep service-gated leaves open until access permits matched observation.
- [ ] T078 [US4] Reconcile each terminal, VS Code, JetBrains, desktop, web, mobile, Chrome, Slack, GitHub/GitLab CI, and SDK documentation workflow to a nox control in `reference/surface-map.md`. Create leaf subtasks in this document for any missing control and verify Pi visual consistency where nox presents it in the terminal.
- [ ] T079 [US1] Audit every implemented feature family against the restored tree's candidate module list in `reference/source-reconciliation.md`; investigate unmatched names through current documentation and safe current-CLI observations, add real missing features to this task document, and reject obsolete source-only behavior with dated evidence.
- [ ] T080 [US1] Perform the final three-way coverage audit in `reference/reconciliation.md`: current official docs, installed current reference, and restored-source candidate list must each map to a documented leaf, an explicit obsolete/duplicate rationale, or a gated open item. Close only after all resulting implementation/verification subtasks in this document pass; then run T046–T053.
- [ ] T081 [US1] Contract native computer-use and browser-use controls from current documentation and matched observations in `reference/scenarios.md`; implement observed screenshot, app, click/type, browser debugging, form, permission, and platform-gate leaves under `packages/coding-agent/src/`, with Pi-styled terminal controls and focused failure/denial tests.
- [ ] T082 [US2] Contract goal completion rules, agent view, cross-session messaging, and dynamic workflow lifecycle in `reference/scenarios.md`; implement observed state, coordination, stop, restart, and error behavior under `packages/coding-agent/src/core/`, with isolated multi-session tests and Pi visual comparison.
- [ ] T083 [US4] Contract deep hosted review, security guidance/scanning, finding verification, patch review, and CI/provider variants in `reference/scenarios.md`; implement observed leaves under `packages/coding-agent/src/` and nox CLI controls, then verify result, permission, data-disclosure, and gated cases.
- [ ] T084 [US3] Contract plugin evaluation cases, baseline comparison, grading, and result reporting in `reference/scenarios.md`; implement observed leaves under `packages/coding-agent/src/core/plugins.ts` or its owning nox-named modules, with focused repeatability and failure tests.
- [ ] T085 [US4] Contract artifact creation, sharing permissions, deep-link launch, and cross-surface access in `reference/scenarios.md`; implement observed leaves through nox terminal/CLI controls and connected-service bridges under `packages/coding-agent/src/`, verifying ownership, denial, expiration, disconnect, and gated cases.
