import { spawn } from 'child_process';

const script = `
  import spawn from 'cross-spawn';
  import fs from 'fs';
  import path from 'path';
  import readline from 'readline';
  import { fileURLToPath } from 'url';

  // Dynamic import of heavy modules
  let validatePkgName;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

  async function main() {
    console.log("\\n--- 🚀 MYSTACK GENERATOR V2.0.0 ---");
    let projectName = await askQuestion("👉 What is your project name? ");
    console.log(projectName);
    rl.close();
  }

  main();
`;

import fs from 'fs';
fs.writeFileSync('test_index.js', script);

const start = performance.now();
const child = spawn('node', ['test_index.js'], { cwd: process.cwd() });
child.stdout.once('data', (data) => {
    console.log(`Time to first prompt: ${(performance.now() - start).toFixed(2)}ms`);
    child.kill();
});
