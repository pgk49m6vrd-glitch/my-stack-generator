import { spawn } from 'child_process';
const start = performance.now();
const child = spawn('node', ['./index.js']);
child.stdout.once('data', (data) => {
  const end = performance.now();
  console.log(`Time to first prompt: ${(end - start).toFixed(2)}ms`);
  child.kill();
});
