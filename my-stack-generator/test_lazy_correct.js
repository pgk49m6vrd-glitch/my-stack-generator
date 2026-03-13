import fs from 'fs';

let original = fs.readFileSync('index.js', 'utf8');

// Replace top level imports
original = original.replace("import spawn from 'cross-spawn';", "");
original = original.replace("import validatePkgName from 'validate-npm-package-name';", "");

// Make checkPackageManager async
original = original.replace("export function checkPackageManager(pm) {", "export async function checkPackageManager(pm) {");

// Inside checkPackageManager, await cross-spawn import
original = original.replace(
  "const child = isWin\n        ? spawn(cmd, args, options)\n        : spawn(`${cmd} ${args.join(' ')}`, [], options);",
  "const { default: spawn } = await import('cross-spawn');\n      const child = isWin\n        ? spawn(cmd, args, options)\n        : spawn(`${cmd} ${args.join(' ')}`, [], options);"
);

// We need checkPromise to be async inside checkPackageManager
original = original.replace("const checkPromise = new Promise((resolve) => {", "const checkPromise = new Promise(async (resolve) => {");

// Make sanitizePackageName async
original = original.replace("function sanitizePackageName(name) {", "async function sanitizePackageName(name) {");

// await validate-npm-package-name inside sanitizePackageName
original = original.replace(
  "const validation = validatePkgName(sanitized);",
  "const { default: validatePkgName } = await import('validate-npm-package-name');\n  const validation = validatePkgName(sanitized);"
);

// await sanitizePackageName in main
original = original.replace(
  'name: sanitizePackageName(projectName),',
  'name: await sanitizePackageName(projectName),'
);

// spawn inside main, inside a promise
original = original.replace(
  "await new Promise((resolve, reject) => {\n          const args = ['install'];",
  "await new Promise(async (resolve, reject) => {\n          const args = ['install'];"
);

original = original.replace(
  "const child = spawn(pm, args, { cwd: root, stdio: 'inherit' });",
  "const { default: spawn } = await import('cross-spawn');\n          const child = spawn(pm, args, { cwd: root, stdio: 'inherit' });"
);

fs.writeFileSync('index_lazy_correct.js', original);
