# Parity Discrepancy Register

**Snapshot**: Installed reference release 2.1.270. The register defines how to record mismatches; no matched nox/reference comparison has been run, so an empty table is not evidence of parity.

Create one row per independently reproducible mismatch. The owner is the task or person responsible for the affected leaf; use `unassigned` only until triage, then name the owning task before work begins. Keep a stable `DISC-###` ID even if the reference release changes. Link the leaf and scenario IDs in the inventory and scenario register, and link raw traces stored under `observations/` without copying credentials or private session values.

| ID | Leaf ID | Scenario ID | Owner | Impact | Status | Reference snapshot | Reproduction and evidence | Resolution evidence |
|----|---------|-------------|-------|--------|--------|--------------------|---------------------------|---------------------|

For each discrepancy, the reproduction record must state the matched repository fixture, configuration and account conditions, initial session state, ordered input and permission responses, and exact commands or interactions. Record expected reference decisions, outputs, errors, event order, exit status, persisted state, and side effects beside the actual nox results. Declare any normalization before comparison; it cannot erase decisions, protocol fields, event order, errors, side effects, or sensitive-data disclosure. Describe user impact and whether the mismatch is a security-gate failure.

Use `open` when a comparison fails, `fixing` while the owner changes the implementation, `reverified` only after a fresh matched reference/nox run passes the affected scenario, and `closed` only when that run and all linked normal, failure, and relevant interaction scenarios pass. Record the tested nox revision, reference snapshot, run date, commands, raw evidence paths, and results in the resolution evidence. A source edit, unit test, or matching final prose answer alone cannot close a discrepancy. Reopen a closed row on regression or a reference change that invalidates its comparison, retaining its earlier resolution history.

Inaccessible behavior remains `gated-unverified` in the inventory and the T010 gated register, not a closed discrepancy. A mismatch between observed reference behavior and the required validation, authorization, or redaction guarantees stays open under FR-018; it cannot be waived to claim parity.
