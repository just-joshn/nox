# @earendil-works/pi-coding-agent (Nox Coding Agent CLI)

> The standalone Nox interactive terminal coding agent, orchestrating multi-mode pair programming, permission boundary evaluation, background agent sessions, search tools, and multi-provider model routing.

---

## Overview

**Nox** is an autonomous terminal coding harness designed to give developers full control over AI code generation and tool execution.

### Key Capabilities

- **Interactive TUI**: Real-time differential rendering, interactive diff inspection, syntax highlighting, and keyboard shortcuts.
- **Operational & Permission Modes**: Built-in permission engine supporting `default`, `plan` (read-only), `accept-edits`, `dont-ask`, and `bypass-permissions` modes with live footer badge indicators.
- **Background Tasks & Agent Sessions**: Launch and manage long-running background tasks (`nox --bg "..."`, `/agents list`, `/agents logs <id>`, `/agents stop <id>`, `/agents rm <id>`).
- **First-Class Tools**: Built-in `read`, `write`, `edit`, `bash`, `powershell`, `grep`, `find`, and `ls` with custom extensions support.
- **Context & Custom Instructions**: Automatic discovery of `NOX.md`, `AGENTS.md`, and `CLAUDE.md`, plus `.nox/rules` and `.nox/skills/`.
- **Multi-Provider Routing**: Native support for Anthropic, OpenAI, Google Gemini/Vertex, Amazon Bedrock, Azure OpenAI, OpenRouter, Groq, DeepSeek, and more.

---

## Installation & Usage

### Local Build & Run

```bash
# From repository root
npm run build

# Launch interactive TUI
node packages/coding-agent/dist/cli.js

# Launch with a prompt
node packages/coding-agent/dist/cli.js "Refactor the session manager to use async iterators"

# Launch in non-interactive print mode
node packages/coding-agent/dist/cli.js -p "Run tests and summarize results"
```

### Global Linking

```bash
npm link --prefix packages/coding-agent
nox
```

---

## Operational & Permission Modes

Nox provides fine-grained control over what tools the agent can execute:

| Mode | Slash Command | CLI Flag | Description |
|------|---------------|----------|-------------|
| **Default** | `/mode default` | *(default)* | Prompts for confirmation on file edits and shell commands. In-workspace reads are allowed. |
| **Plan** | `/plan` or `/mode plan` | `--permission-mode plan` | Read-only analysis. Blocks file modifications and destructive shell actions. |
| **Accept Edits** | `/mode accept-edits` | `--permission-mode acceptEdits` | Auto-approves file writes and edits within the workspace. |
| **Don't Ask** | `/mode dont-ask` | `--permission-mode dontAsk` | Auto-approves safe reads; silently denies out-of-scope actions without prompting. |
| **Bypass** | `/mode bypass-permissions` | `--permission-mode bypassPermissions` | Bypasses all confirmation prompts in trusted sandboxes. |

The active mode is displayed in the bottom footer status bar (e.g., `[plan]`, `[accept-edits]`).

---

## Background Agent Tasks

Nox allows running long-running operations in the background while keeping your terminal responsive:

```bash
# Start a background task
nox --bg "Run comprehensive test suite and capture coverage metrics" --name "test-runner"
```

### Managing Tasks in the TUI

- `/agents` or `/tasks`: List all background tasks.
- `/agents logs <id>`: View real-time log output for a background task.
- `/agents stop <id>`: Stop a running background task.
- `/agents rm <id>`: Remove a completed background task record.

The status bar displays active background tasks with a lightning indicator (e.g., `⚡ 2 bg`).

---

## Slash Commands Reference

| Command | Arguments | Description |
|---------|-----------|-------------|
| `/mode` | `[mode-name]` | View or change operational permission mode |
| `/plan` | | Toggle read-only plan mode |
| `/permissions` | | View active permission rules and evaluation status |
| `/agents` | `[list\|logs\|stop\|rm]` | List and manage background tasks |
| `/skills` | | View loaded agent skills and custom instructions |
| `/model` | `[model-name]` | Switch active model (or `Ctrl+L`) |
| `/thinking` | `[level]` | Change thinking budget (`off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`) |
| `/compact` | `[instructions]` | Manually compact session context |
| `/new` | | Clear current session and start fresh |
| `/resume` | | Switch to or resume another session |
| `/export` | `[path]` | Export session transcript to HTML |
| `/settings` | | Open interactive settings configuration |
| `/quit` | | Exit Nox cleanly |

---

## Directory & File Layout

- **Project Config**: `<workspace>/.nox/`
  - `.nox/rules` - Permission rules
  - `.nox/skills/` - Custom skill scripts and markdown guides
  - `.nox/prompts/` - Custom prompt templates
  - `.nox/themes/` - Custom terminal themes
  - `.nox/settings.json` - Project overrides
- **User Config**: `~/.nox/agent/`
  - `settings.json` - Global user settings
  - `models.json` - Custom model definitions
  - `auth.json` - Provider API keys and OAuth tokens
  - `sessions/` - Persisted session files
  - `background-sessions/` - Background task logs and state

---

## Architecture

Nox Coding Agent is written in TypeScript and built on modular components:

- `src/modes/interactive/`: Interactive differential TUI, autocomplete, and editor components.
- `src/core/permission-manager.ts`: Operational mode evaluation and rule enforcement.
- `src/core/background-session.ts`: Process management and lifecycle for background jobs.
- `src/core/tools/`: Tool definitions (`read`, `write`, `edit`, `bash`, `powershell`, `grep`, `find`, `ls`).
- `src/core/resource-loader.ts`: Hierarchical discovery of instructions, skills, themes, and templates.

---

## License

MIT © Josh N. and Contributors.
