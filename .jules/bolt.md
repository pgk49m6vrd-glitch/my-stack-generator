## 2024-05-01 - Dynamic Imports in CLI Action Handlers
**Learning:** Top-level synchronous imports of heavy modules (like the init command logic and configuration presets) in a commander-based CLI force Node.js to evaluate all dependencies immediately, even for simple commands like `--help` or `--version`, causing a significant startup penalty.
**Action:** Always place `await import(...)` dynamically inside the `.action()` handler of the command that actually requires it, especially in CLI tools, to defer module resolution until execution and drastically improve startup time.
