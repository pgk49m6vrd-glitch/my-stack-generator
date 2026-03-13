import { spawn } from 'child_process';
import fs from 'fs';

let original = fs.readFileSync('index.js', 'utf8');
let modified = original
  .replace("import spawn from 'cross-spawn';", "// removed spawn")
  .replace("import validatePkgName from 'validate-npm-package-name';", "// removed validatePkgName")
  .replace(/spawn\(/g, 'null(')
  .replace(/validatePkgName\(/g, 'null(');

fs.writeFileSync('index_bench_temp.js', modified);

const start = performance.now();
const child = spawn('node', ['index_bench_temp.js'], { cwd: process.cwd() });
child.stdout.once('data', (data) => {
    console.log(`Time to first prompt: ${(performance.now() - start).toFixed(2)}ms`);
    child.kill();
    fs.unlinkSync('index_bench_temp.js');
});
