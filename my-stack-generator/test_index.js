
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
    console.log("\n--- 🚀 MYSTACK GENERATOR V2.0.0 ---");
    let projectName = await askQuestion("👉 What is your project name? ");
    console.log(projectName);
    rl.close();
  }

  main();
