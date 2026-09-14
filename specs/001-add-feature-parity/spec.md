# Feature Specification: Complete Coding Assistant Parity

**Feature Branch**: `main`

**Created**: 2026-09-13

**Updated**: 2026-09-14

**Status**: Active — approved for per-leaf implementation; complete scope remains under inventory reconciliation

**Input**: User description: Create a clean-room design covering every feature of the locally installed Claude Code release, implement equivalent behavior in nox, retain Pi's visual presentation, and omit the reference product's name from developed application code.

## Clarifications

### Session 2026-09-13

- Q: If matching an existing configuration filename or command requires the reference product's name, which rule takes priority? → A: Ban the name everywhere in nox, including compatibility paths and commands; preserve 1:1 feature behavior under nox-specific names.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Work in a familiar terminal (Priority: P1)

A user starts nox in a repository, asks it to inspect or change files, reviews proposed actions, and continues the conversation in an interface that looks like Pi.

**Why this priority**: Interactive coding work and visual continuity are the product's core promise.

**Independent Test**: Complete a read, edit, and command-running task in nox while comparing the visible interface and resulting actions with the two reference products.

**Acceptance Scenarios**:

1. **Given** a repository and a new session, **When** the user asks for a code change, **Then** nox presents tool activity, applies approved edits, and reports the result with the reference assistant's observable behavior. Context discovery and prompt assembly are required by FR-004 but are a separate delivery slice, not this story's core coding loop.
2. **Given** equivalent terminal width, theme, and interaction state, **When** the user performs the same action in Pi and nox, **Then** nox's layout, colors, text treatment, and interaction feedback match Pi; any intentional exception has an approved constitution amendment.
3. **Given** a tool failure or denied action, **When** execution ends, **Then** the user sees the same decision and recovery options as in the reference assistant.
4. **Given** a new session in a repository with project instructions present, **When** the user sends the first prompt, **Then** nox loads the same context sources and prompt-assembly order as the reference (delivery slice `US1-CONTEXT-*`, not `US1-CORE-2026-09-14`).

---

### User Story 2 - Control and resume work (Priority: P1)

A user selects a model and effort, changes permission mode, starts or resumes sessions, branches a conversation, and manages foreground or background work without losing state.

**Why this priority**: Session and permission behavior affects every feature and user trust.

**Independent Test**: Exercise each session and permission transition with the same initial state in the reference and nox; compare visible output and saved state.

**Acceptance Scenarios**:

1. **Given** an existing conversation, **When** the user continues, resumes, forks, or names it, **Then** the selected history and subsequent state match the reference behavior.
2. **Given** an action requiring consent, **When** each supported permission mode is active, **Then** allow, prompt, deny, and persistence behavior match the reference.
3. **Given** a background session, **When** the user lists, attaches, reads logs, stops, restarts, or removes it, **Then** lifecycle and recovery behavior match the reference.

---

### User Story 3 - Customize and connect capabilities (Priority: P2)

A user configures project instructions, settings, skills, custom commands, agents, hooks, plugins, external tools, and integrations; nox discovers and applies them with the same precedence and lifecycle behavior.

**Why this priority**: Existing workflows depend on customization and integration compatibility.

**Independent Test**: Use a small fixture for each customization type and compare discovery, invocation, events, errors, and precedence.

**Acceptance Scenarios**:

1. **Given** user, project, local, and managed settings with overlapping values under nox-specific names, **When** a session starts, **Then** effective behavior and conflict resolution match the reference.
2. **Given** a skill, agent, hook, plugin, or external-tool fixture, **When** its trigger fires, **Then** discovery, permission checks, input, output, and failure handling match the reference.
3. **Given** a disabled or unavailable integration, **When** the user invokes it, **Then** availability and error behavior match the reference.
4. **Given** malformed configuration or unauthorized extension input, **When** the user submits it, **Then** nox rejects the input before any protected action and discloses no credential or private session data.

---

### User Story 4 - Automate and connect remote work (Priority: P2)

A user runs nox without an interactive terminal, feeds streamed input, requests structured output, uses worktrees or remote sessions, and connects supported editor, browser, or hosted services.

**Why this priority**: The reference product is also an automation and multi-surface tool.

**Independent Test**: Run every supported command and option in a fixture environment and compare protocol messages, exit behavior, side effects, and state.

**Acceptance Scenarios**:

1. **Given** a non-interactive request, **When** text, JSON, or streaming output is selected, **Then** output records, ordering, errors, and exit status match the reference.
2. **Given** a supported remote or editor integration, **When** the user connects and continues work, **Then** handoff and session state match the reference.
3. **Given** a worktree request, **When** work begins and ends, **Then** isolation, naming, and cleanup behavior match the reference.
4. **Given** a feature normally entered through a desktop, web, mobile, editor, browser, chat, or CI surface, **When** the user invokes its nox terminal or CLI control under equivalent availability conditions, **Then** each required entry action, intermediate interaction, resulting state, side effect, and failure behavior matches the observed reference contract. A workflow without an observed contract or valid nox equivalent remains unverified.

