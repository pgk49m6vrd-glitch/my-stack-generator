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

## 2025-02-21 - Wildcard Environment Exclusions in Project Templates
**Vulnerability:** Generated `.gitignore` only blocked specific environments (`.env`, `.env.local`), leaving custom environments like `.env.production` or `.env.staging` vulnerable to accidental commit if a developer created them locally.
**Learning:** Hardcoded exclude lists for configuration files fail when users naturally extend naming conventions.
**Prevention:** Always use wildcard patterns (`.env.*`) with explicit opt-in exceptions (`!.env.example`) to create a secure-by-default posture for secrets.
## 2026-03-03 - Referrer-Policy Meta Tag
**Vulnerability:** Leaking sensitive URL paths or parameters to external sites when users click external links in the generated application.
**Learning:** The default behavior of modern browsers is often 'strict-origin-when-cross-origin', but it's best practice to explicitly set it to ensure consistent security across all browsers and versions.
**Prevention:** Always include a Referrer-Policy meta tag in the HTML head of generated applications to enforce a secure default policy.

## 2025-10-18 - Non-Interactive CLI Input Allowlist
**Vulnerability:** Command injection risk via unvalidated `--pm` and `--backend` flags in non-interactive mode.
**Learning:** CLI parameters that are later passed to OS-level child processes (like `spawn`) must be rigorously validated even when reasonable defaults are provided. In non-interactive modes, validation logic is often accidentally bypassed.
**Prevention:** Always implement strict allowlists for sensitive CLI arguments before any process execution, failing securely (e.g., `process.exit(1)`) if inputs are out-of-bounds. Safely handle `undefined` cases to preserve legitimate defaults.
## 2024-05-18 - [Command Injection via Unvalidated CLI Input]
**Vulnerability:** The CLI accepted any string for the package manager flag (`--pm`) in non-interactive mode, which was directly passed to `spawn()`, leading to potential command injection.
**Learning:** Even though `spawn()` is used without a shell by default, an attacker could supply an arbitrary binary name. Unvalidated inputs passed to OS-level APIs must be validated safely against allowlists.
**Prevention:** Always validate untrusted CLI inputs against a strict allowlist before using them in child processes, taking care to safely handle undefined values before default fallbacks.

## 2025-06-26 - Non-Interactive CLI Input Allowlist (Features)
**Vulnerability:** Command injection risk via unvalidated `--features` flag in non-interactive mode.
**Learning:** CLI parameters that are arrays or comma-separated lists must be rigorously validated against a strict allowlist.
**Prevention:** Always implement strict allowlists for sensitive CLI arguments (including arrays) before process execution.
## 2025-06-27 - CLI Feature Allowlist Validation
**Vulnerability:** Unvalidated `--features` input in CLI arguments could allow injection of arbitrary strings or out-of-bounds parameters into project templates.
**Learning:** Even optional, array-based or comma-separated CLI inputs can be vectors for injection if not strictly validated against a known allowlist.
**Prevention:** Always validate every item in array-based or comma-separated CLI inputs against a strict allowlist and safely handle undefined states to prevent out-of-bounds inputs.
## 2024-08-07 - Denial of Service in js-yaml
**Vulnerability:** js-yaml versions before 4.3.0 can spend quadratic CPU time parsing a document whose size grows only linearly, due to a chain of mappings where each mapping merges the previous one.
**Learning:** Even well-known parsing libraries can have edge-case logic that allows a Denial of Service through resource exhaustion.
**Prevention:** Ensure parsing libraries are up-to-date and restrict parsing features like merged keys if not strictly necessary.
## 2025-06-28 - Unsafe Dynamic Code Evaluation
**Vulnerability:** Precompiled Handlebars templates were evaluated using `new Function('return ' + specSource)()`, which introduces arbitrary code execution risks.
**Learning:** In modern Node.js, `new Function` or `eval` for script execution bypasses security boundaries. Precompiled specs can be securely required as CommonJS modules (`.cjs`), even in ES Module contexts.
**Prevention:** Always rely on native module loaders (`require` or `import`) instead of unsafe code evaluation techniques.
## 2025-02-23 - Login Form Resource Exhaustion
**Vulnerability:** Missing maxLength constraints on authentication inputs (email and password).
**Learning:** Unbounded text inputs are susceptible to resource exhaustion or denial of service attacks through pasting extremely large payloads.
**Prevention:** Explicitly apply reasonable `maxLength` attributes to all user input fields (e.g., 255 for emails, 128 for passwords) on the frontend.

## 2026-08-11 - Missing Input Length Limits (DoS Risk)
**Vulnerability:** The email and password input fields in the generated `LoginForm` component lacked `maxLength` attributes.
**Learning:** Without explicit maximum length limits on frontend forms, malicious actors can submit excessively long strings to authentication backends (like Supabase or Firebase). This can cause resource exhaustion (CPU/RAM) during hashing or validation, leading to a potential Denial of Service (DoS).
**Prevention:** Always apply explicit and reasonable `maxLength` attributes (e.g., 255 for emails, 128 for passwords) to user input fields in forms to mitigate resource exhaustion and DoS attacks.
