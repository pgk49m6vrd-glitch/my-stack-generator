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

## 2026-03-02 - Dynamic Error Announcements
**Learning:** Error messages that appear after a form submission are visually obvious but invisible to screen readers unless marked with `role="alert"`. Loading states on buttons also need `aria-busy` to convey their status.
**Action:** Always add `role="alert"` to dynamic error message containers and `aria-busy` to buttons undergoing async operations in React templates.

## 2026-03-03 - Sensory Parity for Loading States
**Learning:** Adding `aria-busy={true}` to a button helps screen readers, but sighted users need a visual indicator (like a spinner) to understand the loading state. Relying solely on text changes (e.g., "Loading...") can be missed.
**Action:** Always pair `aria-busy={true}` on async submit buttons with a visual indicator, such as an animated SVG spinner with `aria-hidden="true"`, to ensure sensory parity.

## 2025-10-26 - Connected Error Messages
**Learning:** Passing raw backend error messages directly to the UI is confusing for users and can leak information. Furthermore, simply displaying an error visually is insufficient for accessibility.
**Action:** Always map backend errors to generic user-friendly messages (e.g., 'Invalid credentials'), and explicitly associate the input fields with the error container using `aria-invalid` and `aria-describedby` attributes so screen readers immediately announce the error context when the input is focused.

## 2026-03-04 - Missing Focus Visible Styles on Interactive Elements
**Learning:** Text-only interactive elements like links and inline toggle buttons often lack clear visual indicators during keyboard navigation, frustrating users who rely on keyboards.
**Action:** Always add explicit `focus-visible` utility classes (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded`) to all interactive elements to ensure distinct and accessible keyboard focus states.

## 2024-05-18 - Dynamic Password AutoComplete for Shared Auth Forms
**Learning:** Hardcoding `autoComplete="current-password"` in a shared login/signup component frustrates users by confusing password managers during account creation, preventing them from generating or correctly saving new passwords.
**Action:** Always dynamically toggle the `autoComplete` attribute between `current-password` and `new-password` based on the auth form's current state (login vs signup).
## 2026-03-05 - Dynamic AutoComplete on Shared Auth Forms
**Learning:** Hardcoding `autoComplete="current-password"` on a shared login/signup form causes password managers to misbehave and suggest updating existing passwords during account creation.
**Action:** Always toggle the `autoComplete` attribute between `current-password` and `new-password` dynamically based on the form's current state (e.g., `isLogin`).
**Learning:** Password managers rely heavily on `autoComplete` attributes. Hardcoding `autoComplete="current-password"` on a shared form that toggles between login and signup breaks the manager's ability to generate or save new passwords during sign up.
**Action:** Always toggle the `autoComplete` attribute dynamically (e.g., between 'current-password' and 'new-password') based on the current mode of a shared authentication form.

## 2026-03-05 - Visual Parity for Required Form Fields
**Learning:** Adding the `required` attribute to an input field provides semantic meaning for screen readers, but sighted users may not realize the field is mandatory until they submit the form and see an error. This lack of visual parity creates friction.
**Action:** Always pair the `required` attribute on input fields with a clear visual indicator (like a red asterisk `*`) in the `<label>`, ensuring it has `aria-hidden="true"` so it isn't redundantly announced by screen readers.
## 2024-05-18 - Password Visibility Toggles
**Learning:** A password visibility toggle is a critical usability and accessibility feature, particularly for "Create Account" forms that lack a "Confirm Password" field, as it prevents user frustration from hidden typos.
**Action:** Always include an accessible toggle button (using `aria-label` and `aria-pressed`) on password inputs where confirmation fields are omitted.

## 2026-03-05 - Use of Color in Error Messages
**Learning:** Communicating error states solely through color (e.g., red text) fails WCAG 1.4.1 (Use of Color) and disadvantages users with color blindness.
**Action:** Always pair color-based error indicators with an explicit icon (like a warning triangle) and structural layout changes (like flex with gap) to provide redundant sensory cues.

## 2026-03-05 - Skip-to-Content Navigation
**Learning:** Navigational headers without a "skip-to-content" link force keyboard and screen-reader users to tediously tab through all navigation links on every page load to reach the primary content.
**Action:** Always include a visually hidden "skip-to-content" link at the top of the DOM that becomes visible on focus, and ensure the main content area has a matching ID (e.g., `<main id="main-content">`) to receive focus.
## 2026-03-05 - Native Tooltips for Icon-Only Buttons
**Learning:** Icon-only buttons with `aria-label` are accessible to screen readers, but sighted users (who may not recognize the icon) lack a way to discover the button's action. A native `title` attribute provides an instant, zero-dependency tooltip on hover.
**Action:** Always add a `title` attribute matching the `aria-label` to icon-only buttons to support visual discovery.

## 2026-03-05 - Avoiding Sticky Mouse Focus
**Learning:** Using `focus:ring` on buttons causes the focus ring to "stick" after a user clicks the button with a mouse, which looks like a visual bug. `focus-visible:ring` ensures the ring only appears during keyboard navigation.
**Action:** Always use `focus-visible:` pseudo-classes instead of `focus:` for focus rings on buttons and links to improve the mouse user experience without degrading keyboard accessibility.
