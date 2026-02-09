## 2024-05-22 - CLI Dependency Installation
Learning: Sequential execution of package manager commands (e.g. `npm install prod` then `npm install dev`) incurs significant overhead due to repeated process startup and dependency resolution.
Action: Pre-fill `package.json` with `latest` versioned dependencies and run a single `install` command. This reduced setup time by ~35-47% (34s -> 22s).

## 2026-02-04 - File Creation Concurrency
**Learning:** Using `p-limit` to restrict concurrency for a small number of file writes (~12 files) introduced unnecessary overhead and an extra dependency, while Node.js `fs.promises.writeFile` can easily handle this load.
**Action:** Removed `p-limit` and switched to direct `Promise.all` for file creation. This removed a runtime dependency and reduced file creation time by ~40% (4.38ms -> 2.64ms) in micro-benchmarks.

## 2025-02-18 - Synchronous IO in Validation Loops
**Learning:** Including synchronous file system calls (like `fs.realpathSync`) inside validation functions used in interactive loops creates unnecessary blocking overhead.
**Action:** Cache static environment values (like CWD) and hoist regex patterns to module scope to ensure validation logic remains CPU-bound only.

## 2026-02-05 - Async Process Checks
**Learning:** Pre-checking external command availability in parallel (using `child_process.spawn`) significantly reduced perceived CLI latency (~1.5s -> 0ms perceived). However, spawned child processes keep the Node.js event loop alive.
**Action:** Use `child.unref()` on background verification processes so they don't block the main process from exiting if unselected checks are still pending.
