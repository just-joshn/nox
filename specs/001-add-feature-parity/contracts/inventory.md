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
| Discovery provenance | Installed command, official documentation page, and restored-source candidate mapping where applicable; duplicate, obsolete, and open dispositions retained |
| Behavior | Inputs, defaults, state transitions, outputs, errors, side effects |
| Scenarios | Normal, failure or denial, persistence, and relevant interactions |
| Timing sensitivity | Yes or no, with a reason based on whether user-visible completion time affects an interactive response, tool result, or non-interactive command; classify before performance measurement |
| Security boundary | For external input, validation decision, required authorization, protected side effect, and sensitive values that must not be disclosed |
| Status | Discovered, specified, implemented, verified, discrepant, or gated-unverified |

Inventory completeness requires reconciliation against the installed command tree, CLI options, every current official documentation page, remotely read restored-source candidates, and every observed capability. Any unmatched source entry is a gap. The restored source is discovery evidence, not a behavioral contract or implementation source. A gated feature remains an item; it cannot be counted as verified without suitable observation.
