# Tasks: Complete Coding Assistant Parity

**Input**: Design documents from `specs/001-add-feature-parity/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/)

**Tests**: The spec requires observable comparison and independent verification for each story. Use isolated fixtures and the faux provider; do not use paid provider calls for ad hoc checks.

**Organization**: Tasks are grouped by user story. Phases 1–2 are blocking: the current design does not contain the exhaustive leaf inventory or item-level scenarios. No story may be called complete from a domain heading alone.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can proceed concurrently because it owns separate files and does not depend on another incomplete task.
- **[Story]**: Maps a task to the corresponding user story in `spec.md`.
- Each task names its target file or directory. Proposed files are created only when the inventory confirms the need.

## Phase 1: Setup (Shared Reference and Scope)

**Purpose**: Establish a reproducible reference snapshot and the complete feature boundary.

- [ ] T001 Record installed reference version, platform, date, account and policy conditions, and safe CLI observations in `specs/001-add-feature-parity/reference/snapshot.md`; preserve raw outputs under `specs/001-add-feature-parity/reference/observations/` without inspecting reference implementation code.
- [ ] T002 [P] Enumerate every CLI flag, subcommand, option combination, and documented interactive command or shortcut as leaf entries in `specs/001-add-feature-parity/reference/inventory-cli.md`; reconcile local help with official command documentation and mark unobserved entries.
- [ ] T003 [P] Enumerate settings, instruction loading, memory, permission modes, built-in tools, and model controls as leaf entries in `specs/001-add-feature-parity/reference/inventory-core.md`; record defaults, scope, precedence, and availability conditions.
- [ ] T004 [P] Enumerate skills, custom commands, agents, teams, hooks, external connections, plugins, and marketplaces as leaf entries in `specs/001-add-feature-parity/reference/inventory-extensions.md`; include triggers, lifecycle events, and gated variants.
- [ ] T005 [P] Enumerate background sessions, worktrees, non-interactive protocols, remote/cloud/editor/browser surfaces, diagnostics, auth, import, and update flows as leaf entries in `specs/001-add-feature-parity/reference/inventory-surfaces.md`; retain inaccessible items as `gated-unverified`.
- [ ] T006 Reconcile T002–T005 against the official documentation index and installed command tree in `specs/001-add-feature-parity/reference/reconciliation.md`; list every unmatched source entry and split any broad item that can fail independently.
- [ ] T007 Map each leaf item to a nox-native command, key, configuration path, protocol, or integration in `specs/001-add-feature-parity/reference/surface-map.md`; record naming differences and flag missing nox surfaces.

**Checkpoint**: Every discovered capability has a stable leaf ID and explicit availability state. The inventory is a coverage target, not a verified implementation.

---

## Phase 2: Foundational (Blocking Evidence and Comparison Contracts)

**Purpose**: Make each leaf item implementable and objectively comparable before story work.

- [ ] T008 Define the `Reference Snapshot`, `Capability Item`, `Scenario`, `Observation`, and `Discrepancy` fields and state-transition rules from `data-model.md` in `specs/001-add-feature-parity/reference/schema.md`; preserve the constraints that a separate input, option, transition, or gated variant gets its own leaf ID and `verified` requires passing normal, failure, and relevant interaction scenarios.
- [ ] T009 Create normal, denial/error, persistence, interruption/recovery, and interaction scenarios for every reachable leaf ID in `specs/001-add-feature-parity/reference/scenarios.md`; record matched starting state, expected decisions, outputs, errors, side effects, and permitted normalization before implementation.
- [ ] T010 Record the evidence gap and access needed for every gated or otherwise unobservable leaf ID in `specs/001-add-feature-parity/reference/gated.md`; keep those IDs `gated-unverified` and excluded from any unqualified complete-parity claim.
- [ ] T011 Establish Pi visual reference states for affected terminal widths, themes, prompts, menus, tool results, and errors in `specs/001-add-feature-parity/reference/pi-visuals.md`; identify any proposed intentional departure and require a constitution amendment before its implementation.
- [ ] T012 Define discrepancy ownership, reproduction format, and closure evidence in `specs/001-add-feature-parity/reference/discrepancies.md`; require fresh passing reference comparison before `closed` and reopen on regression.
- [ ] T013 Replace the broad domain tasks in `specs/001-add-feature-parity/tasks.md` with explicit implementation and verification tasks for every leaf ID in `specs/001-add-feature-parity/reference/reconciliation.md`; each task must name its ID, observed contract, target path, and dependency before any source implementation begins.

**Checkpoint**: No source implementation task starts until T001–T013 establish the inventory, observed contract, and explicit leaf-task coverage. Unreachable features stay tracked and block a universal parity claim.

---

## Phase 3: User Story 1 — Work in a Familiar Terminal (Priority: P1) MVP Slice

**Goal**: Match the reference's core coding workflow inside Pi's terminal presentation.

**Independent Test**: In matched disposable repositories, compare a read, search, edit, command, denial, failure, and recovery journey; compare corresponding Pi terminal states.

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
- [ ] T021 [P] [US2] Add permission scope, precedence, prompt, denial, unattended, and restricted-mode scenarios in `packages/coding-agent/test/suite/parity-permissions.test.ts`, keyed to US2 leaf IDs.
- [ ] T022 [P] [US2] Add model, effort, fallback, context, and budget contract scenarios in `packages/coding-agent/test/suite/parity-model-controls.test.ts`, keyed to US2 leaf IDs.

### Implementation

- [ ] T023 [US2] Implement observed session identity, naming, continuation, resume, fork, compaction, and persistence transitions in `packages/coding-agent/src/core/session-manager.ts` and `packages/coding-agent/src/core/agent-session.ts`.
- [ ] T024 [US2] Implement observed permission modes, scope and rule precedence, prompting, denial, and unattended decisions in a nox-named module at `packages/coding-agent/src/core/permissions.ts`, integrated through `packages/coding-agent/src/core/agent-session.ts`.
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
- [ ] T030 [P] [US3] Add skills, commands, agents, hooks, plugin, and external-connection fixture scenarios in `packages/coding-agent/test/suite/parity-extensions.test.ts`, keyed to US3 leaf IDs.

### Implementation

- [ ] T031 [US3] Implement observed settings validation, scope precedence, and nox-native configuration locations in `packages/coding-agent/src/core/settings-manager.ts` and `packages/coding-agent/src/config.ts`.
- [ ] T032 [US3] Implement observed instruction, rules, and memory discovery and precedence in `packages/coding-agent/src/core/resource-loader.ts`; retain nox-native filenames and paths.
- [ ] T033 [US3] Implement observed skill and custom-command discovery, invocation, argument, and failure behavior in `packages/coding-agent/src/core/skills.ts` and `packages/coding-agent/src/core/slash-commands.ts`.
- [ ] T034 [US3] Implement observed agent isolation, tool selection, lifecycle, and result behavior in a nox-named module at `packages/coding-agent/src/core/subagents.ts`, integrated through `packages/coding-agent/src/core/agent-session.ts`.
- [ ] T035 [US3] Implement observed hook events, ordering, input/output, blocking, and failure behavior in a nox-named module at `packages/coding-agent/src/core/hooks.ts`.
- [ ] T036 [US3] Implement observed external-connection discovery, authorization, resource, prompt, and tool behavior in a nox-named module at `packages/coding-agent/src/core/connections.ts`.
- [ ] T037 [US3] Implement observed plugin discovery, enablement, namespace, installation, and update behavior in a nox-named module at `packages/coding-agent/src/core/plugins.ts` and expose management commands in `packages/coding-agent/src/cli.ts`.
- [ ] T038 [US3] Resolve every US3 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and document precedence and failure outcomes in `specs/001-add-feature-parity/reference/scenarios.md`.

**Checkpoint**: US3 fixtures work independently with no reference-product name in developed nox code or user-facing surfaces.

---

## Phase 6: User Story 4 — Automate and Connect Remote Work (Priority: P2)

**Goal**: Match non-interactive, worktree, remote, integration, and administrative behavior.

**Independent Test**: Compare text/JSON/streamed protocol results and exit status, worktree lifecycle, remote handoff, and every reachable administrative command in isolated fixtures.

### Verification

- [ ] T039 [P] [US4] Add non-interactive input/output, JSON validation, event-order, interruption, and exit scenarios in `packages/coding-agent/test/suite/parity-print-protocol.test.ts`, keyed to US4 leaf IDs.
- [ ] T040 [P] [US4] Add worktree, remote, integration, and CLI-administration fixture scenarios in `packages/coding-agent/test/suite/parity-automation.test.ts`, keyed to US4 leaf IDs and keeping gated cases unverified until observed.

### Implementation

- [ ] T041 [US4] Implement observed print-mode formats, structured output validation, streaming, partial events, and exit behavior in `packages/coding-agent/src/modes/print-mode.ts` and `packages/coding-agent/src/modes/rpc/rpc-mode.ts`.
- [ ] T042 [US4] Implement observed worktree isolation, naming, and cleanup in a nox-named module at `packages/coding-agent/src/core/worktrees.ts` and expose controls in `packages/coding-agent/src/cli.ts`.
- [ ] T043 [US4] Implement observed remote and supported editor/browser handoff lifecycles in a nox-named module at `packages/coding-agent/src/core/remote-sessions.ts`; retain explicit availability behavior for gated services.
- [ ] T044 [US4] Implement observed authentication, diagnostics, import, project state, update, external-connection management, and hosted-review command behavior in `packages/coding-agent/src/cli.ts` and domain modules under `packages/coding-agent/src/cli/` as identified by the leaf inventory.
- [ ] T045 [US4] Resolve every US4 discrepancy in `specs/001-add-feature-parity/reference/discrepancies.md` and record passing protocol and side-effect comparisons in `specs/001-add-feature-parity/reference/scenarios.md`.

**Checkpoint**: US4 protocol and lifecycle features are independently comparable; gated remote features remain explicitly unverified until valid observation exists.

---

## Phase 7: Polish and Cross-Cutting Release Gates

**Purpose**: Reconcile all leaves, protect Pi behavior, and prevent unsupported parity claims.

- [ ] T046 Reconcile every inventory leaf ID with a nox surface, item-level task, passing scenario, and closed discrepancy in `specs/001-add-feature-parity/reference/reconciliation.md`; create missing tasks in `specs/001-add-feature-parity/tasks.md` before closing coverage.
- [ ] T047 Audit developed application code, user-facing strings, command names, and configuration filenames and paths for prohibited reference-product naming; record scope and findings in `specs/001-add-feature-parity/reference/naming-audit.md`.
- [ ] T048 Compare affected Pi terminal states and unrelated Pi workflows against `specs/001-add-feature-parity/reference/pi-visuals.md`; require an approved constitution amendment for every intentional visual divergence.
- [ ] T049 Run `npm run check`, focused modified test files, and appropriate non-e2e coverage according to `AGENTS.md`; record commands, results, and unresolved failures in `specs/001-add-feature-parity/reference/validation.md`.
- [ ] T050 Refresh the installed reference version, availability matrix, inventory, and changed observations in `specs/001-add-feature-parity/reference/snapshot.md` and `specs/001-add-feature-parity/reference/reconciliation.md` before a current-parity claim.
- [ ] T051 Define and record matched-environment end-to-end acceptance results for all four user-story journeys, including stated error and recovery cases, in `specs/001-add-feature-parity/reference/journey-results.md`; do not count a gated or unverified journey as passing.
- [ ] T052 Record workload, hardware, network state, warm-up, and 30-run p95 comparisons for every timing-sensitive leaf in `specs/001-add-feature-parity/reference/performance.md`; require nox completion time to be at most 10% above the matched reference p95 or record a discrepancy.
- [ ] T053 Apply the release gate in `specs/001-add-feature-parity/reference/release-gate.md`: require all inventoried leaves and all four journeys passing, zero known discrepancies, and zero gated-unverified leaves for an unqualified 100% claim; otherwise state the precise remaining gaps.

---

## Dependencies and Execution Order

```text
Phase 1 (T001–T007)
    → Phase 2 (T008–T013: inventory, evidence, leaf-task coverage gate)
        → US1 (T014–T019) ─┐
        → US2 (T020–T028) ─┤
        → US3 (T029–T038) ─┤→ Phase 7 (T046–T053)
        → US4 (T039–T045) ─┘
