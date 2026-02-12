import { resolvePackageManager, resolveBackend, shouldInstallDependencies } from './index.js';
import assert from 'assert';

console.log('🧪 Running Input Resolution Tests...\n');

let passed = 0;
let failed = 0;

function runTest(description, actual, expected) {
  try {
    assert.strictEqual(actual, expected);
    console.log(`✅ Passed: ${description} -> ${actual}`);
    passed++;
  } catch (e) {
    console.error(`❌ Failed: ${description}`);
    console.error(`   Expected: ${expected}, Got: ${actual}`);
    failed++;
  }
}

// 1. Package Manager Tests
console.log('\n--- Package Manager Tests ---');
runTest('Input "1"', resolvePackageManager('1'), 'npm');
runTest('Input "npm"', resolvePackageManager('npm'), 'npm');
runTest('Input "NPM"', resolvePackageManager('NPM'), 'npm');
runTest('Input "" (default)', resolvePackageManager(''), 'npm');
runTest('Input "2"', resolvePackageManager('2'), 'pnpm');
runTest('Input "pnpm"', resolvePackageManager('pnpm'), 'pnpm');
runTest('Input "PNPM"', resolvePackageManager('PNPM'), 'pnpm');
runTest('Input "3"', resolvePackageManager('3'), 'bun');
runTest('Input "bun"', resolvePackageManager('bun'), 'bun');
runTest('Input "BUN"', resolvePackageManager('BUN'), 'bun');
runTest('Input "yarn" (invalid)', resolvePackageManager('yarn'), null);
runTest('Input "4" (invalid)', resolvePackageManager('4'), null);

// 2. Backend Tests
console.log('\n--- Backend Tests ---');
runTest('Input "1"', resolveBackend('1'), 'firebase');
runTest('Input "firebase"', resolveBackend('firebase'), 'firebase');
runTest('Input "FIREBASE"', resolveBackend('FIREBASE'), 'firebase');
runTest('Input "" (default)', resolveBackend(''), 'firebase');
runTest('Input "2"', resolveBackend('2'), 'supabase');
runTest('Input "supabase"', resolveBackend('supabase'), 'supabase');
runTest('Input "SUPABASE"', resolveBackend('SUPABASE'), 'supabase');
runTest('Input "aws" (invalid)', resolveBackend('aws'), null);

// 3. Dependency Installation Tests
console.log('\n--- Dependency Installation Tests ---');
runTest('Input "y"', shouldInstallDependencies('y'), true);
runTest('Input "Y"', shouldInstallDependencies('Y'), true);
runTest('Input "yes"', shouldInstallDependencies('yes'), true);
runTest('Input "" (default)', shouldInstallDependencies(''), true);
runTest('Input "n"', shouldInstallDependencies('n'), false);
runTest('Input "N"', shouldInstallDependencies('N'), false);
runTest('Input "no"', shouldInstallDependencies('no'), false);
runTest('Input "NO"', shouldInstallDependencies('NO'), false);
runTest('Input "nah" (trap avoidance)', shouldInstallDependencies('nah'), true); // "nah" is not "n" or "no", so defaults to yes (safe default?)
// Wait, "nah" failing to install might be safer if the user meant NO.
// But current logic is "install unless strictly n/no".
// My fix was strictly for "no". "nah" is ambiguous but usually means no.
// For now, I only claimed to fix "no".

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All input resolution tests passed!');
  process.exit(0);
}
