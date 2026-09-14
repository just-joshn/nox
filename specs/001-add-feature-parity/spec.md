# Feature Specification: Complete Coding Assistant Parity

**Feature Branch**: `none (current branch)`

**Created**: 2026-09-13

**Status**: Draft

**Input**: User description: Create a clean-room design covering every feature of the locally installed Claude Code release, implement equivalent behavior in nox, retain Pi's visual presentation, and omit the reference product's name from developed application code.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Work in a familiar terminal (Priority: P1)

A user starts nox in a repository, asks it to inspect or change files, reviews proposed actions, and continues the conversation in an interface that looks like Pi.

**Why this priority**: Interactive coding work and visual continuity are the product's core promise.

**Independent Test**: Complete a read, edit, and command-running task in nox while comparing the visible interface and resulting actions with the two reference products.

**Acceptance Scenarios**:

1. **Given** a repository and a new session, **When** the user asks for a code change, **Then** nox discovers context, presents tool activity, applies approved edits, and reports the result with the reference assistant's observable behavior.
2. **Given** equivalent terminal width, theme, and interaction state, **When** the user performs the same action in Pi and nox, **Then** nox's layout, colors, text treatment, and interaction feedback match Pi except for controls required by added capabilities.
3. **Given** a tool failure or denied action, **When** execution ends, **Then** the user sees the same decision and recovery options as in the reference assistant.

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

1. **Given** user, project, local, and managed settings with overlapping values, **When** a session starts, **Then** effective behavior and conflict resolution match the reference.
2. **Given** a skill, agent, hook, plugin, or external-tool fixture, **When** its trigger fires, **Then** discovery, permission checks, input, output, and failure handling match the reference.
3. **Given** a disabled or unavailable integration, **When** the user invokes it, **Then** availability and error behavior match the reference.

---

### User Story 4 - Automate and connect remote work (Priority: P2)

A user runs nox without an interactive terminal, feeds streamed input, requests structured output, uses worktrees or remote sessions, and connects supported editor, browser, or hosted services.

**Why this priority**: The reference product is also an automation and multi-surface tool.

**Independent Test**: Run every supported command and option in a fixture environment and compare protocol messages, exit behavior, side effects, and state.

**Acceptance Scenarios**:

1. **Given** a non-interactive request, **When** text, JSON, or streaming output is selected, **Then** output records, ordering, errors, and exit status match the reference.
2. **Given** a supported remote or editor integration, **When** the user connects and continues work, **Then** handoff and session state match the reference.
3. **Given** a worktree request, **When** work begins and ends, **Then** isolation, naming, and cleanup behavior match the reference.

### Edge Cases

- An update changes or removes a reference behavior after the baseline was recorded.
- A feature depends on subscription tier, platform, account policy, network access, or an external service.
- A tool call is interrupted, times out, is denied, or partially changes files.
- Settings conflict across scopes or contain invalid values.
- A session is resumed after compaction, crash, update, or missing history.
- Parallel workers edit overlapping files or a background worker exits unexpectedly.
- Input includes images, large files, binary content, malformed streams, or unsupported paths.
- An external tool, plugin, hook, editor, browser, or remote session disconnects mid-operation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The parity inventory MUST enumerate every user-visible feature, command, option, setting, shortcut, protocol, and integration available in the installed reference release and identify its availability conditions. Each inventory item MUST have an evidence source, expected behavior, nox status, and verification scenarios.
- **FR-002**: For every applicable inventory item, nox MUST match the reference's observable inputs, defaults, outputs, errors, state transitions, permissions, persistence, and side effects. No item may be marked complete based on interface similarity alone.
- **FR-003**: nox MUST retain Pi's visual presentation across terminal views and interactions. Added controls MUST use Pi's visual language and alter existing views only where necessary to expose the added behavior.
- **FR-004**: nox MUST support the reference's interactive conversation lifecycle, including context discovery, prompt handling, tool use, interruption, compaction, session naming, continuation, resumption, and forking.
- **FR-005**: nox MUST support the reference's file, search, command, web, and other built-in tool capabilities with equivalent availability, approval, execution, and result behavior.
- **FR-006**: nox MUST support all reference permission modes and rules, including scope, prompts, allow and deny lists, restricted modes, and behavior when no approver is present.
- **FR-007**: nox MUST support the reference's model, effort, fallback, context, and budget controls, including their precedence and observable failure behavior.
- **FR-008**: nox MUST support the reference's settings scopes, project instructions, memory, skills, custom commands, agents, hooks, plugins, external-tool connections, and associated discovery and precedence rules.
- **FR-009**: nox MUST support the reference's non-interactive input and output formats, structured output validation, partial streaming, event reporting, and exit behavior.
- **FR-010**: nox MUST support the reference's background agents, isolated worktrees, remote or hosted sessions, and supported editor and browser handoffs where available to the user.
- **FR-011**: nox MUST support all installed-reference CLI subcommands and flags that represent user-facing behavior, including authentication, setup, diagnostics, update, import, project state, plugin and external-tool management, and hosted review, subject to the same availability conditions.
- **FR-012**: nox MUST preserve Pi behavior unrelated to a required parity change; every intentional divergence MUST identify the reference scenario requiring it.
- **FR-013**: Application code and its user-facing strings MUST contain no mention of the reference product's name. Specification and verification artifacts MAY name the reference so parity remains auditable.
- **FR-014**: The inventory MUST be refreshed against a newly installed reference release before any claim of complete parity; changed items MUST be reverified.

### Key Entities *(include if feature involves data)*

- **Parity inventory item**: A discrete capability with reference release, availability conditions, evidence, expected behavior, implementation state, and verification results.
- **Session**: A conversation and its identity, history, settings, mode, location, and lifecycle state.
- **Action**: A proposed or executed tool operation with permission decision, input, result, and side effects.
- **Configuration source**: A user, project, local, managed, or invocation setting with defined precedence.
- **Extension**: A skill, command, agent, hook, plugin, or external connection with discovery and lifecycle rules.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of inventory items applicable to the tested account and platform have passing normal, failure, and relevant interaction scenarios against the recorded reference release.
- **SC-002**: 0 known behavioral discrepancies remain for items marked complete.
- **SC-003**: 100% of compared Pi terminal states match their approved visual reference except documented controls needed for added capabilities.
- **SC-004**: 100% of documented reference commands and options applicable to the tested environment are discoverable and produce equivalent outcomes in nox.
- **SC-005**: In a representative task study, 100% of users who can complete each task in the reference can complete it in nox with the same permissions and available services.
- **SC-006**: A release audit finds 0 mentions of the reference product in developed application code or user-facing strings.

## Assumptions

- The baseline is the locally installed reference release 2.1.270, observed on 2026-09-13. A later release requires inventory refresh before a current-parity claim.
- "All features" includes features gated by account, platform, policy, or connected services; those conditions are recorded rather than silently excluding the feature.
- "Identical" means externally observable behavior under equivalent inputs and conditions, rather than duplication of private internals or nondeterministic model wording.
- The reference CLI and official user documentation are evidence sources. Reference program code is not copied or adapted into nox.
- The ban on the reference product's name applies to developed application code and user-facing strings; specification and test evidence may identify the source explicitly.
- The existing Pi experience is the visual baseline; feature behavior takes precedence only when the new capability cannot be presented without an additional control.
