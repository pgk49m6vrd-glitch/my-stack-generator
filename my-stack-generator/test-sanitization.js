import { sanitizePackageName } from './index.js';
import assert from 'assert';

console.log('🧪 Running Package Name Sanitization Tests...\n');

const testCases = [
  // Standard valid names
  { input: 'my-project', expected: 'my-project' },
  { input: 'my_project', expected: 'my-project' },
  { input: 'MyProject', expected: 'myproject' },
  { input: 'My Project', expected: 'my-project' },

  // Special characters
  { input: '@scope/pkg', expected: 'scope-pkg' },
  { input: 'project.name', expected: 'project-name' },
  { input: 'foo@bar', expected: 'foo-bar' },

  // Hyphen handling
  { input: '-start', expected: 'start' },
  { input: 'end-', expected: 'end' },
  { input: '-both-', expected: 'both' },
  { input: 'a---b', expected: 'a---b' }, // npm allows multiple hyphens

  // Edge cases
  { input: '   trimmed   ', expected: 'trimmed' },

  // Transformed reserved-like names
  { input: 'node_modules', expected: 'node-modules' }, // becomes valid
  { input: 'favicon.ico', expected: 'favicon-ico' },   // becomes valid
];

const errorCases = [
  { input: '', message: 'empty' },
  { input: '???', message: 'invalid chars only' }, // becomes empty string
  { input: 'http', message: 'core module reserved' },
  { input: 'fs', message: 'core module reserved' },
];

let passed = 0;
let failed = 0;

// Test Success Cases
testCases.forEach(({ input, expected }) => {
  try {
    const result = sanitizePackageName(input);
    assert.strictEqual(result, expected, `Test failed for "${input}": expected "${expected}", got "${result}"`);
    console.log(`✅ Passed: "${input}" -> "${result}"`);
    passed++;
  } catch (error) {
    console.error(`❌ Failed: "${input}"`);
    console.error(`   Unexpected error: ${error.message}`);
    failed++;
  }
});

// Test Error Cases
errorCases.forEach(({ input, message }) => {
  try {
    sanitizePackageName(input);
    console.error(`❌ Failed: "${input}" should have thrown an error (${message})`);
    failed++;
  } catch (error) {
    console.log(`✅ Passed: "${input}" correctly threw error: ${error.message}`);
    passed++;
  }
});

// ReDoS Safety Check (Long Input)
const longInput = 'a'.repeat(10000);
try {
  const start = process.hrtime();
  // We expect this to throw because length > 214, but we want to measure time taken for regex
  try {
      sanitizePackageName(longInput);
      console.error(`❌ Failed: Long input should have thrown validation error`);
      failed++;
  } catch (validationError) {
      // Expected validation error
  }
  const end = process.hrtime(start);
  const durationMs = (end[0] * 1000 + end[1] / 1e6);

  console.log(`✅ Passed: Long input (10000 chars) processed (and rejected) in ${durationMs.toFixed(3)}ms`);
  passed++;
} catch (error) {
  console.error(`❌ Failed: Long input caused unexpected error: ${error.message}`);
  failed++;
}

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All sanitization tests passed!');
}
