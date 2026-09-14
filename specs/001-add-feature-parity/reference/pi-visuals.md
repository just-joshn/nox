# Pi terminal visual matrix

**Status:** Predeclared matrix; reference captures pending. The existing Pi TUI is the visual authority for nox. A green functional test does not prove a visual match. No intentional departure is approved; any proposed departure requires a constitution amendment before implementation (FR-003).

The first frozen component capture is `packages/coding-agent/test/__snapshots__/pi-visual-baseline.test.ts.snap`, generated from the unchanged Pi renderer on `main` at `484817a55` and checked by `packages/coding-agent/test/pi-visual-baseline.test.ts`. It records raw ANSI for the built-in read-tool request, collapsed and expanded success, and error card with synthetic `notes.txt` input at 1, 40, 80, and 120 columns in dark and light themes. This covers only the card itself; it does not capture the full terminal, cursor, denial, recovery, or other tool cards. The matrix below remains open.

For each affected row, render the pre-change Pi revision and the candidate nox revision from the same disposable session, settings, terminal size, and action sequence. Save normalized terminal frames or ANSI transcripts with the revision and fixture. Compare visible text, wrapping, alignment, borders, colors, emphasis, cursor placement, focus, scroll position, and feedback timing. Normalize only volatile paths, timestamps, IDs, and terminal escape sequences that do not change appearance; never normalize missing controls, text, colors, or layout.

The width sample is 1 column (rendering boundary), 40 columns (narrow), 80 columns (default fallback), and 120 columns (wide), plus any width where a touched component changes its layout. Both built-in `dark` and `light` themes are required. A changed custom-theme behavior also requires its own fixture. Terminal height is 24 rows by default and 10 rows for overflow/scroll states. This finite set probes width behavior; a discovered breakpoint must be added before the owning source change.

| Workflow / owned view | Normal frame | Denial frame | Error frame | Recovery frame | Status |
| --- | --- | --- | --- | --- | --- |
| Startup, trust, and onboarding | Ready prompt, header, status and composer | Project or access refusal | Missing model/auth/configuration | Retry or restored setup | Capture pending |
| Prompt, streaming, and queued input | User turn, partial and completed assistant response, editor/composer | Tool or prompt refusal | Provider or context failure | Retry, interrupt, resume | Capture pending |
| Read, search, edit, write, and command tools | Request and result card for each tool | Permission prompt and denied result | Missing file, bad input, timeout, command failure | Corrected tool call or retry | Read card request/collapsed and expanded success/error ANSI captured; remaining states pending |
| Permissions and modes | Mode indicator, approval prompt, rule editor | Denied operation and explanation | Invalid rule or unavailable mode | Mode/rule change and next call | Capture pending |
| Sessions and worktrees | List, selection, resume, fork/branch and history | Inaccessible session | Missing/corrupt session, worktree conflict | Restore, select another, continue | Capture pending |
| Context, instructions, and memory | Loaded instruction/memory indicator, compaction notice | Disallowed scope | Invalid import or compaction failure | Reload, resume, recompact | Capture pending |
| Slash commands, shortcuts, model and settings selectors | Help/menu, filtering, selection, status | Disabled action | Unknown command, invalid setting/model | Dismiss, correct selection | Capture pending |
| Skills, agents, teams, hooks, plugins, and connections | Discovery/list, invocation, progress, result | Approval or policy denial | Invalid manifest, hook failure, connection loss | Retry, reconnect, remove, resume | Capture pending |
| Background work and notifications | Running indicator, task list and completion notice | Unauthorized action | Worker error or lost connection | Reattach, cancel, restart | Capture pending |
| Non-interactive and external surfaces that enter the TUI | Imported/attached session, shared status | Access refusal | Malformed import or transport failure | Reconnect or reopen in terminal | Capture pending |

Each added feature leaf must link its inventory ID to the applicable row and add any missing prompt, menu, result, denial, error, or recovery frame before implementation. Record the capture fixture and comparison result in `validation.md`; missing captures leave SC-003 open. This matrix is a declaration of required checks, not evidence that the current interface has passed them.
