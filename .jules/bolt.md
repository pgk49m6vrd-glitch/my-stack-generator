## 2024-05-22 - CLI Dependency Installation
Learning: Sequential execution of package manager commands (e.g. `npm install prod` then `npm install dev`) incurs significant overhead due to repeated process startup and dependency resolution.
Action: Pre-fill `package.json` with `latest` versioned dependencies and run a single `install` command. This reduced setup time by ~35-47% (34s -> 22s).

## 2026-02-04 - File Creation Concurrency
**Learning:** Using `p-limit` to restrict concurrency for a small number of file writes (~12 files) introduced unnecessary overhead and an extra dependency, while Node.js `fs.promises.writeFile` can easily handle this load.
**Action:** Removed `p-limit` and switched to direct `Promise.all` for file creation. This removed a runtime dependency and reduced file creation time by ~40% (4.38ms -> 2.64ms) in micro-benchmarks.

## 2025-02-18 - Synchronous IO in Validation Loops
**Learning:** Including synchronous file system calls (like `fs.realpathSync`) inside validation functions used in interactive loops creates unnecessary blocking overhead.
**Action:** Cache static environment values (like CWD) and hoist regex patterns to module scope to ensure validation logic remains CPU-bound only.

## 2026-02-11 - Remove Redundant Path Normalization in Name Validation
**Learning:** In this CLI, `validateProjectName` already rejects separators via `VALID_NAME_REGEX`, so additional `path.resolve/path.relative` checks on every prompt loop iteration were redundant and significantly slower.
**Action:** Keep traversal protection at the character-policy layer for project names and avoid path normalization in the validator hot path unless allowed characters expand.
## 2026-04-12 - Dynamic Imports for CLI Startup Performance
**Learning:** Importing heavy dependencies synchronously at the top level of CLI entry points (like 'cosmiconfig', 'readline', 'handlebars' indirectly via commands) severely degrades basic CLI flag processing (e.g. '--help').
**Action:** Delay importing subcommand modules dynamically using 'await import()' inside their respective action handlers. This avoids synchronously evaluating dependencies when users only run help or unrelated subcommands.
