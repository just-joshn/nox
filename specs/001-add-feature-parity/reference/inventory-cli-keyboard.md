# Interactive Keyboard Leaf Inventory

**Reference**: installed 2.1.270; [interactive-mode documentation](https://code.claude.com/docs/en/interactive-mode), checked 2026-09-14. Each row is a separate documented action in a stated context. None has been tested in the local reference TUI; discovery state for every row is `documented; local interaction unobserved`. Platform and renderer requirements are part of the entry condition. KEY token seeds remain in [the CLI inventory](inventory-cli.md).

| ID | Input and entry condition | Documented effect |
|----|---------------------------|-------------------|
| KBL-001 | `Ctrl+C`, operation running | Interrupt operation; keep completed work |
| KBL-002 | `Ctrl+C`, idle, first press | Clear prompt input |
| KBL-003 | `Ctrl+C`, idle, second press | Exit session |
| KBL-004 | `Ctrl+X Ctrl+K`, background agents active, first press | Show stop confirmation |
| KBL-005 | `Ctrl+X Ctrl+K`, second press within 3 seconds | Stop session background agents and disable artifact auto-replies for session |
| KBL-006 | `Ctrl+D`, prompt contains text | Delete character after cursor |
| KBL-007 | `Ctrl+D`, empty prompt, first press | Show exit confirmation hint |
| KBL-008 | `Ctrl+D`, empty prompt, second press within 800 ms | Exit session |
| KBL-009 | `Ctrl+G`, editable prompt or custom response | Open default external editor |
| KBL-010 | `Ctrl+X Ctrl+E`, editable prompt or custom response | Open default external editor |
| KBL-011 | external editor with last-response setting enabled | Prepend previous reply as comments; strip comments on save |
| KBL-012 | `Ctrl+L`, classic renderer | Redraw terminal while retaining input and history |
| KBL-013 | `Ctrl+L`, fullscreen renderer | Clear and redraw; older messages remain in scrollback |
| KBL-014 | `Ctrl+O`, transcript closed | Open detailed transcript |
| KBL-015 | `Ctrl+O`, transcript open | Close detailed transcript |
| KBL-016 | `Ctrl+R`, classic renderer | Open inline reverse history search |
| KBL-017 | `Ctrl+R`, fullscreen renderer | Open history search dialog |
| KBL-018 | `Ctrl+V`, image clipboard supported | Insert positional image chip at cursor |
| KBL-019 | `Cmd+V`, iTerm2 image clipboard | Insert positional image chip at cursor |
| KBL-020 | `Alt+V`, Windows or WSL image clipboard | Insert positional image chip at cursor |
| KBL-021 | `Ctrl+B`, foreground Bash task or agent | Move running task to background |
| KBL-022 | `Ctrl+B` twice, tmux foreground task | Move running task to background |
| KBL-023 | `Ctrl+T`, ordinary prompt | Toggle task checklist in status area |
| KBL-024 | `Ctrl+T`, theme picker | Toggle response code syntax highlighting |
| KBL-025 | `Ctrl+S`, prompt has text | Stash text, cursor, and pasted content; clear prompt |
| KBL-026 | `Ctrl+S`, empty prompt with stash | Restore stashed prompt state |
| KBL-027 | `Ctrl+Z`, Unix shell | Suspend process; shell `fg` resumes |
| KBL-028 | Left/right arrows, tabbed dialog | Switch dialog tab |
| KBL-029 | `Tab`, prompt autocomplete open | Accept selected completion |
| KBL-030 | `Tab`, permission choice focused | Open or close answer comment field |
| KBL-031 | Up/down or `Ctrl+P`/`Ctrl+N`, multiline prompt interior | Move cursor one visual row |
| KBL-032 | Up/down or `Ctrl+P`/`Ctrl+N`, prompt boundary | Navigate input history |
| KBL-033 | `Up`, first prompt row with queued messages | Take back a queued message |
| KBL-034 | `Esc`, response or tool call running | Interrupt current turn, retaining completed work |
| KBL-035 | `Esc`, ordinary dialog open | Close dialog |
| KBL-036 | `Esc`, permission dialog open | Deny action without a comment |
| KBL-037 | `Esc Esc`, draft contains text | Clear draft and save it to history |
| KBL-038 | `Esc Esc`, empty prompt | Open rewind menu |
| KBL-039 | `Shift+Tab`, ordinary prompt | Cycle available permission modes |
| KBL-040 | `Alt+M`, Windows without VT input mode | Cycle available permission modes |
| KBL-041 | `Shift+Tab`, file permission comment open | Close comment field |
| KBL-042 | `Shift+Tab`, permission prompt, no field open | Select rest-of-session option if offered |
| KBL-043 | `Option+P` macOS or `Alt+P` other platforms | Open model switch without clearing prompt |
| KBL-044 | `Option+T` macOS or `Alt+T` other platforms | Toggle extended thinking, except always-thinking models |
| KBL-045 | `Option+O` macOS or `Alt+O` other platforms | Toggle fast mode |
| KBL-046 | `Ctrl+A`, prompt input | Move to start of current logical line |
| KBL-047 | `Ctrl+E`, prompt input | Move to end of current logical line |
| KBL-048 | `Ctrl+E`, classic transcript viewer | Toggle show-all transcript content |
| KBL-049 | `Ctrl+K`, prompt input | Delete to line end and save cut text |
| KBL-050 | `Ctrl+U`, prompt input | Delete to line start and save cut text |
| KBL-051 | `Ctrl+W`, prompt input | Delete to previous whitespace and save cut text |
| KBL-052 | `Ctrl+Y`, after cut | Paste most recently cut text |
| KBL-053 | `Alt+Y`, after `Ctrl+Y`, Meta enabled | Cycle cut-text history |
| KBL-054 | `Alt+B`, Meta enabled | Move back one punctuation-delimited word |
| KBL-055 | `Alt+F`, Meta enabled | Move forward one punctuation-delimited word |
| KBL-056 | `Alt+D`, Meta enabled | Delete to word end and save cut text |
| KBL-057 | `Ctrl+_` or `Ctrl+Shift+-`, prompt input | Undo last input edit and cursor movement |
| KBL-058 | Backslash then Enter, prompt input | Insert newline in any terminal |
| KBL-059 | Option+Enter, macOS Meta enabled | Insert newline |
| KBL-060 | Shift+Enter, supported terminal | Insert newline |
| KBL-061 | `Ctrl+J`, prompt input | Insert newline |
| KBL-062 | `/`, start of prompt | Show command and skill completion |
| KBL-063 | `!`, start of prompt | Enter direct shell mode |
| KBL-064 | `@`, prompt input | Open file mention suggestions |
| KBL-065 | `@` plus letter, live-session messaging available | Include live-session suggestions |
| KBL-066 | `:`, prompt input | Suggest emoji shortcode after two characters |
| KBL-067 | `?`, empty prompt | Toggle shortcut help |
| KBL-068 | `?`, nonempty prompt | Insert literal question mark |
| KBL-069 | `?`, fullscreen transcript viewer | Toggle transcript shortcut help |
| KBL-070 | `{` or `}`, fullscreen transcript viewer | Jump to previous or next user prompt |
| KBL-071 | `[`, fullscreen transcript viewer | Write conversation to terminal scrollback |
| KBL-072 | `v`, fullscreen transcript viewer | Open conversation in external editor |
| KBL-073 | `q`, `Ctrl+C`, or `Esc`, transcript viewer | Exit transcript viewer |
| KBL-074 | Space, voice enabled in hold mode | Record while held |
| KBL-075 | Space, voice enabled in tap mode | Toggle voice recording |

## Vim-mode leaves

The following actions require Vim editor mode. Unless stated otherwise, the entry condition is NORMAL mode. Operator motions, text objects, and VISUAL actions have separate IDs because they can fail independently.

| ID | Input and entry condition | Documented effect |
|----|---------------------------|-------------------|
| KBL-076 | `Esc` or `Ctrl+[`, INSERT/VISUAL mode | Enter NORMAL mode |
| KBL-077 | `i` | Insert before cursor |
| KBL-078 | `I` | Insert at line start |
| KBL-079 | `a` | Insert after cursor |
| KBL-080 | `A` | Insert at line end |
| KBL-081 | `o` | Open line below |
| KBL-082 | `O` | Open line above |
| KBL-083 | `v` | Enter character-wise VISUAL mode |
| KBL-084 | `V` | Enter line-wise VISUAL mode |
| KBL-085 | configured two-key INSERT remap within one second | Remove first character and enter NORMAL mode |
| KBL-086 | configured two-key INSERT remap after one second or wrong second key | Preserve literal characters |
| KBL-087 | `h`/`j`/`k`/`l` | Move left/down/up/right |
| KBL-088 | Space | Move right |
| KBL-089 | `w`/`e`/`b` | Move to next word/end of word/previous word |
| KBL-090 | `0`/`$`/`^` | Move to line start/end/first nonblank |
| KBL-091 | `gg`/`G` | Move to start/end of input |
| KBL-092 | `f{char}`/`F{char}` | Find next/previous character |
| KBL-093 | `t{char}`/`T{char}` | Move just before next/after previous character |
| KBL-094 | `;`/`,` after character motion | Repeat motion forward/reverse |
| KBL-095 | `/` | Open reverse history search |
| KBL-096 | `j`/`k` or up/down at input boundary | Navigate prompt history |
| KBL-097 | Left arrow on empty prompt | Open agent view |
| KBL-098 | `x` | Delete character |
| KBL-099 | `dd`/`D` | Delete line/to line end |
| KBL-100 | `dw`/`de`/`db` | Delete word/to end/back |
| KBL-101 | `df{char}`/`dt{char}` | Delete through/up to next matching character |
| KBL-102 | `cc`/`C` | Change line/to line end |
| KBL-103 | `cw`/`ce`/`cb` | Change word/to end/back |
| KBL-104 | `s`/`S` | Substitute character/line and enter INSERT mode |
| KBL-105 | `yy`/`Y` | Yank line |
| KBL-106 | `yw`/`ye`/`yb` | Yank word/to end/back |
| KBL-107 | `p`/`P` | Paste after/before cursor |
| KBL-108 | `>>`/`<<` | Indent/dedent line |
| KBL-109 | `J` | Join lines |
| KBL-110 | `u`/`.` | Undo/repeat last change |
| KBL-111 | `iw`/`aw` after `d`, `c`, or `y` | Apply operator to inner/around word |
| KBL-112 | `iW`/`aW` after `d`, `c`, or `y` | Apply operator to inner/around whitespace WORD |
| KBL-113 | `i"`/`a"` after `d`, `c`, or `y` | Apply operator inside/around double quotes |
| KBL-114 | `i'`/`a'` after `d`, `c`, or `y` | Apply operator inside/around single quotes |
| KBL-115 | `i(`/`a(` after `d`, `c`, or `y` | Apply operator inside/around parentheses |
| KBL-116 | `i[`/`a[` after `d`, `c`, or `y` | Apply operator inside/around brackets |
| KBL-117 | `i{`/`a{` after `d`, `c`, or `y` | Apply operator inside/around braces |
| KBL-118 | `d`/`x`, VISUAL selection | Delete selected text |
| KBL-119 | `y`, VISUAL selection | Yank selected text |
| KBL-120 | `c`/`s`, VISUAL selection | Change selected text |
| KBL-121 | `p`, VISUAL selection | Replace selection with register content |
| KBL-122 | `r{char}`, VISUAL selection | Replace each selected character |
| KBL-123 | `~`/`u`/`U`, VISUAL selection | Toggle/lowercase/uppercase selection |
| KBL-124 | `>`/`<`, VISUAL selection | Indent/dedent selected lines |
| KBL-125 | `J`, VISUAL selection | Join selected lines |
| KBL-126 | `o`, VISUAL selection | Swap cursor and anchor |
| KBL-127 | text object, VISUAL selection | Select named object |
| KBL-128 | `v`/`V`, VISUAL selection | Toggle character/line selection or exit |

The [interactive-mode reference](https://code.claude.com/docs/en/interactive-mode) explicitly excludes block-wise `Ctrl+V` visual selection. These rows still contain grouped alternatives that need individual option/transition leaves under T002/T006.

## Search and completion leaves

Source: [interactive-mode history and command completion](https://code.claude.com/docs/en/interactive-mode). The renderer, input position, search state, and number of matches change the action.

| ID | Input and entry condition | Documented effect |
|----|---------------------------|-------------------|
| KBL-129 | `Ctrl+R`, classic prompt | Start inline reverse search across all projects |
| KBL-130 | type query, classic inline search | Filter and highlight matching history |
| KBL-131 | `Ctrl+R`, classic inline search active | Cycle to older match |
| KBL-132 | `Tab`, classic inline search match | Accept match for editing |
| KBL-133 | `Esc`, classic inline search match | Accept match for editing |
| KBL-134 | `Enter`, classic inline search match | Accept and execute match |
| KBL-135 | `Ctrl+C`, classic inline search active | Cancel and restore original input |
| KBL-136 | Backspace, empty classic search | Cancel search |
| KBL-137 | `Ctrl+R`, fullscreen prompt | Open history search dialog |
| KBL-138 | type query, fullscreen history dialog | Filter matches in current scope |
| KBL-139 | up/down, fullscreen history dialog | Move through matches |
| KBL-140 | `Ctrl+S`, fullscreen history dialog | Cycle this-session/project/all-project scopes |
| KBL-141 | `Enter`, fullscreen history match | Place match in prompt input |
| KBL-142 | `Tab`, fullscreen history match | Place match in prompt input |
| KBL-143 | `Esc`, fullscreen history dialog | Cancel search |
| KBL-144 | `/name`, start of message | Invoke matching command or skill |
| KBL-145 | `/prefix`, after a space mid-prompt | Suggest commands without invoking them |
| KBL-146 | `Enter`, fullscreen mid-prompt list with no selection | Submit literal prompt |
| KBL-147 | `Tab`, fullscreen mid-prompt list | Insert top match |
| KBL-148 | arrows then `Enter`, fullscreen mid-prompt list | Insert selected match |
| KBL-149 | `Tab`, classic mid-prompt single ghost match | Insert completion |
| KBL-150 | `Tab`, classic mid-prompt multiple matches | Open selection list |
| KBL-151 | `Tab`, bare mid-prompt `/` | List every command |
| KBL-152 | complete plugin skill by bare name | Insert fully qualified skill name |

Custom keybinding actions and the grouped Vim alternatives still require independent option/transition leaves under T002/T006. No row is a parity verification.
