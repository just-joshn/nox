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

## Discovery Candidate

- **Fields**: source kind (installed command, official documentation page, or restored source module), source identifier, observation date, candidate behavior, mapped capability ID, disposition, disposition rationale, version relevance.
- **Identity**: Source kind plus stable source identifier and candidate behavior; the same candidate may have several source records.
- **Relationship**: Maps to one or more capability items, or records a duplicate or dated obsolete rationale. Open candidates block inventory completeness.
- **Validation**: Restored-source-only candidates cannot become `specified` behavior without a current documented or observed contract. A duplicate or obsolete disposition must identify its mapped item or dated evidence.

## Scenario and Observation

- **Scenario fields**: item ID, environment fixture, initial state, action sequence, expected decisions, outputs, state and side effects, normalization rules; for security cases, synthetic sensitive values, input validation boundary, required authorization, protected side effect, and prohibited disclosures.
- **Observation fields**: scenario ID, run date, reference snapshot, raw evidence location, normalized result, nox result, comparison status, discrepancy ID, and security-gate result where applicable.
- **Identity**: Scenario ID is stable across runs; observation ID includes run and environment.
- **Validation**: Normalization rules are declared before comparison and cannot erase decisions, errors, side effects, protocol fields, event order, or sensitive-data disclosure. A security scenario passes only when authorization and validation precede protected side effects and no prohibited value appears in output, logs, or errors.

## Discrepancy

- **Fields**: item and scenario IDs, reproduction steps, expected and actual results, impact, status, resolution evidence.
- **Status transitions**: `open` → `fixing` → `reverified` → `closed`; a regression reopens it.
- **Validation**: Closing requires a passing fresh comparison, not an implementation-only assertion.

## Project Quality Audit

- **Fields**: run date, tested revision, package coverage inputs, aggregate coverage percentage, unit/integration/end-to-end results, source-size and immutable-update checks, security review findings, and evidence links.
- **Identity**: Revision plus run date and test environment.
- **Validation**: An application completion claim requires a reproducible aggregate coverage result of at least 80%, passing relevant test levels, and no unresolved critical security finding. Missing package data cannot be treated as covered.

## Runtime Entities

- **Session**: Identity, conversation history, current turn, selected model and effort, permissions, working directories, persistence and background state. Transitions include create, active, paused, compacted, resumed, forked, stopped, and removed where applicable.
- **Action**: Proposed tool invocation, permission decision, execution state, output, side effects, and cancellation or recovery state.
- **Configuration source**: Scope, location, precedence, settings values, and validation errors. Names and paths in nox remain nox-native.
- **Extension**: Kind, source, scope, trigger or invocation rule, permissions, lifecycle state, and result.

The exact runtime field and transition contracts are filled from item-level reference observations before implementation of each task.
