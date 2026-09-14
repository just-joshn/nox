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
| CLI-009 | `--bg, --background` | observed-help | Conflict preflight only; launch unsupported | [Print conflict](observations/background-print-conflict-2026-09-14.txt) decision matched; advice differs as DISC-001; successful launch pending |
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
| CLI-034 | `--json-schema` | observed-help | Parser preflight for malformed JSON only; valid output unsupported | [Malformed JSON rejection](observations/schema-invalid-2026-09-14.txt) matched; valid schema and other variants pending |
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
| CLI-069 | `--append-system-prompt-file` | documented | Nox parser and local composition implemented | [Missing file](observations/cli-prompt-files-missing-2026-09-14.txt) decision and diagnostic match; startup side effects differ as DISC-003; successful reference composition observed as CLI-558 |
| CLI-070 | `--channels` | documented | Pending | Pending |
| CLI-071 | `--dangerously-load-development-channels` | documented | Pending | Pending |
| CLI-072 | `--exec` | documented | Pending | Pending |
| CLI-073 | `--init` | documented | Pending | Pending |
| CLI-074 | `--init-only` | documented | Pending | Pending |
| CLI-075 | `--maintenance` | documented | Pending | Pending |
| CLI-076 | `--system-prompt-file` | documented | Nox parser and local composition implemented | [Missing file](observations/cli-prompt-files-missing-2026-09-14.txt) decision and diagnostic match; startup side effects differ as DISC-003; successful reference composition observed as CLI-558 |
| CLI-077 | `--teammate-mode` | documented | Pending | Pending |
| CLI-241 | `--max-turns` | documented; absent from installed help | Pending | Pending |
| CLI-242 | `--permission-prompt-tool` | documented; absent from installed help | Pending | Pending |
| CLI-243 | `--ref` | documented; absent from installed help | Pending | Pending |
| CLI-244 | `--remote` | documented deprecated alias; absent from installed help | Pending | Pending |
| CLI-245 | `--enable-auto-mode` | documented removed since v2.1.111 | Not applicable | Removed |

