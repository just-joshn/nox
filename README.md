# Nox

> An autonomous, secure, and extensible AI coding agent harness designed for terminal-driven pair programming, multi-mode operations, background tasks, and full workflow automation.

---

## Overview

**Nox** combines high-performance terminal UI pair-programming with deep operational modes, rule-based permission boundaries, background agent workers, extensible skills, and multi-provider model routing.

Nox is designed to be completely independent, storing project configurations in `.nox/` and user-level preferences in `~/.nox/agent/`.

---

## Quick Start

### Prerequisites

- Node.js >= 22.19.0
- npm or Bun

### Installation & Build

Clone the repository and build Nox from source:

```bash
# Clone the repository
git clone https://github.com/just-joshn/nox.git
cd nox

# Install dependencies (ignoring lifecycle scripts for supply-chain security)
npm install --ignore-scripts

# Build all packages
npm run build

# Run all test suites
npm test
```

### Running Nox

You can run Nox directly from the command line:

```bash
# Interactive TUI mode
node packages/coding-agent/dist/cli.js

# Interactive mode with an initial prompt
node packages/coding-agent/dist/cli.js "Explore the repository structure and list key modules"

# Non-interactive print mode (execute prompt and exit)
node packages/coding-agent/dist/cli.js -p "Run git status and summarize pending changes"

# Launch in read-only plan mode
node packages/coding-agent/dist/cli.js --tools read,grep,find,ls "Plan the refactor of user authentication"

# Launch a background agent task
node packages/coding-agent/dist/cli.js --bg "Run test suite and fix failing lint issues" --name "lint-fix"
```

To install Nox globally or link it:

```bash
npm link --prefix packages/coding-agent
nox
```

---

## Key Features

### 1. Operational & Permission Modes

Nox provides robust permission boundaries and operational modes to suit different trust and pair-programming levels:

| Mode | Command / Flag | Behavior |
|------|----------------|----------|
| **`default`** | `/mode default` | Prompts for confirmation before modifying files or executing bash commands. Read-only operations in workspace are allowed. |
| **`plan`** | `/plan` or `/mode plan` | Read-only analysis mode. Blocks all file mutations, writes, and destructive commands. Ideal for planning, code reviews, and scoping. |
| **`accept-edits`** | `/mode accept-edits` | Auto-approves file writes and edits within the workspace. Continues prompting for bash executions. |
| **`dont-ask`** | `/mode dont-ask` | Auto-approves safe read-only operations and silently denies dangerous out-of-scope actions without blocking. |
| **`bypass-permissions`** | `/mode bypass-permissions` | Bypasses confirmation prompts for automated workflows in trusted sandboxes. |

You can view active permissions and custom rules anytime via `/permissions`.

### 2. Background Agents & Tasks

Nox supports launching and managing long-running tasks in the background:

- **Launch background task**:
  ```bash
  nox --bg "Run end-to-end integration tests and document failures" --name "e2e-run"
  ```
- **Manage from Interactive TUI**:
  - `/agents` or `/tasks`: List all active and completed background tasks with status, duration, and prompt summaries.
  - `/agents logs <id>`: View the live output logs for a background agent.
  - `/agents stop <id>`: Gracefully stop a running background task.
  - `/agents rm <id>`: Clean up a background session record.
- **TUI Footer Badge**: When background agents are active, a live badge (e.g. `⚡ 1 bg`) appears in the bottom status bar.

### 3. Context & Instruction Hierarchy

Nox automatically discovers and loads instructions in the following order:

1. **`NOX.md` / `AGENTS.md` / `CLAUDE.md`** (Project root or parent directories): Project-level behavioral rules and coding guidelines.
2. **`.nox/rules`**: Fine-grained tool and file permission rules.
3. **`.nox/skills/` & `~/.nox/agent/skills/`**: Reusable specialized skill modules with YAML frontmatter.
4. **`.nox/prompts/` & `~/.nox/agent/prompts/`**: Custom prompt templates.
5. **`.nox/themes/` & `~/.nox/agent/themes/`**: Custom terminal color themes.

### 4. Interactive TUI & Slash Commands

Nox features an interactive terminal UI with instant keyboard navigation, diff viewing, and slash commands:

- `/mode [name]` - View or switch operational mode (`default`, `plan`, `accept-edits`, `dont-ask`, `bypass-permissions`).
- `/plan` - Instantly toggle read-only plan mode on/off.
- `/permissions` - View current permission rules and operational status.
- `/agents` or `/tasks` - Manage background agents (`list`, `logs`, `stop`, `rm`).
- `/skills` - View loaded agent skills and their source scopes.
- `/model` (or `Ctrl+L`) - Switch model dynamically across configured providers.
- `/thinking` - Adjust thinking budget level (`off`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`).
- `/compact` - Manually compact session context to optimize memory and token spend.
- `/new` - Start a fresh session.
- `/resume` - Resume prior sessions across projects.
- `/settings` - Manage interactive preferences.
- `/quit` (or `Ctrl+C`) - Exit Nox cleanly.

---

## Configuration & User Data

All Nox configuration and session data is isolated under `.nox/` and `~/.nox/`:

- **Project Config**: `<workspace>/.nox/`
- **User Config**: `~/.nox/agent/`
  - `settings.json`: User preferences, default model, theme, keybindings.
  - `models.json`: Custom models and endpoint overrides.
  - `auth.json`: Authentication credentials (API keys and OAuth tokens).
  - `sessions/`: Persisted session logs and compaction checkpoints.
  - `background-sessions/`: Background agent state, session files, and execution logs.

---

## Multi-Provider Support

Nox supports dozens of LLM providers out of the box:

- **Anthropic** (`ANTHROPIC_API_KEY`)
- **OpenAI** (`OPENAI_API_KEY`)
- **Google Gemini / Vertex** (`GEMINI_API_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`)
- **Amazon Bedrock** (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`)
- **Azure OpenAI** (`AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_BASE_URL`)
- **OpenRouter, Groq, Cerebras, Mistral, xAI Grok, Together AI, Fireworks, DeepSeek**, and more.

---

## Monorepo Architecture

The Nox monorepo is structured as modular, cohesive packages:

```
packages/
├── coding-agent/       # Primary CLI, interactive TUI, slash commands, tools, and background agent orchestrator
├── agent/              # Core agent runtime, tool execution engine, and state management
├── ai/                 # Unified multi-provider LLM API, token tracking, and streaming protocol
├── chord/              # Composition runtime for RPC, services, and plugins
├── protocol/           # Message formats and RPC wire protocols
├── telemetry/          # OpenTelemetry contracts and diagnostic schemas
└── tui/                # Terminal UI differential rendering library
```

---

## Quality & Governance

Nox follows strict coding and stability guidelines:

- **Goal-Driven TDD**: 100% verifiable requirements with continuous test suites.
- **Immutability First**: State transitions return new instances without mutation side-effects.
- **Focused Modules**: Cohesive files (<800 lines) and concise functions (<50 lines).
- **Strict Verification**: `npm run check` verifies biome formatting, linting, pinned dependencies, shrinkwrap integrity, and TypeScript types.

---

## License

MIT © Josh N. and Contributors.
