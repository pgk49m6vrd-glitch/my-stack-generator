import { resolvePackageManager, resolveBackend } from './index.js';
import assert from 'assert';

console.log('🧪 Running Input Resolution Tests...\n');

const pmTestCases = [
  { input: '1', expected: 'npm' },
  { input: '2', expected: 'pnpm' },
  { input: '3', expected: 'bun' },
  { input: '', expected: 'npm' }, // Default
  { input: 'npm', expected: 'npm' },
  { input: 'NPM', expected: 'npm' },
  { input: 'pnpm', expected: 'pnpm' },
  { input: 'bun', expected: 'bun' },
  { input: 'yarn', expected: null },
  { input: '4', expected: null },
  { input: '  npm  ', expected: 'npm' },
];

let pmPassed = 0;
let pmFailed = 0;

console.log('📦 Package Manager Resolution:');
pmTestCases.forEach(({ input, expected }) => {
  try {
    const result = resolvePackageManager(input);
    assert.strictEqual(result, expected, `Failed for input "${input}": expected ${expected}, got ${result}`);
    // console.log(`  ✅ Passed: "${input}" -> ${expected}`);
    pmPassed++;
  } catch (error) {
    console.error(`  ❌ Failed: "${input}"`);
    console.error(`     ${error.message}`);
    pmFailed++;
  }
});

const backendTestCases = [
  { input: '1', expected: 'firebase' },
  { input: '2', expected: 'supabase' },
  { input: '', expected: 'firebase' }, // Default
  { input: 'firebase', expected: 'firebase' },
  { input: 'FIREBASE', expected: 'firebase' },
  { input: 'supabase', expected: 'supabase' },
  { input: 'aws', expected: null },
  { input: '3', expected: null },
  { input: '  Supabase  ', expected: 'supabase' },
];

let backendPassed = 0;
let backendFailed = 0;

console.log('\n🔥 Backend Resolution:');
backendTestCases.forEach(({ input, expected }) => {
  try {
    const result = resolveBackend(input);
    assert.strictEqual(result, expected, `Failed for input "${input}": expected ${expected}, got ${result}`);
    // console.log(`  ✅ Passed: "${input}" -> ${expected}`);
    backendPassed++;
  } catch (error) {
    console.error(`  ❌ Failed: "${input}"`);
    console.error(`     ${error.message}`);
    backendFailed++;
  }
});

const totalPassed = pmPassed + backendPassed;
const totalFailed = pmFailed + backendFailed;

console.log(`\n📊 Summary: ${totalPassed} passed, ${totalFailed} failed.`);

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All tests passed!');
  process.exit(0);
}
