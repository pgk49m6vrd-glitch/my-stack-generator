# 🛠️ My Stack Generator

**The ultimate boilerplate generator for "AI-Native" development with React, Tailwind v4, and Firebase.**

This project is a personal command-line interface (CLI) designed to automate the creation of modern web projects. Instead of manually configuring each tool, this generator deploys a robust, scalable architecture that is immediately understood by AI assistants (Cursor, Claude Code, Google AntiGravity, etc.).

---

## 🚀 Why use My Stack Generator?

The goal is to eliminate "setup fatigue." With a single command, you get a production-ready environment that follows current best practices.

### The Tech Stack

* **Framework:** [React](https://reactjs.org/) (via Vite) for maximum speed.
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (high-performance engine).
* **Backend:** [Firebase](https://firebase.google.com/) (Modular SDK v9+) pre-configured.
* **Architecture:** Feature-Based Design (Organization by business domains).

---

## 🏗️ Architecture & Highlights

The generated architecture follows a **Feature-Based** logic. Instead of grouping files by "technical type" (all components together, all hooks together), we group them by **feature**.

### Folder structure

* **`src/features/`**: The core of the application. Each folder (e.g., `auth`) contains its own `components`, `hooks`, and `services`.
* **`src/lib/`**: Centralized configurations (e.g., `firebase.config.js`).
* **`src/components/`**: Global and reusable UI components (Button, Input, Card).
* **`src/hooks/`**: Global hooks shared across multiple features.

---

## ⚙️ Installation

Follow these steps to install the command globally on your machine:

### 1. Download the project

Clone the repository or download the source files into a dedicated folder.

### 2. Go to the folder

Open your terminal and navigate to the project, you have to tap twice:

```bash
cd my-stack-generator
```

### 3. Link the command to your system

Run the following command to register **`create-my-stack`** on your computer:

```bash
npm link
```

---

## 💻 Utilisation

Pour créer un nouveau projet, il vous suffit de lancer :

```bash
create-my-stack
```

The terminal will then ask you an interactive question:

```plaintext
👉 What is your project name?
```

After entering your project name, the terminal will ask you a second question:

```plaintext
📦 Which package manager do you prefer?
1. npm
2. pnpm
3. bun
Your choice (1, 2 or 3):
```

You just have to answer with 1, 2, or 3.

Automated actions performed by the script:

* Creation of the complete folder structure.

* Generation of configuration files (React, Tailwind v4, Firebase).

* Creation of an animated home page (App.jsx) to test the rendering immediately.

* Automatic installation of all dependencies via your chosen package manager.
