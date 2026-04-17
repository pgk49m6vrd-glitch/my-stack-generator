import { execSync } from 'child_process';
const start = performance.now();
execSync('node test-cli-dynamic.js --help');
const end = performance.now();
console.log(`Dynamic Help time: ${end - start}ms`);
