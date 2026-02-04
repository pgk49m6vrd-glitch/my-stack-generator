# 🛠️ My Stack Generator

**The ultimate boilerplate generator for "AI-Native" development with React, Tailwind v4, and Firebase.**

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

### 1. Download the release

Go to the Releases section of this repository and download the file: **my-stack-generator.zip**. Make sure to choose the latest stable version (currently **5.0.0**).

### 2. Extract the archive

After downloading, extract the contents of **my-stack-generator.zip**.

### 3. Go to the folder

Open your terminal and navigate to the extracted **my-stack-generator** folder using the following command (replace `{path-to-my-stack-generator}` with the actual path):

```bash
cd [path-to-my-stack-generator]/my-stack-generator
```

### 4. Link the command to your system

Run the following command to register **`create-my-stack`** on your computer:

```bash
npm link
```

---

## 💻 Utilisation

For create a new prject, you just have to run the following command:

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
