/**
 * Interactive prompts module.
 * Handles all user input via readline, returning a unified ProjectConfig object.
 */

import readline from 'readline';
import { getProjectNameValidationError, checkPackageManager, getSpawn } from './utils.js';

const askQuestion = (rl, query) => new Promise((resolve) => rl.question(query, resolve));

/**
 * Available features for interactive selection.
 */
const AVAILABLE_FEATURES = [
  { key: '1', name: 'router', label: 'React Router (routing)' },
  { key: '2', name: 'zustand', label: 'Zustand (state management)' },
  { key: '3', name: 'eslint', label: 'ESLint + Prettier (linting)' },
  { key: '4', name: 'vitest', label: 'Vitest (testing)' },
  { key: '5', name: 'auth', label: 'Authentication (login form + context)' },
  { key: '6', name: 'shadcn', label: 'shadcn/ui (accessible components)' },
];

export { AVAILABLE_FEATURES };

/**
 * Runs all interactive prompts and returns the project configuration.
 * @param {readline.Interface} rl
 * @returns {Promise<object>} ProjectConfig
 */
export async function runPrompts(rl) {
  const spawn = getSpawn();

  // 1. Project Name
  let projectName = '';
  while (true) {
    projectName = await askQuestion(rl, "👉 What is your project name? (default: my-awesome-project) ");
    projectName = projectName.trim() || 'my-awesome-project';
    const error = getProjectNameValidationError(projectName);
    if (error) {
      console.log(`❌ ${error}`);
      continue;
    }
    break;
  }

  // Pre-check package managers
  const [npmAvailable, pnpmAvailable, bunAvailable] = await Promise.all([
    checkPackageManager('npm', spawn),
    checkPackageManager('pnpm', spawn),
    checkPackageManager('bun', spawn),
  ]);

  // 2. Package Manager
  let pm = '';
  while (true) {
    console.log("\n📦 Which package manager do you prefer?");
    console.log(`1. npm${npmAvailable ? '' : ' (not installed)'}`);
    console.log(`2. pnpm${pnpmAvailable ? '' : ' (not installed)'}`);
    console.log(`3. bun${bunAvailable ? '' : ' (not installed)'}`);
    let choice = await askQuestion(rl, "Your Choice (1, 2 or 3) [default: 1]: ");
    choice = choice.trim();

    if (choice === '1' || choice === '') pm = 'npm';
    else if (choice === '2') pm = 'pnpm';
    else if (choice === '3') pm = 'bun';

    if (pm) {
      const isAvailable = await checkPackageManager(pm, spawn);
      if (!isAvailable) {
        console.error(`\n❌ Error: ${pm} is not installed or not available in your PATH.`);
        pm = '';
        continue;
      }
      break;
    } else {
      console.log("⚠️  Invalid choice. Please select 1, 2, or 3.");
    }
  }

  // 3. Backend
  let backend = '';
  while (true) {
    console.log("\n🔥 Which back-end do you prefer?");
    console.log("1. Firebase");
    console.log("2. Supabase");
    let choice = await askQuestion(rl, "Your Choice (1 or 2) [default: 1]: ");
    choice = choice.trim();

    if (choice === '1' || choice === '') { backend = 'firebase'; break; }
    else if (choice === '2') { backend = 'supabase'; break; }
    else { console.log("⚠️  Invalid choice. Please select 1 or 2."); }
  }

  // 4. TypeScript (F3)
  let typescript = false;
  const tsChoice = await askQuestion(rl, "\n📘 Do you want to use TypeScript? (y/N) ");
  typescript = tsChoice.trim().toLowerCase() === 'y';

  // 5. Features (F4)
  console.log("\n🧩 Select optional features (comma-separated numbers, or press Enter to skip):");
  AVAILABLE_FEATURES.forEach(f => console.log(`  ${f.key}. ${f.label}`));
  const featureChoice = await askQuestion(rl, "Your choices (e.g., 1,3,4): ");
  const selectedFeatures = featureChoice
    .trim()
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(key => AVAILABLE_FEATURES.find(f => f.key === key))
    .filter(Boolean)
    .map(f => f.name);

  // 6. Install dependencies?
  const installChoice = await askQuestion(rl, `\n📦 Do you want to install dependencies with ${pm}? (Y/n) `);
  const shouldInstall = installChoice.trim().toLowerCase() !== 'n';

  return {
    projectName,
    pm,
    backend,
    typescript,
    features: selectedFeatures,
    shouldInstall,
  };
}
