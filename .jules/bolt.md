## 2024-05-22 - CLI Dependency Installation
Learning: Sequential execution of package manager commands (e.g. `npm install prod` then `npm install dev`) incurs significant overhead due to repeated process startup and dependency resolution.
Action: Pre-fill `package.json` with `latest` versioned dependencies and run a single `install` command. This reduced setup time by ~35-47% (34s -> 22s).
