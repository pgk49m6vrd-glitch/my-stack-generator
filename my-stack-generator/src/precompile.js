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
 */
function findHbsFiles(dir, basePath = '') {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Skip the compiled directory
      if (entry.name === 'compiled') continue;
      results.push(...findHbsFiles(fullPath, relativePath));
    } else if (entry.name.endsWith('.hbs')) {
      results.push({ fullPath, relativePath });
    }
  }

  return results;
}

/**
 * Main precompilation routine.
 */
function precompile() {
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

  for (const { fullPath, relativePath } of hbsFiles) {
    try {
      const source = fs.readFileSync(fullPath, 'utf-8');
      const precompiled = Handlebars.precompile(source, { noEscape: true });

      // Output path mirrors the template path but with .js extension
      const outputRelative = relativePath.replace(/\.hbs$/, '.js');
      const outputPath = path.join(COMPILED_DIR, outputRelative);

      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, precompiled);

      console.log(`  ✅ ${relativePath} → compiled/${outputRelative}`);
      compiled++;
    } catch (e) {
      console.error(`  ❌ ${relativePath}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Done: ${compiled} compiled, ${failed} failed out of ${hbsFiles.length} total.`);
}

precompile();
