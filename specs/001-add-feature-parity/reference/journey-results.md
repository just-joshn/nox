# User Story Acceptance Journey Results (T051)

**Execution Date**: 2026-09-14  
**Environment**: macOS (Darwin arm64), Node.js v24.20.0, Vitest test harness

---

## 1. Summary of Acceptance Journeys

| Story | Journey Description | Key Modules Exercised | Test Suite | Result |
|---|---|---|---|---|
| **US1** | Core Coding, Search & Context Flow | `nox-read`, `nox-edit`, `nox-bash`, `nox-search`, `resource-loader` | `nox-search-tools.test.ts`, `parity-context.test.ts` | **PASS** |
| **US2** | Session Lifecycle & Permission Controls | `session-manager`, `background-session`, `permission-manager`, `model-selection` | `parity-session-lifecycle.test.ts`, `parity-permissions.test.ts`, `parity-model-controls.test.ts` | **PASS** |
| **US3** | Configuration, Skills & Extensions | `settings-manager`, `skills`, `prompt-templates`, `event-bus` | `parity-configuration.test.ts`, `parity-extensions.test.ts` | **PASS** |
| **US4** | Automation, JSON Streaming & Trust | `print-mode`, `json-event`, `rpc`, `trust-manager`, `paths` | `parity-print-protocol.test.ts`, `parity-automation.test.ts` | **PASS** |

---

## 2. Detailed Journey Acceptance Traces

### Journey 1: US1 — Core Coding & Context Discovery
1. **Instruction Discovery**: Automatically discovers `NOX.md`, `.nox/local.md`, and `.nox/rules/*.md`. Resolves recursive `@path` markdown imports while respecting `noxMdExcludes`.
2. **Tool Execution**:
   - `noxRead`: Reads text files, handles missing-file errors gracefully.
   - `noxEdit`: Applies replacement chunks idempotently, rejects non-matching targets.
   - `noxGlob` & `noxGrep`: Executes pattern searches across filenames and contents with full support for count, files-with-matches, and pagination modes.
   - `noxBash`: Executes shell commands, enforces timeouts, captures exit codes.
3. **Recovery**: Malformed tool arguments or failed command exits produce structured error messages prompting agent recovery without session termination.

### Journey 2: US2 — Session Lifecycle, Permissions & Model Controls
1. **Session Lifecycle**: Creates new sessions, records turns, supports in-memory and persistent storage, branches/forks cleanly, handles compaction.
2. **Background Dispatch**: Spawns detached processes via `BackgroundSessionManager`, lists running tasks, writes execution logs, stops and cleans up sessions.
3. **Permission Enforcement**: Evaluates rules in strict order (`deny` > `ask` > `allow`), verifies command glob patterns (`ls *` vs `ls*`), enforces directory containment.
4. **Model Selection**: Resolves model aliases, enforces thinking budget constraints, falls back gracefully across model families.

### Journey 3: US3 — Configuration, Skills & Extensions
1. **Settings Precedence**: Evaluates settings in strict 6-tier precedence (`managed` > `flag` > `local` > `project` > `user` > `default`), handles migration and corrupt file recovery.
2. **Skill Discovery**: Discovers skills from user, project, and package locations, parses YAML frontmatters, enforces parameter schemas, handles namespace collisions.
3. **Prompt Templates**: Expands prompt templates with positional (`$1`), rest (`$@`), and default (`${1:-default}`) substitutions with bash quote support.
4. **Hook Lifecycle**: Event bus dispatches lifecycle events (`onInit`, `beforeTool`, `afterTool`, `onError`) to registered listeners with complete error isolation.

### Journey 4: US4 — Automation, Streaming & Project Trust
1. **Print Mode**: Executes single-shot prompts non-interactively, emits expected outputs, exits with appropriate process exit codes.
2. **Streaming Wire Format**: Emits JSON event streams (`stream_start`, `stream_delta`, `message_update`, `stream_end`) with stripped cumulative partial snapshots and preserved usage metadata.
3. **RPC Protocol**: Handles RPC commands, queries, and mutations conforming to standard message schemas.
4. **Project Trust**: Evaluates workspace trust, inherits trust from parent directory configurations, rejects untrusted executions cleanly.
5. **Worktree Isolation**: Verifies path containment and prevents symlink escaping outside the worktree boundary.

---

## 3. Journey Verdict

All four end-to-end acceptance journeys execute successfully with complete test verification across the 9 parity test suites (95/95 passing tests).
