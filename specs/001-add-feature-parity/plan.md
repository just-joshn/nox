# Implementation Plan: Complete Coding Assistant Parity

**Branch**: `main` | **Date**: 2026-09-13 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-add-feature-parity/spec.md`

## Summary

Extend the Pi-based nox application until every observable feature of the pinned reference release has equivalent behavior under nox-native names, while retaining Pi's terminal presentation. The work begins with an evidence-backed inventory and comparison harness. Each capability then receives a behavioral contract, implementation slice, and parity verification. The current documents define the process and architecture; they do not claim that the exhaustive inventory or implementation is complete.

## Technical Context

**Language/Version**: TypeScript 5.9.3, Node.js >=22.19.0; existing Bun binary path where supported

**Primary Dependencies**: Existing `@earendil-works/pi-*` workspace packages, `undici`, `yaml`, `typebox`, `vitest`; new dependencies require a reviewed need and pinned versions

**Storage**: Existing session JSONL and settings files; new persisted feature state uses nox-named files and paths

**Testing**: Existing unit tests, focused `node:test`/Vitest tests, `./test.sh` for non-e2e coverage, and isolated black-box comparison fixtures; `npm run check` after code changes

**Target Platform**: Existing Pi-supported terminal platforms; platform, account, policy, and service-gated reference features remain inventory items with explicit availability conditions

**Project Type**: Monorepo terminal coding agent with CLI, interactive TUI, RPC, model transport, and extensibility packages

**Performance Goals**: For each timing-sensitive leaf, measure 30 runs in matched local conditions after warm-up and require nox's p95 user-visible completion time to be no more than 10% above the reference p95. Record workload, hardware, network state, sample count, and any service-imposed variance; do not claim a measured result for inaccessible features.

**Constraints**: Preserve Pi visuals and unrelated behavior; no reference-product name in developed nox code, strings, commands, or configuration paths; no copied reference implementation; no parity claim for unobserved or failing features

**Scale/Scope**: All user-visible features of locally installed reference 2.1.270 plus documented gated surfaces, subject to version refresh before a current-release claim. The count is unknown until the inventory is completed.

## Constitution Check

*GATE: Passes for the design approach. Re-check each implementation slice and the complete inventory before a parity claim.*

| Principle | Design gate | Current result |
|-----------|-------------|----------------|
| Pi visual fidelity | Use existing TUI components and compare Pi reference states; obtain a constitution amendment before any intentional visual departure | Pass as a plan; no implementation verified |
| Complete feature coverage | Inventory all CLI, interactive, settings, extension, and gated surfaces before declaring coverage | Pending evidence; first execution gate |
| Behavioral parity | Define observable state, output, error, side-effect, and interaction cases per item | Pass as a method; no item verified |
| Parity verification | Pin release and retain evidence, scenarios, and discrepancy status | Pass as a method; evidence incomplete |
| Preserve Pi foundation | Map each change to an inventory item and run Pi regression checks | Pass as a method; no change verified |

No constitutional exception is proposed. The missing inventory is unfinished work, not a waived requirement. Phase 1 design may describe contracts, but implementation readiness and release parity remain blocked until the inventory and item-level scenarios exist.

## Project Structure

### Documentation (this feature)

```text
specs/001-add-feature-parity/
├── spec.md
├── checklists/requirements.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── inventory.md
│   ├── observable-behavior.md
│   └── surface-map.md
└── tasks.md                 # Produced by speckit-tasks
```

### Source Code (repository root)

```text
packages/ai/src/                # Model transports, messages, provider selection
packages/agent/src/             # Agent loop and session behavior
packages/tui/src/               # Pi terminal primitives and visual baseline
packages/coding-agent/src/
├── cli/                        # Arguments, commands, startup, auth
├── core/                       # Session, settings, resources, skills, tools
├── modes/interactive/          # TUI flows and components
├── modes/print-mode.ts          # Non-interactive output
├── modes/rpc/                   # External control protocol
└── extensions/                  # Existing extensibility foundation
packages/coding-agent/test/     # Focused behavior and regression checks
```

**Structure Decision**: Extend the existing package boundaries. Add domain modules only when an inventory item needs them; use existing TUI primitives rather than a second presentation system. Keep comparison fixtures and reference evidence in feature artifacts or dedicated test fixtures, not in developed application code.

## Complexity Tracking

No constitutional violation or exception is planned.

## Post-Design Constitution Check

The data model and contracts require a pinned source, leaf inventory, evidence, nox-native surfaces,
behavioral comparisons, and Pi visual checks. Any intentional visual departure requires a constitution
amendment before implementation. These rules preserve all five principles as design constraints.
Coverage and parity remain unverified; the inventory and reference-evidence gates below must pass before
implementation slices can be called complete or a full-parity release can be claimed.

## Delivery Sequence and Gates

1. **Inventory gate**: Enumerate the installed release with CLI output, official documentation, interactive inspection, and safe probes. Record each item and gated condition in the inventory contract. Split broad categories into independently testable leaf items. Reconcile the official documentation index and command list against the inventory; open gaps for every unmatched entry.
2. **Reference-evidence gate**: For each leaf item, capture normal, denial/error, persistence, and relevant interaction traces in isolated fixtures. Mark inaccessible features `gated-unverified`; do not infer their behavior from names alone. Acquire access or a valid external observation before claiming parity.
3. **Architecture slices**: Implement in dependency order: settings and naming; permissions and tools; session lifecycle; interactive controls; non-interactive protocol; skills/agents/hooks/external connections/plugins; background/worktree/remote integrations; administrative command families. Preserve each Pi visual path. Obtain a constitution amendment before any intentional visual departure.
4. **Verification gate**: Compare normalized observable results for each leaf item, including side effects and failure behavior. Run focused regression tests and Pi visual comparisons. Close discrepancies only with evidence.
5. **Release gate**: Refresh the reference version, inventory, and affected traces. Require every inventoried item to pass and zero known discrepancies before an unqualified complete-parity claim. Report gated-unverified items separately; each prevents that claim.
