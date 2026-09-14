# Core Capability Discovery

**Status**: Documentation-backed discovery, not behavioral parity. The leaf rows below describe independently testable observations; live model/tool traces remain unavailable while the reported weekly usage cap is in effect. Sources: [settings](https://code.claude.com/docs/en/configuration), [permissions](https://code.claude.com/docs/en/permissions), [memory](https://code.claude.com/docs/en/memory), [tools](https://code.claude.com/docs/en/tools-reference), [model configuration](https://code.claude.com/docs/en/model-config), [sessions](https://code.claude.com/docs/en/sessions), and [interactive commands](https://code.claude.com/docs/en/commands). Read on 2026-09-14.

| ID | Capability | Required observation |
|----|------------|----------------------|
| CORE-001 | User, project, local, managed, and invocation settings | Discovery, precedence, invalid values, reload |
| CORE-002 | Project instructions and nested rules | Discovery, imports, path scoping, update timing |
| CORE-003 | Auto memory | Creation, loading, scope, disablement |
| CORE-004 | Permission modes | Default, manual, plan, accept-edits, don't-ask, auto, bypass |
| CORE-005 | Tool permission rules | Allow/deny/ask matching, scope, precedence, prompt persistence |
| CORE-006 | Restricted, bare, and safe modes | Tool availability, configuration discovery, bypass refusal |
| CORE-007 | Built-in read, search, edit, write, command, and web tools | Inputs, limits, result/error shape, cancellation, side effects |
| CORE-008 | Model and effort controls | Selection, supported levels, persistence, fallback, errors |
| CORE-009 | Context and compaction | Automatic/manual thresholds, summary, resume behavior |
| CORE-010 | Session identity and history | New, name, continue, resume, branch, fork, export, rewind |
| CORE-011 | Prompt and response interaction | Queueing, interruption, side questions, status, suggestions |
| CORE-012 | Cost and budget controls | Usage, limits, subagent accounting, stop behavior |
| CORE-013 | Terminal accessibility and keybindings | Screen-reader output, shortcut scope, conflicts |

Each row above is a domain seed. The rows below split the specified T003 domains into testable leaves. They record documented behavior, not a passing local trace. Extension-owned tools and CLI/shortcut inputs are cross-indexed rather than duplicated here.

## Settings and configuration leaves

The [settings guide](https://code.claude.com/docs/en/configuration) supplies scope, precedence, reload, and invalid-value rules. `documented; trace pending` means the official documentation describes the behavior but a local end-to-end observation has not yet been captured.

| ID | Input or condition → expected behavior | Scope / precedence / availability | Evidence status |
|----|----------------------------------------|-----------------------------------|-----------------|
| CFG-001 | User settings file provides a key → value applies in every local project | User scope; lowest file tier | Documented; trace pending |
| CFG-002 | Shared project settings provide a key → value applies in that project | Project scope, above user; file loaded from primary working directory | Documented; trace pending |
| CFG-003 | Project-local settings provide a key → personal override applies | Local scope, above project; root/worktree placement varies by platform and repository ownership | Documented; trace pending |
| CFG-004 | Managed settings provide a key → organization policy applies | Highest tier; server > OS/MDM > file > Windows user registry within managed sources | Documented; trace pending |
| CFG-005 | `--settings` JSON/file provides a key → session-only override applies | Below managed, above local; cannot set managed/global-only keys | Documented; trace pending |
| CFG-006 | Dedicated CLI flag provides a key → session-only override applies | Key-specific precedence; `--model` and `--effort` are documented examples | Documented; trace pending |
| CFG-007 | Environment variable and file set the same behavior → key-specific resolution applies | No generic environment tier; e.g. `ANTHROPIC_MODEL` overrides file `model` | Documented; trace pending |
| CFG-008 | Same scalar key exists at multiple file tiers → highest applicable value wins | Managed > CLI > local > project > user, subject to documented exceptions | Documented; trace pending |
| CFG-009 | Same array key exists at multiple file tiers → arrays concatenate and deduplicate | `permissions.allow` and sandbox path lists; model-list exceptions in CFG-010 | Documented; trace pending |
| CFG-010 | `fallbackModel`, `modelPicker`, `availableModels`, or `modelSettings` appears at multiple scopes → apply each special merge rule | Ordered fallback and picker are replaced; managed model allowlist is authoritative; per-model effort resolves separately | Documented; trace pending |
| CFG-011 | Settings file changes during a running session → most edits reload, including permissions, hooks, helpers | User/project/local/file-managed watched; delivery-managed changes arrive on a schedule | Documented; trace pending |
| CFG-012 | `/status` and `claude doctor` inspect settings → sources and rejected entries are reported | `/status` lists loaded sources, not per-key origin; doctor lists invalid entries | Documented; trace pending |
| CFG-013 | File has invalid JSON or schema-rejected value → interactive Settings Error or print-mode error | Affected file skipped unless managed stricter fallback applies | Documented; trace pending |
| CFG-014 | File has a malformed individual rule or hook entry → warning and selective skip | Rest of valid file remains effective | Documented; trace pending |
| CFG-015 | Global state file is corrupt → backup/recovery flow, print-mode exit | `~/.claude.json`; global state, not a normal settings tier | Documented; trace pending |
| CFG-016 | `/config` changes a setting → writes correct persistent destination | Mostly user file; some local file; global choices in global state file | Documented; trace pending |
| CFG-017 | `CLAUDE_CONFIG_DIR` is set → home configuration, sessions, and plugins relocate | User scope; platform-specific home resolution | Documented; trace pending |
| CFG-018 | Settings source exclusion is requested → only selected setting sources load | `--setting-sources`; exact tokens and interactions indexed in CLI inventory | Help/documented; trace pending |
| CFG-019 | `permissions.defaultMode` is `auto` or `bypassPermissions` in project/local file → value is ignored | User/managed setting or CLI flag required since v2.1.257 | Documented; trace pending |
| CFG-020 | `/cd` changes primary working directory → project settings are re-resolved | Current installed version is above documented v2.1.246 gate | Documented; trace pending |
| CFG-021 | `--bare` starts a session → hooks, LSP, plugin sync, auto memory, and implicit instruction discovery are skipped | Installed v2.1.270 help; explicit context/config flags remain available, API-key/helper auth only | Local help; trace pending |
| CFG-022 | `--safe-mode` starts a session → customizations are disabled while core auth, model, tools, and permissions remain | Installed v2.1.270 help; managed policy still applies | Local help; trace pending |
| CFG-023 | `--restricted` starts a session → code-running tools and WebFetch are removed unless explicitly named, and file tools stay inside working directories | Installed v2.1.270 help; user/project/local settings ignored, bypass refused | Local help; trace pending |
| CFG-024 | CLI first writes a local settings file → add its path pattern to the user's global git excludes | Manually created local settings file does not trigger this write | [Settings guide](https://code.claude.com/docs/en/configuration#keep-personal-settings-out-of-a-repository); trace pending |
| CFG-025 | Legacy subdirectory and repository-root local settings both set one scalar → root value wins | Both local files are read; v2.1.211+ | [Settings guide](https://code.claude.com/docs/en/configuration#where-claude-code-keeps-the-local-file-in-a-git-repository); trace pending |
| CFG-026 | Model or effort setting changes during an active session → retain the session's selected value | Most other watched settings reload immediately | [Settings guide](https://code.claude.com/docs/en/configuration#when-edits-take-effect); trace pending |
| CFG-027 | Project settings file and its directory are created during an active session → load the new file | New user/project files in existing watched directories also load | [Settings guide](https://code.claude.com/docs/en/configuration#when-edits-take-effect); trace pending |
| CFG-028 | Watched settings file changes → run `ConfigChange` hook | User, project, local, and managed file changes trigger the file watcher | [Settings guide](https://code.claude.com/docs/en/configuration#when-edits-take-effect); trace pending |
| CFG-029 | `ANTHROPIC_DEFAULT_MODEL` and saved `model` both exist → saved model wins | Distinct from `ANTHROPIC_MODEL`, which overrides the saved value | [Settings guide](https://code.claude.com/docs/en/configuration#settings-precedence); trace pending |
| CFG-030 | `modelPicker` appears in multiple scopes → take highest whole value among managed, invocation, and user | Project/local values ignored; v2.1.242+ | [Settings guide](https://code.claude.com/docs/en/configuration#lists-merge-instead-of-overriding); trace pending |
| CFG-031 | Committed project setting `autoContinueAtUsageLimit: false` conflicts with permissive user/local value → force off unless higher scope overrides | Security-sensitive scope exception; account usage-limit gate | [Settings guide](https://code.claude.com/docs/en/configuration#a-committed-key-doesnt-reach-teammates); account-gated |
| CFG-032 | Lower-scope `disableClaudeAiConnectors: true` conflicts with managed `false` → keep connectors disabled | Restrictive value from any scope wins | [Settings guide](https://code.claude.com/docs/en/configuration#exceptions-to-managed-settings-precedence); managed-policy gate |
| CFG-033 | Cloud session starts from a repository clone → read committed project and server-managed settings, not host user/local or host MDM/file-managed settings | Cloud account and project access required | [Settings guide](https://code.claude.com/docs/en/configuration#settings-in-cloud-sessions); cloud-gated |
| CFG-034 | Self-hosted cloud session starts → also read the managed settings file in its runner image | Runner and organization policy access required | [Settings guide](https://code.claude.com/docs/en/configuration#settings-in-cloud-sessions); environment-gated |
| CFG-035 | Legacy subdirectory and repository-root local files both define permission rules → combine the rules | Distinct from scalar precedence in CFG-025 | [Settings guide](https://code.claude.com/docs/en/configuration#where-claude-code-keeps-the-local-file-in-a-git-repository); trace pending |
| CFG-036 | MDM or server-managed setting arrives mid-session → update on delivery schedule without `ConfigChange` hook | Managed delivery differs from file watcher event in CFG-028 | [Settings guide](https://code.claude.com/docs/en/configuration#when-edits-take-effect); managed-policy gate |

## Instructions and memory leaves

The [memory guide](https://code.claude.com/docs/en/memory) distinguishes instructions (context) from enforced permissions. Its reference filename is recorded here only as an observation; nox compatibility filenames are governed by the project spec.

| ID | Input or condition → expected behavior | Scope / precedence / availability | Evidence status |
|----|----------------------------------------|-----------------------------------|-----------------|
| MEM-001 | Managed, user, project, and local instruction files exist → concatenate in broad-to-specific order | Ancestors from filesystem root to working directory; local file follows project file at each level | Documented; trace pending |
| MEM-002 | Instruction file resides in a descendant directory → load when a file there is read | Lazy subdirectory discovery, not initial context | Documented; trace pending |
| MEM-003 | Instruction file contains `@path` → recursively expand import | Relative to importing file; absolute allowed; maximum four hops | Documented; trace pending |
| MEM-004 | Project instruction imports a file outside the working directory → ask once before loading | Declined imports stay disabled; user-scope imports normally trusted | Documented; trace pending |
| MEM-005 | Import-like text is in code span or fence → keep literal rather than importing | Markdown parsing rule | Documented; trace pending |
| MEM-006 | `.claude/rules/*.md` file has path frontmatter → load only for matching paths | Project/user rules; path glob evaluation and nested discovery | Documented; trace pending |
| MEM-007 | `claudeMdExcludes` lists a memory path → exclude it from context | Settings-controlled, useful in monorepos | Documented; trace pending |
| MEM-008 | `--add-dir` grants file access → external instructions remain unloaded by default | Opt in with documented additional-directory environment variable | Documented; trace pending |
| MEM-009 | New session begins with auto memory enabled → project memory is available | On by default since v2.1.59; per-repository, shared by worktrees, machine-local | Documented; trace pending |
| MEM-010 | Auto memory disabled by setting or environment → no automatic notes load/write | `autoMemoryEnabled: false` or disable environment variable | Documented; trace pending |
| MEM-011 | Auto memory index exceeds 200 lines or 25KB → only startup prefix loads | Topic files read on demand; instruction files have no analogous hard startup cutoff | Documented; trace pending |
| MEM-012 | `/memory` opens manager → loaded files and memory folder appear, toggle available | Interactive session | Documented; trace pending |
| MEM-013 | Instruction text requests an action a permission rule forbids → tool remains blocked | Context does not override enforced permission policy | Documented; trace pending |
| MEM-014 | External import in a project instruction is declined → later sessions keep it disabled without repeating the prompt | Project-scoped approval state; compare persistence and disclosure | Documented; local trace pending |
| MEM-015 | User-scope instruction imports outside the working directory in a Cowork session → skip that import | Desktop Cowork gate; ordinary CLI user-scope imports are trusted | Documented; platform-gated |
| MEM-016 | User-scope instruction or rule is symlinked outside the working directory in a Cowork session → skip it | Desktop Cowork gate; source file may contain private data | Documented; platform-gated |
| MEM-017 | `/init` runs with an existing project instruction file → propose improvements rather than overwrite it | Interactive command; current file and side effects need isolated comparison | Documented; trace pending |
| MEM-018 | `CLAUDE_CODE_NEW_INIT=1` and `/init` → select instructions, skills, and hooks for a reviewable proposal before writing | Feature environment flag; installed availability and intermediate decisions pending | Documented; trace pending |
| MEM-019 | Block-level HTML comment in an instruction file → omit it from injected context but preserve it in direct file reads | Startup and lazy instruction loading; comments in code blocks stay visible | [Memory guide](https://code.claude.com/docs/en/memory#how-claudemd-files-load); trace pending |
| MEM-020 | Additional-directory instruction loading is enabled but `local` setting source is excluded → skip its local instruction file | `--add-dir`, opt-in environment variable, and `--setting-sources` interaction | [Memory guide](https://code.claude.com/docs/en/memory#load-from-additional-directories); trace pending |
| MEM-021 | A rule's brace expansion exceeds its shared 1,000-pattern or 4 MiB budget → leave that expression literal and unmatched | Other patterns in the list remain eligible; v2.1.217+ behavior | [Memory guide](https://code.claude.com/docs/en/memory#path-specific-rules); trace pending |
| MEM-022 | Rule path glob has an invalid bracket expression → that pattern matches nothing while other patterns continue | v2.1.207+ behavior; literal `[` requires escaping | [Memory guide](https://code.claude.com/docs/en/memory#path-specific-rules); trace pending |
| MEM-023 | Project rule symlink points outside the working directory → only unscoped rules load after external-import approval | Approval is triggered by a project `@path` import, not the symlink alone | [Memory guide](https://code.claude.com/docs/en/memory#share-rules-across-projects-with-symlinks); trace pending |

## Permission leaves

The [permission reference](https://code.claude.com/docs/en/permissions) defines rule matching, mode defaults, and persistence. The plan-dependent automatic classifier is a distinct availability condition, not an alias for unconditional permission bypass.

| ID | Input or condition → expected behavior | Scope / precedence / availability | Evidence status |
|----|----------------------------------------|-----------------------------------|-----------------|
| PERM-001 | No explicit mode → product/plan default is selected | Plan-dependent; record account-specific result in live probe | Documented; local default unobserved |
| PERM-002 | `default`/`manual` mode → approval prompts on first protected tool use | `manual` alias requires v2.1.200+ | Documented; trace pending |
| PERM-003 | `acceptEdits` mode → in-scope edits and common filesystem operations auto-approve | Working/additional directories; other calls still evaluated | Documented; trace pending |
| PERM-004 | `plan` mode → source edits blocked while read-only exploration remains available | Classifier-approved commands may also run when auto is available | Documented; trace pending |
| PERM-005 | `auto` mode → background safety checks review candidate actions | Available by plan/organization; can be disabled by setting | Documented; local availability unobserved |
| PERM-006 | `dontAsk` mode → calls that would prompt are denied | Explicit allow/no-approval actions still run; interactive-only tools are exceptions | Documented; trace pending |
| PERM-007 | `bypassPermissions` mode → prompts skipped except irreducible safeguards | User/managed setting or CLI flag; can be disabled by setting | Documented; trace pending |
| PERM-008 | Deny, ask, and allow all match a call → deny wins | Rule specificity never outranks tier order deny > ask > allow | Documented; trace pending |
| PERM-009 | Ask and allow both match a call → ask wins | Applies even when allow rule is narrower | Documented; trace pending |
| PERM-010 | Bare tool deny matches → tool absent from model context | Scoped deny leaves tool visible; special EndConversation exception | Documented; trace pending |
| PERM-011 | `Tool(specifier)` matches → only matching input is governed | Exact and wildcard matching vary by tool family | Documented; trace pending |
| PERM-012 | Deny/ask matches `Tool(param:value)` → top-level scalar input is checked | Primary content fields excluded; omitted parameter never matches | Documented; trace pending |
| PERM-013 | Bash wildcard rule contains `*` → command text pattern applies | `*` spans spaces; before-subcommand allow wildcard warns | Documented; trace pending |
| PERM-014 | Read-only file tool targets in-scope path → no manual prompt | Out-of-scope path may prompt; deny rules still apply | Documented; trace pending |
| PERM-015 | Bash read-only built-in command runs in manual mode → no prompt | Command allowlist is implementation-defined; capture live examples | Documented; exact list unobserved |
| PERM-016 | Bash or WebFetch approval saved with “don't ask again” → future repository sessions inherit rule | Local settings at repository root/main worktree; domain/command specificity | Documented; trace pending |
| PERM-017 | Edit/Write approval saved for session → expires when session ends | No permanent file rule from that approval option | Documented; trace pending |
| PERM-018 | Prompt answered No with comment → denial reason reaches agent and turn continues | No-comment No in main conversation stops turn | Documented; trace pending |
| PERM-019 | `/permissions` changes a rule mid-turn → next tool call uses new rule | Current installed version above v2.1.234 gate | Documented; trace pending |
| PERM-020 | PreToolUse hook blocks a call → no permission rule can re-allow it | Hook exit 2 stops before rules; deny/ask still apply after hook allow | Documented; trace pending |
| PERM-021 | Project allow rule is untrusted → approval not active until workspace trust | Untracked local allow rule is trusted; tracked local file follows trust | Documented; trace pending |
| PERM-022 | `Bash(ls *)` allow rule evaluates `ls`, `ls -la`, and `lsof` → allow the first two but not `lsof` | Space before sole trailing wildcard also matches bare command | [Permission guide](https://code.claude.com/docs/en/permissions#wildcard-patterns); trace pending |
| PERM-023 | `Bash(ls*)` allow rule evaluates `lsof` → match it as well as `ls` | No space before wildcard; separate pattern input from PERM-022 | [Permission guide](https://code.claude.com/docs/en/permissions#wildcard-patterns); trace pending |
| PERM-024 | Allow rule uses a tool-name glob without literal `mcp__<server>__` prefix → skip it with a warning | Deny/ask globs have broader matching; server-specific MCP allow globs remain valid | [Permission guide](https://code.claude.com/docs/en/permissions#tool-name-wildcards); trace pending |
| PERM-025 | Read-only compound command changes directory with `cd` → prompt despite otherwise read-only subcommands | Evaluate the directory transition separately | [Permission guide](https://code.claude.com/docs/en/permissions#read-only-commands); trace pending |
| PERM-026 | Read-only command redirects output → prompt except for `/dev/null` redirection | Redirect target is a protected side effect | [Permission guide](https://code.claude.com/docs/en/permissions#read-only-commands); trace pending |

## Built-in tool leaves

Each row identifies a distinct tool surface from the [current tools reference](https://code.claude.com/docs/en/tools-reference). `No/Yes` is the documented **manual-mode** approval requirement for an in-scope path, not a guarantee that the tool is exposed in this installed account. Tool-specific inputs, output limits, errors, cancellation, and side effects remain separate contract work in T064. Glob/Grep have synthetic loopback dispatch observations; no paid-provider or interactive tool invocation has been observed.

| ID | Tool / independently testable action | Manual approval; availability condition | Evidence status |
|----|--------------------------------------|-----------------------------------------|-----------------|
| TOOL-001 | `Read`: read file content and supported media | No in-scope; out-of-scope may prompt | Documented; trace pending |
| TOOL-002 | `Glob`: enumerate paths by pattern | No in-scope; absent by default on macOS/Linux/WSL | Synthetic loopback [normal](observations/tool-glob-call-format-loopback-2026-09-14.json) returns `fixture.txt`, [no-match](observations/tool-glob-no-match-format-loopback-2026-09-14.json) returns `No files found`, and [invalid bracket](observations/tool-glob-invalid-format-loopback-2026-09-14.json) is a redacted tool error; [explicit catalog](observations/tool-glob-enabled-loopback-2026-09-14.json) includes Glob. Real-service and interactive behavior remain gated. |
| TOOL-003 | `Grep`: search file content by pattern | No in-scope; absent by default on macOS/Linux/WSL | Synthetic loopback [normal](observations/tool-grep-call-format-loopback-2026-09-14.json) returns `Found 1 file\nfixture.txt`, [no-match](observations/tool-grep-no-match-format-loopback-2026-09-14.json) returns `No files found`, and [invalid bracket](observations/tool-grep-invalid-format-loopback-2026-09-14.json) is a redacted tool error; [explicit catalog](observations/tool-grep-enabled-loopback-2026-09-14.json) includes Grep. Option-level traces are in [validation](validation.md); real-service and interactive behavior remain gated. |
| TOOL-004 | `Edit`: targeted replacement in a file | Yes unless mode/rule approves | Documented; trace pending |
| TOOL-005 | `Write`: create or overwrite a file | Yes unless mode/rule approves | Documented; trace pending |
| TOOL-006 | `NotebookEdit`: modify notebook cells | Yes unless mode/rule approves | Documented; trace pending |
| TOOL-007 | `Bash`: execute shell command with output/exit status | Yes except built-in read-only commands | Installed help names tool; trace pending |
| TOOL-008 | `PowerShell`: execute native PowerShell command | Yes; opt in via documented environment variable | Documented; disabled unless opted in |
| TOOL-009 | `WebFetch`: fetch URL content | Yes except preapproved documentation domains | Documented; trace pending |
| TOOL-010 | `WebSearch`: search web results | Yes; per-session search limit documented | Documented; trace pending |
| TOOL-011 | `LSP`: definitions, references, diagnostics | No; requires language-server integration | Documented; local availability unobserved |
| TOOL-012 | `Agent`: run subagent in separate context | No; type/model/isolation controls | Documented; trace pending |
| TOOL-013 | `AskUserQuestion`: ask multiple-choice question | No; user-interaction/timeout controls | Documented; trace pending |
| TOOL-014 | `EnterPlanMode`: switch session to planning | No | Documented; trace pending |
| TOOL-015 | `ExitPlanMode`: present plan and request approval | Yes | Documented; trace pending |
| TOOL-016 | `EnterWorktree`: create/enter isolated git worktree | Yes for external path; default internal path without prompt | Documented; trace pending |
| TOOL-017 | `ExitWorktree`: return to original working directory | No; unavailable to pinned-workdir subagent | Documented; trace pending |
| TOOL-018 | `TaskCreate`: add task | No; default only on specified models or opt-in | Documented; local availability unobserved |
| TOOL-019 | `TaskGet`: retrieve task details | No; same model gate as task tools | Documented; local availability unobserved |
| TOOL-020 | `TaskList`: list tasks | No; same model gate as task tools | Documented; local availability unobserved |
| TOOL-021 | `TaskUpdate`: update/delete task | No; same model gate as task tools | Documented; local availability unobserved |
| TOOL-022 | `TaskStop`: stop background task/agent | No | Documented; trace pending |
| TOOL-023 | `TaskOutput`: read background output | No; deprecated in favor of Read on output file | Documented; trace pending |
| TOOL-024 | `TodoWrite`: manage legacy checklist | No; disabled by default when task tools active, environment opt-in | Documented; local availability unobserved |
| TOOL-025 | `ToolSearch`: discover deferred tool | No; only with tool search enabled | Documented; local availability unobserved |
| TOOL-026 | `WaitForMcpServers`: wait for connecting server | No; only when tool search disabled | Documented; local availability unobserved |
| TOOL-027 | `ListMcpResourcesTool`: list server resources | No; connected MCP server needed | Documented; local availability unobserved |
| TOOL-028 | `ReadMcpResourceTool`: read resource URI | No; connected MCP resource needed | Documented; local availability unobserved |
| TOOL-029 | `Skill`: execute reusable workflow | Yes; installed skill needed | Documented; local availability unobserved |
| TOOL-030 | `Monitor`: stream background command or WebSocket events | Yes; tool-specific environment support | Documented; local availability unobserved |
| TOOL-031 | `CronCreate`: schedule session prompt | No; session-scoped | Documented; local availability unobserved |
| TOOL-032 | `CronDelete`: cancel scheduled prompt | No; existing schedule required | Documented; local availability unobserved |
| TOOL-033 | `CronList`: list scheduled prompts | No | Documented; local availability unobserved |
| TOOL-034 | `ScheduleWakeup`: schedule/stop self-paced loop iteration | No; internal loop use | Documented; local availability unobserved |
| TOOL-035 | `ListAgents`: enumerate messageable agents/sessions | No; cross-session messaging enabled, v2.1.224+ | Documented; local availability unobserved |
| TOOL-036 | `SendMessage`: message an agent/session | No; cross-session gate for other sessions | Documented; local availability unobserved |
| TOOL-037 | `ReportFindings`: submit structured review findings | No; v2.1.196+ and review instructions active | Documented; local availability unobserved |
| TOOL-038 | `EndConversation`: end session | No; v2.1.213+, rare-use tool | Documented; local availability unobserved |
| TOOL-039 | `Artifact`: publish HTML/Markdown artifact | Yes; eligible subscription and login | Documented; local availability unobserved |
| TOOL-040 | `PushNotification`: desktop/phone push | No; phone requires connected remote control; hosted delivery gate | Documented; local availability unobserved |
| TOOL-041 | `RemoteTrigger`: manage hosted routines | No; eligible subscription and provider, policy gate | Documented; local availability unobserved |
| TOOL-042 | `SendUserFile`: deliver file to connected client | No; remote control or managed cloud, provider gate | Documented; local availability unobserved |
| TOOL-043 | `ShareOnboardingGuide`: publish onboarding guide | Yes; eligible subscription | Documented; local availability unobserved |
| TOOL-044 | `SendFeedback`: draft user-reviewable feedback | No; v2.1.238+ | Documented; local availability unobserved |
| TOOL-045 | `Workflow`: orchestrate subagents via dynamic workflow | Yes; workflow availability pending local check | Documented; local availability unobserved |

## Model and effort leaves

The [model configuration reference](https://code.claude.com/docs/en/model-config) is the source for aliases, effort, and fallbacks. Account/provider entitlement is a run-time input, so static documentation does not establish the installed account's available models.

| ID | Input or condition → expected behavior | Scope / precedence / availability | Evidence status |
|----|----------------------------------------|-----------------------------------|-----------------|
| MODEL-001 | `model` is a supported alias → resolve to account/provider model | `default`, tier aliases, and `opusplan` documented | Documented; account resolution pending |
| MODEL-002 | `model` is full provider ID → use specified model if accessible | Anthropic name, Bedrock ARN, Foundry deployment, or Vertex version | Documented; account resolution pending |
| MODEL-003 | `default` selected → clear override and use account recommendation | Provider/plan-specific default; may change by release | Documented; account resolution pending |
| MODEL-004 | `opusplan` selected → planning/execution model switch | Opus in plan, Sonnet in execution; availability depends on entitlement | Documented; trace pending |
| MODEL-005 | `/model` selects a model → persist as user default | `s` switches current session only; file write failure means nonpersistent choice | Documented; trace pending |
| MODEL-006 | `--model` and `ANTHROPIC_MODEL` are set → flag wins for session | Both override file `model`; managed allowlist still constrains choices | Documented; trace pending |
| MODEL-007 | `availableModels` restricts selection → disallowed model cannot be selected | Managed list authoritative; provider access still required | Documented; trace pending |
| MODEL-008 | `fallbackModel` chain is configured → ordered fallback on eligible failure | Higher-precedence whole list replaces lower list; installed `--fallback-model` accepts comma-separated chain | Documented/local help; trace pending |
| MODEL-009 | `/effort` sets low/medium/high/xhigh → persist supported level | Model-dependent levels; `auto` resets to model default | Documented; trace pending |
| MODEL-010 | `/effort max` selected → current-session maximum | Supported only on matching models; settings file does not accept max | Documented; trace pending |
| MODEL-011 | Unsupported effort level selected → fall back to highest supported level at or below it | E.g. xhigh to high on models without xhigh | Documented; trace pending |
| MODEL-012 | `CLAUDE_CODE_EFFORT_LEVEL` set → override session effort | Overrides command/picker/settings; skill/subagent frontmatter cannot override it | Documented; trace pending |
| MODEL-013 | `modelSettings` specifies a per-model effort → resolve against global effort | Per-model setting and `effortLevel` have special precedence | Documented; trace pending |
| MODEL-014 | Prompt contains `ultrathink` → deeper reasoning instruction for one turn | API effort level unchanged; other thinking phrases are literal | Documented; trace pending |
| MODEL-015 | Custom provider model capabilities declared → enable listed features only | Capability suffix variables govern effort/thinking detection | Documented; provider probe pending |
| MODEL-016 | Enterprise role effort cap and managed `maxEffortLevel` both apply → use the lower cap | Role limit requires eligible Enterprise account; managed cap applies to other providers too | [Model guide](https://code.claude.com/docs/en/model-config#organization-effort-limits); account-gated |
| MODEL-017 | Organization default model is enabled → supersede user/project/local saved model at next launch | CLI, environment, managed settings, and invocation `--settings` retain higher precedence; Anthropic API auth gate | [Model guide](https://code.claude.com/docs/en/model-config#organization-default-model); account-gated |

## First US1 slice: stable tracking leaves

These IDs split the initial coding journey for evidence collection. The installed CLI help names `Read`, `Edit`, and `Bash`; the [official tools reference](https://code.claude.com/docs/en/tools-reference) also documents `Grep` and `Glob`. An earlier sandboxed print-mode read request stopped at authentication before tool dispatch ([raw observation](observations/us1-unauthenticated.txt)). Later synthetic localhost Messages responses drove installed Glob/Grep tool calls in disposable repositories, with external network blocked and no model-account use. Those traces establish only the listed local result shapes and catalog availability; real-service and interactive behavior remain gated by the reported weekly cap.

| ID | Leaf behavior to observe | Discovery evidence | nox target | Current status |
|----|--------------------------|--------------------|------------|----------------|
| US1-READ-001 | Read an in-scope text file and report result | Installed `--tools` help names `Read`; synthetic loopback [normal](observations/read-loopback-2026-09-14.json) [missing-path](observations/read-missing-loopback-2026-09-14.json), and [outside-workspace denial](observations/read-outside-loopback-2026-09-14.json) traces | `packages/coding-agent/src/utils/tools-manager.ts` | Partial normal, missing-path, and denial result-shape observation; exact diagnostics/interactive permission and real-service cases `gated-unverified` |
| US1-SEARCH-PATH-001 | Find fixture paths matching a pattern | Installed explicit Glob catalog and [normal](observations/tool-glob-call-format-loopback-2026-09-14.json), [no-match](observations/tool-glob-no-match-format-loopback-2026-09-14.json), [invalid](observations/tool-glob-invalid-format-loopback-2026-09-14.json) synthetic traces | `packages/coding-agent/src/core/tools/claude-search.ts` and `find.ts` | Partial local result-shape parity; real-service and interactive behavior `gated-unverified` |
| US1-SEARCH-CONTENT-001 | Find matching text in fixture files | Installed explicit Grep catalog and [normal](observations/tool-grep-call-format-loopback-2026-09-14.json), [no-match](observations/tool-grep-no-match-format-loopback-2026-09-14.json), [invalid](observations/tool-grep-invalid-format-loopback-2026-09-14.json) synthetic traces | `packages/coding-agent/src/core/tools/claude-search.ts` and `grep.ts` | Partial local result-shape parity; real-service and interactive behavior `gated-unverified` |
| US1-EDIT-001 | Apply a targeted edit to an in-scope file | Installed `--tools` help names `Edit`; official tools reference | `packages/coding-agent/src/utils/tools-manager.ts` | `gated-unverified`: weekly cap reported by user |
| US1-COMMAND-001 | Run a fixture command and return output and exit state | Installed `--tools` help names `Bash`; official tools reference | `packages/coding-agent/src/utils/tools-manager.ts` | `gated-unverified`: weekly cap reported by user |
| US1-DENY-001 | Deny a proposed `Edit` action and preserve the file | `Edit` permission requirement in official tools reference; decision trace pending | `packages/coding-agent/src/core/agent-session.ts` | `gated-unverified`: weekly cap reported by user |
| US1-FAIL-001 | Report a nonzero `Bash` command result without concealing side effects | `Bash` tool documented; failure trace pending | `packages/coding-agent/src/core/agent-session.ts` | `gated-unverified`: weekly cap reported by user |
| US1-RECOVER-001 | Continue the same session after a nonzero `Bash` result | Session interaction requirement; continuation trace pending | `packages/coding-agent/src/core/agent-session.ts` | `gated-unverified`: weekly cap reported by user |

The denial, failure, and recovery IDs track distinct state transitions of the named parent action, rather than generic outcomes for every tool. The first-slice IDs are tracking IDs, not sufficient evidence for T013 implementation tasks. Their exact inputs, outputs, permission decisions, and interaction rules must be captured in a suitable authenticated fixture before source work.
