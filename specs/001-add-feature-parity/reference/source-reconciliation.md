# Three-Source Discovery Register

**Snapshot**: Installed CLI 2.1.270 on Darwin arm64, 2026-09-14. This register is incomplete; it is discovery evidence, not a behavior contract.

| Source | Current capture | Required next reconciliation |
|---|---|---|
| Installed CLI | [Version](observations/version-2026-09-14.txt), [top-level help](observations/cli-help-2026-09-14.txt), and [CLI inventory](inventory-cli.md) | Expand every nested command, flag value, alias, interaction, and observable result |
| Current official documentation | [147-page index](inventory-docs.md) from the [live index](https://code.claude.com/docs/llms.txt) | Classify each page, extract independently observable capabilities, date version and availability, and map each candidate to a leaf ID |
| Older restored source tree | Remotely viewed [top-level module directory](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src/src) | Inspect candidate modules and filenames remotely, map possible capabilities, and reject obsolete candidates only with dated current evidence |

## Restored-tree module-family seeds

The following directory names were visible in the remotely read tree on 2026-09-14. They identify places to search for candidate features, not current features or implementation guidance. Each listed group is **open** until candidate files are mapped to current documentation or installed behavior.

| Candidate family | Visible directories | Current disposition |
|---|---|---|
| Agent loop and context | `assistant`, `context`, `query`, `schemas`, `state`, `tasks`, `tools`, `types` | Open: inspect candidate entries and corroborate currently observable behavior |
| Startup, CLI, and commands | `bootstrap`, `cli`, `commands`, `entrypoints`, `migrations` | Open: reconcile with installed command tree and current CLI reference |
| Interactive presentation | `components`, `ink`, `keybindings`, `outputStyles`, `screens`, `vim`, `voice`, `buddy` | Open: reconcile behavior with current docs and Pi visual requirements |
| Extensions and integrations | `bridge`, `hooks`, `plugins`, `remote`, `server`, `services`, `skills`, `upstreamproxy` | Open: reconcile lifecycle, availability, and security with current docs and observations |
| Coordination and supporting modules | `coordinator`, `memdir`, `constants`, `moreright`, `native-ts`, `utils` | Open: determine whether each contains a user-visible candidate, duplicate, or obsolete item |

No code was cloned, copied, or adapted. Source-map-only candidates must remain `open` until current evidence establishes their behavior or supports a dated obsolete decision. These rows do not satisfy T062's required file-by-file reconciliation.

## Current documentation pages mapped to surface leaves

Read on 2026-09-14. A page match is a candidate mapping, not proof that installed 2.1.270 executes the contract. The current pages can describe later preview behavior; each version-gated or account-gated row still needs installed observation. These entries reconcile the pages used by the surface inventory only; the full 147-page index remains open.

| Current page | Candidate capability and inventory mapping | Duplicate mapping or unmatched gap |
| --- | --- | --- |
| [Agent view](https://code.claude.com/docs/en/agent-view) | Background dispatch, state, reply, supervisor, cleanup → SUR-BG-001–019 | CLI command options also in CLI-078–095 and CLI-266–282; detailed row badges, notifications, and shortcuts open |
| [Programmatic usage](https://code.claude.com/docs/en/headless) | Print/stream, signals, background wait → SUR-PRINT-001–015; structured results → SUR-LIMIT-001–006 | CLI option combinations in CLI-246–265; exact protocol event variants open |
| [Worktrees](https://code.claude.com/docs/en/worktrees) | Creation, isolation, cleanup, reuse → SUR-WT-001–017 | Agent-isolation variants overlap EXT inventory; custom hooks and non-git adapters open |
| [Remote Control](https://code.claude.com/docs/en/remote-control) | Local server, shared session, reconnect → SUR-RC-001–015 | CLI-098 account gate; trusted-device and notification variants open |
| [Web sessions](https://code.claude.com/docs/en/claude-code-on-the-web) | Hosted creation and teleport → SUR-CLOUD-001–015 | Cloud review and routines mapped separately; environment and sharing variants open |
| [Ultrareview](https://code.claude.com/docs/en/ultrareview) | Hosted review launch, posting, results → SUR-AUTO-001–007 | CLI-094/CLI-476–480 overlap; pricing and fallback variants open |
| [Routines](https://code.claude.com/docs/en/routines) | Saved cloud triggers and runs → SUR-AUTO-008–014 | `/schedule` command leaves overlap; API event schemas open |
| [Chrome integration](https://code.claude.com/docs/en/chrome) | Browser connection, actions, upload, capture → SUR-INT-001–007 | CLI-013/039 and extension-owned tools overlap; full tool list open |
| [VS Code integration](https://code.claude.com/docs/en/ide-integrations) | Editor panel, diff, bridge, context → SUR-INT-008–014 | CLI-030 overlap; editor layout and accessibility variants open |
| [Local state](https://code.claude.com/docs/en/claude-directory) | Project purge, retention, sensitive transcript storage → SUR-MAINT-009–010 | Configuration and retention settings also CORE; exact deletion variants open |
| [Platforms](https://code.claude.com/docs/en/platforms) | Desktop/mobile/chat/CI boundary → SUR-PLAT-001–012 | Family overview only; each linked platform reference still needs leaf reconciliation |
| [Desktop](https://code.claude.com/docs/en/desktop) | Local graphical sessions, diff, computer use → SUR-PLAT-001–006 | Detailed layout, preview, SSH, scheduling, and device policy open |
| [Artifacts](https://code.claude.com/docs/en/artifacts) | Publish, update, share, comments, live data → SUR-ART-001–007 | Viewer authorization and page constraint variants open |
| [Deep links](https://code.claude.com/docs/en/deep-links) | Inert local launch and path resolution → SUR-LINK-001–005 | Exact reference URL scheme intentionally cannot be a nox control; parser and platform variants open |
| [Deployment overview](https://code.claude.com/docs/en/bedrock-vertex-proxies) | Enterprise provider choices → SUR-ENT-001–002 | Provider-specific configuration pages open |
| [LLM gateway](https://code.claude.com/docs/en/llm-gateway) | Proxy API and auth → SUR-ENT-001 | Gateway binary help is separate evidence; protocol variants open |
| [Enterprise network](https://code.claude.com/docs/en/corporate-proxy) | Proxy, CA, mTLS → SUR-ENT-002 | Transport configuration variants open |
| [Channels](https://code.claude.com/docs/en/channels) | Event injection, sender policy, replies → SUR-CHAN-001–010 | CLI `--channels` absent from installed top-level help; plugin schema and platform variants open |

The installed `gateway` and `self-hosted-runner` help map to SUR-ENT-003–012 and CLI-083/099–101; current official pages for their full runner lifecycle and every option remain to be reconciled. No older restored-source module was treated as a current contract by this table.

## Second-level candidate seeds

The remote [tools](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src/src/tools) and [commands](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src/src/commands) listings were inspected on 2026-09-14. Directory names only support candidate discovery. These clusters are not leaf IDs or confirmed current behavior.

| Source grouping | Candidate names requiring current corroboration | Suggested inventory owner |
|---|---|---|
| Coding and retrieval tools | `FileReadTool`, `FileWriteTool`, `FileEditTool`, `GlobTool`, `GrepTool`, `BashTool`, `PowerShellTool`, `REPLTool`, `NotebookEditTool`, `LSPTool`, `WebFetchTool`, `WebSearchTool` | `inventory-core.md` |
| Control and coordination tools | `AgentTool`, `AskUserQuestionTool`, `EnterPlanModeTool`, `ExitPlanModeTool`, `EnterWorktreeTool`, `ExitWorktreeTool`, `TaskCreateTool`, `TaskGetTool`, `TaskListTool`, `TaskOutputTool`, `TaskStopTool`, `TaskUpdateTool`, `TeamCreateTool`, `TeamDeleteTool`, `SendMessageTool` | `inventory-core.md` and `inventory-extensions.md` |
| Extension and automation tools | `MCPTool`, `McpAuthTool`, `ListMcpResourcesTool`, `ReadMcpResourceTool`, `SkillTool`, `ToolSearchTool`, `RemoteTriggerTool`, `ScheduleCronTool`, `BriefTool`, `ConfigTool` | `inventory-extensions.md` and `inventory-surfaces.md` |
| Interactive command families | `compact`, `context`, `copy`, `cost`, `desktop`, `diff`, `doctor`, `effort`, `export`, `fast`, `hooks`, `ide`, `keybindings`, `memory`, `model`, `permissions`, `plan`, `plugin`, `resume`, `review`, `rewind`, `sandbox-toggle`, `session`, `share`, `skills`, `stats`, `status`, `tasks`, `teleport`, `theme`, `usage`, `vim`, `voice` | `inventory-cli.md` |
| Older or diagnostic command candidates | `ant-trace`, `bughunter`, `ctx_viz`, `debug-tool-call`, `good-claude`, `heapdump`, `mock-limits`, `oauth-refresh`, `perf-issue`, `reset-limits`, `thinkback`, `thinkback-play` | Open until current docs or installed behavior establishes relevance; do not implement from names |

The listed command directory also contains other candidates. Full enumeration, duplicate mapping, and dated obsolete decisions remain open under T062.
