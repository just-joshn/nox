# User Surface Contract

Every reference capability needs a nox-native entry point. The map records behavior separately from spelling so the naming ban does not hide missing functionality.

| Surface family | Required mapping |
|----------------|------------------|
| CLI commands and options | Reference invocation → nox invocation, defaults, output and exit behavior |
| Interactive commands and keys | Reference trigger → Pi-styled nox trigger and resulting state |
| Configuration and instructions | Reference scope and precedence → nox-named file or setting with equivalent loading behavior |
| Session and background operations | Reference operation → nox operation and persisted state transition |
| Extensions and external connections | Reference discovery, invocation, event and failure behavior → nox equivalent |
| Machine-readable modes | Reference input and output semantics → nox contract, with intentional naming differences recorded |
| Remote or hosted integration | Reference handoff and lifecycle → nox equivalent where available; inaccessible cases flagged |

The map MUST identify any unavoidable naming or protocol spelling difference explicitly. Functional parity is judged against [observable-behavior.md](observable-behavior.md); this map does not authorize omission of a capability.
