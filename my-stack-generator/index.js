#! /usr/bin/env node

import { execSync } from 'child_process';
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
  return !name.includes('/') && !name.includes('\\') && !name.includes('..');
}

function sanitizePackageName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

async function main() {
  console.log("\n--- 🚀 STACK GENERATOR V5 ---");

  // 1. Project Name
  let projectName = '';
  while (true) {
    projectName = await askQuestion("👉 What is your project name? ");
    projectName = projectName.trim() || 'my-awesome-project';
    if (validateProjectName(projectName)) {
      break;
    }
    console.log("❌ Invalid project name. Please avoid '/', '\\' and '..'");
  }

  // 2. Package Manager Selection
  console.log("\n📦 Which package manager do you prefer?");
  console.log("1. npm");
  console.log("2. pnpm");
  console.log("3. bun");
  let pmChoice = await askQuestion("Your Choice (1, 2 or 3) : ");
  pmChoice = pmChoice.trim();
  
  let pm = "npm";
  if (pmChoice === "2") {
    pm = "pnpm";
  } else if (pmChoice === "3") {
    pm = "bun";
  } else if (pmChoice !== "1") {
    console.log("⚠️  Invalid choice. Defaulting to npm.");
  }

  const root = path.join(process.cwd(), projectName);

  if (fs.existsSync(root)) {
    console.log(`❌ Error: Directory "${projectName}" already exists.`);
    rl.close();
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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "VOTRE_API_KEY",
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="relative z-10 text-center px-4">
        <div className="inline-block animate-bounce mb-6 text-6xl">🚀</div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          ${projectName}
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-md mx-auto mb-8">
          React + Tailwind V4 + Firebase Stack operational via ${pm}.
        </p>
        <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white inline-block">
          Feature-Based Architecture ready
        </div>
      </div>
    </div>
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

    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${projectName}</title></head><body class="bg-slate-900"><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`,

    '.gitignore': `node_modules\ndist\n.env\n.env.local\n.DS_Store`,

    '.ai-stack-instructions.md': `# Technical Stack\n\n- React + Vite\n- Tailwind V4\n- Firebase\n- Package Manager: ${pm}`
  };

  // Optimization: Write files in parallel to improve performance
  await Promise.all(Object.entries(files).map(([filePath, content]) =>
    fs.promises.writeFile(path.join(root, filePath), content)
  ));

  // Optimization: Pre-fill package.json with deps to allow single install command
  const projectPkgJson = {
    name: sanitizePackageName(projectName),
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: { "dev": "vite", "build": "vite build", "preview": "vite preview" },
    dependencies: {
      "react": "latest",
      "react-dom": "latest",
      "firebase": "latest"
    },
    devDependencies: {
      "vite": "latest",
      "@vitejs/plugin-react": "latest",
      "tailwindcss": "latest",
      "@tailwindcss/vite": "latest"
    }
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(projectPkgJson, null, 2));

  console.log(`\n📦 Installing dependencies with ${pm}...`);
  try {
    // Optimization: Single installation step reduces overhead
    execSync(`${pm} install`, { cwd: root, stdio: 'inherit' });

    console.log(`\n✅ Done! Run:\n  cd ${projectName}\n  ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}`);
  } catch (error) {
    console.error("\n❌ Error during installation.");
  }
  rl.close();
}

main();