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
* **Architecture:** Feature-Based Design (Organization by business domains).

---

## 🏗️ Architecture & Highlights

The generated architecture follows a **Feature-Based** logic. Instead of grouping files by "technical type" (all components together, all hooks together), we group them by **feature**.

### Folder structure

* **`src/features/`**: The core of the application. Each folder (e.g., `auth`) contains its own `components`, `hooks`, and `services`.
* **`src/lib/`**: Centralized configurations (e.g., `firebase.config.js` or `supabase.config.js`).
* **`src/components/`**: Global and reusable UI components (Button, Input, Card).
* **`src/hooks/`**: Global hooks shared across multiple features.

---

## 📋 Prerequisites

Before installing, ensure you have the following:

- **Node.js**: version 18.0.0 or higher.
- **Package Manager**: npm, pnpm, or bun.

## ⚙️ Installation

Follow these steps to install the command globally on your machine:

### 1. Download the release

Go to the Releases section of this repository and download the file: **my-stack-generator.zip**. Make sure to choose the latest stable version (currently **1.2.1**).

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

To create a new project, simply run the following command:

```bash
mystack
```

The terminal will guide you through a few interactive questions:

### 1. Project name
```plaintext
👉 What is your project name? (default: my-awesome-project)
```

### 2. Package manager selection
```plaintext
📦 Which package manager do you prefer?
1. npm
2. pnpm
3. bun
Your Choice (1, 2 or 3) [default: 1]:
```

### 3. Backend selection
```plaintext
🔥 Which back-end do you prefer?
1. Firebase
2. Supabase
Your Choice (1 or 2) [default: 1]:
```

### 4. Dependency installation
```plaintext
📦 Do you want to install dependencies with [npm/pnpm/bun]? (Y/n)
```

- **Answer "Y" (Yes)**: The generator will automatically download and install all necessary libraries. This step is required for the project to run. 
**Note:** If installation fails, the project folder will be automatically cleaned up.
- **Answer "n" (No)**: The script will only create the project structure and files. You will need to run the install command manually later.

---

Automated actions performed by the script:

* Creation of the complete folder structure.
* Generation of configuration files (React, Tailwind v4, Firebase or Supabase).
* Generation of base UX assets (favicon.svg, site.webmanifest).
* Creation of a modern, accessible home page (App.jsx).
* Generation of `.env.example` for easy configuration.
