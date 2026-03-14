import spawn from 'cross-spawn';

const pm = 'npm';

async function measure(name, fn) {
  const start = performance.now();
  await fn();
  console.log(`${name}: ${(performance.now() - start).toFixed(2)}ms`);
}

async function checkVersion() {
  return new Promise((resolve) => {
    const child = spawn(pm, ['--version'], { stdio: 'ignore' });
    child.on('close', (code) => resolve(code === 0));
    child.on('error', () => resolve(false));
  });
}

async function checkCommand() {
  return new Promise((resolve) => {
    // Assuming Linux/Unix for this test environment
    const child = spawn('command', ['-v', pm], { stdio: 'ignore' });
    child.on('close', (code) => resolve(code === 0));
    child.on('error', () => resolve(false));
  });
}

(async () => {
  await measure('npm --version', checkVersion);
  await measure('command -v npm', checkCommand);
})();
