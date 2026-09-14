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

The spec's name prohibition excludes literal compatibility paths and commands. A proposed name does not prove the underlying feature exists or behaves the same way.
