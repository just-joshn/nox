# Pi terminal visual matrix

**Status:** Predeclared matrix with frozen denominator baseline; reference captures in progress. The existing Pi TUI is the visual authority for nox. A green functional test does not prove a visual match. No intentional departure is approved; any proposed departure requires a constitution amendment before implementation (FR-003, Principle I).

---

## 1. Matrix Dimensions and Frozen Denominator

The SC-003 visual fidelity denominator is frozen across 5 orthogonal axes:

| Dimension | Count | Values / Descriptions |
|---|---|---|
| **Workflows** | 10 | The 10 canonical TUI interactive feature families defined in Section 2 |
| **States** | 5 | `normal`, `denial`, `error`, `interruption`, `recovery` |
| **Terminal Widths** | 4 | `1` col (render boundary), `40` cols (narrow), `80` cols (standard), `120` cols (wide) |
| **Themes** | 2 | `dark`, `light` |
| **Platforms** | 2 | `darwin` (macOS), `linux` (Linux / POSIX fallback) |

$$\text{Frozen Matrix Denominator} = 10 \text{ workflows} \times 5 \text{ states} \times 4 \text{ widths} \times 2 \text{ themes} \times 2 \text{ platforms} = \mathbf{800} \text{ cells}$$

### Denominator Expansion Rule
If a newly discovered width breakpoint (e.g. custom layout threshold), custom theme, additional platform, or distinct interaction state is discovered during implementation, the denominator **MUST** be explicitly expanded to include all corresponding permutations across the other dimensions *before* any new cell can be claimed as verified.

---

## 2. Workflow State Matrix (50 Base Workflow-States)

Each workflow row defines 5 discrete states ($5 \times 16 = 80$ cells per workflow):

| # | Workflow / Owned View | Normal Frame | Denial Frame | Error Frame | Interruption Frame | Recovery Frame |
|---|---|---|---|---|---|---|
| **WF-01** | Startup, trust, and onboarding | Ready prompt, header, status, and composer | Project or workspace access refusal | Missing model / auth / configuration error | Interrupted onboarding / startup prompt | Setup retry, trust re-prompt, or restored configuration |
| **WF-02** | Prompt, streaming, and queued input | User turn, streaming tokens, completed assistant response, composer | Prompt refusal or policy rejection | Provider API error, context window exhaustion | Mid-stream Ctrl+C interrupt, queued prompt cancellation | Prompt retry, context compaction, resumed stream |
| **WF-03** | Read, search, edit, write, and command tools | Tool call request card, collapsible / expanded result card | Tool execution permission prompt, denied result card | Missing file, bad glob / regex, timeout, command nonzero exit | Interrupted tool execution (SIGINT / timeout abort) | Corrected tool arguments, retry prompt, or fallback action |
| **WF-04** | Permissions and modes | Mode badge / indicator, approval prompt, rule editor | Denied operation with reason banner | Invalid permission rule or mode conflict | Interrupted permission prompt | Permission mode toggle, rule reload, or re-prompt |
| **WF-05** | Sessions and worktrees | Session list, switcher, resume banner, branch / fork indicator | Inaccessible or locked session | Corrupt session file, worktree branch conflict | Interrupted session switch or worktree creation | Session restore, fallback selection, branch re-sync |
| **WF-06** | Context, instructions, and memory | Loaded instruction badge, active rules indicator, memory notice | Disallowed scope or unauthorized instruction load | Malformed config, invalid rule syntax, compaction failure | Interrupted compaction or context indexing | Reload instructions, re-index context, retry compaction |
| **WF-07** | Slash commands, shortcuts, selectors | Command menu / auto-complete, model / settings selector | Disabled action or restricted command notice | Unknown command diagnostic, invalid setting value | Dismissed menu / cancelled shortcut | Corrected command syntax, menu re-open |
| **WF-08** | Skills, agents, teams, hooks, plugins | Skill / agent discovery list, execution progress, result card | Extension approval prompt, policy block | Missing extension manifest, hook execution error, connection drop | Interrupted agent loop or hook timeout | Retry extension call, reconnect bridge, fallback tool |
| **WF-09** | Background work and notifications | Background task indicator, active task table, completion toast | Unauthorized background launch | Worker crash, process lost, background task error | Background task abort / cancellation frame | Task reattach, restart, log inspection, or cleanup |
| **WF-10** | Non-interactive & bridge handoff into TUI | Imported / attached session frame, remote status | Access refusal or unauthorized handoff | Transport failure, malformed session payload | Interrupted handoff / transport disconnect | Reconnect transport, resume in terminal |

