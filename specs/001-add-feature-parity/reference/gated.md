# Gated Reference Evidence

**Snapshot**: Installed release 2.1.270 on 2026-09-14. This is a partial access-gap register. A documented capability or successful CLI help exit is not an observed behavior comparison. Every inaccessible leaf stays `gated-unverified` and blocks an unqualified complete-parity claim until its required scenarios pass.

| Leaf ID | Current evidence gap | Access or observation needed |
|---------|----------------------|------------------------------|
| CLI-098 | `remote-control --help` exited before help with an account-login requirement | Eligible authenticated account, then safe help and isolated start/attach/failure observations |
| EXT-034 | Bundled skill is documented as gated; invocation unobserved | Eligible account and isolated invocation fixture after availability is confirmed |
| US1-READ-001 | No tool-dispatch trace; prior sandbox request stopped at authentication | Restored usage allowance and an authorized disposable repository read fixture |
| US1-SEARCH-PATH-001 | Installed path-search availability and behavior unobserved | Restored usage allowance and matched path/no-match/invalid-pattern fixtures |
| US1-SEARCH-CONTENT-001 | Installed content-search availability and behavior unobserved | Restored usage allowance and matched content/no-match/invalid-pattern fixtures |
| US1-EDIT-001 | Edit approval and side effects unobserved | Restored usage allowance and disposable edit/denial/failure fixtures |
| US1-COMMAND-001 | Command approval, output, exit, and interruption unobserved | Restored usage allowance and harmless command fixtures |
| US1-DENY-001 | Denial prompt and post-denial state unobserved | Restored usage allowance and refused edit in a disposable repository |
| US1-FAIL-001 | Nonzero command result and side effects unobserved | Restored usage allowance and harmless failing command fixture |
| US1-RECOVER-001 | Same-session recovery after failure unobserved | Restored usage allowance and continuation after the failing command fixture |
| SUR-BG-001 | Agent-view trust and empty-state behavior is documentation-only | Isolated home/project; inspect trust accept/decline and empty list without dispatch |
| SUR-BG-002 | Agent-view dispatch and row updates require model usage | Restored allowance; dispatch two harmless disposable prompts and a too-short prompt |
| SUR-BG-003 | Background CLI launch and selected-agent behavior require model usage; `--bg --print` conflict observed locally | Restored allowance; isolated successful `--bg` launch and unknown-agent case |
| SUR-BG-004 | Session `/background` transfer and refusal have no local trace | Restored allowance; disposable active session with pending and transferable work |
| SUR-BG-005 | Left-arrow detach timing and cancellation have no local trace | Restored allowance; active tool, unsent input, and empty composer fixtures |
| SUR-BG-006 | `/fork` copy and worktree behavior have no local trace | Restored allowance; isolated conversation fork and failure fixture; confirm installed version semantics |
| SUR-BG-007 | `--bg --resume` same-ID/copy distinction has no local trace | Restored allowance; isolated saved session, busy session, name/path, and `--fork-session` cases |
| SUR-BG-008 | Row grouping, age, state, and summary have no local trace | Restored allowance; working, blocked, completed, failed, and stopped sessions |
| SUR-BG-009 | View organization controls have no local trace | At least two isolated sessions; filter, pin, reorder, rename, collapse, and reload |
| SUR-BG-010 | Peek, reply, permission choice, and delivery failure have no local trace | Restored allowance; blocked synthetic question and interrupted supervisor fixture |
| SUR-BG-011 | Attach, recap, detach, and invalid transcript cases have no local trace | Restored allowance; saved background session, invalid ID, already-open and absent transcript fixtures |
| SUR-BG-012 | JSON listing shape and filters have not been safely captured | Isolated home; inspect empty/nonempty `--json`, `--all`, `--cwd`, and failure without recording private metadata |
| SUR-BG-013 | Recent-output and missing-ID behavior has no local trace | Isolated background session with synthetic output; `logs` before/after stop and unknown ID |
| SUR-BG-014 | Stop persistence and idempotence have no local trace | Isolated saved session; stop, repeat, resume, and inspect worktree |
| SUR-BG-015 | Respawn from transcript or original prompt has no local trace | Restored allowance; stopped session with/without saved transcript and `--all` fixture |
| SUR-BG-016 | Removal safety and transcript retention have no local trace | Disposable git worktrees with pushed/unpushed state; explicit cleanup fixture only |
| SUR-BG-017 | Sleep/shutdown/idle recovery has no local trace | Controlled supervisor restart and idle fixture; physical sleep observation where safe |
| SUR-BG-018 | Supervisor status, startup, and failure behavior has no local trace | Isolated home; status and safe startup/restart fixture without affecting existing sessions |
| SUR-BG-019 | Shared-checkout write isolation has no local trace | Restored allowance; disposable repository and edit request, inspect worktree and refusal |
| SUR-PRINT-001 | Plain print result and in-run failure unobserved | Restored allowance; harmless prompt, invalid flag, and synthetic failure fixtures |
| SUR-PRINT-002 | Stdin joining and 10 MB boundary unobserved | Restored allowance; disposable piped input, over-limit input, and unreadable stdin fixtures |
| SUR-PRINT-003 | JSON result schema and failure payload unobserved | Restored allowance; inspect redacted JSON result and failing run |
| SUR-PRINT-004 | Stream event order, terminal result, and backpressure unobserved | Restored allowance; bounded consumer and broken-pipe fixtures |
| SUR-PRINT-005 | Partial delta timing and interrupted result unobserved | Restored allowance; stream with partial messages and controlled interruption |
| SUR-PRINT-006 | Structured output and schema failure unobserved | Restored allowance; valid/invalid schemas and format-annotation fixture |
| SUR-PRINT-007 | Stream-input framing, EOF, and malformed input unobserved | Restored allowance; synthetic JSONL input and interrupted producer |
| SUR-PRINT-008 | Replay acknowledgments and queue behavior unobserved | Restored allowance; two synthetic user frames and malformed/queued variants |
| SUR-PRINT-009 | Child and nested stream forwarding unobserved | Restored allowance; isolated child task with redacted event IDs |
| SUR-PRINT-010 | Hook lifecycle event order and denial unobserved | Restored allowance; safe local hook fixture and rejection trace |
| SUR-PRINT-011 | Installed init metadata and error-field availability unobserved | Restored allowance; synthetic plugin/server configuration and redacted init event |
| SUR-PRINT-012 | Retry event shape and exhaustion unobserved | Controlled test provider or authorized failing endpoint; no paid retry probing |
| SUR-PRINT-013 | SIGTERM exit and unfinished-turn resumption unobserved | Restored allowance; disposable run and controlled signal fixture |
| SUR-PRINT-014 | Background shell grace and cleanup unobserved | Restored allowance; harmless short-lived shell child and process inspection |
| SUR-PRINT-015 | Background child/workflow/monitor wait and idle ceiling unobserved | Restored allowance; bounded synthetic worker and timeout fixture |
| SUR-WT-001 | Named launch and trust/invalid-name behavior unobserved | Disposable git repository, isolated home, restored allowance for session start |
| SUR-WT-002 | Generated-name launch and collision behavior unobserved | Disposable git repository with repeated unnamed starts after allowance returns |
| SUR-WT-003 | tmux pane behavior unobserved | tmux-capable terminal and disposable repository after allowance returns |
| SUR-WT-004 | Enter-worktree approval and state transfer unobserved | Disposable repository with managed/outside paths and denied approval fixture |
| SUR-WT-005 | Exit-worktree transcript and directory transfer unobserved | Saved disposable worktree session and return-path failure fixture |
| SUR-WT-006 | Clean interactive cleanup choices unobserved | Disposable named/unnamed worktrees and interactive exit |
| SUR-WT-007 | Dirty/committed exit choices unobserved | Disposable untracked, modified, and committed worktree fixtures |
| SUR-WT-008 | Print-mode worktree retention and lock unobserved | Restored allowance; disposable `-p --worktree` and lock inspection |
| SUR-WT-009 | Resume validation and missing-worktree recovery unobserved | Saved disposable session, removed or invalidated worktree, then resume |
| SUR-WT-010 | Main-checkout file-write refusal unobserved | Disposable worktree session with direct and symlinked edit attempts |
| SUR-WT-011 | Command-directory and git-redirect refusal unobserved | Disposable worktree session with harmless redirected commands |
| SUR-WT-012 | Child worktree isolation and cleanup unobserved | Restored allowance; disposable child agent with clean and dirty results |
| SUR-WT-013 | Fresh/head base and fallback behavior unobserved | Disposable local/remote refs with failed-fetch and invalid-value variants |
| SUR-WT-014 | PR/MR reference fetch behavior unobserved | Authorized remote fixture or local mock origin with valid and invalid refs |
| SUR-WT-015 | Ignored-file copy and exposure rules unobserved | Synthetic ignored files only; pattern, nested directory, and redaction fixtures |
| SUR-WT-016 | Reuse reset-versus-retain decision unobserved | Disposable clean/dirty/committed worktrees with same name |
| SUR-WT-017 | Periodic sweep and lock protection unobserved | Isolated supervisor and aged synthetic worktrees; do not affect user-owned worktrees |
| SUR-LIMIT-001 | Valid schema response and failure payload unobserved | Restored allowance; synthetic schema with deterministic harmless prompt |
| SUR-LIMIT-002 | Malformed JSON rejection observed; valid JSON with invalid schema and format-annotation behavior remain unobserved | Bare-mode parser fixtures for those variants, followed by model-backed structured result only after allowance returns |
| SUR-LIMIT-003 | Cost metadata and failed-run accounting unobserved | Restored allowance; redacted JSON result and synthetic child activity |
| SUR-LIMIT-004 | Main-run budget threshold and error unobserved | Controlled faux provider or restored allowance with explicit low-cost fixture |
| SUR-LIMIT-005 | Child budget sharing and concurrent cancellation unobserved | Controlled faux provider with multiple children; confirm installed availability |
| SUR-LIMIT-006 | Installed parser availability and turn-limit behavior unobserved | Safe parser check, then restored allowance with queued stream input |
| SUR-RC-001 | Server help and launch blocked by account eligibility | Eligible authenticated account; isolated project, consent yes/no, and URL/QR capture with tokens redacted |
| SUR-RC-002 | Interactive flag startup and failure notification unobserved | Eligible account plus disposable session; ineligible case without sensitive output |
| SUR-RC-003 | Active-session command toggle and consent unobserved | Eligible account; disposable session with connect/disconnect and declined consent |
| SUR-RC-004 | Browser/mobile connection and shared local environment unobserved | Eligible account and authorized second device; synthetic files only |
| SUR-RC-005 | Cross-surface message and permission order unobserved | Eligible account and second device; synthetic concurrent prompts and denied tool |
| SUR-RC-006 | Remote attachment download and failure behavior unobserved | Eligible account and second device; synthetic image/file and invalid/failed transfer |
| SUR-RC-007 | Reconnection queue and replay unobserved | Eligible account; controlled network interruption in disposable session |
| SUR-RC-008 | Indicator, panel, and takeover failure states unobserved | Eligible account; narrow/wide Pi terminal and second-device takeover fixture |
| SUR-RC-009 | Server session resume and conflicting flags unobserved | Eligible account; saved disposable session and parser conflict cases |
| SUR-RC-010 | Server spawn-mode isolation and rejection unobserved | Eligible account; disposable git repository and same-dir/worktree/session modes |
| SUR-RC-011 | Capacity and pre-creation boundary unobserved | Eligible account; bounded disposable server with capacity and no-precreate variants |
| SUR-RC-012 | Inherited permission and sandbox rules unobserved | Eligible account; synthetic denied file/command fixture under each mode |
| SUR-RC-013 | Global/subcommand argument acceptance unobserved | Eligible account for help; safe parser cases for allowed and rejected flag order |
| SUR-RC-014 | Endpoint, token, feature flag, and managed-policy refusals unobserved | Eligible test account or policy fixture; no live credential material recorded |
| SUR-RC-015 | Remote end/archive/takeover lifecycle unobserved | Eligible account and second device; disposable session with local status trace |

The [surface inventory](inventory-surfaces.md) still contains broad account-, platform-, policy-, and service-gated seeds, including remote control, hosted review, integrations, and runners. T005 must split these into independently testable leaf IDs; T010 then adds each inaccessible leaf here with its specific gate and required observation. The background-session rows above retain `gated-unverified` status even where help is visible: no model-backed session behavior has been compared, and some safe metadata probes remain pending. T002–T004 may expose further gated leaves. This register does not mark any source task complete and must be reconciled against the final inventory before T046 or T053 can close.
