/**
 * Handlebars template precompiler.
 *
 * Compiles all .hbs template files into JavaScript functions for faster
 * production rendering. The compiled templates are stored in templates/compiled/
 * and used automatically by the template engine when available.
 *
 * Usage: node src/precompile.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const COMPILED_DIR = path.join(TEMPLATES_DIR, 'compiled');

/**
 * Recursively find all .hbs files in a directory.
 *
 * Optimization: Avoid array spread recursion overhead by passing results array
 * down as an accumulator. This reduces GC pressure and intermediate array allocations.
 */
function findHbsFiles(dir, basePath = '', results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Skip the compiled directory
      if (entry.name === 'compiled') continue;
      findHbsFiles(fullPath, relativePath, results);
    } else if (entry.name.endsWith('.hbs')) {
      results.push({ fullPath, relativePath });
    }
  }

  return results;
}

/**
 * Main precompilation routine.
 */
async function precompile() {
  console.log('🔨 Precompiling Handlebars templates...\n');

  const hbsFiles = findHbsFiles(TEMPLATES_DIR);

  if (hbsFiles.length === 0) {
    console.log('No .hbs files found.');
    return;
  }

  // Ensure compiled directory exists
  fs.mkdirSync(COMPILED_DIR, { recursive: true });

  let compiled = 0;
  let failed = 0;

  // ⚡ Bolt Optimization: Batch concurrent directory creations to prevent redundant I/O calls
  const dirs = new Set();
  const tasks = [];

  for (const { fullPath, relativePath } of hbsFiles) {
    const outputRelative = relativePath.endsWith('.hbs') ? relativePath.slice(0, -4) + '.cjs' : relativePath;
    const outputPath = path.join(COMPILED_DIR, outputRelative);
    dirs.add(path.dirname(outputPath));
    tasks.push({ fullPath, relativePath, outputPath, outputRelative });
  }

  const dirPromises = [];
  for (const dir of dirs) {
    dirPromises.push(fs.promises.mkdir(dir, { recursive: true }));
  }
  await Promise.all(dirPromises);

  const filePromises = [];
  for (const task of tasks) {
    filePromises.push((async () => {
      try {
        const source = await fs.promises.readFile(task.fullPath, 'utf-8');
        const precompiled = Handlebars.precompile(source, { noEscape: true });

        // Export the precompiled template spec as a CommonJS module
        await fs.promises.writeFile(task.outputPath, `module.exports = ${precompiled};`);

        console.log(`  ✅ ${task.relativePath} → compiled/${task.outputRelative}`);
        compiled++;
      } catch (e) {
        console.error(`  ❌ ${task.relativePath}: ${e.message}`);
        failed++;
      }
    })());
  }

  await Promise.all(filePromises);

  console.log(`\n📊 Done: ${compiled} compiled, ${failed} failed out of ${hbsFiles.length} total.`);
}

precompile();
