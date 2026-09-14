# Gated Reference Evidence

**Snapshot**: Installed release 2.1.270 on 2026-09-14. This is a partial access-gap register. A documented capability or successful CLI help exit is not an observed behavior comparison. Every inaccessible leaf stays `gated-unverified` and blocks an unqualified complete-parity claim until its required scenarios pass.

| Leaf ID | Current evidence gap | Access or observation needed |
|---------|----------------------|------------------------------|
| CLI-098 | `remote-control --help` exited before help with an account-login requirement | Eligible authenticated account, then safe help and isolated start/attach/failure observations |
| CLI-534 | Desktop MCP import is visible in installed help; an empty config has a bounded result, while a synthetic one-server config did not exit with stdin closed within 10 seconds and appears to require interactive selection | Disposable pseudo-terminal with synthetic Desktop configuration on supported macOS/WSL; compare selection, scope, conflicts, failure, and persisted server entries without real credentials |
| CLI-535 | Default/local Desktop MCP import side effects unobserved; synthetic one-server process timed out with stdin closed | Synthetic Desktop configuration and disposable pseudo-terminal; compare local-scope selection, persistence, and conflicts |
| CLI-536 | User-scope Desktop MCP import side effects unobserved | Synthetic Desktop configuration in a disposable home; compare user-scope persistence and conflicts |
| CLI-537 | Project-scope Desktop MCP import side effects unobserved | Synthetic Desktop configuration and disposable project; compare project-scope persistence and conflicts |
| CLI-539 | Dynamic-scope Desktop MCP import parser accepts input, but populated import behavior unobserved | Disposable pseudo-terminal and synthetic server; compare selection and destination or refusal |
| CLI-540 | Enterprise-scope Desktop MCP import parser accepts input, but populated import behavior unobserved | Eligible managed configuration, disposable pseudo-terminal, and synthetic server; compare destination or refusal |
| CLI-541 | Claude.ai-scope Desktop MCP import parser accepts input, but populated import behavior unobserved | Eligible account, disposable pseudo-terminal, and synthetic server; compare destination or refusal without model use |
| CLI-542 | Managed-scope Desktop MCP import parser accepts input, but populated import behavior unobserved | Eligible managed configuration, disposable pseudo-terminal, and synthetic server; compare destination or refusal |
| CLI-543 | Agent-scope Desktop MCP import parser accepts input, but populated import behavior unobserved | Disposable agent configuration, pseudo-terminal, and synthetic server; compare destination or refusal |
| CLI-551 | All-session respawn is visible in installed help; a disposable empty-home call with stdin closed did not exit within five seconds and was terminated by the timeout | Isolated detached sessions and bounded pseudo-terminal or daemon fixture; compare no-session response, restart, failure, cancellation, and persistence |
| TOOL-002 | Bare-mode catalog omission observed, but normal default-session Glob availability and explicit enabling remain unobserved without a network-isolated startup fixture | Disposable home and repository with external network denied but localhost Messages allowed; compare default, `--tools Glob`, and failure behavior |
| TOOL-003 | Bare-mode catalog omission observed, but normal default-session Grep availability and explicit enabling remain unobserved without a network-isolated startup fixture | Disposable home and repository with external network denied but localhost Messages allowed; compare default, `--tools Grep`, and failure behavior |
| EXT-034 | Bundled skill is documented as gated; invocation unobserved | Eligible account and isolated invocation fixture after availability is confirmed |
| EXT-007 | Discover account-synced skill: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-040 | Discover managed agent and precedence: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-070 | Enable experimental team flag: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-071 | Start teammates: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-072 | Assign task: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-073 | Claim task: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-074 | Complete task: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-075 | Send direct message: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-076 | Broadcast message: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-077 | Approve teammate plan: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-078 | Select teammate model: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-079 | Select team display mode: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-080 | Shut down teammate: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-081 | Clean up team: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-082 | Handle team resume limitation: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-083 | Run teammate quality hook: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-084 | Discover local sessions: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-085 | Discover remote sessions: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-086 | Send cross-session message: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-087 | Mention session in typeahead: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-088 | Deliver to busy session: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-089 | Handle exited target: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-090 | Agent view focus and steer: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-091 | Define dynamic workflow: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-092 | Launch workflow fan-out: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-093 | Aggregate workflow results: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-094 | Cancel workflow: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-097 | Load managed hook: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-104 | Run HTTP handler: documentation-only; installed transition and failure behavior unobserved | Eligible configuration and isolated synthetic fixture; capture normal, denial, error, and recovery behavior |
| EXT-106 | Run prompt handler: documentation-only; installed transition and failure behavior unobserved | Eligible configuration and isolated synthetic fixture; capture normal, denial, error, and recovery behavior |
| EXT-107 | Run agent handler: documentation-only; installed transition and failure behavior unobserved | Eligible configuration and isolated synthetic fixture; capture normal, denial, error, and recovery behavior |
| EXT-116 | Enforce managed-only policy: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-136 | TeammateIdle event: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-148 | Elicitation event: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-149 | ElicitationResult event: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-151 | Add HTTP server: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-152 | Add SSE server: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-153 | Add WebSocket server: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-169 | Reconnect remote drop: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-182 | Accept elicitation: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-183 | Reject elicitation: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-184 | OAuth authenticate: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-185 | OAuth refresh: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-186 | OAuth logout: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-187 | Configure OAuth callback port: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-188 | Override OAuth discovery: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-189 | Restrict OAuth scopes: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-190 | Run headers helper after trust: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-192 | Import desktop config: documentation-only; installed transition and failure behavior unobserved | Isolated test connection and eligible OAuth or server configuration; synthetic normal, failure, and recovery fixtures |
| EXT-193 | Discover account connector: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-194 | Enforce organization connector policy: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-197 | Load managed server: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-198 | Enable channel flag: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-199 | Pair sender: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-200 | Enforce sender allowlist: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-201 | Deliver inbound message: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-202 | Reply through channel: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-203 | Handle delivery failure: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-204 | Reject unsupported provider: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-205 | Reject organization policy: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-206 | Reject closed session: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-207 | Telegram variant: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-208 | Discord variant: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-209 | iMessage variant: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-210 | Custom channel server: documentation-only; installed transition and failure behavior unobserved | Eligible channel integration and test sender; synthetic inbound, allow/deny, reply, and disconnect fixtures |
| EXT-214 | Discover managed plugin: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-216 | Discover account-synced plugin: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-234 | Install at user scope: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-235 | Install at project scope: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-239 | Update plugin: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-248 | Run plugin eval: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-249 | Compare no-plugin baseline: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-250 | Tag plugin version: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-255 | Add GitHub marketplace: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-256 | Add generic git marketplace: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-257 | Add URL marketplace: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-259 | Update marketplace: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-264 | Resolve GitHub plugin source: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-265 | Resolve git-subdirectory source: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-266 | Resolve npm source: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-267 | Resolve zip source: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-268 | Resolve command source: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-269 | Choose command copy mode: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-270 | Choose command link mode: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-271 | Run archive headers helper: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-272 | Auto-update marketplace: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-273 | Handle offline update: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-274 | Enforce managed marketplace restriction: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-275 | Resolve release channel: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-276 | Rename marketplace plugin: documentation-only; installed transition and failure behavior unobserved | Disposable plugin and marketplace fixture with authorized network or local mock; inspect update, policy, and failure cases |
| EXT-300 | Reject goal under hook policy: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-307 | Resolve managed agent precedence over project agent: documentation-only; installed transition and failure behavior unobserved | Eligible managed or account-synced configuration; isolated precedence and policy allow/deny fixtures |
| EXT-312 | Focus a session in agent view: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| EXT-313 | Steer a session in agent view: documentation-only; installed transition and failure behavior unobserved | Eligible team or agent-view account and isolated multi-session fixture; capture normal, refusal, failure, and recovery transitions |
| US1-READ-001 | Synthetic loopback normal, missing-path, and outside-workspace denial result shapes captured; exact errors, interactive permission prompt, content limits, and real-service behavior unobserved | Interactive disposable permission fixture, then restored usage allowance for matched real-service observation |
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
| SUR-LIMIT-002 | Malformed JSON rejection observed; equals-form parsing, valid JSON with invalid schema, and format-annotation behavior remain unobserved | Bare-mode parser fixtures for those variants, followed by model-backed structured result only after allowance returns |
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
| SUR-CLOUD-001 | Hosted creation and remote-branch state unobserved | Eligible account and policy; disposable repository with pushed/unpushed state |
| SUR-CLOUD-002 | Multiple hosted-session concurrency unobserved | Restored allowance and bounded parallel synthetic tasks |
| SUR-CLOUD-003 | Environment selection and setup unobserved | Eligible account with disposable environment and invalid ID fixture |
| SUR-CLOUD-004 | Repository bundle contents and sensitive-file exclusion unobserved | Eligible account; synthetic tracked/ignored/untracked files only, inspect upload manifest |
| SUR-CLOUD-005 | CLI follow-up queue, JSON result, and refusal unobserved | Eligible account; disposable hosted session and missing/archived ID fixtures |
| SUR-CLOUD-006 | Provisioning-time message queue unobserved | Eligible account; submit synthetic prompt during bounded startup |
| SUR-CLOUD-007 | Browser/mobile continuation and expiry unobserved | Eligible account and second client; synthetic task and controlled expiry |
| SUR-CLOUD-008 | Teleport fetch, repository verification, and local copy unobserved | Eligible account; disposable remote, dirty/wrong-repo/missing-branch fixtures |
| SUR-CLOUD-009 | In-session teleport picker and unavailable state unobserved | Eligible account; disposable cloud session and empty-list case |
| SUR-CLOUD-010 | Post-teleport divergence unobserved | Eligible account; edit local copy and hosted session independently |
| SUR-CLOUD-011 | Cloud mode persistence and denial unobserved | Eligible account; synthetic protected action before/after environment restart |
| SUR-CLOUD-012 | Cloud command availability and adapted picker behavior unobserved | Eligible account; disposable session with valid/invalid commands |
| SUR-CLOUD-013 | Hosted diff and inline feedback unobserved | Eligible account; synthetic repository edit and review comment |
| SUR-CLOUD-014 | Sharing, archive, delete, and recipient access unobserved | Eligible accounts with suitable policy; synthetic session and recipient fixture |
| SUR-CLOUD-015 | Unsupported provider/account/policy refusal unobserved | Controlled account or policy fixtures; no real credential value recorded |
| SUR-AUTO-001 | Hosted branch-review consent, cost, and findings unobserved | Eligible account and explicit spending authorization; disposable diff, never start a paid review implicitly |
| SUR-AUTO-002 | Explicit-base review and fetch failure unobserved | Eligible account and authorization; disposable branches and misspelled base |
| SUR-AUTO-003 | PR-mode clone and repository access unobserved | Eligible account and authorization; disposable PR with connected Git identity |
| SUR-AUTO-004 | Scripted review output, timeout, and interrupt unobserved | Eligible account and authorization; bounded review with captured redacted streams |
| SUR-AUTO-005 | Explicit posting and failure behavior unobserved | Eligible account, disposable PR, and separate authorization to post findings |
| SUR-AUTO-006 | Running review status, stop, and notification unobserved | Eligible account and authorization; bounded disposable review |
| SUR-AUTO-007 | Installed hosted-review fallback and billing refusal unobserved | Safe availability/eligibility probe without launching or billing a review |
| SUR-AUTO-008 | Routine creation and invalid configuration unobserved | Eligible web account and authorized disposable repository/environment |
| SUR-AUTO-009 | Schedule timing, timezone, and one-off behavior unobserved | Eligible account; disposable one-off and invalid interval fixtures |
| SUR-AUTO-010 | API trigger auth, duplicate, and limit behavior unobserved | Eligible account; synthetic endpoint/token, with token redacted from evidence |
| SUR-AUTO-011 | GitHub event filter and duplicate handling unobserved | Eligible account; disposable repository and synthetic events |
| SUR-AUTO-012 | Routine management and run-now behavior unobserved | Eligible account; disposable routine with list, pause, edit, resume, run |
| SUR-AUTO-013 | Routine run continuation and failure unobserved | Eligible account; bounded synthetic run and archived-session case |
| SUR-AUTO-014 | Connector/tool and branch permission scope unobserved | Eligible organization; synthetic connector and protected branch fixture |
| SUR-INT-001 | Browser extension setup and eligibility unobserved | Compatible browser/extension and eligible login; disposable profile |
| SUR-INT-002 | Browser selection, status, and reconnect unobserved | Two disposable browser profiles and controlled disconnect |
| SUR-INT-003 | Browser actions and signed-in state disclosure unobserved | Synthetic local website/account; permission and CAPTCHA fixtures |
| SUR-INT-004 | Browser site and plan-mode permission semantics unobserved | Synthetic site with allow/deny and managed-policy fixtures |
| SUR-INT-005 | Upload read permission, size, and link restrictions unobserved | Synthetic files only; denied read, >10 MB, and hard-link cases |
| SUR-INT-006 | Screenshot/GIF output and sensitive content handling unobserved | Synthetic page, approved artifact destination, redacted trace |
| SUR-INT-007 | Browser tab-group cleanup and resume unobserved | Disposable profile; clear, switch, exit, and surviving-work variants |
| SUR-INT-008 | Automatic editor detection and connection unobserved | Compatible editor extension; zero/one/multiple editor fixtures |
| SUR-INT-009 | Graphical panel sign-in, trust, and reload unobserved | Compatible editor and test account; restricted workspace fixture |
| SUR-INT-010 | Native diff modification and permission flow unobserved | Synthetic file proposal; accept/reject/edit and stale-source cases |
| SUR-INT-011 | Selection disclosure and deny-rule protection unobserved | Synthetic selected text; denied file and changed selection fixtures |
| SUR-INT-012 | Diagnostic and notebook tool authorization unobserved | Synthetic Problems panel and disposable notebook kernel |
| SUR-INT-013 | Editor/CLI shared history and conflict handling unobserved | Disposable session, resume from both surfaces, reload fixture |
| SUR-INT-014 | Named terminal context and missing/stale output unobserved | Synthetic terminal logs only; missing title and redaction cases |
| SUR-MAINT-001 | Login modes and callback recovery unobserved | Disposable account or authorized test login; no credential values recorded |
| SUR-MAINT-002 | Logout persistence and idempotence unobserved | Isolated credential store with synthetic login; do not alter user login |
| SUR-MAINT-003 | Status JSON/text shape and expired-token redaction unobserved | Isolated home with synthetic credential states |
| SUR-MAINT-004 | CLI doctor report and trust behavior unobserved | Isolated project with valid/invalid settings and no private files |
| SUR-MAINT-005 | Interactive repair flow unobserved | Disposable installation/configuration and explicit fix refusal |
| SUR-MAINT-006 | Import preview and invalid source behavior unobserved | Isolated home with synthetic source configuration |
| SUR-MAINT-007 | Confirmed import, conflict, and stale digest unobserved | Disposable destination and synthetic source; no real user settings |
| SUR-MAINT-008 | Installer/update success and interrupted rollback unobserved | Disposable binary location and controlled package source |
| SUR-MAINT-009 | Purge preview and no-match behavior unobserved | Isolated home with synthetic project state; preview only |
| SUR-MAINT-010 | Purge removal and confirmation behavior unobserved | Isolated home with synthetic state; explicit disposable path only |
| SUR-MAINT-011 | Token generation and redaction unobserved | Eligible disposable account or approved token test; never record token bytes |
| SUR-ART-001 | Publish approval and hosted page creation unobserved | Eligible account; synthetic page and explicit authorization for test publish |
| SUR-ART-002 | Republish/version and denied edit unobserved | Eligible account; disposable artifact and authorized collaborator fixture |
| SUR-ART-003 | Gallery/picker and attach behavior unobserved | Eligible account; disposable owned/shared artifacts |
| SUR-ART-004 | Audience, version, and recipient access unobserved | Eligible test accounts with public/organization policy; no real user data |
| SUR-ART-005 | Shared read/edit and prompt-injection handling unobserved | Disposable collaborator and synthetic hostile page text |
| SUR-ART-006 | Thread activation, reply, resolve, and public restriction unobserved | Team/Enterprise test account and disposable artifact |
| SUR-ART-007 | Live connector and download authorization unobserved | Synthetic connector and file only; verify viewer identity boundary |
| SUR-LINK-001 | Handler launch, fallback, and warning unobserved | Disposable OS profile or isolated handler test; synthetic path and prompt |
| SUR-LINK-002 | Explicit-send and long-prompt warning unobserved | Isolated terminal with synthetic 1,000/5,000-character prompts |
| SUR-LINK-003 | Path precedence, traversal, and clone resolution unobserved | Disposable local clones and malformed URL parameters |
| SUR-LINK-004 | Handler registration/disablement unobserved | Disposable OS user profile; managed-policy fixture if available |
| SUR-LINK-005 | Editor-specific handler and failure unobserved | Compatible disposable editor profile and invalid-link fixture |
| SUR-ENT-001 | Gateway request/response and auth behavior unobserved | Controlled gateway with synthetic credentials and protocol fixtures |
| SUR-ENT-002 | Enterprise proxy, CA, and mTLS behavior unobserved | Isolated proxy/certificate test environment; no production endpoints |
| SUR-ENT-003 | Gateway startup, policy, and failure unobserved | Disposable YAML and local bind; synthetic auth only |
| SUR-ENT-004 | Runner registration and assignment unobserved | Authorized enterprise test environment and dedicated runner identity |
| SUR-ENT-005 | Account lock and label behavior unobserved | Test accounts and dedicated runner registration |
| SUR-ENT-006 | Capacity, checkout, executable, and hook lifecycle unobserved | Isolated runner host with disposable repositories and hooks |
| SUR-ENT-007 | Rotating proxy header and redaction unobserved | Synthetic proxy/token and command/file rotation fixtures |
| SUR-ENT-008 | Git rewrite and managed-proxy mutation unobserved | Dedicated disposable account/container only; inspect config before/after |
| SUR-ENT-009 | Git identity and signing unobserved | Dedicated disposable git profile and failed-signing fixture |
| SUR-ENT-010 | Drain, push-on-release, and interrupted recovery unobserved | Isolated runner and synthetic branch with controlled stop |
| SUR-ENT-011 | Orchestrator routing, pool, and failure unobserved | Authorized enterprise test connector and disposable worker pool |
| SUR-ENT-012 | Health/log/telemetry output and redaction unobserved | Isolated runner with synthetic secrets and port/log failures |
| SUR-PLAT-001 | Desktop local launch and sign-in unobserved | Compatible disposable desktop profile and synthetic project |
| SUR-PLAT-002 | Parallel desktop worktree isolation unobserved | Disposable repository and two desktop sessions |
| SUR-PLAT-003 | Desktop diff feedback and apply unobserved | Synthetic file edit with accept/reject/stale diff variants |
| SUR-PLAT-004 | Desktop terminal/editor/preview behavior unobserved | Disposable app with bounded local preview server and port collision |
| SUR-PLAT-005 | Computer-use permissions and action results unobserved | Eligible macOS test profile; synthetic app and explicit OS permission |
| SUR-PLAT-006 | Mobile Dispatch pairing and offline recovery unobserved | Eligible paired devices; synthetic task and controlled offline case |
| SUR-PLAT-007 | Mobile hosted task and notification behavior unobserved | Eligible mobile/cloud account; disposable session |
| SUR-PLAT-008 | Team-chat sender authority and result flow unobserved | Authorized test workspace/channel and synthetic repository task |
| SUR-PLAT-009 | CI event, token, and branch protection behavior unobserved | Disposable CI repository and least-privilege test token |
| SUR-PLAT-010 | Automatic PR review findings and repeat-push behavior unobserved | Authorized disposable PR and review integration |
| SUR-PLAT-011 | JetBrains bridge and failure behavior unobserved | Compatible disposable IDE project and plugin |
| SUR-PLAT-012 | Cross-surface settings and memory propagation unobserved | Isolated local profiles and synthetic settings across installed clients |
| SUR-PLAT-013 | Mobile cloud start and cross-device persistence are documentation-only | Eligible mobile/cloud account and disposable repository/branch |
| SUR-PLAT-014 | Mobile cloud question reply and steering are documentation-only | Eligible paired mobile session with synthetic prompt and controlled disconnect |
| SUR-PLAT-015 | Mobile Remote Control pairing and wake recovery are documentation-only | Eligible paired device plus disposable local session and sleep/reconnect fixture |
| SUR-PLAT-016 | Mobile photo transfer and local upload path are documentation-only | Eligible paired device and synthetic image; inspect path and redaction |
| SUR-PLAT-017 | Mobile non-photo transfer and file reference are documentation-only | Eligible paired device and synthetic file; inspect download and failure behavior |
| SUR-PLAT-018 | Permission-mode selector differences by session kind are documentation-only | Eligible mobile cloud and local remote sessions; compare available modes and refusal |
| SUR-PLAT-019 | Remote push notification delivery and failure are documentation-only | Eligible paired device with controlled notification toggles and offline case |
| SUR-PLAT-020 | Terminal `/mobile` QR behavior has no local interactive observation | Disposable interactive terminal and mobile test device; no model request |
| SUR-PLAT-021 | Mobile Remote Control mode selector is documentation-only | Eligible paired mobile/local session; test allowed and disallowed choices |
| SUR-PLAT-022 | Terminal `/ios` QR behavior has no local interactive observation | Disposable interactive terminal and iOS test device; no model request |
| SUR-PLAT-023 | Terminal `/android` QR behavior has no local interactive observation | Disposable interactive terminal and Android test device; no model request |
| SUR-CHAN-001 | Installed parser and approved plugin startup unobserved | Safe help/parser probe, then disposable channel plugin after allowance returns |
| SUR-CHAN-002 | Managed policy enable/deny behavior unobserved | Controlled organization policy fixture; no production policy change |
| SUR-CHAN-003 | Inbound event labeling, ordering, and malformed case unobserved | Synthetic local channel server and bounded session |
| SUR-CHAN-004 | Reply permission, routing, and delivery failure unobserved | Synthetic recipient/server with allow/deny and disconnect cases |
| SUR-CHAN-005 | Pairing and sender allowlist enforcement unobserved | Disposable account/identity and invalid/revoked code fixtures |
| SUR-CHAN-006 | Bot credential storage and failure unobserved | Test bot tokens only; inspect redaction and no real user messages |
| SUR-CHAN-007 | Messages database and Automation permission behavior unobserved | Dedicated macOS test profile; no personal Messages database |
| SUR-CHAN-008 | Fakechat local event/reply round trip unobserved | Bun and disposable authenticated session; localhost-only fixture |
| SUR-CHAN-009 | Multiple plugin attribution and partial failure unobserved | Two synthetic plugins with distinct source IDs |
| SUR-CHAN-010 | External sender authority over protected approvals unobserved | Security review and synthetic sender spoof/deny fixtures |
| CLI-525 | Streaming output conflict is parser-observed; authenticated dispatch and resulting session unobserved | Eligible self-hosted environment and isolated CLI flow; compare service rejection and state |
| CLI-526 | Resume conflict is parser-observed; authenticated dispatch unobserved | Eligible self-hosted environment and isolated resume/session fixtures |
| CLI-527 | Continue conflict is parser-observed; authenticated dispatch unobserved | Eligible self-hosted environment and isolated continuation fixtures |
| CLI-528 | Teleport conflict is parser-observed; authenticated dispatch unobserved | Eligible self-hosted environment and isolated hosted-session fixture |
| CLI-529 | Session-ID conflict is parser-observed; authenticated dispatch unobserved | Eligible self-hosted environment and isolated ID/state fixture |
| CLI-530 | Setup-only conflict is parser-observed; authenticated dispatch unobserved | Eligible self-hosted environment and isolated setup-hook fixture |
| CLI-531 | Existing-cloud-session conflict is parser-observed; authenticated dispatch unobserved | Eligible self-hosted environment and isolated cloud session |
| CLI-532 | Cloud-description conflict is parser-observed; authenticated dispatch unobserved | Eligible self-hosted environment and isolated non-interactive launch |
| CLI-533 | Bare cloud flag reached login gate; successful new-session behavior unobserved | Eligible authenticated self-hosted environment; isolated launch and side-effect trace |
| MEM-015 | Cowork external-import omission is documentation-only | Disposable Cowork desktop profile with synthetic user-scope import outside workdir |
| MEM-016 | Cowork symlink omission is documentation-only | Disposable Cowork desktop profile with synthetic symlinked user rule |
| MODEL-016 | Role and managed effort-cap precedence is documentation-only | Eligible Enterprise custom role plus managed settings; compare each output mode |
| MODEL-017 | Organization default-model precedence is documentation-only | Eligible organization default and isolated user/project/CLI settings precedence fixtures |
| CFG-031 | Usage-limit setting scope exception is documented; behavior under actual limit unobserved | Eligible account and isolated limit fixtures without exhausting a shared quota |
| CFG-032 | Managed connector policy conflict is documentation-only | Controlled managed policy fixture with synthetic connector and lower-scope restriction |
| CFG-033 | Cloud settings propagation is documentation-only | Eligible disposable cloud project with conflicting host and committed settings |
| CFG-034 | Runner-image managed file propagation is documentation-only | Eligible disposable self-hosted runner and synthetic policy |
| CFG-036 | MDM/server-managed mid-session delivery and hook omission unobserved | Controlled managed source and isolated hook trace across delivery schedule |

The [surface inventory](inventory-surfaces.md) still contains broad account-, platform-, policy-, and service-gated seeds, including remote control, hosted review, integrations, and runners. T005 must split these into independently testable leaf IDs; T010 then adds each inaccessible leaf here with its specific gate and required observation. The background-session rows above retain `gated-unverified` status even where help is visible: no model-backed session behavior has been compared, and some safe metadata probes remain pending. T002–T004 may expose further gated leaves. This register does not mark any source task complete and must be reconciled against the final inventory before T046 or T053 can close.
