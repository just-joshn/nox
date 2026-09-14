# Tasks: Complete Coding Assistant Parity

**Input**: Design documents from `specs/001-add-feature-parity/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/](contracts/)

**Tests**: The spec requires observable comparison and independent verification for each story. Use isolated fixtures and the faux provider; do not use paid provider calls for ad hoc checks.

**Organization**: This is the only task document for the complete-parity effort. Tasks are grouped by user story and feature family; these are delivery increments, not separate specifications. Each code task needs its leaf inventory and observed contract. Exhaustive inventory and verification remain required for a complete-parity claim. No family may be called complete from a domain heading alone.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can proceed concurrently because it owns separate files and does not depend on another incomplete task.
- **[Story]**: Maps a task to the corresponding user story in `spec.md`.
- Each task names its target file or directory. Proposed files are created only when the inventory confirms the need.
- T063–T078 and T081–T090 are family completion checkpoints; T079–T080 are cross-cutting audits. Checkpoint implementation clauses define the scope of T013-created leaf subtasks and do not authorize a whole-family source edit. Close a checkpoint only after every reachable leaf has a failing-test, implementation, and verification task with passing scenarios, and gated leaves remain open.

## Phase 1: Setup (Shared Reference and Scope)

**Purpose**: Establish a reproducible reference snapshot and the complete feature boundary.

- [X] T001 Record installed reference version, platform, date, account and policy conditions, and safe CLI observations in `specs/001-add-feature-parity/reference/snapshot.md`; preserve raw outputs under `specs/001-add-feature-parity/reference/observations/`. Inspect the older restored source map remotely for feature discovery, but do not clone or copy it into nox.
- [ ] T002 [P] Enumerate every CLI flag, subcommand, option combination, and documented interactive command or shortcut as leaf entries in `specs/001-add-feature-parity/reference/inventory-cli.md`; reconcile local help with official command documentation and mark unobserved entries.
- [ ] T003 [P] Enumerate settings, instruction loading, memory, permission modes, built-in tools, and model controls as leaf entries in `specs/001-add-feature-parity/reference/inventory-core.md`; record defaults, scope, precedence, and availability conditions.
- [ ] T004 [P] Enumerate skills, custom commands, agents, teams, hooks, external connections, plugins, and marketplaces as leaf entries in `specs/001-add-feature-parity/reference/inventory-extensions.md`; include triggers, lifecycle events, and gated variants.
- [ ] T005 [P] Enumerate background sessions, worktrees, non-interactive protocols, desktop/web/mobile/editor/browser/chat/CI workflows, diagnostics, auth, import, and update flows as leaf entries in `specs/001-add-feature-parity/reference/inventory-surfaces.md`; for each surface leaf record entry action, intermediate interactions, resulting state, side effects, failure behavior, availability conditions, and proposed nox control. Mark inaccessible observations `gated-unverified`. Identify observed non-equivalence with its leaf ID and reproduction steps; record it in `specs/001-add-feature-parity/reference/discrepancies.md` after T012 defines the register.
- [ ] T062 Reconcile every official documentation page, linked reference page, installed command and flag, and restored-source feature module against the feature-family table in `plan.md`; record URL/module path, version, candidate capability, duplicate mapping, and unmatched gap in `reference/source-reconciliation.md`. Add every unmatched capability to this task document and inventory before closing T006.
- [ ] T006 Reconcile T002–T005 and T062 against every page in the current official documentation index, installed command tree, and restored-source candidates in `specs/001-add-feature-parity/reference/reconciliation.md`; list every unmatched source entry and split any broad item that can fail independently.
- [ ] T007 Map each leaf item to a nox-native command, key, configuration path, protocol, or integration in `specs/001-add-feature-parity/reference/surface-map.md`; record naming differences and flag missing nox surfaces.

**Checkpoint**: Every discovered capability has a stable leaf ID and explicit availability state. The inventory is a coverage target, not a verified implementation.

---

## Phase 2: Foundational (Blocking Evidence and Comparison Contracts)

**Purpose**: Make each leaf item implementable and objectively comparable before story work.

- [X] T008 Define the `Reference Snapshot`, `Discovery Candidate`, `Capability Item`, `Scenario`, `Observation`, and `Discrepancy` fields and state-transition rules from `data-model.md` in `specs/001-add-feature-parity/reference/schema.md`; preserve the constraints that a separate input, option, transition, or gated variant gets its own leaf ID, source-only candidates need current corroboration, and `verified` requires passing normal, failure, and relevant interaction scenarios.
- [ ] T009 Create normal, denial/error, persistence, interruption/recovery, and interaction scenarios in `specs/001-add-feature-parity/reference/scenarios.md` for each reachable leaf selected for source work before that leaf's implementation; record matched starting state, expected decisions, outputs, errors, side effects, and permitted normalization. Continue until every reachable leaf has required scenarios before T046 and T053. For security leaves, use synthetic credentials and isolated user/project fixtures to observe reuse after restart, output/log/error redaction, permission-rule persistence, and data disclosed to extensions or remote services; record only redacted traces and leave inaccessible behavior unverified.
- [ ] T010 Record the evidence gap and access needed for every gated or otherwise unobservable leaf ID in `specs/001-add-feature-parity/reference/gated.md`; keep those IDs `gated-unverified` and excluded from any unqualified complete-parity claim.
- [ ] T011 Predeclare the required Pi visual matrix in `specs/001-add-feature-parity/reference/pi-visuals.md`: every affected workflow and its relevant normal, denial, error, and recovery states across supported terminal widths and themes, including prompts, menus, tool results, and errors. Capture reference states, identify any proposed intentional departure, and require a constitution amendment before its implementation.
- [X] T012 Define discrepancy ownership, reproduction format, and closure evidence in `specs/001-add-feature-parity/reference/discrepancies.md`; require fresh passing reference comparison before `closed` and reopen on regression.
- [ ] T013 Expand each observed, reachable leaf under the story checkpoints below into separate failing-test, implementation, and verification subtasks in this `tasks.md` before source work on that leaf; each names its leaf ID, observed contract, exact test and source paths, dependency, and passing scenario. Start with read/search/edit/command/denial/failure/recovery. Add discovery or access subtasks for gated leaves without inventing contracts. T046 cannot close until every inventory leaf has item-level task and scenario coverage.
- [X] T091 Establish a reproducible offline aggregate project coverage command and baseline in root `package.json` and `specs/001-add-feature-parity/reference/validation.md`: include every production workspace package and session backend shipped or imported by nox, measure each package's owned source files once, combine covered and total counts rather than averaging percentages, and document all excluded generated, test, example, or tooling files with reasons. Require aggregate lines, statements, functions, and branches each to reach at least 80%; a zero-denominator metric, failed package, or unmeasured package fails the gate. Prevent provider credential and network use in routine tests and record the baseline before application work is called complete.
- [X] T093 Capture a functional Pi baseline in `specs/001-add-feature-parity/reference/pi-functional.md` using isolated fixtures for existing session persistence, file and command tools, prompt handling, extension loading, and non-interactive protocol flows that parity changes could affect; record inputs, state transitions, outputs, side effects, failures, and baseline test commands before source changes, then define per-slice and final regression comparisons with any intentional change linked to its observed parity leaf and required constitution amendment where applicable.
- [X] T094 [US4] Write a failing parser test for the observed SUR-LIMIT-002 malformed-JSON variant in `packages/coding-agent/test/args.test.ts`: `--json-schema '{'` must produce an error diagnostic, preserve the prompt, and never become an extension flag. Depend on [SUR-LIMIT-002-MALFORMED](reference/scenarios.md); do not infer valid-schema behavior.
- [X] T095 [US4] Implement SUR-LIMIT-002 malformed-JSON preflight in `packages/coding-agent/src/cli/args.ts`, with `packages/coding-agent/src/main.ts` only if needed for exit behavior. Reject malformed JSON before session/model work with empty stdout and nonzero exit. Keep valid structured-output behavior gated until separately observed and implemented; do not silently accept an unused schema.
- [X] T096 [US4] Verify SUR-LIMIT-002 malformed-JSON against the recorded diagnostic and exit behavior in `packages/coding-agent/test/args.test.ts` and an isolated CLI process; record the result in `reference/validation.md`. Keep SUR-LIMIT-001 and the remaining SUR-LIMIT-002 variants open.
- [X] T097 [US4] Write a failing parser test for observed CLI-246 (`--bg -p`) in `packages/coding-agent/test/args.test.ts`: both flags must be recognized, the positional prompt preserved, and neither flag routed to extensions. Depend on [CLI-246-BG-PRINT](reference/scenarios.md).
- [X] T098 [US4] Implement CLI-246 conflict preflight in `packages/coding-agent/src/cli/args.ts` and `packages/coding-agent/src/main.ts`, with a nox-native diagnostic explaining that print mode cannot create an attachable background session. Reject any standalone background launch explicitly until SUR-BG-003 is implemented; do not create a session or dispatch a model request.
- [X] T099 [US4] Verify CLI-246 in a temporary-home CLI process with empty stdout, nonzero exit, no session ID, and the conflict explanation; record the comparison and open wording discrepancy in `reference/validation.md` and `reference/discrepancies.md`. Keep successful SUR-BG-003 launch and lifecycle variants open.
- [X] T100 [US1] Build a disposable loopback Messages fixture in `reference/harness/loopback_probe.py` with protocol tests in `reference/harness/test_loopback_probe.py`; inject a synthetic Read call, capture only redacted request/tool-result summaries, reject unexpected paths and malformed payloads, and retain the resulting trace in `reference/observations/`. Use a temporary home and synthetic key; keep real-service and unobserved tool cases gated.
- [X] T101 [US4] Write a failing CLI process test for observed CLI-519 in `packages/coding-agent/test/command-typo-cli.test.ts`: `udpate` must exit 1 before model/session work with empty stdout and a nox-native `update` suggestion; an ordinary unmatched prompt must remain available. Depend on [CLI-519-TYPO](reference/scenarios.md) and the Pi functional baseline T093.
- [X] T102 [US4] Implement CLI-519 in `packages/coding-agent/src/cli/command-suggestion.ts` and `packages/coding-agent/src/cli.ts`, using the existing subcommand names and an early bounded suggestion check. Keep application state immutable and preserve non-command prompts; avoid changing unrelated argument parsing.
- [X] T103 [US4] Verify CLI-519 with the focused process test, `npm run check`, and an isolated comparison of exit, stdout/stderr, and temporary-home side effects; record any remaining mismatch in `reference/discrepancies.md` and `reference/validation.md`. Keep the leaf open until every applicable parity scenario passes.
- [X] T104 [US4] Tighten the CLI-519 process assertion in `packages/coding-agent/test/command-typo-cli.test.ts` to compare the full observed stderr with only the executable name normalized; confirm it fails against the current short message. Depend on [CLI-519-TYPO](reference/scenarios.md).
- [X] T105 [US4] Render the observed three-part typo diagnostic in `packages/coding-agent/src/cli.ts`, using `APP_NAME` for the executable and the input token for the explicit prompt fallback. Preserve exit and session behavior.
- [X] T106 [US4] Run the focused CLI process test, neighboring CLI regression tests, and `npm run check`; update `reference/validation.md` and DISC-002 to narrow the remaining mismatch to startup side effects, then commit locally.
- [X] T107 [US4] Observe CLI-557 without account usage in a disposable loopback Messages fixture under `reference/harness/prompt_probe.py`: compare replacement and appended sentinel presence in the request's system field, redact all raw prompt text, and retain the normalized trace under `reference/observations/`. Depend on [CLI-557-PROMPT-COMPOSE](reference/scenarios.md); do not assert a nox parity result from documentation alone.
- [X] T108 [US4] Extend `reference/harness/prompt_probe.py` with a file-backed mode for CLI-558, test its bounded argument construction in `reference/harness/test_prompt_probe.py`, and capture only redacted marker order through the local Messages endpoint. Depend on [CLI-558-PROMPT-FILES](reference/scenarios.md).
- [X] T109 [US4] Write failing parser and isolated-process tests in `packages/coding-agent/test/args.test.ts` and `packages/coding-agent/test/prompt-file-cli.test.ts` for CLI-261, CLI-076, and CLI-069: conflict precedence, missing-file diagnostics, and file-backed prompt selection. Depend on [CLI-261-SYSTEM-PROMPT-CONFLICT](reference/scenarios.md), [CLI-076-PROMPT-FILE-MISSING](reference/scenarios.md), and [CLI-069-APPEND-PROMPT-FILE-MISSING](reference/scenarios.md).
- [X] T110 [US4] Add explicit prompt-file arguments and validation in `packages/coding-agent/src/cli/args.ts`, using the existing `packages/coding-agent/src/main.ts` diagnostic preflight and resource loader file-source semantics. Reject conflicts and missing files before session/model work; preserve inline prompt behavior.
- [X] T111 [US4] Verify the focused prompt-file and nearby CLI tests, `npm run check`, and the synthetic CLI-558 composition fixture; record any mismatch in `reference/validation.md` and `reference/discrepancies.md`, then commit locally.
- [X] T112 [US4] Verify CLI-261 conflict precedence in `packages/coding-agent/test/prompt-file-cli.test.ts` with both an inline replacement and a nonexistent replacement file, compare exit/stdout/stderr and temporary-home entries to [CLI-261-SYSTEM-PROMPT-CONFLICT](reference/scenarios.md), and update the discrepancy register without closing the leaf.
- [X] T113 [US4] Write failing isolated-process tests for CLI-559 and CLI-560 in `packages/coding-agent/test/prompt-file-cli.test.ts`: missing values must exit 1 with the observed lowercase parser diagnostic, empty stdout, and no home entries. Depend on [CLI-559-SYSTEM-PROMPT-NO-VALUE](reference/scenarios.md) and [CLI-560-APPEND-PROMPT-NO-VALUE](reference/scenarios.md).
- [X] T114 [US4] Add a narrowly scoped prompt-file missing-value preflight in `packages/coding-agent/src/cli.ts` before settings/session initialization, preserving normal prompt text and valid file-flag handling.
- [X] T115 [US4] Re-run focused CLI cases and `npm run check`, compare both missing-value variants in disposable homes, update `reference/validation.md`, and keep unrelated prompt-file leaves open.
- [X] T116 [US4] Write failing isolated-process tests for CLI-561 and CLI-562 directory inputs in `packages/coding-agent/test/prompt-file-cli.test.ts`; compare same-OS EISDIR read diagnostics, empty stdout, and exit 1. Depend on [CLI-561-SYSTEM-PROMPT-DIRECTORY](reference/scenarios.md) and [CLI-562-APPEND-PROMPT-DIRECTORY](reference/scenarios.md).
- [X] T117 [US4] Validate explicit prompt files by attempting to read them in `packages/coding-agent/src/cli/args.ts`, mapping missing files to the observed not-found diagnostic and other read errors to the observed `Error reading ... file` shape. Preserve successful file-source handling.
- [X] T118 [US4] Run focused CLI and resource-loader tests plus `npm run check`, record the directory comparison and remaining startup side-effect mismatch in `reference/validation.md` and DISC-003, then commit locally.
- [X] T119 [US1] Observe TOOL-002 and TOOL-003 bare-mode exposure with a disposable local Messages endpoint in `reference/harness/loopback_probe.py`: retain `--bare`, record only tool-name booleans, verify the trace in `reference/harness/test_loopback_probe.py`, and retain a redacted observation. Depend on [TOOL-BARE-CATALOG](reference/scenarios.md); do not use account-backed model calls or infer default-session exposure.
- [X] T120 [US1] Observe TOOL-002 and TOOL-003 normal startup catalog in `reference/harness/loopback_probe.py` using macOS `sandbox-exec` with only localhost outbound allowed. First verify localhost succeeds and direct external IP fails, then run the synthetic Messages fixture without `--bare`; record only fixed tool-name booleans and keep any startup failure unverified. Depend on [TOOL-DEFAULT-CATALOG](reference/scenarios.md).
- [X] T121 [US1] Observe TOOL-002 explicit `--tools Glob` exposure through the same macOS localhost-only sandbox in `reference/harness/loopback_probe.py`; retain only fixed catalog booleans, synthetic completion, and exit in a redacted trace. Depend on [TOOL-GLOB-ENABLE](reference/scenarios.md); keep actual pattern semantics open.
- [X] T122 [US1] Observe TOOL-003 explicit `--tools Grep` exposure through the same macOS localhost-only sandbox in `reference/harness/loopback_probe.py`; retain only fixed catalog booleans, synthetic completion, and exit in a redacted trace. Depend on [TOOL-GREP-ENABLE](reference/scenarios.md); keep actual query semantics open.
- [X] T123 [US1] Observe one normal TOOL-002 Glob call in `reference/harness/loopback_probe.py` with a synthetic `*.txt` pattern under the localhost-only sandbox; test result redaction/classification, retain only fixture-match and error booleans, and record the redacted trace. Depend on [TOOL-GLOB-NORMAL](reference/scenarios.md); leave empty/invalid patterns and nox comparison open.
- [X] T124 [US1] Observe one normal TOOL-003 Grep call in `reference/harness/loopback_probe.py` with a synthetic `alpha` query under the localhost-only sandbox; retain only fixture-match and error booleans and a redacted trace. Depend on [TOOL-GREP-NORMAL](reference/scenarios.md); leave no-match/invalid queries and nox comparison open.
- [X] T125 [US1] Observe TOOL-002 Glob no-match behavior with a synthetic `absent-*.zzz` pattern in the same sandboxed fixture; test the redacted no-match classification and retain the error/result-state trace. Depend on [TOOL-GLOB-NO-MATCH](reference/scenarios.md); leave invalid patterns and nox comparison open.
- [X] T126 [US1] Observe TOOL-003 Grep no-match behavior with a synthetic `absent-sentinel` query in the same sandboxed fixture; retain the redacted error/result-state trace. Depend on [TOOL-GREP-NO-MATCH](reference/scenarios.md); leave invalid queries and nox comparison open.
- [X] T127 [US1] Observe TOOL-002 Glob input `[` in the same sandboxed fixture, retaining only the error flag, fixture-match flag, completion/exit, and unchanged-file state. Depend on [TOOL-GLOB-BRACKET](reference/scenarios.md); do not infer Grep's pattern rules.
- [X] T128 [US1] Observe TOOL-003 Grep input `[` in the same sandboxed fixture, retaining only the error flag, fixture-match flag, completion/exit, and unchanged-file state. Depend on [TOOL-GREP-BRACKET](reference/scenarios.md); leave exact diagnostic and nox comparison open.
- [X] T129 [US1] Classify the six synthetic Glob/Grep result bodies in `reference/harness/loopback_probe.py` using only exact fixture-format allowlists, test that unexpected text stays redacted, and retain normalized offline traces. Depend on TOOL-GLOB-NORMAL, TOOL-GREP-NORMAL, TOOL-GLOB-NO-MATCH, TOOL-GREP-NO-MATCH, TOOL-GLOB-BRACKET, and TOOL-GREP-BRACKET.
- [X] T130 [US1] Inspect nox's actual tool registration, CLI tool selection, and existing search behavior; reconcile TOOL-002/003 source targets and test fixtures before implementation. Keep default tool exposure aligned with the observed catalog.
- [X] T131 [US1] Write failing nox tests for explicit Glob/Grep exposure and synthetic match, no-match, and invalid-pattern results, using the exact offline fixture formats and error decisions.
- [X] T132 [US1] Implement the minimum nox Glob/Grep tool definitions and explicit selection wiring for the observed contracts; keep unrelated defaults and Pi visuals intact.
- [X] T133 [US1] Run focused tests and `npm run check`, compare nox against the six offline fixtures, update the validation/discrepancy ledger, and commit locally. Leave unobserved options and real-service behavior open.
- [X] T134 [US1] Verify the SDK's provider-facing active catalog for explicit `Glob` and `Grep` in an offline in-memory session, including default exclusion and single-tool selection; record and commit the result.
- [X] T135 [US1] Capture fixed-field input-schema presence for reference Glob/Grep from the localhost-only synthetic endpoint, compare nox's advertised fields, and list any unsupported options as separate observed work.
- [X] T136 [US1] Probe reference Glob's optional `path` and Grep's `output_mode` variants in disposable synthetic repositories, retaining only fixed expected output formats and errors; then add exact schema and mapping tasks for nox.
- [X] T137 [US1] Write failing nox tests for Glob `path: nested` and Grep `output_mode: files_with_matches|content`, including advertised schema presence and exact synthetic outputs.
- [X] T138 [US1] Add the observed Glob/Grep schema fields and output-mode mapping without changing lower-case Pi tools; keep unobserved Grep options out of the new adapter schema.
- [X] T139 [US1] Verify focused tool and catalog tests plus `npm run check`, record remaining schema gaps, and commit locally.
- [X] T140 [US1] Observe Grep `-i: true` with an uppercase query against the lowercase synthetic fixture through the localhost-only reference endpoint, retaining only fixed result classification.
- [X] T141 [US1] Write a failing nox test for the observed case-insensitive Grep field and result, then map `-i` to the existing lower-case grep option.
- [X] T142 [US1] Run focused and neighboring tests plus `npm run check`, update the validation ledger, and commit locally.
- [X] T143 [US1] Observe the reference's third advertised Grep `output_mode: count` value in a localhost-only synthetic fixture; retain only an exact allowlisted result class and no raw request content.
- [X] T144 [US1] Observe reference Grep count mode with two files and three total matches in a disposable localhost-only fixture, retaining only an exact synthetic result class.
- [X] T145 [US1] Write failing nox count-mode tests for the observed single- and multi-file fixtures, implement the formatter in the explicit Grep adapter, then verify neighboring tests and `npm run check` before committing locally.
- [X] T146 [US1] Observe Grep `output_mode: count` with no matches in a localhost-only fixture and compare nox's empty-result decision; keep count limits and per-file ordering open.
- [X] T147 [US1] Write a failing nox count-mode no-match test, implement the observed zero-total result without changing other Grep modes, verify focused tests and `npm run check`, then commit locally.
- [X] T148 [US1] Observe reference Grep count mode against a disposable file with 101 matching lines through the localhost-only endpoint, retaining only exact synthetic count classification and unchanged-file state.
- [X] T149 [US1] Compare nox's explicit count mode with the observed 101-line fixture; if it truncates, fix the long-term counting path without changing lower-case Pi grep and verify/commit locally.
- [X] T150 [US1] Observe reference Grep count mode with two occurrences on one synthetic line under localhost-only isolation, classify only exact fixed result text, compare the nox count helper, and commit the validation.
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
- [X] T162 [US1] Consolidate the offline search harness's repeated mode sets into named constants so new modes cannot silently miss sandboxing, catalog capture, or match validation; run harness tests and representative loopback traces, then commit locally.
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
- [X] T186 [US1] Reconcile the synthetic Glob/Grep normal, no-match, invalid, and option traces into the US1 search inventory, scenarios, reconciliation, and gated register; correct nox source targets, preserve real-service and interactive gates, then commit locally.
- [X] T187 [US1] Observe reference Glob `*.txt` with two synthetic matching files under localhost-only isolation; retain exact allowlisted order and unchanged-file state, then compare nox's explicit adapter.
- [X] T188 [US1] Observe reference Glob `**/*.txt` with root and nested synthetic matches under localhost-only isolation; retain exact allowlisted paths and unchanged-file state, then compare nox's explicit adapter.
- [X] T189 [US1] Observe reference Glob `*.txt` with synthetic hidden and visible matches under localhost-only isolation; retain exact allowlisted paths and unchanged-file state, then compare nox's explicit adapter.
- [X] T190 [US1] Observe reference Glob order with controlled synthetic modification times and hidden/visible matches under localhost-only isolation; distinguish timestamp ordering from traversal ordering before implementing a nox fix.
- [X] T191 [US1] Write failing nox tests for both observed Glob hidden-file orders, sort the explicit adapter by ascending modification time without changing lower-case Pi find, verify focused/neighboring tests and `npm run check`, then commit locally.
- [X] T192 [US1] Observe reference Glob order when hidden and visible synthetic matches have equal controlled modification times under localhost-only isolation; retain exact allowlisted result and unchanged state, then compare nox's tie break.

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

### Core workflow reference observations

These observations precede T013 for the selected US1 leaves. Model-backed probes remain pending while the reported weekly usage cap is active.

- [ ] T054 [US1] Observe US1-READ-001 in an authorized disposable repository: capture normal in-scope read, missing-path failure, and any permission boundary in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks tied to those observations.
- [X] T055 [US1] Observe US1-SEARCH-PATH-001 in an authorized disposable repository: confirm installed path-search availability, matching paths, no-match, and invalid-pattern behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/tools/claude-search.ts` and `find.ts`; then have T013 create implementation and verification tasks.
- [ ] T056 [US1] Observe US1-EDIT-001 in an authorized disposable repository: capture approval, exact file delta, denied edit, and failed edit without unrelated writes in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.
- [ ] T057 [US1] Observe US1-COMMAND-001 in an authorized disposable repository: capture permission decision, stdout/stderr, nonzero exit, and interruption for harmless commands in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/utils/tools-manager.ts`; then have T013 create implementation and verification tasks.
- [ ] T058 [US1] Observe US1-DENY-001 for parent US1-EDIT-001 in an authorized disposable repository: refuse a proposed targeted edit and capture prompt, decision, error, unchanged file, and follow-up state in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [ ] T059 [US1] Observe US1-FAIL-001 for parent US1-COMMAND-001 in an authorized disposable repository: trigger a harmless command with nonzero exit and capture result shape, stdout/stderr, side effects, and retry behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [ ] T060 [US1] Observe US1-RECOVER-001 for parent US1-COMMAND-001 in the same authorized session after that nonzero command: capture history, next actions, and a successful continuation in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/agent-session.ts`; then have T013 create implementation and verification tasks.
- [X] T061 [US1] Observe US1-SEARCH-CONTENT-001 in an authorized disposable repository: confirm installed content-search availability, matching text, no-match, and invalid-pattern behavior in `specs/001-add-feature-parity/reference/scenarios.md`; target `packages/coding-agent/src/core/tools/claude-search.ts` and `grep.ts`; then have T013 create implementation and verification tasks.

### Feature-family checkpoints

- [ ] T063 [US1] Checkpoint — Specify the clean-room agent-turn state machine in `contracts/observable-behavior.md`: inputs, context and instruction precedence, planning, tool selection, streaming events, retries, interruption, completion, usage accounting, and nondeterministic output normalization. Implement each observed leaf in `packages/agent/src/` and `packages/coding-agent/src/core/`; verify matched traces and Pi states in focused tests and `reference/scenarios.md`.
- [ ] T064 [US1] Checkpoint — Inventory and contract every built-in tool family in `reference/inventory-core.md`, including file read/write/edit, path and content search, shell/PowerShell, web retrieval/search, notebook editing, language-server actions, user questions, tool discovery, and mode/worktree/task controls. Implement observed input validation, permissions, output, limits, cancellation, and errors in owning `packages/coding-agent/src/core/` and `packages/coding-agent/src/utils/` modules; verify each leaf with isolated fixtures.
- [ ] T068 [US1] Checkpoint — Inventory all interactive commands, input/editor behavior, keybindings, vim mode, output styles, themes, accessibility, help/status, notifications, and voice/buddy behavior in `reference/inventory-cli.md`. Implement functional controls in `packages/coding-agent/src/modes/interactive/` using Pi visual primitives; verify each normal, prompt, denial, error, and recovery cell in `reference/pi-visuals.md`.
- [ ] T081 [US1] Checkpoint — Contract native computer-use and browser-use controls from current documentation and matched observations in `reference/scenarios.md`; implement observed screenshot, app, click/type, browser debugging, form, permission, and platform-gate leaves under `packages/coding-agent/src/`, with Pi-styled terminal controls and focused failure/denial tests.
- [ ] T086 [US1] Checkpoint — Contract context-window accounting, prompt caching, image and large-input behavior, and context reduction from current documentation and observed turns in `reference/scenarios.md`; implement each observed leaf in `packages/agent/src/` and `packages/coding-agent/src/core/`, and verify usage, limits, model switch, stale instruction, and recovery cases.

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

### Feature-family checkpoints

- [ ] T065 [US2] Checkpoint — Contract model/provider selection, aliases, effort, thinking, budgets, fallback, capability limits, transport, and usage display in `reference/scenarios.md`. Implement observed leaves in `packages/ai/src/` and `packages/coding-agent/src/core/agent-session.ts`; verify normal, unavailable, rate-limited, and restart cases without paid ad-hoc test calls.
- [ ] T066 [US2] Checkpoint — Contract trust, permission modes/rules, managed policy, sandbox boundaries, restricted operation, credential reuse, secret redaction, and unattended decisions in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/permissions.ts` and owning security modules; verify allow, deny, policy-blocked, restart, and data-disclosure cases with synthetic secrets.
- [ ] T067 [US2] Checkpoint — Contract session identity, history, rename, resume, fork, rewind, compaction, auto memory, background state, and cross-surface continuation in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/session-manager.ts` and related owning modules; verify persistence, crash, changed-repository, and context-limit cases.
- [ ] T082 [US2] Checkpoint — Contract goal completion rules, agent view, cross-session messaging, and dynamic workflow lifecycle in `reference/scenarios.md`; implement observed state, coordination, stop, restart, and error behavior under `packages/coding-agent/src/core/`, with isolated multi-session tests and Pi visual comparison.
- [ ] T087 [US2] Checkpoint — Contract scheduled prompts, one-time reminders, repeated prompts, goal continuation, and stop conditions in `reference/scenarios.md`; implement observed leaves under `packages/coding-agent/src/core/`, with deterministic time-controlled tests for restart, cancellation, missed trigger, and error behavior.

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

### Feature-family checkpoints

- [ ] T069 [US3] Checkpoint — Contract settings scopes, validation, precedence, environment overrides, managed policy, migrations, instruction files, rules, and memory in `reference/scenarios.md`. Implement observed leaves through nox-native names in `packages/coding-agent/src/config.ts` and `packages/coding-agent/src/core/`; verify conflicts, invalid values, restart, and isolation.
- [ ] T070 [US3] Checkpoint — Contract skills, built-in and custom commands, argument processing, discovery, invocation, and lifecycle in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/skills.ts` and command owners; verify duplicate names, disabled entries, errors, and precedence.
- [ ] T071 [US3] Checkpoint — Inventory every hook event, matcher, input/output schema, command and prompt hook, asynchronous behavior, ordering, blocking, and failure policy in `reference/inventory-extensions.md`. Implement observed leaves in `packages/coding-agent/src/core/hooks.ts`; verify ordering, cancellation, invalid output, restart, and secret exposure.
- [ ] T072 [US3] Checkpoint — Contract built-in/custom agents, subagents, teams, task state, messages, delegation, concurrency, isolation, and coordination in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/` and `packages/agent/src/`; verify success, partial failure, cancellation, overlapping edits, and resume.
- [ ] T073 [US3] Checkpoint — Contract plugins, marketplaces, MCP servers/tools/resources/prompts, external authentication, discovery, enablement, installation, update, and removal in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/core/` and `packages/coding-agent/src/cli/`; verify scope, offline/error, permission, redaction, and lifecycle cases.
- [ ] T084 [US3] Checkpoint — Contract plugin evaluation cases, baseline comparison, grading, and result reporting in `reference/scenarios.md`; implement observed leaves under `packages/coding-agent/src/core/plugins.ts` or its owning nox-named modules, with focused repeatability and failure tests.
- [ ] T088 [US3] Checkpoint — Contract extension configuration diagnostics, plugin evaluation, and debugging commands in `reference/scenarios.md`; implement observed leaves under `packages/coding-agent/src/core/` and `packages/coding-agent/src/cli/`, verifying explanation of source precedence, disabled features, invalid settings, and failed connections.

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

### Feature-family checkpoints

- [ ] T074 [US4] Checkpoint — Contract noninteractive text/JSON/streaming input and output, structured schemas, partial messages, budgets, event ordering, RPC/SDK-style control, and exit statuses in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/modes/print-mode.ts`, `packages/coding-agent/src/modes/rpc/`, and relevant protocol owners; verify malformed input, backpressure, interruption, and failures.
- [ ] T075 [US4] Checkpoint — Contract CLI startup, every subcommand and flag, auth/setup, diagnostics, update, import, project state, external management, and administrative errors in `reference/scenarios.md`. Implement observed leaves in `packages/coding-agent/src/cli/` under nox-native names; verify help, defaults, invalid combinations, exit codes, and state changes.
- [ ] T076 [US4] Checkpoint — Contract worktrees, repository/source-control operations, background agents, local scheduling/loops, cloud routines, triggers, hosted review, and notifications in `reference/scenarios.md`. Implement each observed leaf in `packages/coding-agent/src/core/` and CLI controls; verify isolation, side effects, logs, cancellation, restart, and cleanup.
- [ ] T077 [US4] Checkpoint — Contract remote control, cloud/web sessions, teleport/handoff, desktop/mobile/editor/browser/chat/CI connections, channels, enterprise gateways, self-hosted runners, artifacts, and deep links in `reference/scenarios.md`. Implement every observed workflow through a nox terminal/CLI control and necessary connected-service bridge in `packages/coding-agent/src/`; verify entry, intermediate interactions, state, data disclosure, failure, disconnect, and resume. Keep service-gated leaves open until access permits matched observation.
- [ ] T078 [US4] Checkpoint — Reconcile each terminal, VS Code, JetBrains, desktop, web, mobile, Chrome, Slack, GitHub/GitLab CI, and SDK documentation workflow to a nox control in `reference/surface-map.md`. Create leaf subtasks in this document for any missing control and verify Pi visual consistency where nox presents it in the terminal.
- [ ] T083 [US4] Checkpoint — Contract deep hosted review, security guidance/scanning, finding verification, patch review, and CI/provider variants in `reference/scenarios.md`; implement observed leaves under `packages/coding-agent/src/` and nox CLI controls, then verify result, permission, data-disclosure, and gated cases.
- [ ] T085 [US4] Checkpoint — Contract artifact creation, sharing permissions, deep-link launch, and cross-surface access in `reference/scenarios.md`; implement observed leaves through nox terminal/CLI controls and connected-service bridges under `packages/coding-agent/src/`, verifying ownership, denial, expiration, disconnect, and gated cases.
- [ ] T089 [US4] Checkpoint — Contract desktop local scheduling, Dispatch, app previews, visual diff review, and editor/simulator connections in `reference/scenarios.md`; implement each observed functional outcome through nox-native terminal or CLI controls under `packages/coding-agent/src/` and verify session handoff, state, permissions, failure, and service gates.
- [ ] T090 [US4] Checkpoint — Contract deep-link launch, channel event delivery, and external-trigger authorization across local and hosted sessions in `reference/scenarios.md`; implement observed leaves under `packages/coding-agent/src/core/` and `packages/coding-agent/src/cli/`, verifying event ordering, replay, disconnection, and unauthorized triggers.

**Checkpoint**: US4 protocol and lifecycle features are independently comparable; gated remote features remain explicitly unverified until valid observation exists.

---

## Phase 7: Polish and Cross-Cutting Release Gates

**Purpose**: Reconcile all leaves, protect Pi behavior, and prevent unsupported parity claims.

- [ ] T079 Audit every implemented feature family against the restored tree's candidate module list in `reference/source-reconciliation.md`; investigate unmatched names through current documentation and safe current-CLI observations, add real missing features to this task document, and reject obsolete source-only behavior with dated evidence.
- [ ] T080 Perform the final three-way coverage audit in `reference/reconciliation.md`: current official docs, installed current reference, and restored-source candidate list must each map to a documented leaf, an explicit obsolete/duplicate rationale, or a gated open item. Close only after all resulting implementation/verification subtasks in this document pass; then run T046–T053.
- [ ] T046 After T080, reconcile every inventory leaf ID with a nox surface, item-level implementation and verification tasks, passing normal/failure/interaction scenarios, and no open discrepancy in `specs/001-add-feature-parity/reference/reconciliation.md`; create and finish missing tasks in `specs/001-add-feature-parity/tasks.md` before closing coverage. Unobserved or gated leaves keep this task open.
- [ ] T047 Audit developed application code, user-facing strings, command names, and configuration filenames and paths for prohibited reference-product naming; record scope and findings in `specs/001-add-feature-parity/reference/naming-audit.md`.
- [ ] T048 Compare every required state in the predeclared Pi visual matrix and unrelated Pi workflows against `specs/001-add-feature-parity/reference/pi-visuals.md`; report tested and missing matrix cells, and require an approved constitution amendment for every intentional visual divergence.
- [ ] T049 Re-run `npm run check`, focused modified test files, relevant unit/integration/end-to-end checks, the T091 aggregate coverage command, and the T093 functional Pi regression matrix; require at least 80% on each aggregate coverage metric and no unexplained Pi functional regression before application work is called complete, and record commands, results, exclusions, and unresolved failures in `specs/001-add-feature-parity/reference/validation.md`.
- [ ] T050 Refresh the installed reference version, availability matrix, inventory, and changed observations in `specs/001-add-feature-parity/reference/snapshot.md` and `specs/001-add-feature-parity/reference/reconciliation.md` before a current-parity claim.
- [ ] T051 Define and record matched-environment end-to-end acceptance results for all four user-story journeys, including stated error and recovery cases, in `specs/001-add-feature-parity/reference/journey-results.md`; do not count a gated or unverified journey as passing.
- [ ] T052 Audit every inventory leaf's predeclared timing-sensitivity classification and reason against SC-007, then record workload, hardware, network state, warm-up, and 30-run p95 comparisons for every timing-sensitive leaf in `specs/001-add-feature-parity/reference/performance.md`; require nox completion time to be at most 10% above the matched reference p95 or record a discrepancy. An unclassified leaf fails this gate.
- [ ] T092 Audit the final application diff for validated external inputs, authorization before side effects, credential and private-data redaction, applicable injection and request-forgery defenses, endpoint rate limits, and error-message leakage; record applicable and non-applicable findings with evidence in `specs/001-add-feature-parity/reference/security-audit.md`, resolve critical findings before T053, and invoke the security-reviewer role for any critical finding.
- [ ] T053 Apply the release gate in `specs/001-add-feature-parity/reference/release-gate.md`: require all inventoried leaves and all four journeys passing, all four aggregate coverage metrics at least 80%, no unexplained Pi functional regression, zero known discrepancies, zero gated-unverified leaves, and no unexplained candidate from the installed CLI, current official documentation, or restored source map for an unqualified 100% claim; otherwise state the precise remaining gaps.

---

## Dependencies and Execution Order

```text
Reference discovery (T001–T007 and T062, continuing as new leaves are found)
    → Per-feature evidence (T008–T012, T054–T061 for core workflow leaf IDs, T091 coverage baseline, and T093 Pi functional baseline)
        → Explicit implementation and verification tasks (T013 for observed IDs)
            → US1 / US2 / US3 / US4 source and verification slices
                → Three-source audit (T079–T080) and all leaf tasks complete (T046)
                    → Cross-cutting release gates (T047–T053 and T092)
```

- US1 and US2 are P1. Each source slice depends on evidence and explicit tasks for its own leaves, not completion of every Phase 2 item; shared `agent-session.ts` edits must be serialized or isolated.
- US3 and US4 are P2. Each source slice depends on evidence and explicit tasks for its own leaves. US4's remote connections may consume US3 connection behavior, but its protocol and worktree slices remain independently demonstrable.
- Within each story, observed scenarios precede behavior changes, core state changes precede UI/CLI integration, and discrepancy closure follows verification. Run `npm run check` with full output after each code-change task and fix all errors, warnings, and infos before continuing; run each created or modified focused test file until it passes. Record results in `specs/001-add-feature-parity/reference/validation.md`.
- T062 precedes T006. T079–T080 precede T046. T046 can expose missing leaf tasks; add them in the owning story phase and complete them before T051–T052. T093 precedes every source slice that can affect a Pi workflow; T091 and T093 precede T049. T092 precedes T053. T053 follows all validation.

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
- T091–T093 were appended after the original 90 IDs to preserve stable references; phase placement and explicit dependencies define execution order. Task IDs are stable references, not a substitute for the dependency graph.
- Item-level acceptance derives from the pinned reference observations, not from undocumented assumptions.
- The custom `checklists/parity.md` is reviewer-owned requirements quality review; it is not an implementation progress checklist.
- The user has requested logical commits on `main` without pushing. Before each application-code commit, use the planner, test-guidance, and code-review roles when available, run a failing focused test before implementation, and check the staged diff for secrets and applicable authorization, validation, injection, request-forgery, rate-limit, and leakage risks. A critical finding invokes security review and blocks that commit until fixed.
