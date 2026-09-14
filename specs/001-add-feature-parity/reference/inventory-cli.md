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
| CLI-096 | `daemon status` | documented; observed nested help | Pending | Pending |
| CLI-097 | `daemon stop --any` | documented; observed nested help | Pending | Pending |
| CLI-098 | `remote-control` | documented; local help blocked by account gate | Pending | Gated-unverified |
| CLI-099 | `self-hosted-runner setup` | documented; observed nested help | Pending | Pending |
| CLI-100 | `self-hosted-runner doctor` | documented; observed nested help | Pending | Pending |
| CLI-101 | `self-hosted-runner orchestrator` | documented; observed nested help | Pending | Pending |

## Command subfamilies observed through local help

- `auth`: `login`, `logout`, `status`.
- `mcp`: `add`, `add-from-claude-desktop`, `add-json`, `get`, `list`, `login`, `logout`, `remove`, `reset-project-choices`, `serve`.
- `plugin`: `details`, `disable`, `enable`, `eval`, `init|new`, `install|i`, `list`, `marketplace`, `prune|autoremove`, `tag`, `uninstall|remove`, `update`, `validate`.
- `project`: `purge`.
- `auto-mode`: `config`, `critique`, `defaults`, `reset`.
- `agents`: JSON listing and dispatch options.
- `gateway`, `import`, `ultrareview`: distinct option sets remain to be expanded.
- `plugin marketplace`: `add`, `list`, `remove|rm`, `update`; the second-level help was captured locally.
- `plugin eval`: `init`; its option set and the parent evaluation flags remain to be split into leaves.

## Second-level help evidence

On 2026-09-14, the installed CLI returned help with exit code 0 for 36 command paths: `auth login|logout|status`; `mcp add|add-json|get|list|login|logout|remove|reset-project-choices|serve`; `plugin details|disable|enable|eval|init|install|list|marketplace|prune|tag|uninstall|update|validate`; `project purge`; `auto-mode config|critique|defaults|reset`; and `install`, `respawn`, `doctor`, `update`, `setup-token`. Four third-level `plugin marketplace` paths (`add`, `list`, `remove`, `update`) and `plugin eval init` also returned help. The [dated raw files](observations/) retain the option descriptions, defaults, and usage signatures. A successful help exit is discovery evidence only; it does not establish executable behavior or availability under the current account.

The [current official CLI reference](https://code.claude.com/docs/en/cli-usage) documents `daemon`, `remote-control`, and `self-hosted-runner` command families that are absent from this installation's top-level help. Direct `--help` probes exposed the daemon and runner trees. `remote-control --help` instead exited 1 with an account-login requirement before showing help; its behavior is gated-unverified. The same page states that `--help` is incomplete, so absent help is not proof of absence.

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

## Nested command leaves

These IDs distinguish independently invokable paths. Their options still require separate leaves and scenarios; listing a path does not verify its effect.

| ID | Surface | Discovery | Behavior evidence |
|----|---------|-----------|-------------------|
| CLI-102 | `auth login` | observed-help | Pending |
| CLI-103 | `auth logout` | observed-help | Pending |
| CLI-104 | `auth status` | observed-help | Pending |
| CLI-105 | `mcp add` | observed-help | Pending |
| CLI-106 | `mcp add-json` | observed-help | Pending |
| CLI-107 | `mcp get` | observed-help | Pending |
| CLI-108 | `mcp list` | observed-help | Pending |
| CLI-109 | `mcp login` | observed-help | Pending |
| CLI-110 | `mcp logout` | observed-help | Pending |
| CLI-111 | `mcp remove` | observed-help | Pending |
| CLI-112 | `mcp reset-project-choices` | observed-help | Pending |
| CLI-113 | `mcp serve` | observed-help | Pending |
| CLI-114 | `plugin details` | observed-help | Pending |
| CLI-115 | `plugin disable` | observed-help | Pending |
| CLI-116 | `plugin enable` | observed-help | Pending |
| CLI-117 | `plugin eval` | observed-help | Pending |
| CLI-118 | `plugin init|new` | observed-help | Pending |
| CLI-119 | `plugin install|i` | observed-help | Pending |
| CLI-120 | `plugin list` | observed-help | Pending |
| CLI-121 | `plugin marketplace` | observed-help | Pending |
| CLI-122 | `plugin prune|autoremove` | observed-help | Pending |
| CLI-123 | `plugin tag` | observed-help | Pending |
| CLI-124 | `plugin uninstall|remove` | observed-help | Pending |
| CLI-125 | `plugin update` | observed-help | Pending |
| CLI-126 | `plugin validate` | observed-help | Pending |
| CLI-127 | `project purge` | observed-help | Pending |
| CLI-128 | `auto-mode config` | observed-help | Pending |
| CLI-129 | `auto-mode critique` | observed-help | Pending |
| CLI-130 | `auto-mode defaults` | observed-help | Pending |
| CLI-131 | `auto-mode reset` | observed-help | Pending |
| CLI-132 | `plugin marketplace add` | observed-help | Pending |
| CLI-133 | `plugin marketplace list` | observed-help | Pending |
| CLI-134 | `plugin marketplace remove|rm` | observed-help | Pending |
| CLI-135 | `plugin marketplace update` | observed-help | Pending |
| CLI-136 | `plugin eval init` | observed-help | Pending |
| CLI-137 | `daemon run` | observed-help | Pending |
| CLI-138 | `daemon logs` | observed-help | Pending |
| CLI-139 | `daemon uninstall` | observed-help | Pending |
| CLI-140 | `daemon stop` | observed-help | Pending |

## Missing discovery work

The [official CLI reference](https://code.claude.com/docs/en/cli-usage) says help is incomplete. This table has not been reconciled against every documented flag and command, nor every command-specific option, alias, combination, and failure. Do not mark T002 complete.
