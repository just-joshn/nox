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

The spec's name prohibition excludes literal compatibility paths and commands. A proposed name or delivery route does not prove the underlying feature exists or behaves the same way. Surface-specific workflows remain open until their observed contracts and nox outcomes are compared.
