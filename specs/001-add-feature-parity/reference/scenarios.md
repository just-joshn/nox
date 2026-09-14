# Reference Scenarios

**Snapshot**: local CLI 2.1.270 on macOS, 2026-09-13. These first-slice scenarios are evidence-gathering records, not parity tests. The only model-backed request attempted was an earlier sandboxed read that stopped at authentication in [us1-unauthenticated.txt](observations/us1-unauthenticated.txt). Authentication was later confirmed outside the sandbox, but the user reported the weekly usage cap had been reached; no further model-backed request was attempted. The sandbox failure must not be attributed to an individual tool.

| Scenario ID | Leaf ID | Matched fixture and action | Reference observation | Required next observation |
|-------------|---------|----------------------------|-----------------------|---------------------------|
| US1-READ-NORMAL | US1-READ-001 | Disposable repository with a two-line text file; request an in-scope read | Pending | Tool input, result shape, content limits, permission decision |
| US1-SEARCH-PATH-NORMAL | US1-SEARCH-PATH-001 | Disposable repository with matching and nonmatching paths; request path-pattern search | Pending | Installed path-search availability, pattern semantics, ordering, result shape |
| US1-SEARCH-PATH-NO-MATCH | US1-SEARCH-PATH-001 | Same repository; request a path pattern with no matches | Pending | Empty-result behavior and exit state |
| US1-SEARCH-PATH-INVALID | US1-SEARCH-PATH-001 | Same repository; request an invalid path pattern | Pending | Validation or tool error, unchanged files |
| US1-SEARCH-CONTENT-NORMAL | US1-SEARCH-CONTENT-001 | Disposable repository with matching and nonmatching file contents; request content search | Pending | Installed content-search availability, query semantics, ordering, result shape |
| US1-SEARCH-CONTENT-NO-MATCH | US1-SEARCH-CONTENT-001 | Same repository; request text absent from all files | Pending | Empty-result behavior and exit state |
| US1-SEARCH-CONTENT-INVALID | US1-SEARCH-CONTENT-001 | Same repository; request an invalid content pattern | Pending | Validation or tool error, unchanged files |
| US1-EDIT-NORMAL | US1-EDIT-001 | Disposable repository with known initial file; request one targeted change | Pending | Approval, edit input, exact file delta, result and persistence |
| US1-COMMAND-NORMAL | US1-COMMAND-001 | Disposable repository; request a harmless command with known stdout and exit code | Pending | Approval, environment, stdout/stderr, exit and timeout behavior |
| US1-EDIT-DENY | US1-DENY-001; parent `US1-EDIT-001` | Disposable repository; refuse a proposed targeted edit | Pending | Prompt, denial decision, error text, unchanged file, follow-up state |
| US1-COMMAND-FAILURE | US1-FAIL-001; parent `US1-COMMAND-001` | Disposable repository; run a harmless command with a nonzero exit | Pending | Error/result shape, stdout/stderr, actual side effects, retry decision |
| US1-COMMAND-RECOVER | US1-RECOVER-001; parent `US1-COMMAND-001` | Continue same session after the nonzero command | Pending | History, available next actions, successful continuation |
| US1-AUTH-FAILURE | `US1-READ-001` request only | Disposable directory with `fixture.txt`; print-mode read request while logged out | Exit 1, `Not logged in · Please run /login`; no tool dispatch observed | Other leaves not probed; re-run normal and failure cases with authorized reference access |

For all pending scenarios, record the initial repository tree, working directory, CLI version, account and permission mode, exact input sequence, permission answers, ordered events, user-visible output, exit status, file/session side effects, and declared normalization before comparison. Do not record credentials. A documented description or this authentication failure cannot complete a normal or tool-failure scenario.
