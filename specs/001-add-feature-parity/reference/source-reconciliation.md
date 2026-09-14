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
