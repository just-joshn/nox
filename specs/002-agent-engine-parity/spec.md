# Feature Specification: Agent Engine Parity

**Feature Branch**: `main`
**Created**: 2026-09-14
**Status**: Draft
**Input**: Deliver the agent engine as one slice of complete feature parity. Preserve Pi visuals. Use the older restored source tree for discovery, and the current installed reference for behavior. Keep all other feature families in the umbrella plan.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete a coding request (Priority: P1)

A user gives nox a coding task. It gathers context, chooses and uses tools, handles results, and returns the same observable outcome as the pinned reference in the same conditions. The conversation retains Pi's visual language.

**Why this priority**: The agent turn is the engine on which other features depend.

**Independent Test**: Run a matched isolated task requiring reading, searching, editing, and a command; compare interactions, files, terminal output, and final result.

**Acceptance Scenarios**:

1. **Given** the same repository, task, settings, and model availability, **when** each application completes a multistep request, **then** nox takes equivalent user-visible actions, produces equivalent effects, and reports the same result or limitation.
2. **Given** an ambiguous request, **when** the reference pauses for user input, **then** nox pauses at the equivalent decision and resumes according to the answer.

---

### User Story 2 - Control consequential actions (Priority: P2)

A user can see and decide the same permission and trust requests during an agent turn. Denied, allowed, and interrupted actions produce equivalent effects and recoveries within Pi's terminal presentation.

**Why this priority**: Correct action execution depends on the user's control.

**Independent Test**: Compare matched allowed, denied, policy-blocked, and interrupted actions in isolated fixtures.

**Acceptance Scenarios**:

1. **Given** an action requiring a decision, **when** the user allows or denies it, **then** nox applies the same decision scope and observable result.
2. **Given** a running action, **when** the user interrupts it, **then** nox follows the corresponding reference transition and reports any partial effect.

---

### User Story 3 - Continue a long or failed turn (Priority: P3)

A user can continue after context limits, tool errors, transport failures, or a restarted session. Nox preserves the same relevant state and recovery choices.

**Why this priority**: Happy-path parity alone is incomplete.

**Independent Test**: Compare context-limit, retryable error, non-retryable error, and continuation traces.

**Acceptance Scenarios**:

1. **Given** a long conversation near its context limit, **when** the next turn runs, **then** nox retains the same user-relevant facts and offers equivalent continuation behavior.
2. **Given** a tool or model failure, **when** the reference retries, stops, or requests input, **then** nox makes the same observable transition under matched conditions.

---

### Edge Cases

- Empty or malformed input; missing files; oversized output; binary and unusual text files.
- Conflicting instruction and permission scopes; permission revoked during a turn.
- Multiple tool results near interruption; partial writes; commands that outlive the UI turn.
- Model unavailable or rate limited; context exhausted during a tool cycle.
- Continuation after process exit, repository changes, or configuration changes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The slice MUST inventory each current-reference agent-turn behavior as an independently observable leaf: input and context assembly, model and effort choice, tool selection and execution, user decisions, continuation, errors, and completion. Each leaf MUST record availability, acceptance cases, and evidence. Unobserved leaves remain open.
- **FR-002**: For every reachable leaf, nox MUST match the reference's user-visible interaction sequence, result, side effects, and failure behavior under matched conditions, including intermediate decisions.
- **FR-003**: Nox MUST support equivalent built-in actions needed in an ordinary coding turn, including file inspection and modification, repository search, command execution, and user questions, with equivalent inputs, outputs, limits, and errors.
- **FR-004**: Nox MUST apply equivalent instruction and context precedence, conversation state, model choice, effort controls, and fallback behavior for each inventoried engine case.
- **FR-005**: Nox MUST apply equivalent trust and permission decisions, persistence scope, denial behavior, cancellation, and partial-effect reporting.
- **FR-006**: Nox MUST preserve equivalent state across long turns, context reduction, retries, interruption, restart, and session continuation.
- **FR-007**: Every added engine state MUST retain Pi's layout, typography, controls, and interaction conventions unless a functional necessity is approved under the project constitution.
- **FR-008**: Developed nox application code, strings, commands, and configuration paths MUST contain no reference-product name. Equivalent functions MUST use nox-native naming.
- **FR-009**: The older restored source tree MAY identify candidate behaviors and edge cases, but MUST NOT be cloned into the project or copied into implementation. Current behavior MUST be established through the installed current reference and contemporaneous documentation or observation.
- **FR-010**: Leaves requiring unavailable account access, paid calls, platform services, or policy controls MUST remain gated and unverified; they MUST prevent an unqualified complete-parity claim.
- **FR-011**: The umbrella plan MUST retain all other feature families and require each to reach leaf-level inventory, implementation, and parity verification.

### Key Entities

- **Engine leaf**: One independently observable capability with reference version, availability, inputs, interactions, outcomes, and verification status.
- **Turn**: A request and the agent decisions, actions, events, and final or interrupted state that follow.
- **Decision**: A user or policy allowance, denial, or question that changes an action's scope.
- **Session**: Persisted conversation and working context from which later turns continue.
- **Evidence record**: A versioned observation and matched nox result, including discrepancies and gated conditions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of discovered current-reference engine leaves have a named availability state, acceptance cases, and evidence source before this slice is declared complete.
- **SC-002**: 100% of reachable engine leaves pass applicable normal, denial/error, interruption/recovery, and persistence cases; zero known engine discrepancies remain.
- **SC-003**: 100% of terminal states introduced by this slice pass the predeclared Pi visual matrix across affected supported widths and themes.
- **SC-004**: In 30 matched runs of each timing-sensitive representative workflow after warm-up, nox's user-visible p95 completion time is at most 10% above the reference, with environmental variance recorded.
- **SC-005**: Zero occurrences of the prohibited product name appear in developed nox application code, strings, commands, or configuration paths introduced by this slice.

## Assumptions

- The [umbrella specification](../001-add-feature-parity/spec.md) remains the complete product scope; this document specifies only the agent engine delivery slice.
- The pinned installed reference establishes current behavior. The linked restored source map is an older unofficial reconstruction and provides discovery evidence only.
- Account, subscription, policy, and service access may limit observation. Such limits remain unresolved coverage, never inferred passing results.
- Equivalent function uses nox-native names even where that prevents drop-in compatibility with reference-named configuration paths, as the user explicitly required.
