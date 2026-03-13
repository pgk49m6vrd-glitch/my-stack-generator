import { spawn } from 'child_process';
const start = performance.now();
const child = spawn('node', ['index_lazy.js'], { cwd: process.cwd() });
child.stdout.once('data', (data) => {
    console.log(`Time to first prompt: ${(performance.now() - start).toFixed(2)}ms`);
    child.kill();
});
