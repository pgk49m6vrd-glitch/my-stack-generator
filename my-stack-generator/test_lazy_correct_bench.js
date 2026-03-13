import { spawn } from 'child_process';

const startOriginal = performance.now();
const childOriginal = spawn('node', ['index.js'], { cwd: process.cwd() });
childOriginal.stdout.once('data', (data) => {
    console.log(`Original time to first prompt: ${(performance.now() - startOriginal).toFixed(2)}ms`);
    childOriginal.kill();

    const startLazy = performance.now();
    const childLazy = spawn('node', ['index_lazy_correct.js'], { cwd: process.cwd() });
    childLazy.stdout.once('data', (data) => {
        console.log(`Lazy time to first prompt: ${(performance.now() - startLazy).toFixed(2)}ms`);
        childLazy.kill();
    });
});
