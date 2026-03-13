import fs from 'fs';

let original = fs.readFileSync('index.js', 'utf8');
let modified = original
  .replace("import spawn from 'cross-spawn';", "")
  .replace("import validatePkgName from 'validate-npm-package-name';", "")
  .replace("const child = isWin", "const { default: spawn } = await import('cross-spawn');\n      const child = isWin")
  .replace("const child = spawn(pm", "const { default: spawn } = await import('cross-spawn');\n          const child = spawn(pm")
  .replace("function sanitizePackageName", "async function sanitizePackageName")
  .replace("const validation = validatePkgName(sanitized);", "const { default: validatePkgName } = await import('validate-npm-package-name');\n  const validation = validatePkgName(sanitized);")
  .replace("name: sanitizePackageName(projectName),", "name: await sanitizePackageName(projectName),");

fs.writeFileSync('index_lazy.js', modified);
