## 2024-05-22 - CLI Dependency Installation
Learning: Sequential execution of package manager commands (e.g. `npm install prod` then `npm install dev`) incurs significant overhead due to repeated process startup and dependency resolution.
Action: Pre-fill `package.json` with `latest` versioned dependencies and run a single `install` command. This reduced setup time by ~35-47% (34s -> 22s).

## 2026-02-01 - Parallel File Writing in CLI
**Learning:** Mixing synchronous I/O (`fs.writeFileSync`) with asynchronous operations creates unnecessary blocking in the event loop, even in simple CLI scripts.
**Action:** Unify all file creation into a single `Promise.all` batch using `fs.promises.writeFile`. This ensures `package.json` is written concurrently with other files, adhering to non-blocking principles.
