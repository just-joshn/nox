# Extension Capability Discovery

**Status**: Discovery only. Sources: [skills](https://code.claude.com/docs/en/skills), [subagents](https://code.claude.com/docs/en/subagents), [agent teams](https://code.claude.com/docs/en/agent-teams), [hooks](https://code.claude.com/docs/en/hooks), [MCP](https://code.claude.com/docs/en/mcp), [plugins](https://code.claude.com/docs/en/plugins-reference), [channels](https://code.claude.com/docs/en/channels), [scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks), and [goal](https://code.claude.com/docs/en/goal).

| ID | Capability | Required observation |
|----|------------|----------------------|
| EXT-001 | Skills and bundled commands | Discovery, invocation, arguments, chaining, precedence |
| EXT-002 | Custom subagents | Scope, configuration, isolation, tools, model, memory, result |
| EXT-003 | Background subagents and teams | Creation, messaging, shared tasks, cancellation, recovery |
| EXT-004 | Cross-session messaging and agent view | Discovery, addressing, delivery, lifecycle |
| EXT-005 | Hooks | Event set, ordering, handlers, input/output, blocking, failure |
| EXT-006 | MCP servers | Scope, transport, trust, auth, tools, resources, prompts, reconnect |
| EXT-007 | MCP channels | Subscription, notification delivery, gating, failure |
| EXT-008 | Plugins and marketplaces | Discovery, namespace, install, enable/disable, update, removal |
| EXT-009 | Plugin validation and evaluation | Manifest errors, trust, results, no-plugin baseline |
| EXT-010 | Dynamic workflows | Definition, launch, fan-out, result, cancellation |
| EXT-011 | Scheduled prompts and goals | Timing, persistence, completion, cancellation |
| EXT-012 | Output styles and themes | Discovery, precedence, rendering, disablement |

Each row must be split by setting, event, command, transport, failure mode, and gated variant before T004 is complete. No live integration was invoked in this pass.
