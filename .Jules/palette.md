## 2025-05-23 - Language Consistency in CLI
**Learning:** Mixed languages (English prompts vs French logs) in CLI tools disrupt user flow and accessibility.
**Action:** Always audit CLI output for language consistency during initialization.

## 2025-05-23 - Explicit Defaults in CLI
**Learning:** Explicit defaults in CLI prompts reduce cognitive load and prevent "error-like" fallback messages.
**Action:** Always include `(default: value)` in prompts and handle empty input gracefully.

## 2025-10-26 - The Empty Project Problem
**Learning:** Generating a project without a README leaves users (even developers) feeling lost, regardless of how clean the architecture is.
**Action:** Always include a tailored README.md in generated boilerplate, bridging the gap between creation and first run.

## 2025-10-26 - Dark Mode Completeness
**Learning:** A dark mode app with default white scrollbars and blue selection breaks immersion.
**Action:** Style `::selection` and `::-webkit-scrollbar` to match the theme for a "native-like" feel in web apps.

## 2026-02-11 - Specific Validation Beats Generic Errors
**Learning:** In this CLI generator, a single generic "invalid project name" message hides the exact fix and increases retry loops.
**Action:** Prefer field-level validation messages that explain the exact constraint (length, characters, reserved names, path safety).

## 2026-02-12 - The "No" Trap in CLIs
**Learning:** In yes/no prompts (Y/n), relying on strictly `input !== 'n'` causes explicit "no" or "NO" inputs to trigger the affirmative action, frustrating users.
**Action:** Always validate negative inputs against a set of variations (e.g., `['n', 'no']`) rather than a single character.

## 2026-02-12 - Flexible Input Recognition
**Learning:** Forcing users to map their mental model (e.g., "npm") to arbitrary numbers (e.g., "1") increases cognitive load and error rates in CLIs.
**Action:** Accept both the index and the case-insensitive name (e.g., "1" or "npm") for selection prompts.
