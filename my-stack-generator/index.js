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

async function main() {
  console.log("\n--- 🚀 GÉNÉRATEUR STACK V5 ---");

  // 1. Nom du projet
  let projectName = await askQuestion("👉 Quel est le nom de votre projet ? ");
  projectName = projectName.trim() || 'mon-projet-anime';

  // 2. Choix du gestionnaire de paquets
  console.log("\n📦 Quel gestionnaire de paquets préférez-vous ?");
  console.log("1. npm");
  console.log("2. pnpm");
  console.log("3. bun");
  let pmChoice = await askQuestion("Votre choix (1, 2 ou 3) [1] : ");
  
  let pm = "npm";
  let installCmd = "install";
  if (pmChoice === "2") { pm = "pnpm"; installCmd = "add"; }
  if (pmChoice === "3") { pm = "bun"; installCmd = "add"; }

  const root = path.join(process.cwd(), projectName);

  if (fs.existsSync(root)) {
    console.log(`❌ Erreur : Le dossier "${projectName}" existe déjà.`);
    rl.close();
    return;
  }

  console.log(`\n✨ Décollage imminent avec ${pm}...`);

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

  fs.mkdirSync(root, { recursive: true });
  folders.forEach(folder => fs.mkdirSync(path.join(root, folder), { recursive: true }));

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
          Stack React + Tailwind V4 + Firebase opérationnelle via ${pm}.
        </p>
        <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white inline-block">
          Architecture Feature-Based prête
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

    'index.html': `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${projectName}</title></head><body class="bg-slate-900"><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`,

    '.gitignore': `node_modules\ndist\n.env\n.env.local\n.DS_Store`,

    '.ai-stack-instructions.md': `# Technical Stack\n\n- React + Vite\n- Tailwind V4\n- Firebase\n- Package Manager: ${pm}`
  };

  Object.entries(files).forEach(([filePath, content]) => {
    fs.writeFileSync(path.join(root, filePath), content);
  });

  const projectPkgJson = {
    name: projectName,
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: { "dev": "vite", "build": "vite build", "preview": "vite preview" }
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(projectPkgJson, null, 2));

  console.log(`\n📦 Installation des dépendances avec ${pm}...`);
  try {
    // Installation des dépendances normales
    execSync(`${pm} ${installCmd} react react-dom firebase`, { cwd: root, stdio: 'inherit' });
    
    // Installation des devDependencies
    const devFlag = pm === "npm" ? "--save-dev" : "-D";
    execSync(`${pm} ${installCmd} ${devFlag} vite @vitejs/plugin-react tailwindcss @tailwindcss/vite`, { 
      cwd: root, 
      stdio: 'inherit' 
    });

    console.log(`\n✅ Terminé ! Lancez :\n  cd ${projectName}\n  ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}`);
  } catch (error) {
    console.error("\n❌ Erreur lors de l'installation.");
  }
  rl.close();
}

main();