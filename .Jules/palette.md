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

## 2026-03-01 - External Links Require Context
**Learning:** `target="_blank"` links break user expectations if clicked without warning, and lack context for screen readers if only styled visually.
**Action:** Always include a visual icon for sighted users, `sr-only` text (e.g., "opens in a new tab") for screen readers, and `rel="noopener noreferrer"` for security/performance on external links.

## 2026-03-02 - Late Validation in CLI Workflows
**Learning:** Validating project directory existence *after* asking all other configuration questions frustrates users by forcing them to restart the entire CLI process if the name is taken.
**Action:** Always validate directory availability immediately during the project name prompt loop to provide instant feedback.

## 2026-03-02 - Contextualizing Unavailable CLI Options
**Learning:** Presenting options in a CLI that are fundamentally impossible to choose (like uninstalled package managers) without indicating their unavailability leads to immediate failure and user frustration.
**Action:** Add visual cues like `(not installed)` directly in the prompt for unavailable options to steer users toward successful paths before they make a choice.

## 2026-03-05 - Semantic Navigation for Link Clusters
**Learning:** Grouping external documentation links in simple `div` clusters lacks semantic meaning for screen readers, preventing them from announcing the group as navigation or providing the number of available links.
**Action:** Always wrap clusters of related links in a semantic `<nav aria-label="...">` and format the links within a `<ul>`/`<li>` structure to improve accessibility and responsive flow (`flex-wrap`). Visual separators should be wrapped in `li` elements with `aria-hidden="true"`.
