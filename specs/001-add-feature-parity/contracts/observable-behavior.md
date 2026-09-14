# Observable Behavior Contract

For one capability item, a comparison fixture defines identical initial repository state, environment, account capabilities, configuration, input sequence, and permission responses for reference and nox runs.

The comparison records:

1. Available actions and defaults before input.
2. Prompts and permission decisions, including who can approve and persistence scope.
3. Ordered tool and lifecycle events.
4. User-visible output, machine-readable records, errors, and exit status.
5. File, session, settings, remote, and external-service side effects.
6. Interruption, retry, recovery, and resumption behavior.
7. Pi visual state for affected terminal views.

Only declared nondeterministic fields may be normalized. Raw observations remain available. A mismatch in control flow, permission outcome, persisted state, protocol shape, or side effect is a discrepancy even if the final prose answer is similar. A feature passes only after all applicable scenarios pass against the pinned snapshot.

No comparison probe may use real provider calls, credentials, paid tokens, or destructive external actions without the corresponding task authorization and an isolated fixture. Inaccessible cases stay `gated-unverified`.
