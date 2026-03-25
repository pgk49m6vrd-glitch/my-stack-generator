# 🛠️ My Stack Generator

**The ultimate boilerplate generator for "AI-Native" development with React, Tailwind v4, and Firebase or Supabase.**

This project is a personal command-line interface (CLI) designed to automate the creation of modern web projects. Instead of manually configuring each tool, this generator deploys a robust, scalable architecture that is immediately understood by AI assistants (Cursor, Claude Code, Google AntiGravity, etc.).

---

## 📄 License Notice & Disclaimer

A copy of the license is included in the **LICENSE** file inside the my-stack-generator.zip archive.

This project is distributed under the GNU Affero General Public License (AGPL). In summary:

- **You are free to:**
  - Use, copy, and distribute the software, including commercially.
  - Modify the source code and share your modifications.
- **You must:**
  - Provide access to the complete source code (including your modifications) if you make the software available to others, especially over a network.
  - Keep the same license (AGPL) for any distributed or network-accessible modifications.
- **You may not:**
  - Impose further restrictions beyond those of the AGPL.
  - Remove or alter the license notices.

**Important:** You must read the full LICENSE file before using, modifying, or distributing this project. This summary and the rest of this documentation are for informational purposes only and do not constitute legal advice or override the terms of the license. Only the LICENSE file is legally binding.

---

## 🚀 Why use My Stack Generator?

The goal is to eliminate "setup fatigue." With a single command, you get a production-ready environment that follows current best practices.

### The Tech Stack

