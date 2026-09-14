# CLI Discovery Inventory

**Reference**: installed 2.1.270, refreshed 2026-09-14. `observed-help` means only that the entry appeared in local help; it is not a passing behavior comparison. `documented` means the live official CLI reference lists it but local help did not. Every row still needs option-level semantics, nox mapping, and scenarios before T002 can close.

Sources: [local help](observations/cli-help.txt), [official CLI reference](https://code.claude.com/docs/en/cli-usage), [interactive commands](https://code.claude.com/docs/en/commands).

## Top-level options

| ID | Surface | Discovery | nox equivalent | Behavior evidence |
|----|---------|-----------|----------------|-------------------|
| CLI-001 | `--add-dir` | observed-help | Pending | Pending |
| CLI-002 | `--agent` | observed-help | Pending | Pending |
| CLI-003 | `--agents` | observed-help | Pending | Pending |
| CLI-004 | `--allow-dangerously-skip-permissions` | observed-help | Pending | Pending |
| CLI-005 | `--allowedTools, --allowed-tools` | observed-help | Pending | Pending |
| CLI-006 | `--append-system-prompt` | observed-help | Pending | Pending |
| CLI-007 | `--autocompact` | observed-help | Pending | Pending |
| CLI-008 | `--ax-screen-reader` | observed-help | Pending | Pending |
| CLI-009 | `--bg, --background` | observed-help | Pending | Pending |
| CLI-010 | `--bare` | observed-help | Pending | Pending |
| CLI-011 | `--betas` | observed-help | Pending | Pending |
| CLI-012 | `--brief` | observed-help | Pending | Pending |
| CLI-013 | `--chrome` | observed-help | Pending | Pending |
| CLI-014 | `--cloud` | observed-help | Pending | Pending |
| CLI-015 | `--continue` | observed-help | Pending | Pending |
| CLI-016 | `--dangerously-skip-permissions` | observed-help | Pending | Pending |
| CLI-017 | `--debug` | observed-help | Pending | Pending |
| CLI-018 | `--debug-file` | observed-help | Pending | Pending |
| CLI-019 | `--disable-slash-commands` | observed-help | Pending | Pending |
| CLI-020 | `--disallowedTools, --disallowed-tools` | observed-help | Pending | Pending |
| CLI-021 | `--effort` | observed-help | Pending | Pending |
| CLI-022 | `--environment` | observed-help | Pending | Pending |
| CLI-023 | `--exclude-dynamic-system-prompt-sections` | observed-help | Pending | Pending |
| CLI-024 | `--fallback-model` | observed-help | Pending | Pending |
| CLI-025 | `--file` | observed-help | Pending | Pending |
| CLI-026 | `--fork-session` | observed-help | Pending | Pending |
| CLI-027 | `--forward-subagent-text` | observed-help | Pending | Pending |
| CLI-028 | `--from-pr` | observed-help | Pending | Pending |
| CLI-029 | `--help` | observed-help | Pending | Pending |
| CLI-030 | `--ide` | observed-help | Pending | Pending |
| CLI-031 | `--include-hook-events` | observed-help | Pending | Pending |
| CLI-032 | `--include-partial-messages` | observed-help | Pending | Pending |
| CLI-033 | `--input-format` | observed-help | Pending | Pending |
| CLI-034 | `--json-schema` | observed-help | Pending | Pending |
| CLI-035 | `--max-budget-usd` | observed-help | Pending | Pending |
| CLI-036 | `--mcp-config` | observed-help | Pending | Pending |
| CLI-037 | `--model` | observed-help | Pending | Pending |
| CLI-038 | `--name` | observed-help | Pending | Pending |
| CLI-039 | `--no-chrome` | observed-help | Pending | Pending |
| CLI-040 | `--no-session-persistence` | observed-help | Pending | Pending |
| CLI-041 | `--output-format` | observed-help | Pending | Pending |
| CLI-042 | `--permission-mode` | observed-help | Pending | Pending |
| CLI-043 | `--permission-prompts` | observed-help | Pending | Pending |
| CLI-044 | `--plugin-dir` | observed-help | Pending | Pending |
| CLI-045 | `--plugin-url` | observed-help | Pending | Pending |
| CLI-046 | `--print` | observed-help | Pending | Pending |
| CLI-047 | `--prompt-suggestions` | observed-help | Pending | Pending |
| CLI-048 | `--remote-control` | observed-help | Pending | Pending |
| CLI-049 | `--remote-control-session-name-prefix` | observed-help | Pending | Pending |
| CLI-050 | `--replay-user-messages` | observed-help | Pending | Pending |
| CLI-051 | `--restricted` | observed-help | Pending | Pending |
| CLI-052 | `--resume` | observed-help | Pending | Pending |
| CLI-053 | `--safe-mode` | observed-help | Pending | Pending |
| CLI-054 | `--session-id` | observed-help | Pending | Pending |
| CLI-055 | `--setting-sources` | observed-help | Pending | Pending |
| CLI-056 | `--settings` | observed-help | Pending | Pending |
| CLI-057 | `--strict-mcp-config` | observed-help | Pending | Pending |
| CLI-058 | `--system-prompt` | observed-help | Pending | Pending |
| CLI-059 | `--system-prompt-snapshot` | observed-help | Pending | Pending |
| CLI-060 | `--teleport` | observed-help | Pending | Pending |
| CLI-061 | `--tmux` | observed-help | Pending | Pending |
| CLI-062 | `--tools` | observed-help | Pending | Pending |
| CLI-063 | `--verbose` | observed-help | Pending | Pending |
| CLI-064 | `--version` | observed-help | Pending | Pending |
| CLI-065 | `--worktree` | observed-help | Pending | Pending |
| CLI-066 | `--advisor` | documented | Pending | Pending |
| CLI-067 | `--append-subagent-system-prompt` | documented | Pending | Pending |
| CLI-068 | `--append-subagent-system-prompt-file` | documented | Pending | Pending |
| CLI-069 | `--append-system-prompt-file` | documented | Pending | Pending |
| CLI-070 | `--channels` | documented | Pending | Pending |
| CLI-071 | `--dangerously-load-development-channels` | documented | Pending | Pending |
| CLI-072 | `--exec` | documented | Pending | Pending |
| CLI-073 | `--init` | documented | Pending | Pending |
| CLI-074 | `--init-only` | documented | Pending | Pending |
| CLI-075 | `--maintenance` | documented | Pending | Pending |
| CLI-076 | `--system-prompt-file` | documented | Pending | Pending |
| CLI-077 | `--teammate-mode` | documented | Pending | Pending |

## Top-level command families

| ID | Surface | Discovery | nox equivalent | Behavior evidence |
|----|---------|-----------|----------------|-------------------|
| CLI-078 | `agents [options]` | observed-help | Pending | Pending |
| CLI-079 | `attach <id>` | observed-help | Pending | Pending |
| CLI-080 | `auth` | observed-help | Pending | Pending |
| CLI-081 | `auto-mode` | observed-help | Pending | Pending |
| CLI-082 | `doctor` | observed-help | Pending | Pending |
| CLI-083 | `gateway [options]` | observed-help | Pending | Pending |
| CLI-084 | `import [options] [source]` | observed-help | Pending | Pending |
| CLI-085 | `install [options] [target]` | observed-help | Pending | Pending |
| CLI-086 | `logs <id>` | observed-help | Pending | Pending |
| CLI-087 | `mcp` | observed-help | Pending | Pending |
| CLI-088 | `plugin|plugins` | observed-help | Pending | Pending |
| CLI-089 | `project` | observed-help | Pending | Pending |
| CLI-090 | `respawn [options] [id]` | observed-help | Pending | Pending |
| CLI-091 | `rm <id>` | observed-help | Pending | Pending |
| CLI-092 | `setup-token` | observed-help | Pending | Pending |
| CLI-093 | `stop|kill <id>` | observed-help | Pending | Pending |
| CLI-094 | `ultrareview [options] [target]` | observed-help | Pending | Pending |
| CLI-095 | `update|upgrade` | observed-help | Pending | Pending |

## Command subfamilies observed through local help

- `auth`: `login`, `logout`, `status`.
- `mcp`: `add`, `add-from-claude-desktop`, `add-json`, `get`, `list`, `login`, `logout`, `remove`, `reset-project-choices`, `serve`.
- `plugin`: `details`, `disable`, `enable`, `eval`, `init|new`, `install|i`, `list`, `marketplace`, `prune|autoremove`, `tag`, `uninstall|remove`, `update`, `validate`.
- `project`: `purge`.
- `auto-mode`: `config`, `critique`, `defaults`, `reset`.
- `agents`: JSON listing and dispatch options.
- `gateway`, `import`, `ultrareview`: distinct option sets remain to be expanded.

## Nested option seeds from 2026-09-14 local help

The [raw nested help captures](snapshot.md#snapshot-refresh-2026-09-14) establish candidate clusters, not final leaf IDs. Split each option or independently failing combination into its own `CLI-` leaf during T002; defaults beyond those printed, effects, and errors remain unobserved.

| ID | Surface | Discovery | nox equivalent | Behavior evidence |
|----|---------|-----------|----------------|-------------------|
| CAND-001 | `agents --json` and `--all` | observed-help | Pending | Pending |
| CAND-002 | `agents --cwd`, `--add-dir` | observed-help | Pending | Pending |
| CAND-003 | `agents --model`, `--effort`, `--agent` | observed-help | Pending | Pending |
| CAND-004 | `agents --permission-mode`, `--restricted` | observed-help | Pending | Pending |
| CAND-005 | `agents --settings`, `--setting-sources` | observed-help | Pending | Pending |
| CAND-006 | `agents --mcp-config`, `--strict-mcp-config`, `--plugin-dir` | observed-help | Pending | Pending |
| CAND-007 | `gateway --config` | observed-help | Pending | Pending |
| CAND-008 | `import --dry-run`, `--yes` | observed-help | Pending | Pending |
| CAND-009 | `ultrareview --json`, `--post`, `--no-post`, `--timeout` | observed-help | Pending | Pending |
| CAND-010 | `plugin eval` | observed-help | Pending | Pending |
| CAND-011 | `plugin tag`, `plugin prune`, `plugin details` | observed-help | Pending | Pending |
| CAND-012 | `mcp add-json` transport variants | observed-help | Pending | Pending |
| CAND-013 | `mcp reset-project-choices`, `mcp serve` | observed-help | Pending | Pending |
| CAND-014 | `auto-mode config`, `defaults`, `critique`, `reset` | observed-help | Pending | Pending |
| CAND-015 | `project purge` | observed-help | Pending | Pending |

## Missing discovery work

The [official CLI reference](https://code.claude.com/docs/en/cli-usage) says help is incomplete. This table has not been reconciled against every documented flag and command, nor every command-specific option, alias, combination, and failure. Do not mark T002 complete.
