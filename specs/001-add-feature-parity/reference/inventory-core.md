# Core Capability Discovery

**Status**: Discovery only; all entries need reference traces and nox mappings. Sources: [settings](https://code.claude.com/docs/en/configuration), [permissions](https://code.claude.com/docs/en/permissions), [memory](https://code.claude.com/docs/en/memory), [tools](https://code.claude.com/docs/en/tools-reference), [sessions](https://code.claude.com/docs/en/sessions), and [interactive commands](https://code.claude.com/docs/en/commands).

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

Each row is a domain seed, not yet an independently verified leaf inventory. Settings keys, permission syntax, tool variants, and interactive shortcuts must be split into leaf entries before T003 is complete.