### Edge Cases

- An update changes or removes a reference behavior after the baseline was recorded.
- A feature depends on subscription tier, platform, account policy, network access, or an external service.
- A tool call is interrupted, times out, is denied, or partially changes files.
- Settings conflict across scopes or contain invalid values.
- A session is resumed after compaction, crash, update, or missing history.
- Parallel workers edit overlapping files or a background worker exits unexpectedly.
- Input includes images, large files, binary content, malformed streams, or unsupported paths.
- An external tool, plugin, hook, editor, browser, or remote session disconnects mid-operation.
- An input contains a crafted command, path, or payload intended to cross an authorization boundary or expose a secret.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The parity inventory MUST enumerate every user-visible feature, command, option, setting, shortcut, protocol, and integration available in the installed reference release and identify its availability conditions. Each inventory item MUST have an evidence source, expected behavior, nox status, and verification scenarios.
- **FR-002**: For every applicable inventory item, as defined in Scope Terminology below, nox MUST match the reference's observable inputs, defaults, outputs, errors, state transitions, permissions, persistence, and side effects. No item may be marked complete based on interface similarity alone.
- **FR-003**: nox MUST retain Pi's visual presentation across terminal views and interactions. Added controls MUST use Pi's visual language. Any intentional visual departure from Pi MUST receive a constitution amendment before implementation.
- **FR-004**: nox MUST support the reference's interactive conversation lifecycle, including context discovery, prompt handling, tool use, interruption, compaction, session naming, continuation, resumption, and forking.
- **FR-005**: nox MUST support the reference's file, search, command, web, and other built-in tool capabilities with equivalent availability, approval, execution, and result behavior.
- **FR-006**: nox MUST support all reference permission modes and rules, including scope, prompts, allow and deny lists, restricted modes, and behavior when no approver is present.
- **FR-007**: nox MUST support the reference's model, effort, fallback, context, and budget controls, including their precedence and observable failure behavior.
- **FR-008**: nox MUST support the reference's settings scopes, project instructions, memory, skills, custom commands, agents, hooks, plugins, external-tool connections, and associated discovery and precedence rules.
- **FR-009**: nox MUST support the reference's non-interactive input and output formats, structured output validation, partial streaming, event reporting, and exit behavior.
- **FR-010**: nox MUST support the reference's background agents, isolated worktrees, remote or hosted sessions, and desktop, web, mobile, editor, browser, chat, and CI workflows where available to the user. Each surface-specific leaf MUST identify its entry action, intermediate interactions, resulting state, side effects, failure behavior, availability conditions, and corresponding nox terminal or CLI control; connected-service bridges MAY deliver the behavior where needed. Every workflow remains in the inventory even when its original surface is inaccessible. A workflow whose required interactions cannot be matched by a valid nox equivalent MUST remain unverified rather than be counted as parity.
- **FR-011**: nox MUST support the behavior of all installed-reference CLI subcommands and flags that represent user-facing features, including authentication, setup, diagnostics, update, import, project state, plugin and external-tool management, and hosted review, subject to the same availability conditions. Commands and paths MUST use nox-specific names where the reference names contain its product name.
- **FR-012**: nox MUST preserve Pi behavior unrelated to a required parity change; every intentional divergence MUST identify the reference scenario requiring it.
- **FR-013**: Developed nox application code, user-facing strings, command names, and configuration filenames and paths MUST contain no mention of the reference product's name. Equivalent features MUST remain available through nox-specific names. Specification and verification artifacts MAY name the reference so parity remains auditable.
- **FR-014**: The inventory MUST be refreshed against a newly installed reference release before any claim of complete parity; changed items MUST be reverified.
- **FR-015**: nox MUST match observed credential storage and reuse, secret redaction in output and logs, permission-rule scope and persistence, and disclosure of local or session data to remote services and extensions. For each applicable leaf, normal use, denial, failure, and restart behavior MUST be compared with the reference; unobservable security behavior MUST remain unverified.
- **FR-016**: The capability inventory MUST reconcile three discovery inputs: the pinned installed reference, current official documentation, and the older restored source map. Every discovered candidate MUST map to a capability item, be identified as a duplicate, or be rejected as obsolete with dated evidence. Source-map-only candidates MUST NOT be treated as current behavior without current documentation or observation.
- **FR-017**: The complete-parity effort MUST be governed by this one specification, one plan, and one task document. All feature families and delivery increments MUST remain within those artifacts; a newly discovered capability MUST be added there rather than scoped into a separate feature specification.
- **FR-018**: nox MUST validate externally supplied commands, paths, settings, and integration payloads before protected side effects; enforce authorization for the action they request; and avoid disclosing credentials or private session data in rejection messages, output, or logs. Where the reference's observable behavior and these security guarantees differ, the inventory MUST record the discrepancy and MUST NOT count the item as parity-complete.

