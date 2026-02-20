import { parsePackageManagerChoice, parseBackendChoice } from './index.js';

console.log('🧪 Running Selection Logic Tests...');

let passed = 0;
let failed = 0;

function runTest(name, actual, expected) {
  if (actual === expected) {
    console.log(`✅ Passed: "${name}" -> ${expected}`);
    passed++;
  } else {
    console.error(`❌ Failed: "${name}". Expected ${expected}, got ${actual}`);
    failed++;
  }
}

// Package Manager Tests
runTest('PM: 1', parsePackageManagerChoice('1'), 'npm');
runTest('PM: 1 (space)', parsePackageManagerChoice(' 1 '), 'npm');
runTest('PM: Empty', parsePackageManagerChoice(''), 'npm');
runTest('PM: npm', parsePackageManagerChoice('npm'), 'npm');
runTest('PM: NPM', parsePackageManagerChoice('NPM'), 'npm');
runTest('PM: 2', parsePackageManagerChoice('2'), 'pnpm');
runTest('PM: pnpm', parsePackageManagerChoice('pnpm'), 'pnpm');
runTest('PM: 3', parsePackageManagerChoice('3'), 'bun');
runTest('PM: bun', parsePackageManagerChoice('bun'), 'bun');
runTest('PM: Invalid', parsePackageManagerChoice('yarn'), null);
runTest('PM: 4', parsePackageManagerChoice('4'), null);

// Backend Tests
runTest('Backend: 1', parseBackendChoice('1'), 'firebase');
runTest('Backend: Empty', parseBackendChoice(''), 'firebase');
runTest('Backend: firebase', parseBackendChoice('firebase'), 'firebase');
runTest('Backend: Firebase', parseBackendChoice('Firebase'), 'firebase');
runTest('Backend: 2', parseBackendChoice('2'), 'supabase');
runTest('Backend: supabase', parseBackendChoice('supabase'), 'supabase');
runTest('Backend: Invalid', parseBackendChoice('aws'), null);

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All selection tests passed!');
}
