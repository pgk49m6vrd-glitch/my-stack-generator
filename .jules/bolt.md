## 2024-05-22 - CLI Dependency Installation
Learning: Sequential execution of package manager commands (e.g. `npm install prod` then `npm install dev`) incurs significant overhead due to repeated process startup and dependency resolution.
Action: Pre-fill `package.json` with `latest` versioned dependencies and run a single `install` command. This reduced setup time by ~35-47% (34s -> 22s).

## 2026-02-04 - File Creation Concurrency
**Learning:** Using `p-limit` to restrict concurrency for a small number of file writes (~12 files) introduced unnecessary overhead and an extra dependency, while Node.js `fs.promises.writeFile` can easily handle this load.
**Action:** Removed `p-limit` and switched to direct `Promise.all` for file creation. This removed a runtime dependency and reduced file creation time by ~40% (4.38ms -> 2.64ms) in micro-benchmarks.

## 2026-02-04 - Validation Loop Overhead
**Learning:** Security checks like `fs.realpathSync` inside user input validation loops can introduce significant synchronous I/O overhead.
**Action:** Cache invariant filesystem states (like `cwd`) and compile Regex patterns at module level. This reduced validation time by ~48% (115ms -> 60ms for 50k ops).
