# Automation and Integration Discovery

**Status**: Discovery only. Sources: [platforms](https://code.claude.com/docs/en/platforms), [headless use](https://code.claude.com/docs/en/headless), [remote control](https://code.claude.com/docs/en/remote-control), [web sessions](https://code.claude.com/docs/en/claude-code-on-the-web), [worktrees](https://code.claude.com/docs/en/worktrees), [Chrome](https://code.claude.com/docs/en/chrome), [desktop](https://code.claude.com/docs/en/desktop), and [CLI reference](https://code.claude.com/docs/en/cli-usage).

| ID | Capability | Required observation | Availability |
|----|------------|----------------------|--------------|
| SUR-001 | Text, JSON, and stream-JSON print output | Message order, schema, errors, exit status | Local, unverified |
| SUR-002 | Stream input and partial messages | Framing, replay, interruption, backpressure | Local, unverified |
| SUR-003 | Structured output and budget | Validation, exhaustion, exit status | Account-gated, unverified |
| SUR-004 | Background sessions and agent view | Start, list, attach, logs, stop, restart, remove | Local, unverified |
| SUR-005 | Worktrees and terminal panes | Creation, isolation, PR/MR refs, cleanup | Environment-gated, unverified |
| SUR-006 | Remote control and cloud/teleport | Start, attach, handoff, authentication, disconnect | Service-gated, unverified |
| SUR-007 | Hosted reviews and routines | Dispatch, reports, posting, scheduling | Service-gated, unverified |
| SUR-008 | IDE, browser, computer-use integration | Connection, permission, actions, disconnect | Platform/service-gated, unverified |
| SUR-009 | Desktop, web, mobile, Slack, CI surfaces | Session continuity, tasks, notifications | Platform/service-gated, unverified |
| SUR-010 | Auth, diagnostics, import, update, project state | Subcommands, options, state changes, errors | Mixed, unverified |
| SUR-011 | Enterprise gateway and self-hosted runners | Configuration, policy, lifecycle, telemetry | Policy-gated, unverified |
| SUR-012 | Artifacts and deep links | Creation, sharing, launch, permissions | Service-gated, unverified |

Each row is a domain seed. The remote and account-gated capabilities have not been observed, and the command-specific option sets remain to be expanded before T005 is complete.

## Background session leaves (SUR-004)

Source: [current agent-view guide](https://code.claude.com/docs/en/agent-view), read 2026-09-14; [installed 2.1.270 help](observations/help-agents-2026-09-14.txt) and [top-level help](observations/cli-help-2026-09-14.txt). These are documented candidate contracts, not local execution traces. The guide describes a research-preview surface whose behavior may differ from the installed release. Each row needs a disposable, model-capable observation and a failure/interaction scenario before implementation. The proposed nox controls use nox naming and Pi terminal presentation.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-BG-001 | Open agent view; accept or decline workspace trust | Trusted view lists local sessions across projects; decline exits without opening | Untrusted project and empty list | Installed help; model-backed behavior gated; `nox agents` |
| SUR-BG-002 | Dispatch a prompt from agent view; repeat | Each submission creates a distinct local background conversation and a state row | Too-short prompt, failed dispatch, quota exhaustion | Usage-gated; agent-view composer |
| SUR-BG-003 | Launch with `--bg` and positional prompt, optionally `--agent` | Print short ID; supervisor hosts session without an attached terminal | Unknown agent and `--bg --print` rejection before creation | Usage-gated; `nox --background` |
| SUR-BG-004 | Detach an active session with `/background` or `/bg`, optionally with one final prompt | Conversation and eligible running work continue; terminal returns or opens view | Unsent input, nontransferable work, confirmation refusal | Usage-gated; `/background` in Pi composer |
| SUR-BG-005 | Press left arrow on an empty prompt to detach | View opens and attached conversation becomes a row | In-flight tool wait, repeated detach, switch cancellation | Usage-gated; Pi keybinding |
| SUR-BG-006 | Fork a conversation with `/fork` | Independent background copy carries prior transcript and session controls | Copy failure, missing agent, worktree creation | Version 2.1.212+ documented; `/fork` |
| SUR-BG-007 | Resume a full session ID with `--bg --resume` | Same ID continues if available; otherwise new ID and explanatory note | Busy original, name/path/bare resume creates copy | Version 2.1.257+ documented; `nox --background --resume` |
| SUR-BG-008 | Open view, select row, inspect state and summary | Grouped state, age, activity, input need, and completed result update | Supervisor unavailable, stale or truncated summary | Usage-gated; Pi-styled agent list |
| SUR-BG-009 | Filter view with `--cwd`; group, pin, reorder, rename, collapse | List layout and stored organization change without changing sessions | Invalid path or missing row | Help confirms `--cwd`; Pi-styled agent list controls |
| SUR-BG-010 | Open peek panel and reply to a row, including a choice or permission question | Reply reaches selected session without taking over terminal | Delivery failure saves ordinary reply; shell-prefixed reply is not saved | Usage-gated; Pi-styled peek and reply |
| SUR-BG-011 | Attach selected row or run `attach <id>` | Full conversation replaces view, with recap; detach returns to list | Already-open conversation, absent transcript, stopped process | Installed help; `nox attach` |
| SUR-BG-012 | Run `agents --json`, optionally `--all` or `--cwd` | JSON session records; `--all` adds completed background rows | Empty array, invalid filter, supervisor failure | Installed help; `nox agents --json` |
| SUR-BG-013 | Run `logs <id>` or select a row's recent output | Recent terminal output is shown without attaching | Unknown ID, unavailable output | Installed help; `nox logs` |
| SUR-BG-014 | Run `stop`/`kill <id>` | Process stops; saved conversation remains resumable | Unknown ID, already stopped, worktree preservation | Installed help; `nox stop` |
| SUR-BG-015 | Run `respawn <id>` or `respawn --all` | Session process restarts from saved conversation or original prompt | Missing saved transcript, partial restart, supervisor loss | Installed help; `nox respawn` |
| SUR-BG-016 | Run `rm <id>` | Row removed; safe owned worktree cleanup; transcript remains resumable | Unpushed commits, another claimant, removal hook failure | Installed help; `nox rm` with explicit cleanup confirmation |
| SUR-BG-017 | Resume after machine sleep, shutdown, or idle process exit | Supervisor reconnects or restarts process and retains session state | Unresponsive turn, stopped row, expired idle process | Local platform and usage-gated; `nox agents` recovery |
| SUR-BG-018 | Start or inspect supervisor through agent view or `daemon status` | Per-user host manages sessions, status reports worker count | Startup timeout, host crash, stale socket | Local platform-gated; nox supervisor/status |
| SUR-BG-019 | Dispatch a repository-editing session | Shared checkout write is blocked until isolated worktree is created | Worktree conflict or cleanup refusal | Git repository required; nox worktree isolation |

The current guide also describes row summaries, pull-request badges, notification hooks, model and permission inheritance, settings/plugin/MCP propagation, terminal-host recovery, and agent-view keyboard controls. T005 must split those interactions and reconcile their installed-version availability before SUR-004 is complete. No session was dispatched for this inventory because that would spend the reported capped usage.

## Non-interactive protocol leaves (SUR-001 and SUR-002)

Source: [current programmatic-use guide](https://code.claude.com/docs/en/headless), read 2026-09-14, plus [installed help](observations/cli-help-2026-09-14.txt). The installed CLI advertises `-p`, `--input-format`, `--output-format`, partial messages, hook events, and replay. These rows are documentation candidates; no model-backed output or stream was recorded.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-PRINT-001 | Run `-p` with a positional prompt | Plain text result on stdout and exit after one run | Invalid flag on stderr before run; in-run failure on stdout with nonzero exit | Usage-gated; `nox -p` |
| SUR-PRINT-002 | Pipe text into `-p` with a prompt | Stdin joins request; response goes to selected output | Input above 10 MB fails; unreadable stdin warns and continues with positional prompt | Usage-gated; `nox -p` stdin |
| SUR-PRINT-003 | Select `--output-format json` | One JSON result with text, session and usage metadata | Model/tool failure payload and exit status | Usage-gated; `nox -p --output-format json` |
| SUR-PRINT-004 | Select `--output-format stream-json` | Ordered newline-delimited events ending in result and metadata | Slow consumer, broken pipe, truncated terminal stream | Usage-gated; `nox -p --output-format stream-json` |
| SUR-PRINT-005 | Add `--verbose --include-partial-messages` to stream output | Partial text delta events arrive before complete message | Empty delta, interrupted stream, terminal result after backpressure | Usage-gated; nox stream option |
| SUR-PRINT-006 | Supply valid `--json-schema` with JSON output | `structured_output` follows the schema while metadata remains available | Invalid schema rejected before run; format annotation is not enforced | Usage-gated; nox structured output |
| SUR-PRINT-007 | Use `--input-format stream-json` | Framed input messages drive a live print-mode session | Malformed frame, EOF, slow producer, interruption | Usage-gated; nox stream input |
| SUR-PRINT-008 | Enable `--replay-user-messages` with stream input and output | Input user messages reappear on stdout as acknowledgments | Duplicate or malformed input, termination while queued | Usage-gated; nox replay flag |
| SUR-PRINT-009 | Enable `--forward-subagent-text` in stream output | Child text/thinking messages include parent tool-use ID; nested IDs preserve hierarchy | Child failure and mixed parent/child order | Version 2.1.211+ documented; nox forwarding option |
| SUR-PRINT-010 | Enable `--include-hook-events` in stream output | Hook lifecycle events stream around startup and tool activity | Hook denial, invalid output, slow progress | Installed help; nox hook event option |
| SUR-PRINT-011 | Inspect `system/init` in stream output | First ordinary event reports model, tools, extensions, and optional protocol capabilities | Startup event before init; skipped plugin or server error fields | Versioned fields; nox init event |
| SUR-PRINT-012 | Trigger a retryable API failure | `system/api_retry` reports attempt, delay, status, and category before retry | Exhaustion, auth failure, missing response | Usage-gated; nox retry event |
| SUR-PRINT-013 | Send SIGTERM to a running print session | Exit 143; unfinished turn remains resumable; running command tree terminates | Permission prompt unanswered, command killed, `SessionEnd` hook | Local signal plus usage gate; nox process signal behavior |
| SUR-PRINT-014 | Complete print run with background shell task | Shell ends after short post-result grace period | Late output and process cleanup | Usage-gated; nox print lifecycle |
| SUR-PRINT-015 | Complete print run with background subagent/workflow/monitor | Process waits for work, then includes result or times out | Idle ceiling, watch timeout, partial result dropped | Usage-gated; nox print lifecycle |

The same guide calls out CI configuration, bare-mode loading, MCP startup diagnostics, and cloud-session print interactions. They need separate leaves under SUR-003, SUR-006, and SUR-010 where they own state or availability; no broad row above closes those families.

## Worktree leaves (SUR-005)

Source: [current worktree guide](https://code.claude.com/docs/en/worktrees), read 2026-09-14, and installed `--worktree`/`--tmux` help. The guide includes version-dependent changes; each candidate below needs a disposable git repository and installed-version trace. No worktree was created in the user's checkout.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-WT-001 | Launch `--worktree <name>` or `-w <name>` | New isolated directory and branch; session starts there | No git repository, untrusted workspace, invalid name | Git required; `nox --worktree` |
| SUR-WT-002 | Launch unnamed `--worktree` | Generated name and isolated checkout | Name collision and creation failure | Git required; `nox --worktree` |
| SUR-WT-003 | Combine `--worktree` with `--tmux` | Terminal pane/session opens in worktree | tmux unavailable or unsupported terminal | Platform-gated; Pi terminal pane option |
| SUR-WT-004 | Request `EnterWorktree` during a session | Working directory, file access, and project settings move to target | Outside managed directory requires approval; denial leaves original location | Git or custom hook; nox worktree tool |
| SUR-WT-005 | Request `ExitWorktree` | Session returns to original checkout; transcript follows location | Missing original directory or inactive worktree | Worktree session; nox worktree tool |
| SUR-WT-006 | Exit a clean interactive worktree session | Unnamed worktree and branch removed; named worktree asks first | Cleanup failure and keep choice | Git required; Pi exit prompt |
| SUR-WT-007 | Exit a worktree with changes or commits | Prompt to keep or remove files and branch | Decline removal, untracked/committed work | Git required; Pi exit prompt |
| SUR-WT-008 | Finish `-p --worktree` | Worktree stays on disk without interactive cleanup prompt | Stale lock and later manual removal | Git required; `nox -p --worktree` |
| SUR-WT-009 | Resume or continue a saved worktree session | Re-enter verified separate checkout and restore transcript location | Deleted/unverifiable worktree falls back or refuses with explanation | Git required; nox resume |
| SUR-WT-010 | Run file-edit tool from isolated session against main checkout | Tool call refused; no main-checkout write | Symlink/path traversal and subagent attempt | Worktree active; nox tool authorization |
| SUR-WT-011 | Run command or git redirect targeting main checkout | Unsafe command refused with recoverable guidance | Indirect `git -C`, environment redirects, unparsable command | Worktree active; nox command authorization |
| SUR-WT-012 | Start a subagent with worktree isolation | Separate temporary worktree; clean result removed, changed result retained | Child failure, concurrent cleanup | Git and agent support; nox agent isolation |
| SUR-WT-013 | Configure `worktree.baseRef` as fresh or head | New branch starts from default remote or current HEAD | Fetch timeout, missing remote, invalid value | Git required; nox worktree setting |
| SUR-WT-014 | Launch `--worktree` with PR/MR number or URL | Fetch matching head from origin and create reference-named worktree | Unknown ref, unsupported host, fetch denial | Remote Git service; nox worktree reference |
| SUR-WT-015 | Add `.worktreeinclude` patterns | Only matching ignored files copied into new worktree | Invalid pattern, ignored directory edge, sensitive-file exposure | Git required; nox worktree include rules |
| SUR-WT-016 | Reuse an existing worktree name | Safe clean worktree may reset to fresh base; otherwise old tip retained | Unverifiable state, own commits, branch mismatch | Git required; nox worktree reuse |
| SUR-WT-017 | Run periodic cleanup for agent/background worktrees | Old safe worktrees removed; active locks and user-owned or dirty work preserved | Stale lock, filter-driver uncertainty, unpushed commits | Git and background service; nox cleanup |

Custom creation hooks, non-git VCS adapters, environment setup, and the detailed worktree troubleshooting states still need separate leaves. T005 remains open.