```

- US1 and US2 are P1. Both depend on Phase 2, not on each other; shared `agent-session.ts` edits must be serialized or isolated.
- US3 and US4 are P2. Both depend on Phase 2. US4's remote connections may consume US3 connection behavior, but its protocol and worktree slices remain independently demonstrable.
- Within each story, observed scenarios precede behavior changes, core state changes precede UI/CLI integration, and discrepancy closure follows verification.
- T046 can expose missing leaf tasks. Such tasks are added in the owning story phase and completed before T051–T052. T053 follows all validation.

## Parallel Execution Examples

- **Setup**: T002, T003, T004, and T005 may run concurrently because they write separate inventory files. T006 starts after all four.
- **US1**: T014 and T015 may run concurrently; T016–T018 then use their evidence and visual baseline.
- **US2**: T020, T021, and T022 may run concurrently in separate test files. T023–T027 follow the corresponding contract evidence.
- **US3**: T029 and T030 may run concurrently; T031–T037 are split by configuration and extension ownership, with shared `agent-session.ts` integration serialized.
- **US4**: T039 and T040 may run concurrently; print protocol, worktree, remote, and administrative slices use separate domain files before CLI integration.

## Implementation Strategy

1. Complete Phases 1–2 first. Their output must turn the broad specification into a complete set of observed leaf contracts and tasks.
2. Deliver US1 as the first demonstrable Pi-styled coding workflow. This is an MVP slice, not a full-parity release.
3. Deliver US2, US3, and US4 as independent increments, keeping each capability's comparison status visible.
4. Do not call the project 100% parity while any discovered leaf is unimplemented, discrepant, or gated-unverified.

## Notes

- `[P]` marks different-file work without an incomplete task dependency.
- Item-level acceptance derives from the pinned reference observations, not from undocumented assumptions.
- The custom `checklists/parity.md` is reviewer-owned requirements quality review; it is not an implementation progress checklist.
- Commits occur only on explicit user request under `AGENTS.md`.
