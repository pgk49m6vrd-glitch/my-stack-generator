#!/usr/bin/env node

/**
 * CLI entry point for my-stack-generator.
 * Uses commander to define commands and parse arguments.
 */

import { Command } from 'commander';



const program = new Command();

program
  .name('mystack')
  .description('🚀 My Stack Generator — Scaffold React + Vite + Tailwind v4 projects')
  .version('3.0.0');

// ── Default command (init) ──
program
  .command('init', { isDefault: true })
  .description('Create a new project (interactive by default)')
  .option('-y, --yes', 'Non-interactive mode with defaults', false)
  .option('-n, --name <name>', 'Project name')
  .option('--pm <pm>', 'Package manager (npm, pnpm, bun)')
  .option('-b, --backend <backend>', 'Backend (firebase, supabase)')
  .option('--typescript', 'Enable TypeScript', false)
  .option('-f, --features <features>', 'Comma-separated features (router,zustand,eslint,vitest,auth,shadcn)')
  .option('--preset <preset>', 'Use a named preset (default, enterprise, minimal, fullstack)')
  .option('--dry-run', 'Show what would be generated without writing files', false)
  .action(async (options) => {
    // ⚡ Bolt Optimization: Dynamically import heavy subcommand modules only when their
    // specific execution paths are triggered to avoid synchronous top-level load penalties.
    const { initCommand } = await import('./commands/init.js');
    await initCommand(options);
  });

// ── Presets command ──
program
  .command('presets')
  .description('List available presets')
  .action(async () => {
    // ⚡ Bolt Optimization: Dynamically import the presets module to reduce startup time.
    const { listPresets } = await import('./config.js');
    await listPresets();
  });

program.parse();
