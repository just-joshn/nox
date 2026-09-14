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

### VI. Evidence Before Changes

Before implementation, contributors MUST state assumptions, identify material
ambiguity, and define a verifiable result. Unclear requirements MUST be clarified
before dependent changes. When several designs can meet the requirement, the
chosen design MUST explain why the simpler viable option is insufficient. This
prevents guessed behavior and unnecessary complexity.

### VII. Small and Immutable Changes

Changes MUST be limited to the requested behavior and its direct dependencies.
Contributors MUST preserve unrelated code and match the existing local style.
New application logic MUST create replacement state rather than mutate existing
objects. Single-use abstractions and speculative configuration MUST be omitted.
Functions and files MUST remain focused; functions MUST stay below 50 lines and
code files below 800 lines. Contributors MUST check algorithmic cost and avoid a
slower approach when an equally clear, more efficient one is available. These
limits keep parity changes reviewable and reduce collateral regressions.

### VIII. Security by Default

Application inputs MUST be validated before use. Code that handles credentials,
authorization, user content, or external services MUST prevent the applicable
injection, cross-site scripting, request-forgery, data-leak, and abuse cases.
Secrets MUST come from a protected runtime source and MUST NOT be hardcoded.
Errors MUST be handled and reported without disclosing sensitive data. A critical
security finding MUST stop the affected work until it is fixed, credentials are
rotated if exposed, and similar paths across the codebase are reviewed.

### IX. Test-First Completion

For application behavior changes, contributors MUST write a failing behavior test
before implementation, make it pass, then refactor while keeping it passing.
Relevant unit, integration, and end-to-end behavior MUST be tested, including
invalid, empty, boundary, and failure inputs. Project test coverage MUST reach at
least 80% before application work is called complete. Tests MUST be isolated and
must not spend paid provider tokens on routine checks. The rationale is to make
parity claims reproducible rather than inferred from code structure.

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

Feature implementation MUST define a short plan with explicit verification steps.
It MUST use the `planner`, `tdd-guide`, and `code-reviewer` roles when available,
and the `security-reviewer` role for a critical security finding. Each change
MUST keep functions readable, avoid deep nesting, remove only unused code
introduced by that change, handle errors, and leave no production `console.log`
calls. Before a commit, the contributor MUST inspect the diff for secrets,
input validation, authorization, applicable web or database defenses, data leaks,
and relevant rate limits. The commit MUST include only intended changes and use a
conventional type and concise description. A push requires separate authorization.

## Governance

This constitution governs project specifications, plans, implementation, and
reviews. Amendments MUST be documented in the constitution, explain their effect on
existing work, and receive project maintainer approval. The user's explicit
instructions govern task scope and authorization; an amendment MUST NOT silently
override them. Constitution versions use semantic versioning: MAJOR for
incompatible principle changes or removals, MINOR
for new principles or materially expanded guidance, and PATCH for clarifications
without changed obligations. Each amendment MUST update the version and amendment
date. Reviewers MUST check changes against these principles and require correction
or an approved amendment for any conflict. AGENTS.md supplies operational
development instructions where they do not conflict with this constitution.

**Version**: 1.1.0 | **Ratified**: 2026-09-13 | **Last Amended**: 2026-09-14