The additional flags above came from the [current official CLI reference](https://code.claude.com/docs/en/cli-usage). Their absence from installed `--help` does not establish that the parser rejects them. The removed entry is retained for source reconciliation, not counted as a required current capability.

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

An offline audit of the captured `Commands:` blocks found 42 command entries. Each has an inventory leaf, including the printed `plugin|plugins` parent alias and `help [command]` dispatch entries. This does not establish that unprinted commands are absent.

The [current official CLI reference](https://code.claude.com/docs/en/cli-usage) documents `daemon`, `remote-control`, and `self-hosted-runner` command families that are absent from this installation's top-level help. Direct `--help` probes exposed the daemon and runner trees. `remote-control --help` instead exited 1 with an account-login requirement before showing help; its behavior is gated-unverified. The same page states that `--help` is incomplete, so absent help is not proof of absence.

## Documented CLI interaction leaves

The [CLI reference](https://code.claude.com/docs/en/cli-usage) specifies these option interactions independently of the individual flag rows. Their described outcomes are documentation contracts; local behavior remains unobserved while the account cannot make model-backed requests. The mutually exclusive and ignored cases require separate failure or no-effect scenarios before implementation.

| ID | Input combination | Documented contract | Evidence state |
|----|-------------------|---------------------|----------------|
| CLI-246 | `--background` with `--print` | Rejected before session creation; exit 1, empty stdout, conflict diagnostic on stderr | [Observed locally](observations/background-print-conflict-2026-09-14.txt); nox preflight compared in [validation.md](validation.md) |
| CLI-247 | `--background` with `--exec` | Launch a PTY-backed shell job | Documented only |
| CLI-248 | `--background` with `--agent` | Launch a selected subagent | Documented only |
| CLI-249 | `--continue` with `--print` | Search includes print, SDK, and loop sessions | Documented only |
| CLI-250 | `--fork-session` with `--resume` | Resume under a new session ID | Documented only |
| CLI-251 | `--fork-session` with `--continue` | Continue under a new session ID | Documented only |
| CLI-252 | `--forward-subagent-text` with `--print --output-format stream-json` | Include subagent text and thinking blocks with parent tool ID | Documented only |
| CLI-253 | `--include-partial-messages` with `--print --output-format stream-json` | Include partial stream events | Documented only |
| CLI-254 | `--prompt-suggestions` with `--print --output-format stream-json --verbose` | Emit predicted prompt when generated | Documented only |
| CLI-255 | `--replay-user-messages` with stream JSON input and output | Echo input user messages to stdout | Documented only |
| CLI-256 | `--strict-mcp-config` with `--mcp-config` | Exclude other MCP configuration sources | Documented only |
| CLI-257 | `--tmux` without `--worktree` | Requires worktree option | Documented only |
| CLI-258 | `--ref` with `--environment` | Base remote checkout on selected ref | Documented only |
| CLI-259 | `--allow-dangerously-skip-permissions` with `--permission-mode plan` | Start in plan and add bypass to mode cycle | Documented only |
| CLI-260 | `--append-subagent-system-prompt` with `--append-subagent-system-prompt-file` | Mutually exclusive | [Isolated parser trace](observations/cli-prompt-conflicts-2026-09-14.txt): exit 1, empty stdout, exact conflict stderr, config entries created |
| CLI-261 | `--system-prompt` with `--system-prompt-file` | Mutually exclusive | [Isolated parser trace](observations/cli-prompt-conflicts-2026-09-14.txt): exit 1, empty stdout, exact conflict stderr, config entries created. Nox decision and diagnostic match; startup side effects differ as DISC-003 |
| CLI-262 | `--exclude-dynamic-system-prompt-sections` with either replacement prompt flag | Exclusion is ignored | Documented only |
| CLI-263 | `--permission-prompts none` in print mode | Deny requests without a prompt handler | Documented only |
| CLI-264 | `--no-session-persistence` outside print mode | Print-mode restriction | Documented only |
| CLI-265 | `--remote-control` with explicit name | Use supplied session name | Documented only |
| CLI-553 | Resume with a changed system-prompt flag and default snapshot behavior | Reuse the first request's recorded prompt until compaction; new flag text applies after compaction | [CLI reference](https://code.claude.com/docs/en/cli-usage#system-prompt-flags-in-resumed-conversations); documented only, loopback trace pending |
| CLI-554 | Resume with `--system-prompt-snapshot off` | Rebuild prompt on each request, including the changed system-prompt flag text | [CLI reference](https://code.claude.com/docs/en/cli-usage#system-prompt-flags-in-resumed-conversations); documented only, loopback trace pending |
| CLI-555 | `--bare` without explicit snapshot setting | Leave system-prompt recording off | [CLI reference](https://code.claude.com/docs/en/cli-usage#system-prompt-flags-in-resumed-conversations); documented only, loopback trace pending |
| CLI-556 | `--bare --system-prompt-snapshot on` | Record and reuse the first request's prompt | [CLI reference](https://code.claude.com/docs/en/cli-usage#system-prompt-flags-in-resumed-conversations); documented only, loopback trace pending |
| CLI-557 | `--system-prompt` with `--append-system-prompt` | Replace default prompt, then append supplied text | [Synthetic loopback observation](observations/prompt-compose-loopback-2026-09-14.json): both markers in system field, replacement before append; real-service behavior pending |
| CLI-558 | `--system-prompt-file` with `--append-system-prompt-file` | Replace default prompt from file, then append additional file contents | [Synthetic loopback observation](observations/prompt-files-loopback-2026-09-14.json): file markers in system field, replacement before append, files unchanged; real-service behavior pending |

These rows cover only interactions the reference states explicitly. Other independently failing combinations, parse errors, and precedence cases remain to be discovered and split.

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
| CLI-534 | `mcp add-from-claude-desktop` | [isolated local help](observations/help-mcp-add-from-claude-desktop-2026-09-14.txt); macOS and WSL only | Import behavior, conflict handling, and failure path unobserved |
| CLI-535 | `mcp add-from-claude-desktop --scope local` (default) | [isolated local help](observations/help-mcp-add-from-claude-desktop-2026-09-14.txt) | [Empty config](observations/mcp-desktop-empty-2026-09-14.txt): exit 0, no-server stdout, empty stderr; successful import target and persistence unobserved |
| CLI-536 | `mcp add-from-claude-desktop --scope user` | [isolated local help](observations/help-mcp-add-from-claude-desktop-2026-09-14.txt) | [Empty config](observations/mcp-desktop-empty-2026-09-14.txt): same no-server result; successful import target and persistence unobserved |
| CLI-537 | `mcp add-from-claude-desktop --scope project` | [isolated local help](observations/help-mcp-add-from-claude-desktop-2026-09-14.txt) | [Empty config](observations/mcp-desktop-empty-2026-09-14.txt): same no-server result; successful import target and persistence unobserved |
| CLI-538 | `mcp add-from-claude-desktop -h, --help` | [isolated local help](observations/help-mcp-add-from-claude-desktop-2026-09-14.txt) | Exit 0, usage on stdout, empty stderr; no import attempted |
| CLI-539 | `mcp add-from-claude-desktop --scope dynamic` | [isolated parser trace](observations/mcp-desktop-scopes-2026-09-14.txt) | Parser accepts; empty Desktop config exits 0 with no-server message; populated import unobserved |
| CLI-540 | `mcp add-from-claude-desktop --scope enterprise` | [isolated parser trace](observations/mcp-desktop-scopes-2026-09-14.txt) | Parser accepts; empty Desktop config exits 0 with no-server message; populated import unobserved |
| CLI-541 | `mcp add-from-claude-desktop --scope claudeai` | [isolated parser trace](observations/mcp-desktop-scopes-2026-09-14.txt) | Parser accepts; empty Desktop config exits 0 with no-server message; populated import unobserved |
| CLI-542 | `mcp add-from-claude-desktop --scope managed` | [isolated parser trace](observations/mcp-desktop-scopes-2026-09-14.txt) | Parser accepts; empty Desktop config exits 0 with no-server message; populated import unobserved |
| CLI-543 | `mcp add-from-claude-desktop --scope agent` | [isolated parser trace](observations/mcp-desktop-scopes-2026-09-14.txt) | Parser accepts; empty Desktop config exits 0 with no-server message; populated import unobserved |
| CLI-544 | `mcp add-from-claude-desktop --scope invalid` | [isolated parser trace](observations/mcp-desktop-scopes-2026-09-14.txt) | Exit 1, empty stdout, accepted-scope list on stderr; no import attempted |
| CLI-545 | `auth help [command]` | [local help](observations/help-auth-2026-09-14.txt) | [Isolated dispatch](observations/cli-nested-help-dispatch-2026-09-14.txt): `status` exits 0 with usage stdout; unknown target exits 1 with parent help on stderr |
| CLI-546 | `auto-mode help [command]` | [local help](observations/help-auto-mode-2026-09-14.txt) | [Isolated dispatch](observations/cli-nested-help-dispatch-2026-09-14.txt): `config` and unknown-target paths observed |
| CLI-547 | `mcp help [command]` | [local help](observations/help-mcp-2026-09-14.txt) | [Isolated dispatch](observations/cli-nested-help-dispatch-2026-09-14.txt): `list` and unknown-target paths observed |
| CLI-548 | `plugin help [command]` | [local help](observations/help-plugin-2026-09-14.txt) | [Isolated dispatch](observations/cli-nested-help-dispatch-2026-09-14.txt): `list` and unknown-target paths observed |
| CLI-549 | `plugin marketplace help [command]` | [local help](observations/help-plugin-marketplace-2026-09-14.txt) | [Isolated dispatch](observations/cli-nested-help-dispatch-2026-09-14.txt): `list` and unknown-target paths observed |
| CLI-550 | `project help [command]` | [local help](observations/help-project-2026-09-14.txt) | [Isolated dispatch](observations/cli-nested-help-dispatch-2026-09-14.txt): `purge` and unknown-target paths observed |
| CLI-551 | `respawn --all` | [local help](observations/help-respawn-2026-09-14.txt) | Restart every background session to use the current binary; lifecycle and no-session failure unobserved |
| CLI-552 | `daemon -h, --help` | [local help](observations/help-daemon-2026-09-14.txt) | [Isolated `--help` result](observations/cli-daemon-help-2026-09-14.txt): exit 0, usage stdout, empty stderr, `.claude.json` created; `-h` alias untested |
| CLI-559 | `--system-prompt-file` without an argument | [Isolated parser trace](observations/cli-prompt-files-no-value-2026-09-14.txt) | Nox process comparison matches exit 1, empty stdout, exact lowercase stderr, and no home entries; other file variants open |
| CLI-560 | `--append-system-prompt-file` without an argument | [Isolated parser trace](observations/cli-prompt-files-no-value-2026-09-14.txt) | Nox process comparison matches exit 1, empty stdout, exact lowercase stderr, and no home entries; other file variants open |
| CLI-561 | `--system-prompt-file` points to a directory | [Isolated file trace](observations/cli-prompt-files-directory-2026-09-14.txt) | Nox matches exit, stdout, and same-OS EISDIR stderr; startup config entries differ as DISC-003 |
| CLI-562 | `--append-system-prompt-file` points to a directory | [Isolated file trace](observations/cli-prompt-files-directory-2026-09-14.txt) | Nox matches exit, stdout, and same-OS EISDIR stderr; startup config entries differ as DISC-003 |

## Documented interactive command invocations

The [current official command reference](https://code.claude.com/docs/en/commands) lists these command signatures. They are discovery leaves only. Each argument form, alias, menu state, mid-turn timing, gating condition, and failure path still needs its own contract and scenario. `/pr-comments` is retained as a documented removed entry so reconciliation does not mistake it for a current capability.

| ID | Surface | Discovery | Behavior evidence |
|----|---------|-----------|-------------------|
| CLI-141 | `/add-dir <path>` | documented; local interaction unobserved | Pending |
| CLI-142 | `/advisor [model\|off]` | documented; local interaction unobserved | Pending |
| CLI-143 | `/agents` | documented; local interaction unobserved | Pending |
| CLI-144 | `/artifacts` | documented; local interaction unobserved | Pending |
| CLI-145 | `/auto-mode-setup` | documented; local interaction unobserved | Pending |
| CLI-146 | `/autocompact [auto\|<tokens>]` | documented; local interaction unobserved | Pending |
| CLI-147 | `/autofix-pr [prompt]` | documented; local interaction unobserved | Pending |
| CLI-148 | `/batch <instruction>` | documented; local interaction unobserved | Pending |
| CLI-149 | `/branch [name]` | documented; local interaction unobserved | Pending |
| CLI-150 | `/btw [question]` | documented; local interaction unobserved | Pending |
| CLI-151 | `/bug [report]` | documented; local interaction unobserved | Pending |
| CLI-152 | `/cd <path>` | documented; local interaction unobserved | Pending |
| CLI-153 | `/claude-api [migrate\|upgrade\|managed-agents-onboard\|prompt-audit\|cost-optimize\|build-eval\|hillclimb]` | documented; local interaction unobserved | Pending |
| CLI-154 | `/clear [name]` | documented; local interaction unobserved | Pending |
| CLI-155 | `/code-review [low\|medium\|high\|xhigh\|max\|ultra] [--fix] [--comment] [pr#\|branch\|path]` | documented; local interaction unobserved | Pending |
| CLI-156 | `/color [color\|default]` | documented; local interaction unobserved | Pending |
| CLI-157 | `/compact [instructions]` | documented; local interaction unobserved | Pending |
| CLI-158 | `/context [all]` | documented; local interaction unobserved | Pending |
| CLI-159 | `/copy [N]` | documented; local interaction unobserved | Pending |
| CLI-160 | `/cost` | documented; local interaction unobserved | Pending |
| CLI-161 | `/dataviz [request]` | documented; local interaction unobserved | Pending |
| CLI-162 | `/debug [description]` | documented; local interaction unobserved | Pending |
| CLI-163 | `/deep-research <question>` | documented; local interaction unobserved | Pending |
| CLI-164 | `/design [brief]` | documented; local interaction unobserved | Pending |
| CLI-165 | `/design-login` | documented; local interaction unobserved | Pending |
| CLI-166 | `/design-sync [hint]` | documented; local interaction unobserved | Pending |
| CLI-167 | `/desktop` | documented; local interaction unobserved | Pending |
| CLI-168 | `/diff` | documented; local interaction unobserved | Pending |
| CLI-169 | `/effort [level\|auto\|status]` | documented; local interaction unobserved | Pending |
| CLI-170 | `/export [filename]` | documented; local interaction unobserved | Pending |
| CLI-171 | `/fast [on\|off]` | documented; local interaction unobserved | Pending |
| CLI-172 | `/feedback [report]` | documented; local interaction unobserved | Pending |
| CLI-173 | `/fewer-permission-prompts` | documented; local interaction unobserved | Pending |
| CLI-174 | `/focus` | documented; local interaction unobserved | Pending |
| CLI-175 | `/fork [prompt]` | documented; local interaction unobserved | Pending |
| CLI-176 | `/goal [condition\|clear]` | documented; local interaction unobserved | Pending |
| CLI-177 | `/heapdump` | documented; local interaction unobserved | Pending |
| CLI-178 | `/hooks` | documented; local interaction unobserved | Pending |
| CLI-179 | `/ide` | documented; local interaction unobserved | Pending |
| CLI-180 | `/import [codex\|gemini\|cursor] [--dry-run] [--yes]` | documented; local interaction unobserved | Pending |
| CLI-181 | `/init` | documented; local interaction unobserved | Pending |
| CLI-182 | `/insights` | documented; local interaction unobserved | Pending |
| CLI-183 | `/install-github-app` | documented; local interaction unobserved | Pending |
| CLI-184 | `/keybindings` | documented; local interaction unobserved | Pending |
| CLI-185 | `/list-agents` | documented; local interaction unobserved | Pending |
| CLI-186 | `/logout` | documented; local interaction unobserved | Pending |
| CLI-187 | `/loop [interval] [prompt]` | documented; local interaction unobserved | Pending |
| CLI-188 | `/mcp [reconnect <server>\|enable\|disable [<server>\|all]]` | documented; local interaction unobserved | Pending |
| CLI-189 | `/memory` | documented; local interaction unobserved | Pending |
| CLI-190 | `/mobile` | documented; local interaction unobserved | Pending |
| CLI-191 | `/model [model]` | documented; local interaction unobserved | Pending |
| CLI-192 | `/passes` | documented; local interaction unobserved | Pending |
| CLI-193 | `/permissions` | documented; local interaction unobserved | Pending |
| CLI-194 | `/plan [description]` | documented; local interaction unobserved | Pending |
| CLI-195 | `/plugin [subcommand]` | documented; local interaction unobserved | Pending |
| CLI-196 | `/powerup` | documented; local interaction unobserved | Pending |
| CLI-197 | `/pr-comments [PR]` | documented-removed | Pending |
| CLI-198 | `/privacy-settings` | documented; local interaction unobserved | Pending |
| CLI-199 | `/radio` | documented; local interaction unobserved | Pending |
| CLI-200 | `/rate-limit-options` | documented; local interaction unobserved | Pending |
| CLI-201 | `/recap` | documented; local interaction unobserved | Pending |
| CLI-202 | `/release-notes` | documented; local interaction unobserved | Pending |
| CLI-203 | `/reload-plugins [--force]` | documented; local interaction unobserved | Pending |
| CLI-204 | `/remote-control` | documented; local interaction unobserved | Pending |
| CLI-205 | `/remote-env` | documented; local interaction unobserved | Pending |
| CLI-206 | `/resume [session]` | documented; local interaction unobserved | Pending |
| CLI-207 | `/review [low\|medium\|high\|xhigh\|max\|ultra] [--fix] [--comment] [pr#\|branch\|path]` | documented; local interaction unobserved | Pending |
| CLI-208 | `/rewind` | documented; local interaction unobserved | Pending |
| CLI-209 | `/run` | documented; local interaction unobserved | Pending |
| CLI-210 | `/schedule [description]` | documented; local interaction unobserved | Pending |
| CLI-211 | `/scroll-speed` | documented; local interaction unobserved | Pending |
| CLI-212 | `/security-review` | documented; local interaction unobserved | Pending |
| CLI-213 | `/setup-vertex` | documented; local interaction unobserved | Pending |
| CLI-214 | `/simplify [target]` | documented; local interaction unobserved | Pending |
| CLI-215 | `/skill-doctor` | documented; local interaction unobserved | Pending |
| CLI-216 | `/stats` | documented; local interaction unobserved | Pending |
| CLI-217 | `/status` | documented; local interaction unobserved | Pending |
| CLI-218 | `/statusline` | documented; local interaction unobserved | Pending |
| CLI-219 | `/stickers` | documented; local interaction unobserved | Pending |
| CLI-220 | `/stop` | documented; local interaction unobserved | Pending |
| CLI-221 | `/subtask <task>` | documented; local interaction unobserved | Pending |
| CLI-222 | `/tasks` | documented; local interaction unobserved | Pending |
| CLI-223 | `/team-onboarding` | documented; local interaction unobserved | Pending |
| CLI-224 | `/teleport` | documented; local interaction unobserved | Pending |
| CLI-225 | `/terminal-setup` | documented; local interaction unobserved | Pending |
| CLI-226 | `/tui [default\|fullscreen]` | documented; local interaction unobserved | Pending |
| CLI-227 | `/ultraplan <prompt>` | documented; local interaction unobserved | Pending |
| CLI-228 | `/ultrareview [PR or branch]` | documented; local interaction unobserved | Pending |
| CLI-229 | `/usage` | documented; local interaction unobserved | Pending |
| CLI-230 | `/usage-credits` | documented; local interaction unobserved | Pending |
| CLI-231 | `/verify` | documented; local interaction unobserved | Pending |
| CLI-232 | `/voice [hold\|tap\|off]` | documented; local interaction unobserved | Pending |
| CLI-233 | `/web-setup` | documented; local interaction unobserved | Pending |
| CLI-234 | `/workflow-authoring` | documented; local interaction unobserved | Pending |
| CLI-235 | `/workflows` | documented; local interaction unobserved | Pending |
| CLI-236 | `/background [prompt]` | documented; local interaction unobserved | Pending |
| CLI-237 | `/chrome` | documented; local interaction unobserved | Pending |
| CLI-238 | `/exit` | documented; local interaction unobserved | Pending |
| CLI-239 | `/help` | documented; local interaction unobserved | Pending |
| CLI-240 | `/login` | documented; local interaction unobserved | Pending |
| CLI-493 | `/config [key=value ...]` | documented; local interaction unobserved | Pending |
| CLI-494 | `/theme` | documented; local interaction unobserved | Pending |
| CLI-495 | `/upgrade` | documented; local interaction unobserved | Pending |
| CLI-496 | `/settings` (alias of `/config`) | documented; local interaction unobserved | Pending |
| CLI-497 | `/bashes` (alias of `/tasks`) | documented; local interaction unobserved | Pending |
| CLI-498 | `/reset` (alias of `/clear`) | documented; local interaction unobserved | Pending |
| CLI-499 | `/new` (alias of `/clear`) | documented; local interaction unobserved | Pending |
| CLI-500 | `/tp` (alias of `/teleport`) | documented; local interaction unobserved | Pending |
| CLI-513 | `/rename <name>` | documented; local interaction unobserved | Pending |
| CLI-514 | `/share [report]` (alias of `/bug`) | documented; local interaction unobserved | Pending |

## Documented keyboard shortcut seeds

The [interactive-mode reference](https://code.claude.com/docs/en/interactive-mode) supplies these distinct key tokens across general, editing, display, transcript, and Vim contexts. A token may have multiple context-dependent actions (for example, `Ctrl+T` and `Ctrl+E`). This is a discovery index. Context-specific leaves are in [the keyboard inventory](inventory-cli-keyboard.md); remaining gestures and failure states stay unobserved.

| ID | Key token | Discovery | Behavior evidence |
|----|-----------|-----------|-------------------|
| KEY-001 | `Ctrl+C` | documented; context and variants pending | Pending |
| KEY-002 | `Ctrl+X Ctrl+K` | documented; context and variants pending | Pending |
| KEY-003 | `Ctrl+D` | documented; context and variants pending | Pending |
| KEY-004 | `Ctrl+L` | documented; context and variants pending | Pending |
| KEY-005 | `Ctrl+O` | documented; context and variants pending | Pending |
| KEY-006 | `Ctrl+R` | documented; context and variants pending | Pending |
| KEY-007 | `Ctrl+B` | documented; context and variants pending | Pending |
| KEY-008 | `Ctrl+T` | documented; context and variants pending | Pending |
| KEY-009 | `Ctrl+S` | documented; context and variants pending | Pending |
| KEY-010 | `Ctrl+Z` | documented; context and variants pending | Pending |
| KEY-011 | `Left/Right arrows` | documented; context and variants pending | Pending |
| KEY-012 | `Tab` | documented; context and variants pending | Pending |
| KEY-013 | `Ctrl+A` | documented; context and variants pending | Pending |
| KEY-014 | `Ctrl+E` | documented; context and variants pending | Pending |
| KEY-015 | `Ctrl+K` | documented; context and variants pending | Pending |
| KEY-016 | `Ctrl+U` | documented; context and variants pending | Pending |
| KEY-017 | `Ctrl+W` | documented; context and variants pending | Pending |
| KEY-018 | `Ctrl+Y` | documented; context and variants pending | Pending |
| KEY-019 | `Alt+B` | documented; context and variants pending | Pending |
| KEY-020 | `Alt+F` | documented; context and variants pending | Pending |
| KEY-021 | `Alt+D` | documented; context and variants pending | Pending |
| KEY-022 | `@` | documented; context and variants pending | Pending |
| KEY-023 | `:` | documented; context and variants pending | Pending |
| KEY-024 | `?` | documented; context and variants pending | Pending |
| KEY-025 | `i` | documented; context and variants pending | Pending |
| KEY-026 | `I` | documented; context and variants pending | Pending |
| KEY-027 | `a` | documented; context and variants pending | Pending |
| KEY-028 | `A` | documented; context and variants pending | Pending |
| KEY-029 | `o` | documented; context and variants pending | Pending |
| KEY-030 | `O` | documented; context and variants pending | Pending |
| KEY-031 | `v` | documented; context and variants pending | Pending |
| KEY-032 | `V` | documented; context and variants pending | Pending |
| KEY-033 | `Space` | documented; context and variants pending | Pending |
| KEY-034 | `w` | documented; context and variants pending | Pending |
| KEY-035 | `e` | documented; context and variants pending | Pending |
| KEY-036 | `b` | documented; context and variants pending | Pending |
| KEY-037 | `0` | documented; context and variants pending | Pending |
| KEY-038 | `$` | documented; context and variants pending | Pending |
| KEY-039 | `^` | documented; context and variants pending | Pending |
| KEY-040 | `gg` | documented; context and variants pending | Pending |
| KEY-041 | `G` | documented; context and variants pending | Pending |
| KEY-042 | `f{char}` | documented; context and variants pending | Pending |
| KEY-043 | `F{char}` | documented; context and variants pending | Pending |
| KEY-044 | `t{char}` | documented; context and variants pending | Pending |
| KEY-045 | `T{char}` | documented; context and variants pending | Pending |
| KEY-046 | `;` | documented; context and variants pending | Pending |
| KEY-047 | `,` | documented; context and variants pending | Pending |
| KEY-048 | `/` | documented; context and variants pending | Pending |
| KEY-049 | `x` | documented; context and variants pending | Pending |
| KEY-050 | `dd` | documented; context and variants pending | Pending |
| KEY-051 | `D` | documented; context and variants pending | Pending |
| KEY-052 | `cc` | documented; context and variants pending | Pending |
| KEY-053 | `C` | documented; context and variants pending | Pending |
| KEY-054 | `s` | documented; context and variants pending | Pending |
| KEY-055 | `S` | documented; context and variants pending | Pending |
| KEY-056 | `p` | documented; context and variants pending | Pending |
| KEY-057 | `P` | documented; context and variants pending | Pending |
| KEY-058 | `>>` | documented; context and variants pending | Pending |
| KEY-059 | `<<` | documented; context and variants pending | Pending |
| KEY-060 | `J` | documented; context and variants pending | Pending |
| KEY-061 | `u` | documented; context and variants pending | Pending |
| KEY-062 | `.` | documented; context and variants pending | Pending |
| KEY-063 | `y` | documented; context and variants pending | Pending |
| KEY-064 | `r{char}` | documented; context and variants pending | Pending |

## Command-specific option inputs from local help

Each row is an invokable command-option input from the installed 2.1.270 help capture. The rows preserve the command context, including repeated `--help` flags, because command parsers can differ. They do not yet split accepted values, aliases, or option interactions; the raw linked help gives the printed value syntax and any stated default. These are discovery leaves only, not passing behavioral comparisons.

| ID | Input | Evidence | State |
|----|-------|----------|-------|
| CLI-266 | `agents --add-dir` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-267 | `agents --agent` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-268 | `agents --all` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-269 | `agents --allow-dangerously-skip-permissions` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-270 | `agents --cwd` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-271 | `agents --dangerously-skip-permissions` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-272 | `agents --effort` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-273 | `agents -h, --help` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-274 | `agents --json` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-275 | `agents --mcp-config` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-276 | `agents --model` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-277 | `agents --permission-mode` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-278 | `agents --plugin-dir` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-279 | `agents --restricted` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-280 | `agents --setting-sources` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-281 | `agents --settings` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-282 | `agents --strict-mcp-config` | [local help](observations/help-agents-2026-09-14.txt) | Observed help; behavior pending |
| CLI-283 | `auth -h, --help` | [local help](observations/help-auth-2026-09-14.txt) | Observed help; behavior pending |
| CLI-284 | `auth login --claudeai` | [local help](observations/help-auth-login-2026-09-14.txt) | Observed help; behavior pending |
| CLI-285 | `auth login --console` | [local help](observations/help-auth-login-2026-09-14.txt) | Observed help; behavior pending |
| CLI-286 | `auth login --email` | [local help](observations/help-auth-login-2026-09-14.txt) | Observed help; behavior pending |
| CLI-287 | `auth login -h, --help` | [local help](observations/help-auth-login-2026-09-14.txt) | Observed help; behavior pending |
| CLI-288 | `auth login --sso` | [local help](observations/help-auth-login-2026-09-14.txt) | Observed help; behavior pending |
| CLI-289 | `auth logout -h, --help` | [local help](observations/help-auth-logout-2026-09-14.txt) | Observed help; behavior pending |
| CLI-290 | `auth status -h, --help` | [local help](observations/help-auth-status-2026-09-14.txt) | Observed help; behavior pending |
| CLI-291 | `auth status --json` | [local help](observations/help-auth-status-2026-09-14.txt) | Observed help; behavior pending |
| CLI-292 | `auth status --text` | [local help](observations/help-auth-status-2026-09-14.txt) | Observed help; behavior pending |
| CLI-293 | `auto-mode -h, --help` | [local help](observations/help-auto-mode-2026-09-14.txt) | Observed help; behavior pending |
| CLI-294 | `auto-mode config -h, --help` | [local help](observations/help-auto-mode-config-2026-09-14.txt) | Observed help; behavior pending |
| CLI-295 | `auto-mode critique -h, --help` | [local help](observations/help-auto-mode-critique-2026-09-14.txt) | Observed help; behavior pending |
| CLI-296 | `auto-mode critique --model` | [local help](observations/help-auto-mode-critique-2026-09-14.txt) | Observed help; behavior pending |
| CLI-297 | `auto-mode defaults -h, --help` | [local help](observations/help-auto-mode-defaults-2026-09-14.txt) | Observed help; behavior pending |
| CLI-298 | `auto-mode defaults --label` | [local help](observations/help-auto-mode-defaults-2026-09-14.txt) | Observed help; behavior pending |
| CLI-299 | `auto-mode reset -h, --help` | [local help](observations/help-auto-mode-reset-2026-09-14.txt) | Observed help; behavior pending |
| CLI-300 | `auto-mode reset -y, --yes` | [local help](observations/help-auto-mode-reset-2026-09-14.txt) | Observed help; behavior pending |
| CLI-301 | `daemon --json-path` | [local help](observations/help-daemon-2026-09-14.txt) | Observed help; behavior pending |
| CLI-302 | `daemon --log-file` | [local help](observations/help-daemon-2026-09-14.txt) | Observed help; behavior pending |
| CLI-303 | `daemon status --json-path` | [local help](observations/help-daemon-status-2026-09-14.txt) | Observed help; behavior pending |
| CLI-304 | `daemon status --log-file` | [local help](observations/help-daemon-status-2026-09-14.txt) | Observed help; behavior pending |
| CLI-305 | `daemon stop --json-path` | [local help](observations/help-daemon-stop-2026-09-14.txt) | Observed help; behavior pending |
| CLI-306 | `daemon stop --log-file` | [local help](observations/help-daemon-stop-2026-09-14.txt) | Observed help; behavior pending |
| CLI-307 | `doctor -h, --help` | [local help](observations/help-doctor-2026-09-14.txt) | Observed help; behavior pending |
| CLI-308 | `gateway --config` | [local help](observations/help-gateway-2026-09-14.txt) | Observed help; behavior pending |
| CLI-309 | `gateway -h, --help` | [local help](observations/help-gateway-2026-09-14.txt) | Observed help; behavior pending |
| CLI-310 | `import --dry-run` | [local help](observations/help-import-2026-09-14.txt) | Observed help; behavior pending |
| CLI-311 | `import -h, --help` | [local help](observations/help-import-2026-09-14.txt) | Observed help; behavior pending |
| CLI-312 | `import --yes` | [local help](observations/help-import-2026-09-14.txt) | Observed help; behavior pending |
| CLI-313 | `install --force` | [local help](observations/help-install-2026-09-14.txt) | Observed help; behavior pending |
| CLI-314 | `install -h, --help` | [local help](observations/help-install-2026-09-14.txt) | Observed help; behavior pending |
| CLI-315 | `mcp -h, --help` | [local help](observations/help-mcp-2026-09-14.txt) | Observed help; behavior pending |
| CLI-316 | `mcp add --callback-port` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-317 | `mcp add --client-id` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-318 | `mcp add --client-secret` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-319 | `mcp add -e, --env` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-320 | `mcp add -H, --header` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-321 | `mcp add -h, --help` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-322 | `mcp add -s, --scope` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-323 | `mcp add -t, --transport` | [local help](observations/help-mcp-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-324 | `mcp add-json --client-secret` | [local help](observations/help-mcp-add-json-2026-09-14.txt) | Observed help; behavior pending |
| CLI-325 | `mcp add-json -h, --help` | [local help](observations/help-mcp-add-json-2026-09-14.txt) | Observed help; behavior pending |
| CLI-326 | `mcp add-json -s, --scope` | [local help](observations/help-mcp-add-json-2026-09-14.txt) | Observed help; behavior pending |
| CLI-327 | `mcp get -h, --help` | [local help](observations/help-mcp-get-2026-09-14.txt) | Observed help; behavior pending |
| CLI-328 | `mcp list -h, --help` | [local help](observations/help-mcp-list-2026-09-14.txt) | Observed help; behavior pending |
| CLI-329 | `mcp login -h, --help` | [local help](observations/help-mcp-login-2026-09-14.txt) | Observed help; behavior pending |
| CLI-330 | `mcp login --no-browser` | [local help](observations/help-mcp-login-2026-09-14.txt) | Observed help; behavior pending |
| CLI-331 | `mcp logout -h, --help` | [local help](observations/help-mcp-logout-2026-09-14.txt) | Observed help; behavior pending |
| CLI-332 | `mcp remove -h, --help` | [local help](observations/help-mcp-remove-2026-09-14.txt) | Observed help; behavior pending |
| CLI-333 | `mcp remove -s, --scope` | [local help](observations/help-mcp-remove-2026-09-14.txt) | Observed help; behavior pending |
| CLI-334 | `mcp reset-project-choices -h, --help` | [local help](observations/help-mcp-reset-project-choices-2026-09-14.txt) | Observed help; behavior pending |
| CLI-335 | `mcp serve -d, --debug` | [local help](observations/help-mcp-serve-2026-09-14.txt) | Observed help; behavior pending |
| CLI-336 | `mcp serve -h, --help` | [local help](observations/help-mcp-serve-2026-09-14.txt) | Observed help; behavior pending |
| CLI-337 | `mcp serve --verbose` | [local help](observations/help-mcp-serve-2026-09-14.txt) | Observed help; behavior pending |
| CLI-338 | `plugin -h, --help` | [local help](observations/help-plugin-2026-09-14.txt) | Observed help; behavior pending |
| CLI-339 | `plugin details -h, --help` | [local help](observations/help-plugin-details-2026-09-14.txt) | Observed help; behavior pending |
| CLI-340 | `plugin disable -a, --all` | [local help](observations/help-plugin-disable-2026-09-14.txt) | Observed help; behavior pending |
| CLI-341 | `plugin disable -h, --help` | [local help](observations/help-plugin-disable-2026-09-14.txt) | Observed help; behavior pending |
| CLI-342 | `plugin disable --json` | [local help](observations/help-plugin-disable-2026-09-14.txt) | Observed help; behavior pending |
| CLI-343 | `plugin disable -s, --scope` | [local help](observations/help-plugin-disable-2026-09-14.txt) | Observed help; behavior pending |
| CLI-344 | `plugin enable -h, --help` | [local help](observations/help-plugin-enable-2026-09-14.txt) | Observed help; behavior pending |
| CLI-345 | `plugin enable --json` | [local help](observations/help-plugin-enable-2026-09-14.txt) | Observed help; behavior pending |
| CLI-346 | `plugin enable -s, --scope` | [local help](observations/help-plugin-enable-2026-09-14.txt) | Observed help; behavior pending |
| CLI-347 | `plugin eval --ablation` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-348 | `plugin eval --allow-real-servers` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-349 | `plugin eval --allow-tools` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-350 | `plugin eval --case` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-351 | `plugin eval -j, --concurrency` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-352 | `plugin eval --eval-dir` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-353 | `plugin eval -h, --help` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-354 | `plugin eval --json` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-355 | `plugin eval --judge-model` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-356 | `plugin eval --keep-temp` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-357 | `plugin eval --max-cost-usd` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-358 | `plugin eval --mocks` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-359 | `plugin eval --model` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-360 | `plugin eval --no-publish` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-361 | `plugin eval --no-scaffold` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-362 | `plugin eval --output-dir` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-363 | `plugin eval --publish-report` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-364 | `plugin eval --report` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-365 | `plugin eval --runs` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-366 | `plugin eval --scaffold` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-367 | `plugin eval --tag` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-368 | `plugin eval --threshold` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-369 | `plugin eval --trust-plugin` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-370 | `plugin eval --verbose` | [local help](observations/help-plugin-eval-2026-09-14.txt) | Observed help; behavior pending |
| CLI-371 | `plugin eval init --bare` | [local help](observations/help-plugin-eval-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-372 | `plugin eval init --eval-dir` | [local help](observations/help-plugin-eval-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-373 | `plugin eval init -h, --help` | [local help](observations/help-plugin-eval-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-374 | `plugin eval init -i, --interactive` | [local help](observations/help-plugin-eval-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-375 | `plugin init --author` | [local help](observations/help-plugin-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-376 | `plugin init --author-email` | [local help](observations/help-plugin-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-377 | `plugin init --description` | [local help](observations/help-plugin-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-378 | `plugin init -f, --force` | [local help](observations/help-plugin-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-379 | `plugin init -h, --help` | [local help](observations/help-plugin-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-380 | `plugin init --with` | [local help](observations/help-plugin-init-2026-09-14.txt) | Observed help; behavior pending |
| CLI-381 | `plugin install --config` | [local help](observations/help-plugin-install-2026-09-14.txt) | Observed help; behavior pending |
| CLI-382 | `plugin install -h, --help` | [local help](observations/help-plugin-install-2026-09-14.txt) | Observed help; behavior pending |
| CLI-383 | `plugin install --json` | [local help](observations/help-plugin-install-2026-09-14.txt) | Observed help; behavior pending |
| CLI-384 | `plugin install -s, --scope` | [local help](observations/help-plugin-install-2026-09-14.txt) | Observed help; behavior pending |
| CLI-385 | `plugin install -y, --yes` | [local help](observations/help-plugin-install-2026-09-14.txt) | Observed help; behavior pending |
| CLI-386 | `plugin list --available` | [local help](observations/help-plugin-list-2026-09-14.txt) | Observed help; behavior pending |
| CLI-387 | `plugin list -h, --help` | [local help](observations/help-plugin-list-2026-09-14.txt) | Observed help; behavior pending |
| CLI-388 | `plugin list --json` | [local help](observations/help-plugin-list-2026-09-14.txt) | Observed help; behavior pending |
| CLI-389 | `plugin marketplace -h, --help` | [local help](observations/help-plugin-marketplace-2026-09-14.txt) | Observed help; behavior pending |
| CLI-390 | `plugin marketplace add --claudeai` | [local help](observations/help-plugin-marketplace-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-391 | `plugin marketplace add -h, --help` | [local help](observations/help-plugin-marketplace-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-392 | `plugin marketplace add --scope` | [local help](observations/help-plugin-marketplace-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-393 | `plugin marketplace add --sparse` | [local help](observations/help-plugin-marketplace-add-2026-09-14.txt) | Observed help; behavior pending |
| CLI-394 | `plugin marketplace list -h, --help` | [local help](observations/help-plugin-marketplace-list-2026-09-14.txt) | Observed help; behavior pending |
| CLI-395 | `plugin marketplace list --json` | [local help](observations/help-plugin-marketplace-list-2026-09-14.txt) | Observed help; behavior pending |
| CLI-396 | `plugin marketplace remove -h, --help` | [local help](observations/help-plugin-marketplace-remove-2026-09-14.txt) | Observed help; behavior pending |
| CLI-397 | `plugin marketplace remove --scope` | [local help](observations/help-plugin-marketplace-remove-2026-09-14.txt) | Observed help; behavior pending |
| CLI-398 | `plugin marketplace update -h, --help` | [local help](observations/help-plugin-marketplace-update-2026-09-14.txt) | Observed help; behavior pending |
| CLI-399 | `plugin prune --dry-run` | [local help](observations/help-plugin-prune-2026-09-14.txt) | Observed help; behavior pending |
| CLI-400 | `plugin prune -h, --help` | [local help](observations/help-plugin-prune-2026-09-14.txt) | Observed help; behavior pending |
| CLI-401 | `plugin prune -s, --scope` | [local help](observations/help-plugin-prune-2026-09-14.txt) | Observed help; behavior pending |
| CLI-402 | `plugin prune -y, --yes` | [local help](observations/help-plugin-prune-2026-09-14.txt) | Observed help; behavior pending |
| CLI-403 | `plugin tag --dry-run` | [local help](observations/help-plugin-tag-2026-09-14.txt) | Observed help; behavior pending |
| CLI-404 | `plugin tag -f, --force` | [local help](observations/help-plugin-tag-2026-09-14.txt) | Observed help; behavior pending |
| CLI-405 | `plugin tag -h, --help` | [local help](observations/help-plugin-tag-2026-09-14.txt) | Observed help; behavior pending |
| CLI-406 | `plugin tag -m, --message` | [local help](observations/help-plugin-tag-2026-09-14.txt) | Observed help; behavior pending |
| CLI-407 | `plugin tag --push` | [local help](observations/help-plugin-tag-2026-09-14.txt) | Observed help; behavior pending |
| CLI-408 | `plugin tag --remote` | [local help](observations/help-plugin-tag-2026-09-14.txt) | Observed help; behavior pending |
| CLI-409 | `plugin uninstall -h, --help` | [local help](observations/help-plugin-uninstall-2026-09-14.txt) | Observed help; behavior pending |
| CLI-410 | `plugin uninstall --json` | [local help](observations/help-plugin-uninstall-2026-09-14.txt) | Observed help; behavior pending |
| CLI-411 | `plugin uninstall --keep-data` | [local help](observations/help-plugin-uninstall-2026-09-14.txt) | Observed help; behavior pending |
| CLI-412 | `plugin uninstall --prune` | [local help](observations/help-plugin-uninstall-2026-09-14.txt) | Observed help; behavior pending |
| CLI-413 | `plugin uninstall -s, --scope` | [local help](observations/help-plugin-uninstall-2026-09-14.txt) | Observed help; behavior pending |
| CLI-414 | `plugin uninstall -y, --yes` | [local help](observations/help-plugin-uninstall-2026-09-14.txt) | Observed help; behavior pending |
| CLI-415 | `plugin update -h, --help` | [local help](observations/help-plugin-update-2026-09-14.txt) | Observed help; behavior pending |
| CLI-416 | `plugin update --json` | [local help](observations/help-plugin-update-2026-09-14.txt) | Observed help; behavior pending |
| CLI-417 | `plugin update -s, --scope` | [local help](observations/help-plugin-update-2026-09-14.txt) | Observed help; behavior pending |
| CLI-418 | `plugin update -y, --yes` | [local help](observations/help-plugin-update-2026-09-14.txt) | Observed help; behavior pending |
| CLI-419 | `plugin validate -h, --help` | [local help](observations/help-plugin-validate-2026-09-14.txt) | Observed help; behavior pending |
| CLI-420 | `plugin validate --json` | [local help](observations/help-plugin-validate-2026-09-14.txt) | Observed help; behavior pending |
| CLI-421 | `plugin validate --strict` | [local help](observations/help-plugin-validate-2026-09-14.txt) | Observed help; behavior pending |
| CLI-422 | `project -h, --help` | [local help](observations/help-project-2026-09-14.txt) | Observed help; behavior pending |
| CLI-423 | `project purge --all` | [local help](observations/help-project-purge-2026-09-14.txt) | Observed help; behavior pending |
| CLI-424 | `project purge --dry-run` | [local help](observations/help-project-purge-2026-09-14.txt) | Observed help; behavior pending |
| CLI-425 | `project purge -h, --help` | [local help](observations/help-project-purge-2026-09-14.txt) | Observed help; behavior pending |
| CLI-426 | `project purge -i, --interactive` | [local help](observations/help-project-purge-2026-09-14.txt) | Observed help; behavior pending |
| CLI-427 | `project purge -y, --yes` | [local help](observations/help-project-purge-2026-09-14.txt) | Observed help; behavior pending |
| CLI-428 | `self-hosted-runner --api-url` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-429 | `self-hosted-runner --environment-secret-file` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-430 | `self-hosted-runner --lock-to-account` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-431 | `self-hosted-runner --client-label` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-432 | `self-hosted-runner --proxy-authorization-command` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-433 | `self-hosted-runner --proxy-authorization-file` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-434 | `self-hosted-runner --capacity` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-435 | `self-hosted-runner --base-dir` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-436 | `self-hosted-runner --exec-path` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-437 | `self-hosted-runner --hooks-dir` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-438 | `self-hosted-runner --session-stop-grace-sec` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-439 | `self-hosted-runner --post-session-hook-timeout-sec` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-440 | `self-hosted-runner --drain-wait-sec` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-441 | `self-hosted-runner --git-ssh-rewrite` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-442 | `self-hosted-runner --git-host-rewrite` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-443 | `self-hosted-runner --use-anthropic-git-proxy` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-444 | `self-hosted-runner --configure-git` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-445 | `self-hosted-runner --push-outcome-on-release` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-446 | `self-hosted-runner --trust-workspace` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-447 | `self-hosted-runner --remove-session-state` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-448 | `self-hosted-runner --confine-repo-settings` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-449 | `self-hosted-runner --health-port` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-450 | `self-hosted-runner --log-level` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-451 | `self-hosted-runner --log-file` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-452 | `self-hosted-runner --exit-if-unused-min` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-453 | `self-hosted-runner --drain-grace-sec` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-454 | `self-hosted-runner --retire-at` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-455 | `self-hosted-runner --defer-shutdown-max-min` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-456 | `self-hosted-runner --release-idle-session-min` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-457 | `self-hosted-runner --startup-timeout-min` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-458 | `self-hosted-runner --kill-session-after-min` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-459 | `self-hosted-runner --debug-token-dir` | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; behavior pending |
| CLI-460 | `self-hosted-runner orchestrator --api-url` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-461 | `self-hosted-runner orchestrator --environment-secret-file` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-462 | `self-hosted-runner orchestrator --hooks-dir` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-463 | `self-hosted-runner orchestrator --hook-concurrency` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-464 | `self-hosted-runner orchestrator --hook-timeout` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-465 | `self-hosted-runner orchestrator --expected-spawn-seconds` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-466 | `self-hosted-runner orchestrator --min-idle` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-467 | `self-hosted-runner orchestrator --scm-connector-host` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-468 | `self-hosted-runner orchestrator --scm-connector-id` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-469 | `self-hosted-runner orchestrator --scm-connector-provider` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-470 | `self-hosted-runner orchestrator --scm-connector-ca-file` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-471 | `self-hosted-runner orchestrator --scm-connector-host-rewrite` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-472 | `self-hosted-runner orchestrator --health-port` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-473 | `self-hosted-runner orchestrator --log-level` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-474 | `self-hosted-runner orchestrator --debug-dir` | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; behavior pending |
| CLI-475 | `setup-token -h, --help` | [local help](observations/help-setup-token-2026-09-14.txt) | Observed help; behavior pending |
| CLI-476 | `ultrareview -h, --help` | [local help](observations/help-ultrareview-2026-09-14.txt) | Observed help; behavior pending |
| CLI-477 | `ultrareview --json` | [local help](observations/help-ultrareview-2026-09-14.txt) | Observed help; behavior pending |
| CLI-478 | `ultrareview --no-post` | [local help](observations/help-ultrareview-2026-09-14.txt) | Observed help; behavior pending |
| CLI-479 | `ultrareview --post` | [local help](observations/help-ultrareview-2026-09-14.txt) | Observed help; behavior pending |
| CLI-480 | `ultrareview --timeout` | [local help](observations/help-ultrareview-2026-09-14.txt) | Observed help; behavior pending |
| CLI-481 | `update -h, --help` | [local help](observations/help-update-2026-09-14.txt) | Observed help; behavior pending |

## Additional installed-help option aliases

These inputs are printed by installed 2.1.270 help but were missed in the first command-option pass. Deprecated aliases remain separate leaves because their parser and failure behavior can differ from the preferred option. Invocation and result behavior is unobserved.

| ID | Input | Evidence | State |
|----|-------|----------|-------|
| CLI-515 | `daemon stop --keep-workers` | [local help](observations/help-daemon-stop-2026-09-14.txt) | Observed help; supervisor and detached-session outcome pending |
| CLI-516 | `self-hosted-runner --drain-wait-bg-tasks-sec` (deprecated alias for `--drain-wait-sec`) | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; alias acceptance and shutdown behavior pending |
| CLI-517 | `self-hosted-runner --pool-secret-file` (deprecated alias for `--environment-secret-file`) | [local help](observations/help-self-hosted-runner-2026-09-14.txt) | Observed help; alias acceptance and credential handling pending |
| CLI-518 | `self-hosted-runner orchestrator --pool-secret-file` (deprecated alias for `--environment-secret-file`) | [local help](observations/help-self-hosted-runner-orchestrator-2026-09-14.txt) | Observed help; alias acceptance and credential handling pending |
| CLI-563 | `-d` (short alias for `--debug`) | [local help](observations/cli-help-2026-09-14.txt) | Observed help; alias acceptance and filtering behavior pending |
| CLI-564 | `-n` (short alias for `--name`) | [local help](observations/cli-help-2026-09-14.txt) | Observed help; alias acceptance and session naming pending |
| CLI-565 | `-v` (short alias for `--version`) | [local help](observations/cli-help-2026-09-14.txt) | Observed help; alias acceptance and version output pending |
| CLI-566 | `-w` (short alias for `--worktree`) | [local help](observations/cli-help-2026-09-14.txt) | Observed help; alias acceptance and worktree creation pending |

An offline option audit of every captured `help-*.txt` file found no missing nested option names or short aliases. The `help-daemon-status` and `help-daemon-stop` captures print the shared parent daemon help; their `--help, -h` line is the existing daemon help leaf CLI-552, not a separate status or stop option. This audit covers printed help only; it does not close undocumented parser combinations or T002.

The [official CLI reference](https://code.claude.com/docs/en/cli-usage) also distinguishes these startup dispatch inputs. They are documentation-backed candidates for installed 2.1.270; local invocation behavior remains unobserved.

| ID | Input | Documented decision | State |
|----|-------|---------------------|-------|
| CLI-519 | Misspelled CLI subcommand with a close match | Suggest the closest subcommand and exit without starting a session | [Installed typo probe](observations/cli-typo-2026-09-14.txt): exit 1, empty stdout, full guidance on stderr; temporary-home config entries created. Nox matches the diagnostic with executable-name normalization, but side effects differ as [DISC-002](discrepancies.md) |
| CLI-520 | Leading `--dangerously-skip-permissions` before `daemon <subcommand>` | Dispatch the daemon subcommand | [Isolated dispatch probe](observations/cli-daemon-leading-flags-2026-09-14.txt): daemon status reached; exit 1 because supervisor absent |
| CLI-521 | Leading `--allow-dangerously-skip-permissions` before `daemon <subcommand>` | Dispatch the daemon subcommand | [Isolated dispatch probe](observations/cli-daemon-leading-flags-2026-09-14.txt): daemon status reached; exit 1 because supervisor absent |
| CLI-522 | Other leading flag before `daemon <subcommand>` | Start an interactive session rather than dispatching the daemon subcommand | [Isolated `--bare` probe](observations/cli-daemon-leading-flags-2026-09-14.txt): interactive startup reached login check, not daemon status |
| CLI-523 | `daemon stop --any --keep-workers` | Stop an on-demand supervisor while leaving detached sessions running | Documented only; session lifecycle unobserved |
| CLI-524 | `agents --json --all` | Include completed background sessions in the JSON array | Documented only; session lifecycle unobserved |

The [self-hosted environment test reference](https://code.claude.com/docs/en/self-hosted-environments-testing#--environment-dispatch-behavior) documents separate dispatch decisions for the following `--environment` combinations. Creating a session requires an eligible environment and OAuth access; parser decisions have not yet been isolated from that gate.

| ID | Input | Documented decision | State |
|----|-------|---------------------|-------|
| CLI-525 | `--environment` with `--output-format stream-json` | Reject unsupported streaming output | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-526 | `--environment` with `--resume` | Reject resume combination | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-527 | `--environment` with `--continue` | Reject continuation combination | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-528 | `--environment` with `--teleport` | Reject teleport combination | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-529 | `--environment` with `--session-id` | Reject preselected session ID | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-530 | `--environment` with `--init-only` | Reject setup-only combination | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-531 | `--environment` with `--cloud <session ID or URL>` | Reject existing-session target | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-532 | `--environment` with `--cloud <description>` in non-interactive mode | Reject description combination | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): rejected before login; service behavior gated |
| CLI-533 | `--environment` with bare `--cloud` | Treat bare `--cloud` as absent | [Isolated parser trace](observations/cli-environment-preflight-2026-09-14.json): bare flag passed conflict checks and reached login gate; service behavior gated |

## Documented interactive dispatch leaves

The [current command reference](https://code.claude.com/docs/en/commands) distinguishes these dispatch and timing behaviors. They were reviewed on 2026-09-14 against installed release 2.1.270. Documentation establishes candidates, not local behavior or a nox parity result. Each row requires an isolated interaction scenario before implementation.

| ID | Interaction | Documented contract | Evidence state |
|----|-------------|---------------------|----------------|
| CLI-482 | Command token after non-command text | A command is recognized only at the start of a message | Documented only |
| CLI-483 | Text following a command name | Trailing text becomes the command's arguments | Documented only |
| CLI-484 | Consecutive skill invocations at message start | Up to six skills load and receive the trailing arguments | Documented only |
| CLI-485 | Ordinary command submitted during an active response | The command queues until the current turn finishes | Documented only |
| CLI-486 | `/status` during an active response | Runs immediately without interrupting the response | Documented only |
| CLI-487 | `/tasks` during an active response | Runs immediately without interrupting the response | Documented only |
| CLI-488 | `/add-dir` during an active response | Confirm the directory immediately; after confirmation, the next tool call in the same turn may access it | Documented only |
| CLI-489 | `/bug` during an active response | The consent dialog opens immediately | Documented only |
| CLI-490 | `/usage` during an active response | Runs immediately without interrupting the response | Documented only |
| CLI-491 | `/theme` during an active response in fullscreen rendering | The dialog opens immediately without waiting for the turn to finish | Documented only |
| CLI-492 | `/help` during an active response in fullscreen rendering | The dialog opens immediately without waiting for the turn to finish | Documented only |

The same reference documents menu matching separately from command execution. These cases need distinct menu and submitted-text comparisons.

| ID | Interaction | Documented contract | Evidence state |
|----|-------------|---------------------|----------------|
| CLI-501 | Partial command name or alias with matching prefix or word | Highlight the top suggestion, ignoring `:`, `_`, and `-` separators; `Enter` runs it | Documented only |
| CLI-502 | Misspelled command with close menu matches | Do not highlight a suggestion; `Tab` or arrows can select one, while `Enter` submits the typed text and reports an unknown command | Documented only |
| CLI-503 | Unavailable command queried in the menu | Omit it; show a no-match message when no available command matches | Documented only |
| CLI-504 | Hidden available command queried by partial name | Omit it until its full name is typed | Documented only |
| CLI-505 | Hidden available command queried by full name | Show it and allow execution | Documented only |

## Documented CLI launch forms

The [official CLI reference](https://code.claude.com/docs/en/cli-usage) also documents these startup forms. They are separate input and session-lifecycle candidates; no model-backed outcome has been observed locally.

| ID | Input form | Documented outcome | Evidence state |
|----|------------|--------------------|----------------|
| CLI-506 | No prompt or mode flag | Start an interactive session | Documented only |
| CLI-507 | Positional prompt | Start an interactive session with that initial prompt | Documented only |
| CLI-508 | `-p` with a positional prompt | Run the query non-interactively, then exit | Documented only |
| CLI-509 | Piped stdin with `-p` and a prompt | Process the piped content with the query | Documented only |
| CLI-510 | `-c` without a new prompt | Continue the most recent conversation in the current directory | Documented only |
| CLI-511 | `-c -p` with a prompt | Continue that conversation non-interactively | Documented only |
| CLI-512 | `-r` with a session ID or name and a prompt | Resume that session and submit the prompt | Documented only |

## Remaining discovery work

The [official CLI reference](https://code.claude.com/docs/en/cli-usage) says help is incomplete. This table has not been reconciled against every documented flag and command, nor every command-specific option, alias, combination, and failure. Do not mark T002 complete.
