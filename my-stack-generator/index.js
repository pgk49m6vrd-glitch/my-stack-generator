#! /usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { getTemplates } from './templates.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("\n--- 🚀 GÉNÉRATEUR STACK V5 ---");

  // 1. Nom du projet
  let projectName = await askQuestion("👉 What is your project name?");
  projectName = projectName.trim() || 'mon-projet-anime';

  // 2. Choix du gestionnaire de paquets
  console.log("\n📦 Which package manager do you prefer?");
  console.log("1. npm");
  console.log("2. pnpm");
  console.log("3. bun");
  const pmChoice = await askQuestion("Your Choice (1, 2 or 3) : ");
  
  const pmConfig = {
    '1': { pm: 'npm', installCmd: 'install' },
    '2': { pm: 'pnpm', installCmd: 'add' },
    '3': { pm: 'bun', installCmd: 'add' }
  };
  const { pm, installCmd } = pmConfig[pmChoice] || pmConfig['1'];

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
  const files = getTemplates(projectName, pm);

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
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(projectPkgJson, null, 2) + '\n');

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
  } catch {
    console.error("\n❌ Erreur lors de l'installation.");
  }
  rl.close();
}

main();
