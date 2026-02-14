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

## 2026-02-05 - Directory Creation Race Condition (TOCTOU)
**Vulnerability:** Checking `fs.existsSync` before `mkdir(recursive: true)` allows a race condition where a directory can be created by an attacker in between, leading to hijacking.
**Learning:** `mkdir` with `recursive: true` suppresses `EEXIST` errors, making it dangerous for "exclusive creation" logic. Atomic operations (`mkdir` without recursive) are safer for ensuring ownership.
**Prevention:** Avoid `recursive: true` when you need to guarantee you are creating a *new* directory. Handle `EEXIST` explicitly. Update cleanup logic to only run if creation was definitely successful.

## 2025-02-20 - Silencing Security Audits
**Vulnerability:** `npm install` and `pnpm install` were run with `--no-audit`, hiding potential supply chain vulnerabilities from the user during project creation.
**Learning:** Prioritizing speed or reduced noise over security visibility creates a false sense of safety. Users should be aware of vulnerabilities in their new project's dependency tree immediately.
**Prevention:** Do not disable default security checks (like `npm audit`) in tooling unless there is a critical technical blocker.

## 2026-02-11 - Guarded Recursive Cleanup
**Vulnerability:** Recursive cleanup relied on `currentRoot` alone, so any future bug or state corruption could point cleanup at an unintended directory and remove it with `rmSync(..., { recursive: true, force: true })`.
**Learning:** Destructive recovery paths need proof-of-ownership, not just a path string assembled earlier in execution.
**Prevention:** Use a per-run marker file and boundary checks (`realpath` + within-CWD validation) before allowing recursive deletion.

## 2026-05-20 - Missing Content Security Policy in Templates
**Vulnerability:** Generated starter templates often lack a Content Security Policy (CSP), leaving new projects vulnerable to XSS and data injection by default.
**Learning:** Developers often prioritize "getting it working" over security in starter templates, assuming users will add security later. This is a dangerous default.
**Prevention:** Include a strict-but-workable CSP (allowing HMR/localhost) in all generated HTML templates to establish a "secure by default" posture.

## 2026-05-20 - Implicit Global Variable Crash
**Vulnerability:** A critical variable (`cachedRealCwd`) used in security cleanup logic was not declared, causing a ReferenceError that crashed the tool and bypassed the cleanup mechanism on failure.
**Learning:** Implicit globals or missing declarations in error handling paths can mask critical failures. Linting tools (ESLint) should be configured to catch `no-undef`.
**Prevention:** Ensure all variables, especially those in error handlers or cleanup routines, are properly declared and initialized. Use `strict mode` (which modules imply) and run linters.
