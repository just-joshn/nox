# Reference Scenarios

**Snapshot**: local CLI 2.1.270 on macOS, 2026-09-13. These first-slice scenarios are evidence-gathering records, not parity tests. The only local behavior observed is the unauthenticated session-entry failure in [us1-unauthenticated.txt](observations/us1-unauthenticated.txt). It must not be attributed to an individual tool.

| Scenario ID | Leaf ID | Matched fixture and action | Reference observation | Required next observation |
|-------------|---------|----------------------------|-----------------------|---------------------------|
| US1-READ-NORMAL | US1-READ-001 | Disposable repository with a two-line text file; request an in-scope read | Pending | Tool input, result shape, content limits, permission decision |
| US1-SEARCH-NORMAL | US1-SEARCH-001 | Disposable repository with matching and nonmatching files; request path and content search | Pending | Installed tool availability, query semantics, ordering, result shape |
| US1-EDIT-NORMAL | US1-EDIT-001 | Disposable repository with known initial file; request one targeted change | Pending | Approval, edit input, exact file delta, result and persistence |
| US1-COMMAND-NORMAL | US1-COMMAND-001 | Disposable repository; request a harmless command with known stdout and exit code | Pending | Approval, environment, stdout/stderr, exit and timeout behavior |
| US1-DENY-FAILURE | US1-DENY-001 | Disposable repository; refuse a proposed write or command | Pending | Prompt, denial decision, error text, unchanged files, follow-up state |
| US1-TOOL-FAILURE | US1-FAIL-001 | Disposable repository; trigger a safe missing-path or nonzero-exit case | Pending | Error/result shape, partial effects, retry decision |
| US1-RECOVER-INTERACTION | US1-RECOVER-001 | Continue same session after a denial or tool failure | Pending | History, available next actions, successful continuation |
| US1-AUTH-FAILURE | All seven US1 tracking leaves are blocked before dispatch | Disposable directory with `fixture.txt`; print-mode read request while logged out | Exit 1, `Not logged in · Please run /login`; no tool dispatch observed | Re-run normal and failure cases with authorized reference access |

For all pending scenarios, record the initial repository tree, working directory, CLI version, account and permission mode, exact input sequence, permission answers, ordered events, user-visible output, exit status, file/session side effects, and declared normalization before comparison. Do not record credentials. A documented description or this authentication failure cannot complete a normal or tool-failure scenario.
