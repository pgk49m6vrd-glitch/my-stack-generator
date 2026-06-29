import { validateProjectName } from './index.js';
import assert from 'assert';

const testCases = [
  { name: 'my-project', expected: true },
  { name: 'my_project', expected: true },
  { name: 'my.project', expected: true },
  { name: 'project-123', expected: true },
  { name: '', expected: false },
  { name: ' ', expected: false },
  { name: '.', expected: false },
  { name: '..', expected: false },
  { name: 'con', expected: false },
  { name: 'prn.txt', expected: false },
  { name: 'my project ', expected: false },
  { name: 'my project.', expected: false },
  { name: 'my:project', expected: false },
  { name: 'my[project]', expected: false },
  { name: 'my\\project', expected: false },
  { name: '../outside', expected: false },
  { name: '/absolute', expected: false },
  { name: 'a'.repeat(215), expected: false },
];

console.log('🧪 Running Project Name Validation Tests...\n');

let passed = 0;
let failed = 0;

testCases.forEach(({ name, expected }) => {
  try {
    const result = validateProjectName(name);
    assert.strictEqual(result, expected, `Test failed for "${name}": expected ${expected}, got ${result}`);
    console.log(`✅ Passed: "${name}"`);
    passed++;
  } catch (error) {
    console.error(`❌ Failed: "${name}"`);
    console.error(`   ${error.message}`);
    failed++;
  }
});

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All project name validation tests passed!');
}

// CLI Argument Validation tests
import { initCommand } from './src/commands/init.js';

console.log('\n🧪 Running CLI Input Validation Tests...\n');

let passedCli = 0;
let failedCli = 0;

// Override process.exit and console.error to intercept validation failures
const originalExit = process.exit;
const originalError = console.error;
const originalLog = console.log;

async function testCliValidation(pm, backend, features, expectedToFail) {
  if (expectedToFail === undefined) {
    expectedToFail = features;
    features = undefined;
  }
  let exited = false;
  let errorLogged = false;

  process.exit = (code) => {
    if (code === 1) exited = true;
    throw new Error('Process exited');
  };

  // suppress logs during test
  console.log = () => {};
  console.error = (msg) => {
    if (msg && msg.includes('Security Error')) {
      errorLogged = true;
    }
  };

  try {
    await initCommand({ yes: true, pm, backend, features, dryRun: true });
  } catch(e) {
    // Ignore Process exited error or other errors
  } finally {
    process.exit = originalExit;
    console.error = originalError;
    console.log = originalLog;
  }

  const actuallyFailed = exited && errorLogged;
  const passedResult = expectedToFail ? actuallyFailed : !actuallyFailed;

  const testName = `pm=${pm}, backend=${backend}, features=${features}`;
  if (passedResult) {
    console.log(`✅ Passed: ${testName} (Expected failure: ${expectedToFail})`);
    passedCli++;
  } else {
    console.error(`❌ Failed: ${testName} (Expected failure: ${expectedToFail}, actually failed: ${actuallyFailed})`);
    failedCli++;
  }
}

async function runCliTests() {
  await testCliValidation('npm', 'firebase', false);
  await testCliValidation('pnpm', 'supabase', false);
  await testCliValidation('bun', 'firebase', false);
  await testCliValidation('yarn', 'firebase', true);
  await testCliValidation('npm', 'mongodb', true);
  await testCliValidation('invalid;rm -rf /', 'firebase', true);
  await testCliValidation('npm', 'firebase', 'router,zustand', false);
  await testCliValidation('npm', 'firebase', 'router,invalid', true);

  console.log(`\n📊 CLI Summary: ${passedCli} passed, ${failedCli} failed.`);

  if (failedCli > 0) {
    process.exit(1);
  }
}

runCliTests();
