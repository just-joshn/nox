# Capability Inventory Contract

The inventory is a required deliverable, not a completed list in this planning pass.

Each leaf entry MUST record:

| Field | Required meaning |
|-------|------------------|
| ID and domain | Stable ID; one independently testable behavior per leaf |
| Reference snapshot | Version, date, platform, account and policy context |
| Reference surface | Command, option, key, setting, event, tool, or integration |
| nox surface | Nox-native equivalent; never a prohibited product name |
| Availability | Always, platform-gated, account-gated, policy-gated, experimental, or unavailable |
| Evidence | Official document link and/or reproducible local observation |
| Behavior | Inputs, defaults, state transitions, outputs, errors, side effects |
| Scenarios | Normal, failure or denial, persistence, and relevant interactions |
| Status | Discovered, specified, implemented, verified, discrepant, or gated-unverified |

Inventory completeness requires reconciliation against the installed command tree, CLI options, interactive command and shortcut reference, settings reference, tools, extension and integration docs, and every observed capability. Any unmatched source entry is a gap. A gated feature remains an item; it cannot be counted as verified without suitable observation.
