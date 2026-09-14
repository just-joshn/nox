# Extension Capability Inventory

Snapshot: 2026-09-14. Each row is a documentation-discovered leaf (`D`: unobserved; `G`: unobserved and access- or policy-gated), not a verified parity claim. Source names and paths are evidence only; nox implementation uses nox-native surfaces. No paid, external-service, or destructive probe was run. Installed help is captured separately in [inventory-cli.md](inventory-cli.md). T006 must reconcile all pages and split any remaining interaction variants.

## Skills and custom commands

Source: [official skills and custom commands documentation](https://code.claude.com/docs/en/skills).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-001 | Discover user skill | D |
| EXT-002 | Discover project skill | D |
| EXT-003 | Discover nested-directory skill | D |
| EXT-004 | Discover externally mounted skill | D |
| EXT-005 | Discover legacy custom command | D |
| EXT-006 | Discover plugin skill | D |
| EXT-007 | Discover account-synced skill | G |
| EXT-008 | Resolve same-name skill scope precedence | D |
| EXT-009 | Resolve skill/legacy-command collision | D |
| EXT-010 | Invoke explicit slash skill | D |
| EXT-011 | Invoke automatically from description | D |
| EXT-012 | Suppress auto invocation | D |
| EXT-013 | Suppress user invocation | D |
| EXT-014 | Apply skill override | D |
| EXT-015 | Apply Skill permission deny | D |
| EXT-016 | Parse name and description | D |
| EXT-017 | Parse when_to_use | D |
| EXT-018 | Parse argument-hint | D |
| EXT-019 | Substitute positional arguments | D |
| EXT-020 | Substitute named arguments | D |
| EXT-021 | Load supporting file | D |
| EXT-022 | Inject dynamic context | D |
| EXT-023 | Handle failed dynamic injection | D |
| EXT-024 | Apply allowed-tools grant | D |
| EXT-025 | Apply disallowed-tools restriction | D |
| EXT-026 | Apply model override and fallback | D |
| EXT-027 | Apply effort override | D |
| EXT-028 | Fork skill into subagent | D |
| EXT-029 | Select fork agent | D |
| EXT-030 | Background or foreground fork | D |
| EXT-031 | Reload edited skill | D |
| EXT-032 | Remove skill | D |
| EXT-033 | Disable bundled skills | D |
| EXT-034 | Invoke gated bundled skill | G |
| EXT-035 | Reject invalid frontmatter | D |
| EXT-036 | Invoke legacy command with arguments | D |

## Subagents and teams

Source: [official subagents and teams documentation](https://code.claude.com/docs/en/subagents).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-037 | Discover built-in agent | D |
| EXT-038 | Discover user agent | D |
| EXT-039 | Discover project agent | D |
| EXT-040 | Discover managed agent and precedence | G |
| EXT-041 | Discover plugin agent | D |
| EXT-042 | Supply CLI JSON agent | D |
| EXT-043 | Parse name and description | D |
| EXT-044 | Reject invalid name | D |
| EXT-045 | Apply tools allowlist | D |
| EXT-046 | Apply disallowedTools | D |
| EXT-047 | Select model | D |
| EXT-048 | Select permission mode | D |
| EXT-049 | Stop at maxTurns and resume | D |
| EXT-050 | Preload skills | D |
| EXT-051 | Scope MCP servers | D |
| EXT-052 | Run agent hooks | D |
| EXT-053 | Persist agent memory | D |
| EXT-054 | Run foreground | D |
| EXT-055 | Run background | D |
| EXT-056 | Apply effort | D |
| EXT-057 | Isolate worktree | D |
| EXT-058 | Apply initialPrompt | D |
| EXT-059 | Delegate automatically | D |
| EXT-060 | Invoke explicitly | D |
| EXT-061 | Restrict spawnable types | D |
| EXT-062 | Spawn nested agent | D |
| EXT-063 | Enforce concurrency limit | D |
| EXT-064 | Resume stopped agent | D |
| EXT-065 | Reload edited definition | D |
| EXT-066 | Handle agent API failure | D |
| EXT-067 | Scan agent output | D |
| EXT-068 | Fork conversation | D |
| EXT-069 | Steer running fork | D |

## Team and messaging lifecycle

Source: [official team and messaging lifecycle documentation](https://code.claude.com/docs/en/agent-teams).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-070 | Enable experimental team flag | G |
| EXT-071 | Start teammates | G |
| EXT-072 | Assign task | G |
| EXT-073 | Claim task | G |
| EXT-074 | Complete task | G |
| EXT-075 | Send direct message | G |
| EXT-076 | Broadcast message | G |
| EXT-077 | Approve teammate plan | G |
| EXT-078 | Select teammate model | G |
| EXT-079 | Select team display mode | G |
| EXT-080 | Shut down teammate | G |
| EXT-081 | Clean up team | G |
| EXT-082 | Handle team resume limitation | G |
| EXT-083 | Run teammate quality hook | G |
| EXT-084 | Discover local sessions | G |
| EXT-085 | Discover remote sessions | G |
| EXT-086 | Send cross-session message | G |
| EXT-087 | Mention session in typeahead | G |
| EXT-088 | Deliver to busy session | G |
| EXT-089 | Handle exited target | G |
| EXT-090 | Agent view focus and steer | G |
| EXT-091 | Define dynamic workflow | G |
| EXT-092 | Launch workflow fan-out | G |
| EXT-093 | Aggregate workflow results | G |
| EXT-094 | Cancel workflow | G |

## Hooks

Source: [official hooks documentation](https://code.claude.com/docs/en/hooks).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-095 | Load user hook | D |
| EXT-096 | Load project hook after trust | D |
| EXT-097 | Load managed hook | G |
| EXT-098 | Load skill or agent hook | D |
| EXT-099 | Match exact name | D |
| EXT-100 | Match regex or wildcard | D |
| EXT-101 | Match MCP tool | D |
| EXT-102 | Order multiple handlers | D |
| EXT-103 | Run command handler | D |
| EXT-104 | Run HTTP handler | G |
| EXT-105 | Run MCP tool handler | D |
| EXT-106 | Run prompt handler | G |
| EXT-107 | Run agent handler | G |
| EXT-108 | Run asynchronous hook | D |
| EXT-109 | Handle exit zero | D |
| EXT-110 | Handle exit two block | D |
| EXT-111 | Handle other exit code | D |
| EXT-112 | Handle timeout | D |
| EXT-113 | Handle malformed JSON | D |
| EXT-114 | Parse decision JSON | D |
| EXT-115 | Disable hook | D |
| EXT-116 | Enforce managed-only policy | G |
| EXT-117 | SessionStart event | D |
| EXT-118 | Setup event | D |
| EXT-119 | InstructionsLoaded event | D |
| EXT-120 | UserPromptSubmit event | D |
| EXT-121 | UserPromptExpansion event | D |
| EXT-122 | MessageDisplay event | D |
| EXT-123 | PreToolUse event | D |
| EXT-124 | PermissionRequest event | D |
| EXT-125 | PostToolUse event | D |
| EXT-126 | PostToolUseFailure event | D |
| EXT-127 | PostToolBatch event | D |
| EXT-128 | PermissionDenied event | D |
| EXT-129 | Notification event | D |
| EXT-130 | SubagentStart event | D |
| EXT-131 | SubagentStop event | D |
| EXT-132 | TaskCreated event | D |
| EXT-133 | TaskCompleted event | D |
| EXT-134 | Stop event | D |
| EXT-135 | StopFailure event | D |
| EXT-136 | TeammateIdle event | G |
| EXT-137 | ConfigChange event | D |
| EXT-138 | CwdChanged event | D |
| EXT-139 | DirectoryAdded event | D |
| EXT-140 | FileChanged event | D |
| EXT-141 | WorktreeCreate event | D |
| EXT-142 | WorktreeRemove event | D |
| EXT-143 | PreCompact event | D |
| EXT-144 | PostCompact event | D |
| EXT-145 | PreModelSwitch event | D |
| EXT-146 | PostModelSwitch event | D |
| EXT-147 | SessionEnd event | D |
| EXT-148 | Elicitation event | G |
| EXT-149 | ElicitationResult event | G |

## External connections

Source: [official external connections documentation](https://code.claude.com/docs/en/mcp).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-150 | Add stdio server | D |
| EXT-151 | Add HTTP server | G |
| EXT-152 | Add SSE server | G |
| EXT-153 | Add WebSocket server | G |
| EXT-154 | Configure local scope | D |
| EXT-155 | Configure project scope | D |
| EXT-156 | Configure user scope | D |
| EXT-157 | Resolve scope precedence | D |
| EXT-158 | Expand config environment variable | D |
| EXT-159 | Approve project server | D |
| EXT-160 | Reject project server | D |
| EXT-161 | List servers | D |
| EXT-162 | Show server status | D |
| EXT-163 | Show configuration warning | D |
| EXT-164 | Disable server | D |
| EXT-165 | Remove server | D |
| EXT-166 | Select client runtime | D |
| EXT-167 | Receive dynamic tool update | D |
| EXT-168 | Receive notification stream | D |
| EXT-169 | Reconnect remote drop | G |
| EXT-170 | Handle failed first connection | D |
| EXT-171 | Handle failed discovery | D |
| EXT-172 | Background long tool call | D |
| EXT-173 | Invoke server tool | D |
| EXT-174 | Require per-tool approval | D |
| EXT-175 | Defer and search tools | D |
| EXT-176 | Validate unusual input schema | D |
| EXT-177 | Reject invalid input schema | D |
| EXT-178 | Enforce output limit | D |
| EXT-179 | Override per-tool output limit | D |
| EXT-180 | Reference server resource | D |
| EXT-181 | Execute server prompt | D |
| EXT-182 | Accept elicitation | G |
| EXT-183 | Reject elicitation | G |
| EXT-184 | OAuth authenticate | G |
| EXT-185 | OAuth refresh | G |
| EXT-186 | OAuth logout | G |
| EXT-187 | Configure OAuth callback port | G |
| EXT-188 | Override OAuth discovery | G |
| EXT-189 | Restrict OAuth scopes | G |
| EXT-190 | Run headers helper after trust | G |
| EXT-191 | Import JSON config | D |
| EXT-192 | Import desktop config | G |
| EXT-193 | Discover account connector | G |
| EXT-194 | Enforce organization connector policy | G |
| EXT-195 | Serve local assistant as MCP | D |
| EXT-196 | Load plugin server | D |
| EXT-197 | Load managed server | G |

## Channels

Source: [official channels documentation](https://code.claude.com/docs/en/channels).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-198 | Enable channel flag | G |
| EXT-199 | Pair sender | G |
| EXT-200 | Enforce sender allowlist | G |
| EXT-201 | Deliver inbound message | G |
| EXT-202 | Reply through channel | G |
| EXT-203 | Handle delivery failure | G |
| EXT-204 | Reject unsupported provider | G |
| EXT-205 | Reject organization policy | G |
| EXT-206 | Reject closed session | G |
| EXT-207 | Telegram variant | G |
| EXT-208 | Discord variant | G |
| EXT-209 | iMessage variant | G |
| EXT-210 | Custom channel server | G |

## Plugins and marketplaces

Source: [official plugins and marketplaces documentation](https://code.claude.com/docs/en/plugins-reference).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-211 | Discover user plugin | D |
| EXT-212 | Discover project plugin | D |
| EXT-213 | Discover local plugin | D |
| EXT-214 | Discover managed plugin | G |
| EXT-215 | Discover skills-directory plugin | D |
| EXT-216 | Discover account-synced plugin | G |
| EXT-217 | Parse required manifest fields | D |
| EXT-218 | Parse metadata | D |
| EXT-219 | Parse default enablement | D |
| EXT-220 | Parse user configuration | D |
| EXT-221 | Parse component paths | D |
| EXT-222 | Parse environment | D |
| EXT-223 | Parse data directory | D |
| EXT-224 | Discover plugin skill | D |
| EXT-225 | Discover plugin command | D |
| EXT-226 | Discover plugin agent | D |
| EXT-227 | Discover plugin hook | D |
| EXT-228 | Discover plugin MCP | D |
| EXT-229 | Discover plugin LSP | D |
| EXT-230 | Discover plugin monitor | D |
| EXT-231 | Discover plugin theme | D |
| EXT-232 | Invoke namespaced skill | D |
| EXT-233 | Resolve name collision | D |
| EXT-234 | Install at user scope | G |
| EXT-235 | Install at project scope | G |
| EXT-236 | Reload plugin changes | D |
| EXT-237 | Enable plugin | D |
| EXT-238 | Disable plugin | D |
| EXT-239 | Update plugin | G |
| EXT-240 | Uninstall plugin | D |
| EXT-241 | Prune cache | D |
| EXT-242 | List plugins | D |
| EXT-243 | Show plugin details | D |
| EXT-244 | Initialize plugin skeleton | D |
| EXT-245 | Validate manifest | D |
| EXT-246 | Report invalid path | D |
| EXT-247 | Initialize eval fixture | D |
| EXT-248 | Run plugin eval | G |
| EXT-249 | Compare no-plugin baseline | G |
| EXT-250 | Tag plugin version | G |
| EXT-251 | Resolve plugin dependency version | D |
| EXT-252 | Cache plugin | D |
| EXT-253 | Reject path traversal | D |
| EXT-254 | Add local marketplace | D |
| EXT-255 | Add GitHub marketplace | G |
| EXT-256 | Add generic git marketplace | G |
| EXT-257 | Add URL marketplace | G |
| EXT-258 | List marketplaces | D |
| EXT-259 | Update marketplace | G |
| EXT-260 | Remove marketplace | D |
| EXT-261 | Resolve duplicate name | D |
| EXT-262 | Reject reserved name | D |
| EXT-263 | Resolve relative plugin source | D |
| EXT-264 | Resolve GitHub plugin source | G |
| EXT-265 | Resolve git-subdirectory source | G |
| EXT-266 | Resolve npm source | G |
| EXT-267 | Resolve zip source | G |
| EXT-268 | Resolve command source | G |
| EXT-269 | Choose command copy mode | G |
| EXT-270 | Choose command link mode | G |
| EXT-271 | Run archive headers helper | G |
| EXT-272 | Auto-update marketplace | G |
| EXT-273 | Handle offline update | G |
| EXT-274 | Enforce managed marketplace restriction | G |
| EXT-275 | Resolve release channel | G |
| EXT-276 | Rename marketplace plugin | G |
| EXT-277 | Reject malformed catalog | D |
| EXT-278 | Handle missing plugin source | D |
| EXT-279 | Operate without plugins | D |

## Scheduled extension workflows

Source: [official scheduled extension workflows documentation](https://code.claude.com/docs/en/scheduled-tasks).

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-280 | Run loop at fixed interval | D |
| EXT-281 | Run loop at dynamic interval | D |
| EXT-282 | Run default maintenance prompt | D |
| EXT-283 | Run project loop override | D |
| EXT-284 | Invoke eligible skill on schedule | D |
| EXT-285 | Treat built-in command as text | D |
| EXT-286 | Treat withheld skill as text | D |
| EXT-287 | Treat MCP prompt as text | D |
| EXT-288 | Create cron task | D |
| EXT-289 | List cron tasks | D |
| EXT-290 | Cancel cron task | D |
| EXT-291 | Restore task on resume | D |
| EXT-292 | Expire recurring task | D |
| EXT-293 | Expire missed one-shot | D |
| EXT-294 | Clear task on new conversation | D |
| EXT-295 | Start goal | D |
| EXT-296 | Evaluate goal condition | D |
| EXT-297 | Continue goal turn | D |
| EXT-298 | Complete goal | D |
| EXT-299 | Cancel goal | D |
| EXT-300 | Reject goal under hook policy | G |

## Independent variants extracted during review

These IDs refine combined discovery phrases above without changing the stable IDs used by downstream artifacts.

| ID | Leaf input or transition | State |
|---|---|---|
| EXT-301 | Parse skill `name` when `description` is absent | D |
| EXT-302 | Parse skill `description` when `name` is absent | D |
| EXT-303 | Use skill model override when allowed | D |
| EXT-304 | Fall back when skill model override is disallowed | D |
| EXT-305 | Run forked skill in background | D |
| EXT-306 | Wait for forked skill in foreground | D |
| EXT-307 | Resolve managed agent precedence over project agent | G |
| EXT-308 | Reject agent missing `name` | D |
| EXT-309 | Reject agent missing `description` | D |
| EXT-310 | Mark subagent result partial at `maxTurns` | D |
| EXT-311 | Resume subagent from partial result | D |
| EXT-312 | Focus a session in agent view | G |
| EXT-313 | Steer a session in agent view | G |
| EXT-314 | Load skill-frontmatter hook | D |
| EXT-315 | Load agent-frontmatter hook | D |
| EXT-316 | Match regex hook | D |
| EXT-317 | Match wildcard hook | D |
| EXT-318 | Defer connection tool from initial context | D |
| EXT-319 | Retrieve deferred connection tool by search | D |

## Reconciliation notes

- Each state requires normal, denial/error, and relevant persistence or interaction scenarios before `verified`.
- Current docs contain version-specific behavior. Treat the installed snapshot as target; historical source candidates require current corroboration.
- Marketplace sources: [catalog and CLI](https://code.claude.com/docs/en/plugin-marketplaces); teams and cross-session messages: [teams](https://code.claude.com/docs/en/agent-teams), [messaging](https://code.claude.com/docs/en/cross-session-messaging); channel provider variants: [channels](https://code.claude.com/docs/en/channels); goals: [goal](https://code.claude.com/docs/en/goal).
