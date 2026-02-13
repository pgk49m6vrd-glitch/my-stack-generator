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

## 2026-03-12 - Cognitive Mapping in CLI Choices
**Learning:** Forcing users to translate their intent (e.g., "npm") into a numeric code (e.g., "1") adds unnecessary cognitive friction in interactive CLIs.
**Action:** Accept both the name (case-insensitive) and the numeric index for selection prompts to support natural user input.
