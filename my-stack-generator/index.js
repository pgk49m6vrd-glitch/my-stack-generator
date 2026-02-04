#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

function validateProjectName(name) {
  if (!name || name.trim() === '') return false;
  // Sentinel: Use strict whitelist to prevent command injection and path traversal
  // Relaxed to allow dots for folder names
  const validNameRegex = /^[a-zA-Z0-9-_\.]+$/;
  return validNameRegex.test(name);
}

function sanitizePackageName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

function checkPackageManager(pm) {
  try {
    execSync(`${pm} --version`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  console.log("\n--- 🚀 STACK GENERATOR V5 ---");

  try {
    // 1. Project Name
    let projectName = '';
    while (true) {
      projectName = await askQuestion("👉 What is your project name? (default: my-awesome-project) ");
      projectName = projectName.trim() || 'my-awesome-project';
      if (validateProjectName(projectName)) {
        break;
      }
      console.log("❌ Invalid project name. Only letters, numbers, hyphens, underscores, and dots are allowed.");
    }

    // 2. Package Manager Selection
    console.log("\n📦 Which package manager do you prefer?");
    console.log("1. npm");
    console.log("2. pnpm");
    console.log("3. bun");
    let pmChoice = await askQuestion("Your Choice (1, 2 or 3) [default: 1]: ");
    pmChoice = pmChoice.trim();

    let pm = "npm";
    if (pmChoice === "2") {
      pm = "pnpm";
    } else if (pmChoice === "3") {
      pm = "bun";
    } else if (pmChoice !== "1" && pmChoice !== "") {
      console.log("⚠️  Invalid choice. Defaulting to npm.");
    }

    if (!checkPackageManager(pm)) {
      console.error(`\n❌ Error: ${pm} is not installed or not available in your PATH.`);
      return;
    }

    const root = path.join(process.cwd(), projectName);

    if (fs.existsSync(root)) {
      console.log(`❌ Error: Directory "${projectName}" already exists.`);
      return;
    }

    console.log(`\n✨ Starting setup with ${pm}...`);

    // Dossiers
    const folders = [
      'src/features/auth/components',
      'src/features/auth/hooks',
      'src/features/auth/services',
      'src/components',
      'src/lib',
      'src/hooks',
      'src/utils',
      'public'
    ];

    // Optimization: Parallelize directory creation to prevent blocking
    await fs.promises.mkdir(root, { recursive: true });
    await Promise.all(folders.map(folder => fs.promises.mkdir(path.join(root, folder), { recursive: true })));

    // Fichiers
    const files = {
      'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`,

      'src/lib/firebase.config.js': `import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
if (!apiKey || apiKey === "VOTRE_API_KEY") {
  throw new Error("Firebase API Key is missing. Please check your .env file.");
}

const firebaseConfig = {
  apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);`,

      'src/App.jsx': `import React from 'react';

function App() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse motion-reduce:animate-none"></div>
      <div className="relative z-10 text-center px-4">
        <span role="img" aria-label="Rocket launching" className="inline-block animate-bounce motion-reduce:animate-none mb-6 text-6xl">🚀</span>
        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent forced-colors:text-[CanvasText]">
          ${projectName}
        </h1>
        <p className="text-slate-200 text-lg md:text-xl max-w-md mx-auto mb-8">
          React + Tailwind V4 + Firebase Stack operational via ${pm}.
        </p>
        <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white inline-block">
          Feature-Based Architecture ready
        </div>
      </div>
    </main>
  );
}

export default App;`,

      'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,

      'src/index.css': `@import "tailwindcss";`,

      'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="App created with My Stack Generator" /><meta name="theme-color" content="#0f172a" /><title>${projectName}</title></head><body class="bg-slate-900"><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`,

      '.gitignore': `node_modules\ndist\n.env\n.env.local\n.DS_Store`,

      '.ai-stack-instructions.md': `# Technical Stack\n\n- React + Vite\n- Tailwind V4\n- Firebase\n- Package Manager: ${pm}`,

      'package.json': JSON.stringify({
        name: sanitizePackageName(projectName),
        private: true,
        version: "1.0.0",
        type: "module",
        engines: { "node": ">=18.0.0" },
        scripts: { "dev": "vite", "build": "vite build", "preview": "vite preview" },
        dependencies: {
          "react": "^19.0.0",
          "react-dom": "^19.0.0",
          "firebase": "^12.8.0"
        },
        devDependencies: {
          "vite": "^6.0.0",
          "@vitejs/plugin-react": "^5.0.0",
          "tailwindcss": "^4.0.0",
          "@tailwindcss/vite": "^4.0.0"
        }
      }, null, 2)
    };

    // Optimization: Write files in parallel to improve performance
    await Promise.all(Object.entries(files).map(([filePath, content]) =>
      fs.promises.writeFile(path.join(root, filePath), content)
    ));

    const install = await askQuestion(`\n📦 Do you want to install dependencies with ${pm}? (Y/n) `);
    if (install.trim().toLowerCase() !== 'n') {
      console.log(`\n📦 Installing dependencies with ${pm}...`);
      await new Promise((resolve, reject) => {
        const child = spawn(pm, ['install'], { cwd: root, stdio: 'inherit', shell: true });
        child.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`Installation failed with code ${code}`));
        });
        child.on('error', reject);
      });
      console.log(`\n✅ Done! Run:\n  cd ${projectName}\n  ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}`);
    } else {
      console.log(`\n✅ Done! Run:\n  cd ${projectName}\n  ${pm} install\n  ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}`);
    }

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    // Optional: cleanup
    // if (fs.existsSync(root)) { fs.rmSync(root, { recursive: true, force: true }); }
  } finally {
    rl.close();
  }
}

main();