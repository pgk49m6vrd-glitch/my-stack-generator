## 2025-02-18 - CLI Input Validation
**Vulnerability:** Path traversal risk and invalid package name generation in `create-my-stack` CLI.
**Learning:** CLI tools often trust user input for file paths implicitly. `path.join` resolves paths but doesn't prevent `..` from escaping the intended root if the user input contains it.
**Prevention:** Always validate and sanitize user inputs that are used for file system operations, even in CLI tools.

## 2025-02-18 - Phantom Dependency Supply Chain Risk
**Vulnerability:** `package.json` listed `child_process` (a Node.js built-in) as a dependency.
**Learning:** Developers sometimes mistakenly add built-ins to `dependencies`. This creates a supply chain risk if a malicious package with that name exists on npm (typosquatting or shadowing).
**Prevention:** Audit `package.json` to ensure only real external packages are listed. Built-in modules (`fs`, `path`, `child_process`, etc.) should never be in `dependencies`.
