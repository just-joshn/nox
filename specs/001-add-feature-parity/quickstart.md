# Quickstart: Validate One Parity Slice

This guide is for an isolated, authorized test environment. It does not assert that any slice is implemented.

1. Record the installed reference version with `claude --version` and nox/Pi revisions. Record platform and availability conditions in the [inventory](contracts/inventory.md).
2. Use the official [CLI reference](https://code.claude.com/docs/en/cli-usage), [command list](https://code.claude.com/docs/en/commands), and [documentation index](https://code.claude.com/docs/llms.txt) to select one leaf capability. Reconcile it with local help and interactive observation. Do not inspect or copy reference implementation code.
3. Create a disposable repository and matched settings for the reference and nox. Capture the initial files and session state. Use nox-native names for nox configuration.
4. Define normal, denied or failing, persistence, and interaction cases under [observable behavior](contracts/observable-behavior.md). Declare any nondeterministic normalization before running them.
5. Run safe local reference probes and nox probes with the same inputs. Preserve raw output and side-effect records. Do not invoke paid models or external services in an ad hoc probe.
6. Compare behavior and Pi terminal states. Record each mismatch as a discrepancy; mark the inventory item `verified` only when all applicable cases pass.
7. For code changes, run `npm run check` and the focused test files from the package root. Run `./test.sh` for non-e2e coverage when appropriate. Do not run `npm test` or `npm run build` without a separate request.
8. Before a complete-parity claim, refresh the reference version, reconcile every inventory source, and require zero `discrepant` and zero `gated-unverified` items in the claimed scope.
