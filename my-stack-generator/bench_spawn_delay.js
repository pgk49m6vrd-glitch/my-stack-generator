import spawn from 'cross-spawn';

console.time('3 spawns');
const p1 = spawn('command', ['-v', 'npm'], { stdio: 'ignore', shell: true });
const p2 = spawn('command', ['-v', 'pnpm'], { stdio: 'ignore', shell: true });
const p3 = spawn('command', ['-v', 'bun'], { stdio: 'ignore', shell: true });
console.timeEnd('3 spawns');
