import { checkPackageManager } from './index.js';
import assert from 'assert';
import { performance } from 'perf_hooks';

console.log('🧪 Running Package Manager Check Tests...\n');

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Check npm (should exist in this environment)
  try {
    const start = performance.now();
    const result = await checkPackageManager('npm');
    const end = performance.now();
    assert.strictEqual(result, true, 'npm should be installed');
    console.log(`✅ Passed: npm exists (${(end - start).toFixed(2)}ms)`);
    passed++;
  } catch (e) {
    console.error(`❌ Failed: npm check threw error or failed assertion`);
    console.error(e);
    failed++;
  }

  // Test 2: Check non-existent (should fail)
  try {
    const start = performance.now();
    const result = await checkPackageManager('non-existent-pm-xyz-12345');
    const end = performance.now();
    assert.strictEqual(result, false, 'non-existent-pm-xyz-12345 should not be installed');
    console.log(`✅ Passed: non-existent pm correctly identified (${(end - start).toFixed(2)}ms)`);
    passed++;
  } catch (e) {
    console.error(`❌ Failed: non-existent check threw error or failed assertion`);
    console.error(e);
    failed++;
  }

  // Test 3: Parallel Execution Check (Behavioral)
  // We can't easily measure parallel overlap without mocking, but we can ensure multiple checks don't crash
  try {
    const p1 = checkPackageManager('npm');
    const p2 = checkPackageManager('non-existent-pm-xyz-12345');
    const [r1, r2] = await Promise.all([p1, p2]);
    assert.strictEqual(r1, true);
    assert.strictEqual(r2, false);
    console.log(`✅ Passed: Parallel execution works`);
    passed++;
  } catch (e) {
    console.error(`❌ Failed: Parallel execution failed`);
    console.error(e);
    failed++;
  }

  console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
