import { execSync } from 'child_process';
const start = performance.now();
execSync('node src/cli.js --help', { stdio: 'ignore' });
const end = performance.now();
console.log(end - start);
