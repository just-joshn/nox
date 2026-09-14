# Reference Product Naming Audit (T047 / FR-013)

**Audit Date**: 2026-09-14  
**Auditor**: Clean-Room Development Pipeline  
**Scope**: All developed application code, CLI argument parsers, user-facing diagnostics, command names, and configuration paths in `packages/coding-agent/src/` and related configuration trees.

---

## 1. Compliance Rule (FR-013)

Under FR-013 and Constitution Principle IV:
> No developed application code, CLI command, user-facing error message, diagnostic, configuration file name, or directory path may use prohibited reference-product naming. All configuration paths and instruction files must use `nox`-native conventions (`.nox/`, `NOX.md`, `.nox/rules/`, `NOX_` environment variables).

---

## 2. Audit Scope and Verification Results

### 2.1 Configuration Paths and Files

| Category | Reference Convention | Nox Convention | Verification Status | Code Location |
|---|---|---|---|---|
| Project Instructions | `CLAUDE.md` | `NOX.md`, `NOX.override.md`, `NOX.MD` | Verified | `packages/coding-agent/src/core/resource-loader.ts` |
| Local Overrides | `.claude/local.md` | `.nox/local.md`, `.nox/instructions.local.md` | Verified | `packages/coding-agent/src/core/resource-loader.ts` |
| Scoped Rule Directory | `.claude/rules/*.md` | `.nox/rules/*.md` | Verified | `packages/coding-agent/src/core/resource-loader.ts` |
| Settings Exclusions | `claudeMdExcludes` | `noxMdExcludes` | Verified | `packages/coding-agent/src/core/resource-loader.ts` |
| Background Storage | `~/.claude/sessions/` | `~/.nox/background/` | Verified | `packages/coding-agent/src/core/background-session.ts` |
| Project Trust Store | `~/.claude/trust.json` | `~/.nox/trust.json` | Verified | `packages/coding-agent/src/core/trust-manager.ts` |

### 2.2 CLI Executable and Diagnostics

| Area | Observed Behavior | Nox-Native Implementation | Verification |
|---|---|---|---|
| Binary / Executable | `claude` | `nox` / `APP_NAME` constant | Verified in `packages/coding-agent/src/cli.ts` |
| Unknown Command Typo | `claude <typo>` | `nox <typo>` with `nox <suggestion>` | Verified in `test/command-typo-cli.test.ts` |
| Flag Preflight Diagnostics | Standard CLI diagnostics | Parameterized via `APP_NAME` | Verified in `test/name-cli.test.ts`, `test/args.test.ts` |

### 2.3 Internal Tool and Adapter Identifiers

| Adapter / Component | Naming | File Path |
|---|---|---|
| Explicit File Read Tool | `createNoxReadToolDefinition` | `packages/coding-agent/src/core/tools/nox-read.ts` |
| Explicit File Edit Tool | `createNoxEditToolDefinition` | `packages/coding-agent/src/core/tools/nox-edit.ts` |
| Explicit Command Tool | `createNoxBashToolDefinition` | `packages/coding-agent/src/core/tools/nox-bash.ts` |
| Explicit Search Adapters | `createNoxGlobToolDefinition`, `createNoxGrepToolDefinition` | `packages/coding-agent/src/core/tools/nox-search.ts` |
| Grep Output Mode Helpers | `executeNoxGrepCount`, `executeNoxGrepOnly`, `executeNoxGrepMultiline`, `executeNoxGrepSidedContext` | `packages/coding-agent/src/core/tools/` |

---

## 3. Upstream Provider Exceptions

Model identifiers within provider catalogs (e.g. `@earendil-works/pi-ai` models such as `"anthropic/claude-3-5-sonnet"` or OpenAI/Google models) represent external provider API identifiers and are passed transparently to provider adapters. They do not constitute application-level product branding.

---

## 4. Audit Verdict

**Pass**: 100% compliant with FR-013. Zero prohibited reference-product brand names appear in developed application code, CLI commands, user-facing diagnostics, or configuration filenames.
