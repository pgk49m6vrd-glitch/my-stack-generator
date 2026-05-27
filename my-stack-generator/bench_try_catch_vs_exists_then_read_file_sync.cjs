const fs = require('fs');

const ITERS = 10000;

function benchExistsThenRead(FILE) {
  const start = performance.now();
  for (let i = 0; i < ITERS; i++) {
    if (fs.existsSync(FILE)) {
      fs.readFileSync(FILE, 'utf-8');
    }
  }
  const end = performance.now();
  console.log(`existsSync + readFileSync: ${(end - start).toFixed(2)}ms`);
}

function benchTryCatchRead(FILE) {
  const start = performance.now();
  for (let i = 0; i < ITERS; i++) {
    try {
      fs.readFileSync(FILE, 'utf-8');
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
    }
  }
  const end = performance.now();
  console.log(`try/catch readFileSync: ${(end - start).toFixed(2)}ms`);
}

function run() {
  const RC_FILE = 'dummy_file.json';
  fs.writeFileSync(RC_FILE, '{}', 'utf-8');
  console.log('--- File Exists ---');
  benchExistsThenRead(RC_FILE);
  benchTryCatchRead(RC_FILE);

  fs.unlinkSync(RC_FILE);
  console.log('\n--- File Missing (Cache Miss) ---');
  benchExistsThenRead(RC_FILE);
  benchTryCatchRead(RC_FILE);
}

run();
