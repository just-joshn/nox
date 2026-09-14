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
| SUR-BG-003 | Launch with `--bg` and positional prompt, optionally `--agent` | Print short ID; supervisor hosts session without an attached terminal | Unknown agent; [`--bg --print` rejection observed](observations/background-print-conflict-2026-09-14.txt) | Successful launch usage-gated; `nox --background` |
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

## Structured result and limit leaves (SUR-003)

Source: [current CLI reference](https://code.claude.com/docs/en/cli-usage) and [programmatic-use guide](https://code.claude.com/docs/en/headless), read 2026-09-14. The installed help advertises schema and budget flags, but their run outcomes need a model-capable trace.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-LIMIT-001 | `-p --json-schema` with valid schema | Final JSON includes schema-matched structured output and metadata | Model cannot satisfy schema or run fails | Usage-gated; nox structured result |
| SUR-LIMIT-002 | `-p --json-schema` with invalid schema | Reject before model run with validator diagnostic and nonzero exit | Empty schema, unsupported keyword, format annotation | [Malformed JSON observed locally](observations/schema-invalid-2026-09-14.txt); other variants pending; nox schema validation |
| SUR-LIMIT-003 | Inspect `total_cost_usd` and per-model usage in JSON result | Client estimates reflect run and child activity | Missing/partial usage after failure; billing mismatch is documented | Usage-gated; nox usage result |
| SUR-LIMIT-004 | `-p --max-budget-usd` with bounded main run | Stop further API work when estimated spend reaches cap | Zero/invalid value, threshold crossing, error and exit shape | Usage-gated; nox budget flag |
| SUR-LIMIT-005 | Spawn child work under print-mode budget | Child spend counts; further child spawn fails at cap and running background children stop | Multiple children crossing cap concurrently | Version 2.1.217+ documented; nox shared budget |
| SUR-LIMIT-006 | `-p --max-turns` with bounded run | Error when turn limit reached; queued stream message starts another turn with its own limit | Zero/invalid value and queued message at boundary | Documented flag absent from installed help; nox turn limit pending parser confirmation |

Budget and usage records must use synthetic provider responses in nox tests and redacted reference traces; no ad hoc paid threshold probe is authorized while the reported weekly cap is active.

## Remote-control leaves (SUR-006)

Source: [current remote-control guide](https://code.claude.com/docs/en/remote-control), read 2026-09-14. Installed `remote-control --help` failed its account gate before printing help; [the raw observation](observations/help-remote-control-2026-09-14.txt) is discovery evidence for that failure only. Remote sessions execute locally while browser/mobile devices provide another interface. The controls below are candidate nox surfaces; service behavior remains `gated-unverified`.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-RC-001 | Start `remote-control` server; accept one-time confirmation | Local server runs and displays session URL/QR; decline exits without server | Ineligible account, untrusted workspace, declined consent | Subscription and policy gate; `nox remote-control` |
| SUR-RC-002 | Start interactive session with `--remote-control` and optional name | Local TUI remains usable while remote device connects | Eligibility failure notifies after interactive start | Subscription and policy gate; `nox --remote-control` |
| SUR-RC-003 | Toggle `/remote-control` or `/rc` in an active session | Existing conversation becomes remotely accessible or disconnects | Declined consent, failed connect, repeated toggle | Subscription and policy gate; Pi command |
| SUR-RC-004 | Connect from browser or mobile using URL/QR | Same local session, tools, files, and progress visible on both surfaces | Invalid link, expired session, unauthorized device | Service/client gate; nox remote link |
| SUR-RC-005 | Send prompt or permission response from either surface | One shared conversation state and ordered tool decisions | Simultaneous messages and dropped device | Service/client gate; nox session sync |
| SUR-RC-006 | Upload image or file from remote device | Image enters message; other file downloads locally and is referenced | Invalid file, oversized upload, failed download | Service/client gate; nox attachment transport |
| SUR-RC-007 | Lose network or sleep, then reconnect | Messages, permission prompts, and subtask status queue and replay | Duplicate or stale operation after reconnect | Service/client gate; nox reconnection |
| SUR-RC-008 | Open local connection-status panel or indicator | Link/QR/status shown; failure reason persists in UI | Narrow terminal hides indicator; takeover or missing remote session | Service/client gate; Pi-styled status |
| SUR-RC-009 | Resume server with `--continue` or `--session-id` | Prior served session returns if eligible | Conflicting spawn/capacity flags, absent session | Version 2.1.200+ documented; nox server resume |
| SUR-RC-010 | Configure `--spawn` same-dir, worktree, or session | On-demand sessions share directory, isolate, or reject extras | Missing git repository, concurrent edits, unsupported mode | Service and git gate; nox server spawn mode |
| SUR-RC-011 | Configure capacity and pre-created session | Concurrent sessions limited; optional first session starts in current directory | Limit reached, incompatible single-session mode | Service gate; nox server capacity |
| SUR-RC-012 | Configure server permission mode or sandbox | Created sessions inherit controls | Invalid mode, denied tool, sandbox refusal | Policy gate; nox server policy |
| SUR-RC-013 | Place global flag before server subcommand | Allowed global flags pass; settings-affecting flags reject before server start | Dropped setting, mixed argument order | Installed help unavailable; nox argument validation |
| SUR-RC-014 | Attempt use with API key, alternate API endpoint, disabled feature flags, or managed policy | Eligibility refusal; no remote session created | Recover with eligible login/configuration or admin enablement | Account/policy gate; nox eligibility check |
| SUR-RC-015 | End, archive, or take over session from another device | Local indicator and link update while local process continues or reopens | Missing server record, conflicting takeover | Service/client gate; nox remote status |

Trusted-device enrollment, mobile push notifications, web-cloud session creation, teleport, and remote troubleshooting need separate leaves. T005 and T010 remain open.

## Cloud-session and teleport leaves (SUR-006)

Source: [current web-session guide](https://code.claude.com/docs/en/claude-code-on-the-web), read 2026-09-14, and installed `--cloud`, `--environment`, and `--teleport` help. Cloud tasks run in hosted or organization-managed environments; they are distinct from the local execution in SUR-RC. All result contracts below remain service-gated and unobserved.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-CLOUD-001 | Launch `--cloud <task>` in a GitHub-backed repository | Hosted session clones current remote branch and runs independently | Unpushed local changes absent; wrong repository or missing access | Eligible account and policy; `nox --cloud` |
| SUR-CLOUD-002 | Launch multiple `--cloud` tasks | Separate concurrent hosted sessions and IDs | Quota, capacity, partial startup failure | Eligible account; nox cloud task list |
| SUR-CLOUD-003 | Launch with `--environment <id>` | Chosen cloud environment supplies network, variables, and setup | Unknown environment or setup failure | Environment access; nox environment selector |
| SUR-CLOUD-004 | Launch without usable GitHub remote or app access | Local tracked history and tracked edits bundle and upload | Sensitive-file exclusion, untracked omission, size fallback or failure | Eligible account; nox bundle upload |
| SUR-CLOUD-005 | Send `-p <message> --cloud <id-or-url>` | Follow-up queues in existing cloud session and command exits; JSON result optional | Missing/archived session, policy refusal, unsupported stream JSON | Eligible account; nox cloud message |
| SUR-CLOUD-006 | Enter prompt during cloud provisioning | Message queues until environment is ready | Provisioning failure, duplicate send, cancellation | Eligible account; nox cloud composer |
| SUR-CLOUD-007 | Open task from browser/mobile | Review progress, answer questions, steer after local terminal closes | Environment expiry, permission denial, disconnected client | Service/client gate; nox cloud session view |
| SUR-CLOUD-008 | Use `--teleport <id>` or picker | Verify repository, fetch branch, restore conversation in local terminal copy | Dirty checkout offers stash; wrong repo, unpushed branch, account mismatch | Eligible account and git; `nox --teleport` |
| SUR-CLOUD-009 | Use `/teleport` or `/tp` inside terminal | Picker opens and selected cloud session becomes local copy | No eligible sessions, unavailable subscription | Eligible account; Pi command |
| SUR-CLOUD-010 | Continue work after teleport | Local copy evolves independently of hosted conversation | Later cloud change does not merge automatically | Eligible account; nox local session |
| SUR-CLOUD-011 | Select cloud permission mode at creation or while running | Mode governs tools and persists across environment restart | Denial, expired environment, released runner | Service gate; nox cloud mode control |
| SUR-CLOUD-012 | Use cloud session context commands | `/compact` and `/context` work; terminal-only pickers adapt or are absent | Invalid command, unavailable model/effort setting | Service gate; nox cloud commands |
| SUR-CLOUD-013 | Review hosted diff and leave inline feedback | Diff and comments are shown; next prompt can send feedback | Non-checkout file and custom diff-driver cases | Service/client gate; nox cloud diff view |
| SUR-CLOUD-014 | Share, archive, or delete a hosted session | Visibility, retention, and access state change | Recipient access denial, archived follow-up refusal | Plan/policy gate; nox cloud session controls |
| SUR-CLOUD-015 | Attempt cloud use with unsupported provider, account, or policy | Creation or send refuses with explicit reason before task executes | Policy lookup failure, third-party provider, missing login | Account/policy gate; nox eligibility check |

Cloud environment configuration, repository authorization, hosted review, auto-fix, CI, mobile and desktop UI details, and each sharing variant still need distinct leaves under their owning surface seeds. No cloud session was created during this inventory.

## Hosted review and routine leaves (SUR-007)

Sources: [current hosted-review guide](https://code.claude.com/docs/en/ultrareview) and [current routines guide](https://code.claude.com/docs/en/routines), read 2026-09-14; installed `ultrareview` help. Hosted review may consume usage credits separately from included model usage. No review or routine was launched.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-AUTO-001 | Request hosted review of current branch | Confirmation shows scope, free runs, cost; after consent remote reviewers inspect bundled diff | Empty/oversize diff, no merge base, cancelled consent | Account/credits gate; Pi review command |
| SUR-AUTO-002 | Review explicit base branch | Compare current branch to named base, fetching if needed | Misspelled branch and fetch failure | Account/credits gate; Pi review command |
| SUR-AUTO-003 | Review PR number or URL | Remote sandbox clones PR; local working tree not uploaded | Missing access, wrong repository, unsupported host | Git service/account gate; Pi review command |
| SUR-AUTO-004 | Run `ultrareview` subcommand in a script | Block until findings; formatted or JSON output; progress on stderr | Timeout exit 1, interrupt exit 130 while remote review continues | Account/credits gate; `nox ultrareview` |
| SUR-AUTO-005 | Choose post/no-post for a PR review | Finished findings post only with explicit per-run choice | Session closes, review fails, unsupported target, post fails | Git service/account gate; nox review posting choice |
| SUR-AUTO-006 | Track or stop a running review | Background task status and verified findings notification | Stop archives remote run without partial findings | Account/credits gate; Pi tasks view |
| SUR-AUTO-007 | Encounter unavailable hosted review | Local review fallback or billing/auth refusal, per availability | No credits, unsupported provider, zero-data-retention policy | Plan/policy gate; Pi review fallback |
| SUR-AUTO-008 | Create routine in web or via `/schedule` | Saved prompt, repositories, environment, connectors, and trigger | Missing repo access, invalid configuration | Web entitlement; nox routine setup |
| SUR-AUTO-009 | Add recurring or one-off schedule trigger | Cloud run starts near local wall-clock time; one-off disables after firing | Invalid cron below one-hour minimum, timezone boundary | Web entitlement; nox schedule control |
| SUR-AUTO-010 | Add API trigger and invoke endpoint | Authenticated POST creates a run session | Missing/invalid token, duplicate request, rate limit | Web entitlement; nox routine API |
| SUR-AUTO-011 | Add GitHub event trigger with filters | Matching repository event creates a run session | Nonmatching event, inaccessible repo, duplicate delivery | Git integration; nox event trigger |
| SUR-AUTO-012 | Run routine immediately, list, pause, update, or resume | Saved configuration retained; each run has its own session | Invalid update, disabled trigger, missing routine | Web entitlement; nox routine controls |
| SUR-AUTO-013 | Review and continue a routine run | Session history, changes, and PR action available | Run failure, archived or deleted session | Web entitlement; nox run view |
| SUR-AUTO-014 | Configure routine connectors and branch permissions | Run receives selected tools and permitted push scope | Unauthorized connector write or protected branch | Organization/policy gate; nox routine permissions |

Automatic PR repair, inline code-review integration, routine API payloads and status codes, event filter variants, and billing boundaries need separate leaves before SUR-007 is complete.

## Browser and editor integration leaves (SUR-008)

Sources: [current browser guide](https://code.claude.com/docs/en/chrome) and [current editor guide](https://code.claude.com/docs/en/ide-integrations), read 2026-09-14. Installed `--chrome`, `--no-chrome`, and `--ide` help corroborate launch controls only. No browser extension or editor session was connected for this inventory.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-INT-001 | Start with `--chrome` and accept one-time setup | Browser extension connects and tool set becomes available | Missing extension, declined setup, unsupported provider | Browser, extension, account gate; `nox --browser` |
| SUR-INT-002 | Use `/chrome` to inspect, reconnect, or select browser | Connection and chosen browser persist for session | Multiple browsers, disconnection, extension not installed | Browser gate; Pi browser status command |
| SUR-INT-003 | Request browser action on a site | New visible tab opens; navigation, DOM, console, click and typing use signed-in browser state | Site denial, CAPTCHA/login pause, browser permission refusal | Browser/site gate; nox browser tools |
| SUR-INT-004 | Grant or deny site/browser action | Session/site permission controls subsequent actions | Plan-mode prompt, denied site, policy-blocked extension | Browser/policy gate; nox browser permissions |
| SUR-INT-005 | Upload local file through browser | Allowed file bytes reach page upload field | Read denial, total over 10 MB, multiply linked file | Browser/site gate; nox upload tool |
| SUR-INT-006 | Save screenshot or record GIF | Local artifact path and visible browser content captured | Write failure, sensitive content in recording, denied capture | Browser gate; nox capture tool |
| SUR-INT-007 | Clear, resume, or exit session with browser tabs | Session tab group closes or remains according to active work/content | Orphan group or lost connection | Browser gate; nox browser lifecycle |
| SUR-INT-008 | Launch with `--ide` or inside integrated editor terminal | One detected editor connects; diffs and diagnostics route through editor | No editor, more than one, stale connection | Editor platform gate; `nox --ide` |
| SUR-INT-009 | Open graphical editor chat and send prompt | Editor panel shows conversation and permission controls | Sign-in failure, restricted workspace, panel reload | Editor extension/account gate; nox editor client |
| SUR-INT-010 | Inspect proposed edit in native diff | Accept, reject, or change proposal before application | Modified proposal, denied edit, stale source | Editor gate; nox diff bridge |
| SUR-INT-011 | Send selected text or active file with a CLI prompt | Editor context reaches agent unless read rule denies path | Sensitive selection excluded by deny rule; stale selection | Editor gate; nox selection bridge |
| SUR-INT-012 | Request diagnostics or notebook execution via editor bridge | Problems data returns; execution requires protected action | Kernel absent, permission denial, bridge auth failure | Editor/Jupyter gate; nox editor tools |
| SUR-INT-013 | Continue editor conversation in CLI or vice versa | Shared local session history resumes in chosen interface | Missing session, simultaneous open, reload recovery | Editor gate; nox session bridge |
| SUR-INT-014 | Reference `@terminal:<name>` in editor prompt | Named terminal output enters prompt context | Missing terminal, stale output, sensitive logs | Editor gate; nox terminal context |

Detailed VS Code layout, themes, shortcuts, focus/accessibility, browser tool list, and other editor/browser variants remain to be split. The editor bridge's local token and selected-text disclosure are security-sensitive observations requiring synthetic data.

## Local account and maintenance leaves (SUR-010)

Sources: [current CLI reference](https://code.claude.com/docs/en/cli-usage), [local-state guide](https://code.claude.com/docs/en/claude-directory), and installed help for [authentication](observations/help-auth-2026-09-14.txt), [import](observations/help-import-2026-09-14.txt), [diagnostics](observations/help-doctor-2026-09-14.txt), and [project purge](observations/help-project-purge-2026-09-14.txt). Help reveals the command tree, not side-effect behavior; no credentials or user state were changed.

| Leaf ID | Entry and intermediate interaction | Result and side effect | Failure or recovery to observe | Availability; proposed nox control |
| --- | --- | --- | --- | --- |
| SUR-MAINT-001 | Run `auth login` with optional email, SSO, or console mode | Account login stored for future sessions | Browser callback failure, pasted-code recovery, denied account | Account/network gate; `nox auth login` |
| SUR-MAINT-002 | Run `auth logout` | Saved login cleared without deleting project sessions | Already logged out, storage failure | Account gate; `nox auth logout` |
| SUR-MAINT-003 | Run `auth status` with JSON or text output | Auth state shown; exit 0 when logged in, 1 otherwise | Expired credentials and redaction | Local; `nox auth status` |
| SUR-MAINT-004 | Run CLI `doctor` in a project | Read-only health report, including settings read before trust | Invalid settings, unavailable dependency | Local; `nox doctor` |
| SUR-MAINT-005 | Run interactive `/doctor` | Guided full checkup may propose repairs | Declined fix, failed repair, repeated check | Local/account conditions; Pi command |
| SUR-MAINT-006 | Run `import [source] --dry-run` | Preview candidate configuration without writes | Unknown source, malformed source settings | Local; `nox import --dry-run` |
| SUR-MAINT-007 | Confirm `import [source]`, optionally with digest | Selected configuration copied into nox scope | Conflict, cancellation, stale digest, partial import | Local; `nox import` |
| SUR-MAINT-008 | Run `update`/`upgrade` or `install [target]` | Binary version changes after download and verification | No update, invalid target, interrupted install | Network/platform gate; `nox update` |
| SUR-MAINT-009 | Run `project purge [path] --dry-run` | List project-scoped transcripts, tasks, file history, and config entry without deleting | No match exits 1; global-only paths excluded | Local; `nox project purge --dry-run` |
| SUR-MAINT-010 | Confirm `project purge` with `--yes`, `--interactive`, or `--all` | Selected project data removed; all-project mode also removes history file | Cancel, item failure, unmatched path, protected data retention | Local destructive action; `nox project purge` |
| SUR-MAINT-011 | Run `setup-token` | Long-lived token printed without saving it | Ineligible subscription, interrupted flow, output disclosure | Account gate; `nox setup-token` |

Auth provider variants, installer channels, project-state diagnostic details, import source mappings, and state-redaction scenarios still need separate leaves before SUR-010 is complete. Purge and token generation were deliberately not invoked on the user's real home.
