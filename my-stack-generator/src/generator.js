/**
 * Project generator orchestrator.
 * Creates the project directory, renders templates, writes files, and installs dependencies.
 */

import fs from 'fs';
import path from 'path';
import { renderAllTemplates } from './template-engine.js';
import { sanitizePackageName, setCleanupTarget, clearCleanupTarget, cleanup, getSpawn, getValidatePkgName } from './utils.js';

/**
 * Generates a project based on the provided configuration.
 * @param {object} config
 * @param {object} options - { dryRun: boolean }
 */
export async function generateProject(config, options = {}) {
  const { dryRun = false } = options;
  const spawn = getSpawn();
  const validatePkgName = getValidatePkgName();

  const root = path.join(process.cwd(), config.projectName);

  // Validate project directory doesn't exist
  if (fs.existsSync(root)) {
    throw new Error(`Directory "${config.projectName}" already exists.`);
  }

  // Sanitize package name
  config.packageName = sanitizePackageName(config.projectName, validatePkgName);

  // Render all templates
  const files = renderAllTemplates(config);

  // Dry run: just display what would be created
  if (dryRun) {
    console.log('\n📋 Dry run — the following files would be created:\n');
    const sortedPaths = Array.from(files.keys()).sort();
    sortedPaths.forEach(filePath => {
      console.log(`  📄 ${config.projectName}/${filePath}`);
    });
    console.log(`\n📁 Total: ${sortedPaths.length} files`);
    console.log('  (No files were actually written)');
    return;
  }

  console.log(`\n✨ Starting setup with ${config.pm} and ${config.backend}...`);

  // Create root directory
  try {
    await fs.promises.mkdir(root);
  } catch (e) {
    if (e.code === 'EEXIST') {
      throw new Error(`Directory "${config.projectName}" already exists.`);
    }
    throw e;
  }

  // Set up cleanup markers
  const cleanupMarker = path.join(root, '.mystack-generator.tmp');
  setCleanupTarget(root, cleanupMarker);
  await fs.promises.writeFile(cleanupMarker, 'Temporary scaffolding marker.\n', { flag: 'wx' });

  // Collect all directories we need to create
  const dirs = new Set();
  for (const filePath of files.keys()) {
    const dir = path.dirname(filePath);
    if (dir && dir !== '.') {
      dirs.add(dir);
    }
  }

  // Create directories
  await Promise.all(
    Array.from(dirs).map(dir =>
      fs.promises.mkdir(path.join(root, dir), { recursive: true })
    )
  );

  // Write all files concurrently
  await Promise.all(
    Array.from(files.entries()).map(([filePath, content]) =>
      fs.promises.writeFile(path.join(root, filePath), content)
    )
  );

  // Also create standard empty directories for the project structure
  const emptyDirs = [
    'src/components',
    'src/hooks',
    'src/utils',
  ];
  await Promise.all(emptyDirs.map(dir =>
    fs.promises.mkdir(path.join(root, dir), { recursive: true })
  ));

  // Install dependencies
  if (config.shouldInstall) {
    console.log(`\n📦 Installing dependencies with ${config.pm}...`);
    try {
      await new Promise((resolve, reject) => {
        const args = ['install'];
        if (config.pm === 'npm') args.push('--no-fund');
        const child = spawn(config.pm, args, { cwd: root, stdio: 'inherit' });
        child.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error(`Installation failed with code ${code}`));
        });
        child.on('error', reject);
      });

      // Post-install: shadcn/ui init if selected
      if (config.features.includes('shadcn')) {
        console.log('\n🎨 Initializing shadcn/ui...');
        await new Promise((resolve, reject) => {
          const child = spawn('npx', ['-y', 'shadcn@latest', 'init', '-y'], { cwd: root, stdio: 'inherit' });
          child.on('close', (code) => {
            if (code === 0) resolve();
            else {
              console.warn('⚠️  shadcn/ui init failed, you can run it manually later.');
              resolve(); // Don't fail the whole generation
            }
          });
          child.on('error', () => {
            console.warn('⚠️  shadcn/ui init failed, you can run it manually later.');
            resolve();
          });
        });
      }

      await fs.promises.unlink(cleanupMarker).catch(() => {});
      clearCleanupTarget();

      printSuccessMessage(config);
    } catch (e) {
      console.error(`\n❌ Installation failed. Cleaning up...`);
      cleanup();
      console.error(`Project folder removed due to installation failure.`);
      throw e;
    }
  } else {
    await fs.promises.unlink(cleanupMarker).catch(() => {});
    clearCleanupTarget();
    printSuccessMessageNoInstall(config);
  }
}

function printSuccessMessage(config) {
  const devCmd = config.pm === 'npm' ? 'npm run dev' : `${config.pm} dev`;
  console.log(`\n✅ Done! Project created in ./${config.projectName}`);
  console.log(`\n🚀 Get started:`);
  console.log(`  cd ${config.projectName}`);
  console.log(`  ${devCmd}`);
  console.log(`\n💡 Don't forget to configure your .env file based on .env.example`);

  if (config.typescript) console.log('📘 TypeScript is enabled');
  if (config.features.length > 0) {
    console.log(`🧩 Features: ${config.features.join(', ')}`);
  }
}

function printSuccessMessageNoInstall(config) {
  const devCmd = config.pm === 'npm' ? 'npm run dev' : `${config.pm} dev`;
  console.log(`\n✅ Done! Project created in ./${config.projectName}`);
  console.log(`\n🚀 Next steps:`);
  console.log(`  cd ${config.projectName}`);
  console.log(`  ${config.pm} install`);
  console.log(`  ${devCmd}`);
  console.log(`\n💡 Don't forget to configure your .env file based on .env.example`);
}