* **Framework:** [React](https://reactjs.org/) (via Vite) for maximum speed.
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (high-performance engine).
* **Backend:** [Firebase](https://firebase.google.com/) or [Supabase](https://supabase.com/) pre-configured.
* **Language:** JavaScript or **TypeScript** (your choice).
* **Architecture:** Feature-Based Design (Organization by business domains).

### What's new in v3.0.0

* 📘 **TypeScript support** — Generate projects in TypeScript with strict config out of the box.
* 🧩 **Modular features** — Select optional features (Router, State, Lint, Tests, Auth, UI).
* 🤖 **Non-interactive mode** — Automate project creation with `--yes` and CLI flags.
* 📋 **Dry-run mode** — Preview what files will be created without writing anything.
* 💾 **Presets** — Save and reuse your favorite project configurations.
* 🔐 **Auth components** — Get a working login form + auth context out of the box.
* 🎨 **shadcn/ui integration** — Accessible, pre-styled components ready to use.

---

## 🏗️ Architecture & Highlights

The generated architecture follows a **Feature-Based** logic. Instead of grouping files by "technical type" (all components together, all hooks together), we group them by **feature**.

### Folder structure

* **`src/features/`**: The core of the application. Each folder (e.g., `auth`) contains its own `components`, `hooks`, and `services`.
* **`src/lib/`**: Centralized configurations (e.g., `firebase.config.ts` or `supabase.config.ts`).
* **`src/components/`**: Global and reusable UI components (Button, Input, Card).
* **`src/hooks/`**: Global hooks shared across multiple features.
* **`src/pages/`**: Route-level page components (when Router feature is selected).
* **`src/stores/`**: Zustand state stores (when Zustand feature is selected).

---

## 📋 Prerequisites

Before installing, ensure you have the following:

- **Node.js**: version 18.0.0 or higher.
- **Package Manager**: npm, pnpm, or bun.

## ⚙️ Installation

Follow these steps to install the command globally on your machine:

### 1. Download the release

Go to the Releases section of this repository and download the file: **my-stack-generator.zip**. Make sure to choose the latest stable version (currently **v3.0.0**).

### 2. Extract the archive

After downloading, extract the contents of **my-stack-generator.zip**.

### 3. Go to the folder

Open your terminal and navigate to the extracted **my-stack-generator** folder using the following command (replace `{path-to-my-stack-generator}` with the actual path):

```bash
cd [path-to-my-stack-generator]/my-stack-generator
```

### 4. Link the command to your system

Run one of these following commands to register **`mystack`** on your computer:

```bash
npm install
npm link
```
```bash
pnpm install
pnpm link
```
```bash
bun install
bun link
```
> *We recommend using bun*

---

## 💻 Usage

### Interactive mode (default)

To create a new project with the interactive wizard, simply run:

```bash
mystack
```

The terminal will guide you through these questions:

1. **Project name** — Name of your project folder
2. **Package manager** — npm, pnpm, or bun
3. **Backend** — Firebase or Supabase
4. **TypeScript** — Enable TypeScript support (strict config included)
5. **Features** — Select optional features from the list below
6. **Install dependencies** — Auto-install or do it later

### 🧩 Available features

When creating a project, you can select any combination of these optional features:

| # | Feature | What it adds |
|---|---------|-------------|
| 1 | **React Router** | `react-router-dom`, page components in `src/pages/`, App with `<BrowserRouter>` navigation |
| 2 | **Zustand** | `zustand` state management, example store in `src/stores/useAppStore.ts` |
| 3 | **ESLint + Prettier** | `eslint` v9 flat config, `prettier`, scripts `lint` and `format` in package.json |
| 4 | **Vitest** | `vitest`, `@testing-library/react`, `jsdom`, config file, setup, example test, scripts `test` and `test:ui` |
| 5 | **Authentication** | Auth context with Firebase/Supabase listener, login form with email/password, `useAuth` hook |
| 6 | **shadcn/ui** | `components.json` configured, auto-init post-install. Add components with `npx shadcn add button` |

### 🤖 Non-interactive mode (CI/automation)

For automated pipelines, scripts, or CI/CD, use `--yes` to skip all prompts and pass options as flags:

```bash
# Minimal: generates a default project (npm, Firebase, JS)
mystack init --yes --name my-app

# Full control: specify everything
mystack init --yes --name my-saas \
  --pm pnpm \
  --backend supabase \
  --typescript \
  --features router,zustand,eslint,vitest,auth

# Preview without creating files
mystack init --yes --name my-app --dry-run
```

**Available flags:**

| Flag | Description | Default |
|------|-------------|---------|
| `-y, --yes` | Non-interactive mode | `false` |
| `-n, --name <name>` | Project name | `my-awesome-project` |
| `--pm <pm>` | Package manager (`npm`, `pnpm`, `bun`) | `npm` |
| `-b, --backend <backend>` | Backend (`firebase`, `supabase`) | `firebase` |
| `--typescript` | Enable TypeScript | `false` |
| `-f, --features <list>` | Comma-separated features | none |
| `--preset <name>` | Use a named preset | none |
| `--dry-run` | Show what would be created without writing | `false` |

### 💾 Presets

Presets let you save and reuse your favorite project configuration:

```bash
# List all available presets
mystack presets

# Use a built-in preset
mystack init --yes --preset enterprise --name my-app
```

**Built-in presets:**

| Preset | PM | Backend | TypeScript | Features |
|--------|-----|---------|------------|----------|
| `default` | npm | Firebase | No | — |
| `enterprise` | pnpm | Firebase | Yes | router, zustand, eslint, vitest, auth |
| `minimal` | npm | Firebase | No | — |
| `fullstack` | pnpm | Supabase | Yes | router, zustand, eslint, vitest, auth, shadcn |

---

## 📘 TypeScript support

When TypeScript is enabled (via `--typescript` or the interactive prompt), the generated project includes:

- `tsconfig.json` with strict mode and all recommended compiler options
- `tsconfig.node.json` for Vite configuration
- `vite.config.ts` instead of `vite.config.js`
- All source files in `.tsx` / `.ts` format
- `typescript`, `@types/react`, and `@types/react-dom` as dev dependencies
- Feature-specific files (stores, auth context, tests) are also fully typed

---

Automated actions performed by the script:

* Creation of the complete folder structure.
* Generation of configuration files (React, Tailwind v4, Firebase or Supabase).
* Generation of base UX assets (favicon.svg, site.webmanifest).
* Creation of a modern, accessible home page (`App.jsx` or `App.tsx`).
* Generation of `.env.example` for easy configuration.
* Optional: TypeScript configuration, Router setup, State management, Linting, Testing, Auth components, shadcn/ui.
