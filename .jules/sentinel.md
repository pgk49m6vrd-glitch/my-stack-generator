## 2025-02-18 - CLI Input Validation
**Vulnerability:** Path traversal risk and invalid package name generation in `create-my-stack` CLI.
**Learning:** CLI tools often trust user input for file paths implicitly. `path.join` resolves paths but doesn't prevent `..` from escaping the intended root if the user input contains it.
**Prevention:** Always validate and sanitize user inputs that are used for file system operations, even in CLI tools.

## 2025-02-18 - Phantom Dependency Supply Chain Risk
**Vulnerability:** `package.json` listed `child_process` (a Node.js built-in) as a dependency.
**Learning:** Developers sometimes mistakenly add built-ins to `dependencies`. This creates a supply chain risk if a malicious package with that name exists on npm (typosquatting or shadowing).
**Prevention:** Audit `package.json` to ensure only real external packages are listed. Built-in modules (`fs`, `path`, `child_process`, etc.) should never be in `dependencies`.

## 2025-02-19 - CLI Input Length Constraints
**Vulnerability:** Unbounded user input for project names creates potential for filesystem errors and denial of service.
**Learning:** Even in local CLI tools, input validation must account for platform constraints (filesystem limits, npm naming rules). npm enforces a 214-character limit on package names.
**Prevention:** Explicitly validate input length against known downstream constraints (e.g., max 214 chars) before attempting operations.
