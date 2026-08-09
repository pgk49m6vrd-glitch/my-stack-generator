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

  // ⚡ Bolt Optimization: Use Promise.all to process template compilation concurrently instead of blocking synchronously, reducing overall precompilation time.
  await Promise.all(hbsFiles.map(async ({ fullPath, relativePath }) => {
    try {
      const source = await fs.promises.readFile(fullPath, 'utf-8');
      const precompiled = Handlebars.precompile(source, { noEscape: true });

      // ⚡ Bolt Optimization: Output precompiled templates as CommonJS modules (.cjs) for native and secure loading via createRequire
      const outputRelative = relativePath.replace(/\.hbs$/, '.cjs');
      const outputPath = path.join(COMPILED_DIR, outputRelative);

      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.promises.writeFile(outputPath, `module.exports = ${precompiled};`);

      console.log(`  ✅ ${relativePath} → compiled/${outputRelative}`);
      compiled++;
    } catch (e) {
      console.error(`  ❌ ${relativePath}: ${e.message}`);
      failed++;
    }
  }));

  console.log(`\n📊 Done: ${compiled} compiled, ${failed} failed out of ${hbsFiles.length} total.`);
}

precompile();
