# Quickstart: Validate Complete Parity Work

This guide is for an isolated, authorized test environment. It does not assert that any feature is implemented.

1. Record the installed reference version with `claude --version` and nox/Pi revisions. Record platform and availability conditions in the [inventory](contracts/inventory.md).
2. Reconcile every page in the current [documentation index](https://code.claude.com/docs/llms.txt), the installed command tree, and candidates in the older [restored source map](https://github.com/ChinaSiro/claude-code-sourcemap/tree/main/restored-src) into the [inventory](contracts/inventory.md). The source map may be read remotely for discovery; do not clone it or copy its code into nox. Use current documentation and installed behavior to establish each contract.
3. Create a disposable repository and matched settings for the reference and nox. Capture the initial files and session state. Use nox-native names for nox configuration.
4. Define normal, denied or failing, persistence, and interaction cases under [observable behavior](contracts/observable-behavior.md). Declare any nondeterministic normalization before running them.
5. Run safe local reference probes and nox probes with the same inputs. Preserve raw output and side-effect records. Account- or service-gated behavior stays open until authorized access permits observation; do not substitute guessed results.
6. Compare behavior and Pi terminal states. Record each mismatch as a discrepancy; mark the inventory item `verified` only when all applicable cases pass.
7. For code changes, run `npm run check` and the focused test files from the package root. Run `./test.sh` for non-e2e coverage when appropriate. Do not run `npm test` or `npm run build` without a separate request.
8. Before an unqualified complete-parity claim, refresh the reference version, reconcile every inventory source, and require every inventoried item to pass with zero `discrepant` and zero `gated-unverified` items.
