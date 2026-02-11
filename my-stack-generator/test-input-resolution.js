import { resolvePackageManager, resolveBackend } from './index.js';
import assert from 'assert';

console.log('🧪 Running Input Resolution Tests...\n');

let passed = 0;
let failed = 0;

function runTest(description, actual, expected) {
  try {
    assert.strictEqual(actual, expected);
    console.log(`✅ Passed: ${description}`);
    passed++;
  } catch (e) {
    console.error(`❌ Failed: ${description}`);
    console.error(`   Expected: ${expected}`);
    console.error(`   Got:      ${actual}`);
    failed++;
  }
}

// Package Manager Tests
runTest('PM: "1" -> npm', resolvePackageManager('1'), 'npm');
runTest('PM: "2" -> pnpm', resolvePackageManager('2'), 'pnpm');
runTest('PM: "3" -> bun', resolvePackageManager('3'), 'bun');
runTest('PM: "" -> npm (default)', resolvePackageManager(''), 'npm');
runTest('PM: "  1  " -> npm (trim)', resolvePackageManager('  1  '), 'npm');
runTest('PM: "npm" -> npm', resolvePackageManager('npm'), 'npm');
runTest('PM: "pnpm" -> pnpm', resolvePackageManager('pnpm'), 'pnpm');
runTest('PM: "bun" -> bun', resolvePackageManager('bun'), 'bun');
runTest('PM: "NPM" -> npm (case insensitive)', resolvePackageManager('NPM'), 'npm');
runTest('PM: "PnPm" -> pnpm (case insensitive)', resolvePackageManager('PnPm'), 'pnpm');
runTest('PM: "yarn" -> null (invalid)', resolvePackageManager('yarn'), null);
runTest('PM: "4" -> null (invalid)', resolvePackageManager('4'), null);

console.log('');

// Backend Tests
runTest('Backend: "1" -> firebase', resolveBackend('1'), 'firebase');
runTest('Backend: "2" -> supabase', resolveBackend('2'), 'supabase');
runTest('Backend: "" -> firebase (default)', resolveBackend(''), 'firebase');
runTest('Backend: "firebase" -> firebase', resolveBackend('firebase'), 'firebase');
runTest('Backend: "supabase" -> supabase', resolveBackend('supabase'), 'supabase');
runTest('Backend: "FireBase" -> firebase (case insensitive)', resolveBackend('FireBase'), 'firebase');
runTest('Backend: "aws" -> null (invalid)', resolveBackend('aws'), null);
runTest('Backend: "3" -> null (invalid)', resolveBackend('3'), null);

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All tests passed!');
  process.exit(0);
}
