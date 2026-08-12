/**
 * Configuration / Presets system (F6).
 * Reads/writes ~/.mystackrc.json via cosmiconfig.
 * Provides built-in presets and merges config layers: preset → rcfile → CLI flags → prompts.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

const RC_FILE = path.join(os.homedir(), '.mystackrc.json');

// ─── Built-in Presets ───────────────────────────────────────────────

const PRESETS = {
  default: {
    pm: 'npm',
    backend: 'firebase',
    typescript: false,
    features: [],
  },
  enterprise: {
    pm: 'pnpm',
    backend: 'firebase',
    typescript: true,
    features: ['router', 'zustand', 'eslint', 'vitest', 'auth'],
  },
  minimal: {
    pm: 'npm',
    backend: 'firebase',
    typescript: false,
    features: [],
  },
  fullstack: {
    pm: 'pnpm',
    backend: 'supabase',
    typescript: true,
    features: ['router', 'zustand', 'eslint', 'vitest', 'auth', 'shadcn'],
  },
};

export { PRESETS };

// ⚡ Bolt Optimization: Cache the lazily loaded explorer instance to avoid ~35-50ms initialization and module resolution overhead on CLI startup.
let explorer = null;

async function getExplorer() {
  if (!explorer) {
    const { cosmiconfig } = await import('cosmiconfig');
    explorer = cosmiconfig('mystack');
  }
  return explorer;
}

/**
 * Loads the user's saved presets from ~/.mystackrc.json.
 */
export async function loadUserConfig() {
  try {
    const exp = await getExplorer();
    const result = await exp.search();
    if (result && result.config) {
      return result.config;
    }
  } catch {
    // Config not found or malformed — ignore
  }
  return {};
}

/**
 * Saves the current configuration as a named preset.
 */
export async function savePreset(name, config) {
  let existing = {};
  try {
    // ⚡ Bolt Optimization: Use try/catch around readFile instead of existsSync to avoid double I/O calls (stat then read), reducing file reading time.
    existing = JSON.parse(await fs.promises.readFile(RC_FILE, 'utf-8'));
  } catch (err) {
    if (err.code !== 'ENOENT') {
      existing = {};
    }
  }

  if (!existing.presets) existing.presets = {};
  existing.presets[name] = {
    pm: config.pm,
    backend: config.backend,
    typescript: config.typescript,
    features: config.features,
  };

  await fs.promises.writeFile(RC_FILE, JSON.stringify(existing, null, 2));
  console.log(`\n💾 Preset "${name}" saved to ${RC_FILE}`);
}

/**
 * Resolves a preset by name (built-in or user-saved).
 */
export async function resolvePreset(name) {
  // Check built-in presets first
  if (PRESETS[name]) return { ...PRESETS[name] };

  // Check user presets
  const userConfig = await loadUserConfig();
  if (userConfig.presets && userConfig.presets[name]) {
    return { ...userConfig.presets[name] };
  }

  throw new Error(`Unknown preset: "${name}". Available: ${Object.keys(PRESETS).join(', ')}`);
}

/**
 * Lists all available presets (built-in + user-saved).
 */
export async function listPresets() {
  const userConfig = await loadUserConfig();
  const userPresets = userConfig.presets ? Object.keys(userConfig.presets) : [];

  console.log('\n📋 Available presets:\n');
  console.log('  Built-in:');
  Object.entries(PRESETS).forEach(([name, config]) => {
    const features = config.features.length > 0 ? config.features.join(', ') : 'none';
    console.log(`    ${name} — ${config.pm}, ${config.backend}, TS: ${config.typescript}, features: ${features}`);
  });

  if (userPresets.length > 0) {
    console.log('\n  User-saved:');
    userPresets.forEach(name => {
      const c = userConfig.presets[name];
      const features = c.features?.length > 0 ? c.features.join(', ') : 'none';
      console.log(`    ${name} — ${c.pm}, ${c.backend}, TS: ${c.typescript}, features: ${features}`);
    });
  }
}

/**
 * Merges configuration layers: preset → CLI flags → (prompts are applied last by caller).
 */
export function mergeConfig(preset, cliFlags) {
  const merged = { ...preset };

  if (cliFlags.name) merged.projectName = cliFlags.name;
  if (cliFlags.pm) merged.pm = cliFlags.pm;
  if (cliFlags.backend) merged.backend = cliFlags.backend;
  if (cliFlags.typescript !== undefined) merged.typescript = cliFlags.typescript;
  if (cliFlags.features) {
    merged.features = cliFlags.features.split(',').map(s => s.trim()).filter(Boolean);
  }

  return merged;
}
