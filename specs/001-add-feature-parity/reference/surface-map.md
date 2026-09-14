# Nox Surface Mapping Draft

This map records the naming rule without asserting an implementation. Every inventory leaf still needs an explicit row before T007 closes.

| Reference family | Proposed nox-native family | Status |
|------------------|----------------------------|--------|
| CLI executable and subcommands | `nox` and corresponding nox subcommands | Proposed; unverified |
| Project and user configuration directory | `.nox/` and `~/.nox/` | Proposed; unverified |
| Project instruction file and nested rules | `NOX.md` and `.nox/rules/` | Proposed; unverified |
| Product-prefixed environment variables | `NOX_` prefix with equivalent semantics | Proposed; unverified |
| Product-neutral slash commands and options | Retain spelling where it does not contain the prohibited name | Proposed; unverified |
| Product-specific slash commands or path tokens | Nox-native spelling, mapped item by item | Pending inventory |
| Machine-readable protocol fields containing the prohibited name | Nox-native field spelling with equivalent semantics | Pending inventory |
| Desktop and web workflows | Terminal or CLI controls with connected-service bridges and matched state transitions | Pending leaf inventory and observations |
| Mobile workflows | Terminal or CLI controls for matching session and notification outcomes under equivalent service conditions | Pending leaf inventory and observations |
| Editor and browser workflows | Terminal or CLI controls with observed handoff and state synchronization | Pending leaf inventory and observations |
| Chat and CI workflows | Terminal or CLI controls and connected-service bridges with matched triggers, decisions, and side effects | Pending leaf inventory and observations |
| CLI-034 / SUR-LIMIT-002 malformed schema | `nox -p --json-schema <value>` parser preflight | Observed malformed JSON rejection matched in isolated CLI test; valid structured output unavailable and remaining variants unverified |
| CLI-246 / SUR-BG-003 print conflict | `nox --bg -p <task>` preflight | Conflict decision matched; advice differs as DISC-001 because background launch and lifecycle are unavailable |
| CLI-519 misspelled subcommand | `nox <misspelled-command>` suggests the closest nox subcommand, for example `nox udpate` → `nox update` | Nox diagnostic matches after executable-name normalization; executable naming and startup side effects remain open as DISC-002 |
| CLI-534–544 Desktop MCP import inputs | `nox mcp import-desktop --scope <scope>` with Nox-native configuration destinations | Proposed; installed reference parser and empty-config results observed, while populated import, pseudo-terminal selection, and nox surface are pending |
| CLI-069 / CLI-076 prompt file inputs | `nox --append-system-prompt-file <path>` and `nox --system-prompt-file <path>` | Nox parser, missing-file validation, and local prompt composition implemented; wire comparison and startup side effects open as DISC-003 |
| CLI-261 replacement conflict | Nox rejects `--system-prompt` with `--system-prompt-file` | Decision and full diagnostic matched in isolated offline process; startup side effects differ as DISC-003 |
| CLI-557 / CLI-558 prompt composition | Nox inline and file-backed prompt flags | Reference marker order observed with a local Messages endpoint; nox parser/loader/builder order passes offline tests, wire comparison pending |
| CLI-559 / CLI-560 missing prompt-file values | Nox rejects either file flag without a path before settings/session startup | Exit, stdout, stderr, and empty-home side effects matched in isolated offline processes |

The spec's name prohibition excludes literal compatibility paths and commands. A proposed name or delivery route does not prove the underlying feature exists or behaves the same way. Surface-specific workflows remain open until their observed contracts and nox outcomes are compared.
