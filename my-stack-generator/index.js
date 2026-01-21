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
  console.log("\n--- 🛠️  GÉNÉRATEUR DE STACK REACT V4 (FIXED) ---");

  let projectName = await askQuestion("👉 Quel est le nom de votre projet ? ");
  projectName = projectName.trim() || 'mon-projet-anime';

  const root = path.join(process.cwd(), projectName);

  if (fs.existsSync(root)) {
    console.log(`❌ Erreur : Le dossier "${projectName}" existe déjà.`);
    rl.close();
    return;
  }

  console.log(`\n🚀 Création du projet en cours...`);

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
    'src/lib/firebase.config.js': `import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_MESSAGING_ID",
  appId: "VOTRE_APP_ID"
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
          Stack React + Tailwind V4 + Firebase opérationnelle.
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

    // CORRECTIF POSTCSS POUR TAILWIND V4
    'postcss.config.js': `export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}`,

    // CORRECTIF CSS POUR TAILWIND V4
    'src/index.css': `@import "tailwindcss";`,

    'index.html': `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${projectName}</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`,

    '.ai-stack-instructions.md': `# Technical Stack & Project Architecture\n\n- React, Vite, Tailwind V4, Firebase.\n- Structure: Feature-Based (src/features).`
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

  console.log("📦 Installation des dépendances (V4)...");
  try {
    // AJOUT DE @tailwindcss/postcss ICI
    execSync(`npm install vite @vitejs/plugin-react react react-dom firebase tailwindcss @tailwindcss/postcss postcss autoprefixer`, { 
      cwd: root, 
      stdio: 'inherit' 
    });
    console.log(`\n✅ Terminé ! Lancez :\n  cd ${projectName}\n  npm run dev`);
  } catch (error) {
    console.error("\n❌ Erreur installation.");
  }
  rl.close();
}

main();