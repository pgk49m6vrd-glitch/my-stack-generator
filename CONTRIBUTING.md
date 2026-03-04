# 🤝 Contributing to My Stack Generator

First off, thank you for considering contributing to **My Stack Generator**! It's people like you that make this tool better for everyone.

This document provides guidelines and instructions for developers who want to contribute to the project, test changes in real-time, report issues, or submit pull requests.

## 🧑‍💻 Local Development Setup

If you want to modify the CLI, add new features, or just see how it works under the hood, you should run the project directly from the source code rather than downloading the release zip.

### 1. Clone the repository

Instead of downloading the release, clone the repository using Git:

```bash
git clone https://github.com/pgk49m6vrd-glitch/my-stack-generator.git
cd my-stack-generator
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

We recommend creating a `test-project` folder outside of the repository to test the generator:

```bash
mkdir ../test-mystack
cd ../test-mystack
mystack
```

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
3. **Commit your changes** with a clear and descriptive commit message.
4. **Push your branch** to your fork or directly to the repository (if you have access).
   ```bash
   git push origin feature/my-new-feature
   ```
5. **Open a Pull Request** on GitHub. Describe what changes you made and why.

---

*Happy Coding!* 🚀
