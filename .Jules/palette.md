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

## 2025-10-27 - CLI Input Traps & Feedback
**Learning:** When a CLI prompt defaults to "Yes", explicitly typing "no" should never result in "Yes". This "No Trap" erodes trust.
**Action:** Always check for both single-letter ('n') and full-word ('no', 'false') negative inputs in boolean prompts.
