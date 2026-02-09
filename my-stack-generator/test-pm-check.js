
import { checkPackageManager } from './index.js';
import assert from 'assert';

console.log('🧪 Running Package Manager Check Tests...\n');

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Check npm (should be available)
  try {
    const start = performance.now();
    const isNpmAvailable = await checkPackageManager('npm');
    const end = performance.now();
    assert.strictEqual(isNpmAvailable, true, 'npm should be available');
    console.log(`✅ Passed: npm check (${(end - start).toFixed(2)}ms)`);
    passed++;
  } catch (error) {
    console.error(`❌ Failed: npm check`);
    console.error(`   ${error.message}`);
    failed++;
  }

  // Test 2: Check invalid package manager
  try {
    const start = performance.now();
    const isInvalidAvailable = await checkPackageManager('invalid-pm-xyz');
    const end = performance.now();
    assert.strictEqual(isInvalidAvailable, false, 'invalid-pm-xyz should not be available');
    console.log(`✅ Passed: invalid pm check (${(end - start).toFixed(2)}ms)`);
    passed++;
  } catch (error) {
    console.error(`❌ Failed: invalid pm check`);
    console.error(`   ${error.message}`);
    failed++;
  }

  // Test 3: Parallel Execution
  try {
    const start = performance.now();
    const checks = [
        checkPackageManager('npm'),
        checkPackageManager('pnpm'), // might not be installed but runs
        checkPackageManager('bun')   // might not be installed but runs
    ];
    await Promise.all(checks);
    const end = performance.now();
    console.log(`✅ Passed: Parallel execution completed in ${(end - start).toFixed(2)}ms`);
    passed++;
  } catch (error) {
    console.error(`❌ Failed: Parallel execution`);
    console.error(`   ${error.message}`);
    failed++;
  }

  console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

  if (failed > 0) process.exit(1);
  else process.exit(0);
}

runTests();
