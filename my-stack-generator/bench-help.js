import { execSync } from 'child_process';
const start = performance.now();
execSync('node index.js --help');
const end = performance.now();
console.log(`Help command time: ${end - start}ms`);
