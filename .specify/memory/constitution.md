# nox Constitution

## Core Principles

### I. Pi Visual Fidelity

nox MUST retain Pi's visual presentation. Its terminal layout, typography, colors,
spacing, prompts, status displays, menus, and interaction feedback MUST match the
corresponding Pi experience. A Claude Code feature MUST be integrated into this
presentation without introducing Claude Code visual styling. Any intentional visual
departure requires a constitution amendment before implementation.

### II. Complete Claude Code Feature Coverage

nox MUST include every user-facing Claude Code feature available in the current
reference release. Feature planning MUST maintain an explicit inventory of Claude
Code capabilities and track implementation and verification status for each one.
An omitted capability is incomplete work, not an acceptable permanent difference.
This inventory is necessary because the reference product changes over time.

### III. Claude Code Behavioral Parity

Each Claude Code feature in nox MUST have the same externally observable behavior as
the corresponding feature in the current Claude Code reference: inputs, defaults,
state transitions, outputs, errors, side effects, and interactions with other
features. A similar name or interface is insufficient. When behavior is uncertain,
implementation MUST be based on observed reference behavior and documented evidence,
not assumptions about internal implementation.

### IV. Parity Verification

Each feature specification MUST identify the Claude Code reference version or
observation date and concrete parity scenarios, including normal use, edge cases,
and relevant feature interactions. Changes MUST be checked against those scenarios
and against Pi visual references before being called complete. A discrepancy MUST
be recorded and resolved; a feature MUST NOT be labeled parity-complete while a
known discrepancy remains.

### V. Preserve the Pi Foundation

nox MUST remain a fork of Pi and retain Pi's existing functionality unless a
specific behavior must change to achieve Claude Code parity. Such changes MUST
identify the affected Pi behavior and the parity requirement that requires them.
This rule prevents feature integration from silently degrading the base product.

## Reference and Compatibility Rules

"Current Claude Code" means the latest release available when a feature is
specified or reverified. The feature inventory and parity evidence MUST record the
reference release or observation date so a moving target can be assessed. When
Claude Code changes, nox MUST update its inventory, specifications, and behavior to
restore parity. Observable behavior is the acceptance standard; nox does not need
to reproduce Claude Code's private implementation.

## Development and Review Gates

Feature work MUST state the affected inventory entries, the Pi visual reference,
and the Claude Code behavior being matched. Review MUST verify feature coverage,
behavioral parity, visual fidelity, and preservation of unrelated Pi functionality.
Known gaps MUST be tracked as unfinished work with reproducible cases. A release
MUST NOT claim complete Claude Code parity unless every inventoried feature has
passed its parity checks against the recorded reference.

## Governance

This constitution governs project specifications, plans, implementation, and
reviews. Amendments MUST be documented in the constitution, explain their effect on
existing work, and receive project maintainer approval. Constitution versions use
semantic versioning: MAJOR for incompatible principle changes or removals, MINOR
for new principles or materially expanded guidance, and PATCH for clarifications
without changed obligations. Each amendment MUST update the version and amendment
date. Reviewers MUST check changes against these principles and require correction
or an approved amendment for any conflict. AGENTS.md supplies operational
development instructions where they do not conflict with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-09-13 | **Last Amended**: 2026-09-13