### Scope Terminology

- **Applicable inventory item**: A capability whose recorded availability conditions match the comparison environment.
- **Reachable leaf**: An applicable leaf that can be exercised safely using the authorized accounts, services, platform, and isolated fixtures available for the recorded snapshot.
- **Delivery slice**: An immutable, explicitly named set of leaf IDs selected for one delivery increment. Newly discovered leaves do not silently alter an existing slice; they require a new slice ID or an explicit versioned amendment.
- **Gated-unverified leaf**: A discovered leaf that cannot currently be observed under authorized conditions. It remains in scope and blocks an unqualified complete-parity claim but does not block independently reachable slices after all other applicable gates pass.

### Key Entities *(include if feature involves data)*

- **Parity inventory item**: A discrete capability with reference release, availability conditions, evidence, expected behavior, implementation state, and verification results.
- **Session**: A conversation and its identity, history, settings, mode, location, and lifecycle state.
- **Action**: A proposed or executed tool operation with permission decision, input, result, and side effects.
- **Configuration source**: A user, project, local, managed, or invocation setting with defined precedence.
- **Extension**: A skill, command, agent, hook, plugin, or external connection with discovery and lifecycle rules.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: An unqualified 100% parity claim requires every inventoried feature, including platform-, account-, policy-, and service-gated features, to have passing normal, failure, and relevant interaction scenarios against the recorded reference release. An inaccessible or unverified item prevents that claim.
- **SC-002**: 0 known behavioral discrepancies remain for items marked complete.
- **SC-003**: 100% of required Pi terminal states in a predeclared visual matrix match their approved references. The matrix MUST cover every affected workflow and its relevant normal, denial, error, and recovery states across supported terminal widths and themes. Any necessary departure is governed by an approved constitution amendment; an omitted required state prevents this criterion from passing.
- **SC-004**: 100% of documented reference command and option behaviors that are applicable inventory items under Scope Terminology are discoverable and produce equivalent outcomes through nox-specific names.
- **SC-005**: All four end-to-end journeys in User Stories 1–4 have passing matched-environment acceptance scenarios, including each story's stated error or recovery cases; a gated or unverified journey prevents a complete-parity claim.
- **SC-006**: A release audit finds 0 mentions of the reference product in developed nox application code, user-facing strings, command names, and configuration filenames and paths.
- **SC-007**: Before performance measurement, every inventory leaf MUST be marked timing-sensitive or not, with a reason. A leaf is timing-sensitive when its user-visible completion time affects an interactive response, tool result, or non-interactive command. For every timing-sensitive leaf, after warm-up and under matched workload, hardware, and network conditions, nox's p95 user-visible completion time across 30 runs is at most 110% of the reference p95. An unclassified, inaccessible, or unmeasured leaf cannot pass this criterion.
- **SC-008**: 100% of candidate capabilities found in the installed reference, current official documentation, and older restored source map have a recorded inventory mapping, duplicate rationale, or dated obsolete rationale; no unexplained candidate remains.
- **SC-009**: Across the predeclared invalid-input and unauthorized-action scenarios, 100% of protected actions are refused before their side effects and 0 synthetic credentials or private session values appear in user output, logs, or errors. An unrun scenario cannot pass this criterion.

## Assumptions

- The baseline is the locally installed reference release 2.1.270, observed on 2026-09-13. A later release requires inventory refresh before a current-parity claim.
- "All features" includes features gated by account, platform, policy, or connected services; those conditions are recorded rather than silently excluding the feature.
- "Identical" means externally observable behavior under equivalent inputs and conditions, rather than duplication of private internals or nondeterministic model wording.
- The installed reference CLI and current official user documentation are primary behavior sources. The older, unofficial [restored source map](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src) is a secondary discovery source for candidate features, edge cases, and architecture questions. It may be read remotely, but MUST NOT be cloned or copied into nox. Reference program code is not copied or adapted into nox.
- This is the only feature specification for the complete-parity effort. Delivery increments are tasks within its single plan and task document, not separate feature specifications.
- Existing configuration paths or commands containing the reference product's name do not need to work unchanged. Users access equivalent behavior through nox-specific names and paths. Specification and verification evidence may identify the reference explicitly.
- The existing Pi experience is the visual baseline. A necessary visual departure requires a constitution amendment before implementation.
