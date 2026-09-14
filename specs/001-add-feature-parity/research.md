# Research: Complete Coding Assistant Parity

**Baseline observation**: Local `claude --version` returned `2.1.270 (Claude Code)` on 2026-09-13. The local CLI is an observable reference, not an implementation source. Official documentation is a discovery source and can change independently of the installed binary.

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

## Remaining evidence work

The exhaustive leaf inventory, item-level observations, account-gated observations, and performance baselines are not complete. These are research tasks, not unresolved product choices. `plan.md` keeps them as explicit gates; no implementation or parity claim follows from this document alone.
