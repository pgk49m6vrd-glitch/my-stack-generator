import fs from 'fs';
import { performance } from 'perf_hooks';

const ITERS = 10000;

function runSync(files) {
    const start = performance.now();
    for (let i = 0; i < ITERS; i++) {
        for (const file of files) {
            fs.writeFileSync(`temp_${file}`, 'test data');
        }
    }
    const end = performance.now();
    console.log(`Sync write: ${(end - start).toFixed(2)}ms`);
}

async function runAsync(files) {
    const start = performance.now();
    for (let i = 0; i < ITERS; i++) {
        await Promise.all(files.map(file => fs.promises.writeFile(`temp_async_${file}`, 'test data')));
    }
    const end = performance.now();
    console.log(`Async write: ${(end - start).toFixed(2)}ms`);
}

const files = Array.from({length: 10}, (_, i) => i.toString());

async function run() {
    runSync(files);
    await runAsync(files);

    // clean
    for (const file of files) {
        fs.unlinkSync(`temp_${file}`);
        fs.unlinkSync(`temp_async_${file}`);
    }
}
run();
