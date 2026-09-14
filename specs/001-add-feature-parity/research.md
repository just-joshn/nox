# Research: Complete Coding Assistant Parity

**Baseline observation**: Local `claude --version` returned `2.1.270 (Claude Code)` on 2026-09-13 and again on 2026-09-14. The local CLI is an observable reference, not an implementation source. Official documentation can change independently of the installed binary.

## Decision: Reconcile three sources without copying implementation

- **Decision**: Use the installed release for reachable current behavior, the current official documentation index for documented capabilities and availability, and the older restored source map for candidate features, edge cases, and design questions. Read the source map remotely only; do not clone it, transplant code, or infer current behavior solely from it. Record every candidate as mapped, duplicate, obsolete with dated evidence, or open.
- **Rationale**: The official index now lists capabilities beyond the earlier family register, including computer use, goals, cross-session messaging, dynamic workflows, plugin evaluation, and deep review. A three-way reconciliation catches omissions while avoiding false parity claims from older code.
- **Alternatives considered**: Copying the restored implementation violates the clean-room requirement. Ignoring it loses useful discovery context. Treating its older structure as the current contract risks incorrect behavior.
- **Evidence**: [Current official documentation index](https://code.claude.com/docs/llms.txt), [restored source tree](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src), local version output.

## Decision: Pin the reference and track availability

- **Decision**: Record version, observation date, platform, account or policy gate, and evidence for each feature. Treat installed behavior as the baseline for reachable features. Mark documented but inaccessible features `gated-unverified` until observed in a suitable environment.
- **Rationale**: A live product and live docs are moving targets; a name or help entry does not establish behavior. An unverified feature cannot support a 100% parity claim.
- **Alternatives considered**: Using CLI help alone misses documented flags and interactive features. Using live docs alone may mix releases. Excluding gated features contradicts the project constitution.
- **Evidence**: [CLI reference](https://code.claude.com/docs/en/cli-usage), [documentation index](https://code.claude.com/docs/llms.txt), local `claude --help` and `claude --version`.

## Decision: Separate behavior from product-specific names

- **Decision**: Expose equivalent semantics through nox-native commands, filenames, paths, and user-facing strings. Inventory each reference surface and its nox equivalent. Do not claim byte-for-byte compatibility with existing reference-product configuration files or commands.
- **Rationale**: The user's naming prohibition covers compatibility paths while still requiring functional parity. A surface map makes the deliberate naming difference auditable.
- **Alternatives considered**: Literal reference names violate the naming rule. Silent aliases obscure whether the rule is met.
- **Evidence**: [spec clarification](spec.md#clarifications).

## Decision: Route surface-specific workflows through nox

- **Decision**: Deliver surface-specific workflows through nox terminal or CLI controls and connected-service bridges when needed. Inventory the desktop, web, mobile, editor, browser, chat, and CI behavior separately; verify outcomes under equivalent availability conditions. A terminal control is a delivery route, not evidence that the feature works.
- **Rationale**: Pi's terminal presentation is the required visual baseline, while functional parity still covers workflows whose reference entry point is elsewhere.
- **Alternatives considered**: Omitting those workflows breaks feature coverage. Recreating each native client is not required for an equivalent terminal-accessible outcome.

## Decision: Extend existing package boundaries

- **Decision**: Use the repository's `packages/coding-agent` CLI, session, settings, resource, interactive, print, and RPC layers; `packages/agent` for loop/session behavior; `packages/ai` for model transports; and `packages/tui` for visuals. Create new modules only for concrete inventory items.
- **Rationale**: These boundaries already own the corresponding behavior and preserve Pi visual continuity. A parallel application would increase divergence and duplicate state.
- **Alternatives considered**: A separate frontend or a reference CLI wrapper cannot satisfy independent nox behavior and would undermine Pi presentation.
- **Evidence**: Local package layout, `package.json`, and `packages/coding-agent/package.json`.

## Decision: Use an observable comparison contract

- **Decision**: Test each feature with matched initial state and input. Compare decisions, event order, persisted state, files, exit status, and normalized output. Normalize only nondeterministic data such as timestamps, IDs, timing, and model wording when the exact text is not a promised contract. Keep unnormalized traces as evidence.
- **Rationale**: Functional identity is determined by observable effects; over-normalization could hide discrepancies.
- **Alternatives considered**: Unit tests alone cannot establish parity; screenshots alone cannot establish behavior.
- **Evidence**: [How the reference works](https://code.claude.com/docs/en/how-claude-code-works), [CLI reference](https://code.claude.com/docs/en/cli-usage).

## Decision: Inventory each domain before implementation claims

- **Decision**: Cover CLI flags/subcommands, bundled interactive commands and shortcuts, built-in tools, permission and settings behavior, instruction and memory loading, skills, agents and teams, hooks, external connections, plugins, background sessions, worktrees, non-interactive streams, remote and editor/browser surfaces, diagnostics, auth, and update flows. Split each domain into leaf capabilities with scenarios.
- **Rationale**: The installed help surface is broad, and official docs explicitly contain more than help. Domain labels alone are not a complete inventory.
- **Alternatives considered**: A single checklist item per domain would permit missing options and edge cases.
- **Evidence**: [Commands](https://code.claude.com/docs/en/commands), [interactive mode](https://code.claude.com/docs/en/interactive-mode), [tools](https://code.claude.com/docs/en/tools-reference), [settings](https://code.claude.com/docs/en/configuration), [permissions](https://code.claude.com/docs/en/permissions), [memory](https://code.claude.com/docs/en/memory), [skills](https://code.claude.com/docs/en/skills), [subagents](https://code.claude.com/docs/en/subagents), [agent teams](https://code.claude.com/docs/en/agent-teams), [hooks](https://code.claude.com/docs/en/hooks), [MCP](https://code.claude.com/docs/en/mcp), [plugins](https://code.claude.com/docs/en/plugins-reference).

## Decision: Treat security guarantees as acceptance boundaries

- **Decision**: Record validation, authorization, protected side effects, and secret disclosure for each externally influenced leaf. Use synthetic credentials in isolated fixtures. If an observed reference behavior conflicts with the constitution's security guarantees, implement the secure behavior, record the discrepancy, and leave parity status open rather than claiming equivalence.
- **Rationale**: FR-018 and SC-009 make rejection before side effects and non-disclosure measurable. A parity label cannot conceal a security violation.
- **Alternatives considered**: Reproducing an unsafe reference outcome would violate the constitution. Calling a secure difference equivalent would make the parity audit false.
- **Evidence**: [spec.md](spec.md), [constitution](../../.specify/memory/constitution.md).

## Decision: Make test-first work and coverage explicit gates

- **Decision**: For each application leaf, state its observed contract and simplest viable change, run a focused failing behavior test, implement, then run relevant unit, integration, and end-to-end checks. Add an offline aggregate coverage report across every production workspace package and session backend shipped or imported by nox before enforcing the project-wide 80% gate; count each owned source file once and document exclusions. The repository currently exposes package tests and one agent harness coverage command, not a project-wide coverage command. Keep changes limited to the owning code path with immutable replacement state.
- **Rationale**: The amended constitution makes these quality requirements mandatory. Recording them as gates prevents the plan from treating passing parity traces alone as sufficient completion evidence.
- **Alternatives considered**: Testing after implementation could mirror the implementation rather than constrain it. Broad refactoring would make a parity discrepancy harder to attribute.
- **Evidence**: [constitution](../../.specify/memory/constitution.md), [spec.md](spec.md).

## Remaining evidence work

The exhaustive leaf inventory, item-level observations, account-gated observations, and performance baselines are not complete. The aggregate coverage command and baseline are also missing; task generation must add that work before the 80% gate can pass. These are evidence and tooling tasks, not unresolved product choices. `plan.md` keeps them as explicit gates; no implementation or parity claim follows from this document alone.
