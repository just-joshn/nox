# Automation and Integration Discovery

**Status**: Discovery only. Sources: [platforms](https://code.claude.com/docs/en/platforms), [headless use](https://code.claude.com/docs/en/headless), [remote control](https://code.claude.com/docs/en/remote-control), [web sessions](https://code.claude.com/docs/en/claude-code-on-the-web), [worktrees](https://code.claude.com/docs/en/worktrees), [Chrome](https://code.claude.com/docs/en/chrome), [desktop](https://code.claude.com/docs/en/desktop), and [CLI reference](https://code.claude.com/docs/en/cli-usage).

| ID | Capability | Required observation | Availability |
|----|------------|----------------------|--------------|
| SUR-001 | Text, JSON, and stream-JSON print output | Message order, schema, errors, exit status | Local, unverified |
| SUR-002 | Stream input and partial messages | Framing, replay, interruption, backpressure | Local, unverified |
| SUR-003 | Structured output and budget | Validation, exhaustion, exit status | Account-gated, unverified |
| SUR-004 | Background sessions and agent view | Start, list, attach, logs, stop, restart, remove | Local, unverified |
| SUR-005 | Worktrees and terminal panes | Creation, isolation, PR/MR refs, cleanup | Environment-gated, unverified |
| SUR-006 | Remote control and cloud/teleport | Start, attach, handoff, authentication, disconnect | Service-gated, unverified |
| SUR-007 | Hosted reviews and routines | Dispatch, reports, posting, scheduling | Service-gated, unverified |
| SUR-008 | IDE, browser, computer-use integration | Connection, permission, actions, disconnect | Platform/service-gated, unverified |
| SUR-009 | Desktop, web, mobile, Slack, CI surfaces | Session continuity, tasks, notifications | Platform/service-gated, unverified |
| SUR-010 | Auth, diagnostics, import, update, project state | Subcommands, options, state changes, errors | Mixed, unverified |
| SUR-011 | Enterprise gateway and self-hosted runners | Configuration, policy, lifecycle, telemetry | Policy-gated, unverified |
| SUR-012 | Artifacts and deep links | Creation, sharing, launch, permissions | Service-gated, unverified |

Each row is a domain seed. The remote and account-gated capabilities have not been observed, and the command-specific option sets remain to be expanded before T005 is complete.
