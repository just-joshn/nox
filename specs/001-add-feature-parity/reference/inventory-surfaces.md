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
