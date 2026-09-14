# Gated Reference Evidence

**Snapshot**: Installed release 2.1.270 on 2026-09-14. This is a partial access-gap register. A documented capability or successful CLI help exit is not an observed behavior comparison. Every inaccessible leaf stays `gated-unverified` and blocks an unqualified complete-parity claim until its required scenarios pass.

| Leaf ID | Current evidence gap | Access or observation needed |
|---------|----------------------|------------------------------|
| CLI-098 | `remote-control --help` exited before help with an account-login requirement | Eligible authenticated account, then safe help and isolated start/attach/failure observations |
| EXT-034 | Bundled skill is documented as gated; invocation unobserved | Eligible account and isolated invocation fixture after availability is confirmed |
| US1-READ-001 | No tool-dispatch trace; prior sandbox request stopped at authentication | Restored usage allowance and an authorized disposable repository read fixture |
| US1-SEARCH-PATH-001 | Installed path-search availability and behavior unobserved | Restored usage allowance and matched path/no-match/invalid-pattern fixtures |
| US1-SEARCH-CONTENT-001 | Installed content-search availability and behavior unobserved | Restored usage allowance and matched content/no-match/invalid-pattern fixtures |
| US1-EDIT-001 | Edit approval and side effects unobserved | Restored usage allowance and disposable edit/denial/failure fixtures |
| US1-COMMAND-001 | Command approval, output, exit, and interruption unobserved | Restored usage allowance and harmless command fixtures |
| US1-DENY-001 | Denial prompt and post-denial state unobserved | Restored usage allowance and refused edit in a disposable repository |
| US1-FAIL-001 | Nonzero command result and side effects unobserved | Restored usage allowance and harmless failing command fixture |
| US1-RECOVER-001 | Same-session recovery after failure unobserved | Restored usage allowance and continuation after the failing command fixture |

The [surface inventory](inventory-surfaces.md) still contains broad account-, platform-, policy-, and service-gated seeds, including remote control, hosted review, integrations, and runners. T005 must split these into independently testable leaf IDs; T010 then adds each inaccessible leaf here with its specific gate and required observation. T002–T004 may expose further gated leaves. This register does not mark any source task complete and must be reconciled against the final inventory before T046 or T053 can close.
