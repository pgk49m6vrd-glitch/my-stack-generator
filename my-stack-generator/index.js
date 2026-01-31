#! /usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import prompts from 'prompts';
import { generateFileTemplates } from './templates.js';

function validateProjectName(name) {
  if (!name || name.trim() === '') return 'Project name is required';
  if (name.includes('/') || name.includes('\\') || name.includes('..')) {
    return "Invalid project name. Please avoid '/', '\\' and '..'";
  }
  return true;
}

function sanitizePackageName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

async function main() {
  console.log("\n--- 🚀 STACK GENERATOR V5 ---");

  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: '👉 What is your project name?',
      initial: 'my-awesome-project',
      validate: validateProjectName
    },
    {
      type: 'select',
      name: 'pm',
      message: '📦 Which package manager do you prefer?',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'pnpm', value: 'pnpm' },
        { title: 'bun', value: 'bun' }
      ],
      initial: 0
    }
  ], {
    onCancel: () => {
      console.log('\n❌ Operation cancelled.');
      process.exit(0);
    }
  });

  const projectName = response.projectName.trim();
  const pm = response.pm;

  // Logic to determine install command
  let installCmd = "install";
  if (pm === "pnpm" || pm === "bun") {
    installCmd = "add";
  }

  const root = path.join(process.cwd(), projectName);

  if (fs.existsSync(root)) {
    console.log(`❌ Error: Directory "${projectName}" already exists.`);
    return;
  }

  console.log(`\n✨ Starting setup with ${pm}...`);

  // Folders creation
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

  // Files generation using templates
  const files = generateFileTemplates(projectName, pm);

  // Optimization: Write files in parallel to improve performance
  await Promise.all(Object.entries(files).map(([filePath, content]) =>
    fs.promises.writeFile(path.join(root, filePath), content)
  ));

  const projectPkgJson = {
    name: sanitizePackageName(projectName),
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: { "dev": "vite", "build": "vite build", "preview": "vite preview" }
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(projectPkgJson, null, 2));

  console.log(`\n📦 Installing dependencies with ${pm}...`);
  try {
    // Installing normal dependencies
    execSync(`${pm} ${installCmd} react react-dom firebase`, { cwd: root, stdio: 'inherit' });
    
    // Installing devDependencies
    const devFlag = pm === "npm" ? "--save-dev" : "-D";
    execSync(`${pm} ${installCmd} ${devFlag} vite @vitejs/plugin-react tailwindcss @tailwindcss/vite`, { 
      cwd: root, 
      stdio: 'inherit' 
    });

    console.log(`\n✅ Done! Run:\n  cd ${projectName}\n  ${pm === 'npm' ? 'npm run dev' : pm + ' dev'}`);
  } catch (error) {
    console.error("\n❌ Error during installation.");
  }
}

main();
