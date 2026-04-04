/**
 * Shared utility functions extracted from the monolithic index.js.
 * Provides project name validation, package name sanitization,
 * package manager availability checking, and cleanup logic.
 */

import fs from 'fs';
import path from 'path';

// ─── Project Name Validation ────────────────────────────────────────

const RESERVED_NAMES = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
const VALID_NAME_REGEX = /^[a-zA-Z0-9_.-]+$/;

export function validateProjectName(name) {
  return getProjectNameValidationError(name) === null;
}

export function getProjectNameValidationError(name) {
  if (!name || name.trim() === '') return "Project name cannot be empty.";
  if (name.length > 214) return "Project name must be 214 characters or fewer.";
  if (name === '.' || name === '..') return 'Project name cannot be "." or "..".';
  if (RESERVED_NAMES.test(name)) return "Project name cannot use reserved names like con, prn, aux, nul, com1, or lpt1.";
  if (name.endsWith(' ') || name.endsWith('.')) return "Project name cannot end with a space or dot.";
  if (!VALID_NAME_REGEX.test(name)) return "Use only letters, numbers, hyphens (-), underscores (_), and dots (.).";
  return null;
}

// ─── Package Name Sanitization ──────────────────────────────────────

export function sanitizePackageName(name, validatePkgName) {
  const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '');
  const validation = validatePkgName(sanitized);
  if (!validation.validForNewPackages) {
    throw new Error(`Invalid package name: "${sanitized}". npm names must be lowercase, URL-friendly, and not reserved.`);
  }
  return sanitized;
}

// ─── Package Manager Checking ───────────────────────────────────────

const pmAvailability = new Map();

export function checkPackageManager(pm, spawn) {
  if (pmAvailability.has(pm)) {
    return pmAvailability.get(pm);
  }

  const userAgent = process.env.npm_config_user_agent || '';
  if (userAgent.startsWith(pm + '/')) {
    const promise = Promise.resolve(true);
    pmAvailability.set(pm, promise);
    return promise;
  }

  const checkPromise = new Promise((resolve) => {
    try {
      if (!/^[a-z0-9-]+$/.test(pm)) return resolve(false);

      const isWin = process.platform === 'win32';
      const cmd = isWin ? 'where' : 'command';
      const args = isWin ? [pm] : ['-v', pm];
      const options = { stdio: 'ignore', shell: !isWin };

      const child = isWin
        ? spawn(cmd, args, options)
        : spawn(`${cmd} ${args.join(' ')}`, [], options);

      const timeout = setTimeout(() => {
        child.kill();
        resolve(false);
      }, 5000);

      child.on('close', (code) => {
        clearTimeout(timeout);
        resolve(code === 0);
      });

      child.on('error', () => {
        clearTimeout(timeout);
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });

  pmAvailability.set(pm, checkPromise);
  return checkPromise;
}

// ─── Cleanup Logic ──────────────────────────────────────────────────

let currentRoot = '';
let currentCleanupMarker = '';
let cachedRealCwd;

export function setCleanupTarget(root, marker) {
  currentRoot = root;
  currentCleanupMarker = marker;
}

export function clearCleanupTarget() {
  currentRoot = '';
  currentCleanupMarker = '';
}

export function cleanup() {
  if (!currentRoot || !fs.existsSync(currentRoot)) return;

  try {
    const realCwd = cachedRealCwd || fs.realpathSync(process.cwd());
    const realRoot = fs.realpathSync(currentRoot);
    const markerPath = currentCleanupMarker || path.join(realRoot, '.mystack-generator.tmp');
    const relative = path.relative(realCwd, realRoot);

    if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(markerPath)) {
      console.warn(`\n⚠️  Skipped unsafe cleanup path: ${currentRoot}`);
      return;
    }

    fs.rmSync(realRoot, { recursive: true, force: true });
    console.log(`\n🧹 Cleaned up: ${realRoot}`);
  } catch (e) {
    // Ignore cleanup errors
  } finally {
    currentRoot = '';
    currentCleanupMarker = '';
  }
}

// ─── Dependency Loading ─────────────────────────────────────────────

let spawn = null;
let validatePkgName = null;

export async function loadDependencies() {
  try {
    // ⚡ Bolt: Parallelize dynamic imports of heavy dependencies
    // to significantly reduce CLI "time to first prompt" latency.
    const [spawnModule, validateModule] = await Promise.all([
      import('cross-spawn'),
      import('validate-npm-package-name')
    ]);
    spawn = spawnModule.default || spawnModule;
    validatePkgName = validateModule.default || validateModule;
  } catch (err) {
    console.error(`\n❌ Error: Failed to load required dependencies.`);
    console.error(`Please ensure dependencies are properly installed by running 'npm install' or 'bun install' in the CLI directory.`);
    console.error(`Details: ${err.message}`);
    process.exit(1);
  }
  return { spawn, validatePkgName };
}

export function getSpawn() { return spawn; }
export function getValidatePkgName() { return validatePkgName; }
