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
| SUR-BG-003 | Background CLI launch and selected-agent behavior require model usage | Restored allowance; isolated `--bg` launch, unknown agent, and `--bg --print` rejection |
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

The [surface inventory](inventory-surfaces.md) still contains broad account-, platform-, policy-, and service-gated seeds, including remote control, hosted review, integrations, and runners. T005 must split these into independently testable leaf IDs; T010 then adds each inaccessible leaf here with its specific gate and required observation. The background-session rows above retain `gated-unverified` status even where help is visible: no model-backed session behavior has been compared, and some safe metadata probes remain pending. T002–T004 may expose further gated leaves. This register does not mark any source task complete and must be reconciled against the final inventory before T046 or T053 can close.
