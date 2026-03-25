# 🤝 Contributing to My Stack Generator

First off, thank you for considering contributing to **My Stack Generator**! It's people like you that make this tool better for everyone.

This document provides guidelines and instructions for developers who want to contribute to the project, test changes in real-time, report issues, or submit pull requests.

## 🧑‍💻 Local Development Setup

If you want to modify the CLI, add new features, or just see how it works under the hood, you should run the project directly from the source code rather than downloading the release zip.

### 1. Clone the repository

Instead of downloading the release, clone the repository using Git:

```bash
git clone https://github.com/pgk49m6vrd-glitch/my-stack-generator.git
cd my-stack-generator && cd my-stack-generator
```

### 2. Install dependencies

Install the project dependencies using your preferred package manager (we recommend `bun`):

```bash
bun install
# or
npm install
# or
pnpm install
```

### 3. Link the CLI globally (for local testing)

To test your local changes as if the CLI was installed globally on your system, use the `link` command. This creates a symbolic link from your global `node_modules` to your local project directory.

Run **one** of the following commands from inside the `my-stack-generator` directory:

```bash
bun link
# or
npm link
# or
pnpm link
```

Now, when you run the `mystack` command anywhere on your machine, it will execute the code directly from your local repository!

> **💡 Tip:** Every time you save a change in the source code, the `mystack` command will instantly reflect those changes next time you run it. You **don't** need to run `link` again.

### 4. Running the CLI during development

We recommend testing the generator outside the repository's clone:

```bash
cd .. && cd ..
mystack
```

For quick testing, you can use the non-interactive mode:

```bash
# Quick test with defaults
mystack init --yes --name test-project

# Test with TypeScript + features
mystack init --yes --name test-ts --typescript --features router,zustand

# Preview without creating files
mystack init --yes --name test --dry-run
```

### 5. Running tests

```bash
npm test
```

This runs the project name validation tests. Always ensure they pass before submitting a PR.

---

## 🏗️ Project Architecture

The CLI follows a modular architecture since v3.0.0:

```
my-stack-generator/
├── index.js                  # Entry point (lightweight wrapper)
├── src/
│   ├── cli.js                # Commander-based CLI with commands
│   ├── template-engine.js    # Handlebars engine + precompilation
│   ├── prompts.js            # Interactive prompt questions
│   ├── generator.js          # Project generation orchestrator
│   ├── config.js             # Preset system (~/.mystackrc.json)
│   ├── utils.js              # Validation, sanitization, PM checks
│   ├── precompile.js         # Template precompiler script
│   └── commands/
│       └── init.js           # `mystack init` command
├── templates/
│   ├── base/                 # Core templates (always included)
│   ├── typescript/           # TypeScript-specific overrides
│   ├── firebase/             # Firebase backend templates
│   ├── supabase/             # Supabase backend templates
│   ├── features/             # Optional feature templates
│   │   ├── router/           # React Router
│   │   ├── zustand/          # Zustand state management
│   │   ├── eslint/           # ESLint + Prettier
│   │   ├── vitest/           # Vitest + Testing Library
│   │   ├── auth/             # Auth context + Login form
│   │   └── shadcn/           # shadcn/ui config
│   └── compiled/             # Precompiled templates (auto-generated)
└── test-validation.js        # Validation tests
```

### Key modules

- **`template-engine.js`** — Central module that loads `.hbs` Handlebars templates, compiles them with context variables (`projectName`, `backend`, `typescript`, etc.), and returns rendered file content. Custom helpers are registered here (`eq`, `capitalizeFirst`, `and`, `includes`, etc.).

- **`generator.js`** — Orchestrates the entire generation: calls the template engine, creates directories, writes files, runs `npm install`, and handles cleanup on failure.

- **`config.js`** — Manages presets (built-in + user-saved in `~/.mystackrc.json`). Handles the config merge priority: preset → CLI flags → interactive prompts.

---

## 📝 Modifying Templates

Templates use [Handlebars](https://handlebarsjs.com/) syntax. All template files are in the `templates/` directory with the `.hbs` extension.

### Template variables

These variables are available in all templates:

| Variable | Type | Example |
|----------|------|---------|
| `{{projectName}}` | string | `my-app` |
| `{{packageName}}` | string | `my-app` |
| `{{pm}}` | string | `pnpm` |
| `{{backend}}` | string | `firebase` |
| `{{typescript}}` | boolean | `true` |
| `{{features}}` | array | `['router', 'zustand']` |
| `{{backendCapitalized}}` | string | `Firebase` |
| `{{backendDocsUrl}}` | string | `https://firebase.google.com/docs` |
| `{{hasRouter}}` | boolean | `true` |
| `{{hasZustand}}` | boolean | `false` |
| `{{hasEslint}}` | boolean | `true` |
| `{{hasVitest}}` | boolean | `false` |
| `{{hasAuth}}` | boolean | `true` |
| `{{hasShadcn}}` | boolean | `false` |

### Custom helpers

| Helper | Usage | Output |
|--------|-------|--------|
| `capitalizeFirst` | `{{capitalizeFirst backend}}` | `Firebase` |
| `eq` | `{{#if (eq backend "firebase")}}` | conditional |
| `and` | `{{#if (and hasEslint typescript)}}` | conditional |
| `or` | `{{#if (or hasRouter hasAuth)}}` | conditional |
| `includes` | `{{#if (includes features "router")}}` | conditional |
| `devCmd` | `{{devCmd pm}}` | `npm run dev` or `pnpm dev` |
| `installCmd` | `{{installCmd pm}}` | `npm install` |

### Adding a new template

1. Create your `.hbs` file in the appropriate `templates/` subdirectory.
2. Register it in `src/template-engine.js` → `renderAllTemplates()`.
3. If it depends on a new feature, add the feature to `src/prompts.js` → `AVAILABLE_FEATURES`.
4. Run `npm run build:templates` to precompile all templates.
5. Test with `mystack init --yes --name test --dry-run` to verify.

### Precompiling templates

For production performance, templates can be precompiled to JavaScript functions:

```bash
npm run build:templates
```

This generates `templates/compiled/` with `.js` files. The template engine automatically uses precompiled versions when available, falling back to runtime `.hbs` compilation in development.

> **Note:** The `templates/compiled/` directory is auto-generated. Do not edit files in it manually.

---

## 🐛 Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub!

1. Check if the issue has already been reported.
2. If not, click **New Issue**.
3. Provide as much context as possible:
   - What you were trying to do.
   - What happened instead.
   - Your OS, Node.js version, and package manager version.
   - Any relevant error logs.

## 🔀 Pull Requests

We welcome pull requests!

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/my-bug-fix
   ```
2. **Make your changes** and test them locally (see the Local Development Setup section).
3. **Run tests** to ensure nothing is broken: `npm test`
4. **Precompile templates** if you modified any `.hbs` files: `npm run build:templates`
5. **Commit your changes** with a clear and descriptive commit message.
6. **Push your branch** to your fork or directly to the repository (if you have access).
   ```bash
   git push origin feature/my-new-feature
   ```
7. **Open a Pull Request** on GitHub. Describe what changes you made and why.

---

*Happy Coding!* 🚀
