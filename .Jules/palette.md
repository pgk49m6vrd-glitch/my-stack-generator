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

## 2026-02-23 - Zero-Click Resources
**Learning:** Starter templates often leave users at a "now what?" state.
**Action:** Embed direct links to documentation for the chosen stack in the initial UI.

## 2026-03-01 - Graceful Degradation
**Learning:** Single Page Applications (SPAs) show a blank white screen when JavaScript fails or is disabled, confusing users.
**Action:** Always include a styled `<noscript>` fallback in the `index.html` template that matches the app's theme.

## 2026-02-28 - Context for External Links
**Learning:** Links that open in new tabs (`target="_blank"`) without warning disorient users and break the back button expectation, especially for screen reader users.
**Action:** Always provide visual indicators (like an external link icon) and visually hidden text (e.g., `<span className="sr-only">(opens in a new tab)</span>`) for external links.
