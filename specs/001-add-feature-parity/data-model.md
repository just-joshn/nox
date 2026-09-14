# Data Model: Parity Work

This model describes planning and verification records, not a mandated storage implementation.

## Reference Snapshot

- **Fields**: product, version, observation date, platform, account or policy tier, source links, local command output references.
- **Identity**: version plus environment profile and observation date.
- **Relationship**: One snapshot has many capability items and observations.
- **Validation**: A snapshot cannot be labeled current without a fresh version check.

## Capability Item

- **Fields**: stable item ID, domain, reference surface, nox surface, availability condition, parent item, expected behavior, evidence links, implementation location, status.
- **Identity**: Stable item ID; a distinct input, option, state transition, or gated variant gets a distinct leaf item when it can fail independently.
- **Relationship**: Belongs to a reference snapshot; has many scenarios and observations; may depend on other items.
- **Status transitions**: `discovered` → `specified` → `implemented` → `verified`. A failed comparison returns to `discrepant`; inaccessible behavior is `gated-unverified`. A reference change returns affected items to `specified` or `discrepant`.
- **Validation**: `verified` requires an accessible reference observation and passing normal, failure, and relevant interaction scenarios. Domain headings cannot be verified in place of leaf items.

## Scenario and Observation

- **Scenario fields**: item ID, environment fixture, initial state, action sequence, expected decisions, outputs, state and side effects, normalization rules.
- **Observation fields**: scenario ID, run date, reference snapshot, raw evidence location, normalized result, nox result, comparison status, discrepancy ID.
- **Identity**: Scenario ID is stable across runs; observation ID includes run and environment.
- **Validation**: Normalization rules are declared before comparison and cannot erase decisions, errors, side effects, protocol fields, or event order.

## Discrepancy

- **Fields**: item and scenario IDs, reproduction steps, expected and actual results, impact, status, resolution evidence.
- **Status transitions**: `open` → `fixing` → `reverified` → `closed`; a regression reopens it.
- **Validation**: Closing requires a passing fresh comparison, not an implementation-only assertion.

## Runtime Entities

- **Session**: Identity, conversation history, current turn, selected model and effort, permissions, working directories, persistence and background state. Transitions include create, active, paused, compacted, resumed, forked, stopped, and removed where applicable.
- **Action**: Proposed tool invocation, permission decision, execution state, output, side effects, and cancellation or recovery state.
- **Configuration source**: Scope, location, precedence, settings values, and validation errors. Names and paths in nox remain nox-native.
- **Extension**: Kind, source, scope, trigger or invocation rule, permissions, lifecycle state, and result.

The exact runtime field and transition contracts are filled from item-level reference observations before implementation of each slice.
