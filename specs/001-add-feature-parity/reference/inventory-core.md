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

## First US1 slice: stable tracking leaves

These IDs split the initial coding journey for evidence collection. The installed CLI help names `Read`, `Edit`, and `Bash`; the [official tools reference](https://code.claude.com/docs/en/tools-reference) also documents `Grep` and `Glob`, but their availability in this installed configuration has not been observed. A print-mode read request stopped at authentication before tool dispatch ([raw observation](observations/us1-unauthenticated.txt)). The failure is a session-entry gate, not a demonstrated failure of any individual tool. No row below has a normal tool trace or passing nox comparison.

| ID | Leaf behavior to observe | Discovery evidence | nox target | Current status |
|----|--------------------------|--------------------|------------|----------------|
| US1-READ-001 | Read an in-scope text file and report result | Installed `--tools` help names `Read`; official tools reference | `packages/coding-agent/src/utils/tools-manager.ts` | `gated-unverified`: unauthenticated host |
| US1-SEARCH-PATH-001 | Find fixture paths matching a pattern | Official tools reference names `Glob`; installed availability pending | `packages/coding-agent/src/utils/tools-manager.ts` | `gated-unverified`: unauthenticated host |
| US1-SEARCH-CONTENT-001 | Find matching text in fixture files | Official tools reference names `Grep`; installed availability pending | `packages/coding-agent/src/utils/tools-manager.ts` | `gated-unverified`: unauthenticated host |
| US1-EDIT-001 | Apply a targeted edit to an in-scope file | Installed `--tools` help names `Edit`; official tools reference | `packages/coding-agent/src/utils/tools-manager.ts` | `gated-unverified`: unauthenticated host |
| US1-COMMAND-001 | Run a fixture command and return output and exit state | Installed `--tools` help names `Bash`; official tools reference | `packages/coding-agent/src/utils/tools-manager.ts` | `gated-unverified`: unauthenticated host |
| US1-DENY-001 | Deny a proposed `Edit` action and preserve the file | `Edit` permission requirement in official tools reference; decision trace pending | `packages/coding-agent/src/core/agent-session.ts` | `gated-unverified`: unauthenticated host |
| US1-FAIL-001 | Report a nonzero `Bash` command result without concealing side effects | `Bash` tool documented; failure trace pending | `packages/coding-agent/src/core/agent-session.ts` | `gated-unverified`: unauthenticated host |
| US1-RECOVER-001 | Continue the same session after a nonzero `Bash` result | Session interaction requirement; continuation trace pending | `packages/coding-agent/src/core/agent-session.ts` | `gated-unverified`: unauthenticated host |

The denial, failure, and recovery IDs track distinct state transitions of the named parent action, rather than generic outcomes for every tool. The first-slice IDs are tracking IDs, not sufficient evidence for T013 implementation tasks. Their exact inputs, outputs, permission decisions, and interaction rules must be captured in a suitable authenticated fixture before source work.
