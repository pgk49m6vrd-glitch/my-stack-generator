/**
 * `mystack init` command (F2 — also the default command).
 * Supports both interactive and non-interactive modes.
 */

import readline from 'readline';
import path from 'path';
import { loadDependencies, getProjectNameValidationError } from '../utils.js';
import { runPrompts } from '../prompts.js';
import { generateProject } from '../generator.js';
import { resolvePreset, mergeConfig, PRESETS } from '../config.js';

/**
 * Executes the init command.
 * @param {object} options - Commander options
 */
export async function initCommand(options = {}) {
  await loadDependencies();

  // Node version check
  const nodeVersionMajor = parseInt(process.versions.node.split('.')[0], 10);
  if (nodeVersionMajor < 18) {
    console.error(`\n❌ Error: Node.js version 18 or higher is required. You are using ${process.versions.node}.`);
    process.exit(1);
  }

  console.log("\n--- 🚀 MYSTACK GENERATOR V3.0.0 ---");

  let config;

  if (options.yes) {
    // Non-interactive mode (F2)
    const preset = options.preset ? await resolvePreset(options.preset) : { ...PRESETS.default };
    config = mergeConfig(preset, options);

    // Apply defaults for missing values
    config.projectName = config.projectName || config.name || 'my-awesome-project';
    config.pm = config.pm || 'npm';
    config.backend = config.backend || 'firebase';
    config.typescript = config.typescript || false;
    config.features = config.features || [];
    config.shouldInstall = !options.dryRun; // Don't install on dry-run

    // Parse features if passed as string
    if (typeof config.features === 'string') {
      config.features = config.features.split(',').map(s => s.trim()).filter(Boolean);
    }

    // Validate project name
    const nameError = getProjectNameValidationError(config.projectName);
    if (nameError) {
      console.error(`\n❌ ${nameError}`);
      process.exit(1);
    }

    console.log(`\n📋 Configuration:`);
    console.log(`  Name:       ${config.projectName}`);
    console.log(`  PM:         ${config.pm}`);
    console.log(`  Backend:    ${config.backend}`);
    console.log(`  TypeScript: ${config.typescript ? 'Yes' : 'No'}`);
    console.log(`  Features:   ${config.features.length > 0 ? config.features.join(', ') : 'none'}`);

  } else {
    // Interactive mode
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    try {
      config = await runPrompts(rl);
    } finally {
      rl.close();
    }
  }

  // Generate the project
  try {
    await generateProject(config, { dryRun: options.dryRun || false });
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}