---

## 3. Baseline Fixtures and Captured Cells

The initial baseline is seeded from frozen Pi renderer captures generated on `main` before modifications:

1. **Component ANSI Cards (`packages/coding-agent/test/pi-visual-baseline.test.ts`)**:
   - Snapshot: `packages/coding-agent/test/__snapshots__/pi-visual-baseline.test.ts.snap`
   - Generated from unchanged Pi renderer at `484817a55`.
   - Captures raw ANSI for read tool request, collapsed success, expanded success, missing-file error, and denied result card with synthetic `notes.txt` input.
   - Tested at 1, 40, 80, and 120 columns in `dark` and `light` themes on `darwin` (8 tests / cells).

2. **Full-Terminal Read Sequence (`packages/coding-agent/test/pi-terminal-baseline.test.ts`)**:
   - Snapshot: `packages/coding-agent/test/__snapshots__/pi-terminal-baseline.test.ts.snap`
   - Generated from Pi renderer at `0238c1144`.
   - Captures ANSI writes, 24-row viewport, and cursor positions for read request, missing-file error, and visual retry card at 40, 80, and 120 columns in `dark` and `light` themes on `darwin` (6 tests / cells).
   - *Note on 1-column*: Pi's pre-change full-terminal renderer throws `Rendered line 2 exceeds terminal width (2 > 1)` at 1 column; the 1-column component ANSI test above verifies component bounds.

3. **Trust Selector (`packages/coding-agent/test/pi-trust-terminal-baseline.test.ts`)**:
   - Snapshot: `packages/coding-agent/test/__snapshots__/pi-trust-terminal-baseline.test.ts.snap`
   - Captures ANSI writes, 24-row viewport, and cursor positions for untrusted project initial focus and "Do not trust" focus at 40, 80, and 120 columns in `dark` and `light` themes on `darwin` (6 tests / cells).

### Current Cell Coverage Summary

- **Total Denominator**: 800 cells
- **Currently Passing Captured Cells**: 20 cells ($2.5\%$)
- **Pending Cells**: 780 cells ($97.5\%$)

---

## 4. Comparison and Normalization Protocol

1. **Rendering Harness**: Execute both pre-change Pi baseline and candidate nox builds under identical terminal parameters (`COLUMNS`, `LINES`, `TERM`, `COLORFGBG`).
2. **Permitted Normalizations**:
   - Volatile temporary directories (`/tmp/nox-fixture-*` $\leftrightarrow$ `/tmp/pi-fixture-*`).
   - Timestamps and elapsed milliseconds (`12ms` $\leftrightarrow$ `10ms`).
   - Generated session UUIDs and random IDs.
3. **Strict Invariants (Zero Normalization Permitted)**:
   - Missing or extra UI controls, borders, or lines.
   - Text alignment, wrapping boundaries, or truncation markers (`...`).
   - ANSI color sequences, background highlights, and bold/dim styles.
   - Cursor row/column positioning and focus highlights.

---

## 5. Non-Interactive and Preflight Exceptions

- **SUR-LIMIT-002** (malformed JSON input): Rejection occurs in print-mode parser before TUI initialization. Its output is empty stdout, stderr diagnostic, and exit code 1; it has no Pi terminal frame.
- **CLI-246** (`--bg --print` conflict): Rejection occurs in CLI parser preflight before TUI startup. Evaluated via stdout/stderr/exit code in `scenarios.md`.
