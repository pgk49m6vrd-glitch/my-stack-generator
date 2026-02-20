import { sanitizePackageName } from './index.js';
import assert from 'assert';

console.log('🧪 Running Package Name Sanitization Tests...\n');

const testCases = [
  // basic cases
  { input: 'my-project', expected: 'my-project' },
  { input: 'MyProject', expected: 'myproject' },
  { input: 'My Project', expected: 'my-project' },
  { input: '  spaced  ', expected: 'spaced' },

  // special characters -> hyphens
  { input: 'my_project', expected: 'my-project' },
  { input: 'my.project', expected: 'my-project' },
  { input: 'my/project', expected: 'my-project' },
  { input: '@scope/pkg', expected: 'scope-pkg' }, // sanitize removes @ and /

  // hyphens handling
  { input: '-start', expected: 'start' },
  { input: 'end-', expected: 'end' },
  { input: '---many---', expected: 'many' },

  // consecutive hyphens
  { input: 'a--b', expected: 'a--b' },
  { input: 'a_b', expected: 'a-b' },

  // reserved names (sanitized)
  { input: 'node_modules', expected: 'node-modules' },
  { input: 'favicon.ico', expected: 'favicon-ico' },
];

const errorCases = [
  { input: '', message: /Invalid package name/ },
  { input: '   ', message: /Invalid package name/ },
  { input: '.', message: /Invalid package name/ }, // becomes empty string
];

let passed = 0;
let failed = 0;

// Positive tests
testCases.forEach(({ input, expected }) => {
  try {
    const result = sanitizePackageName(input);
    assert.strictEqual(result, expected, `Test failed for "${input}": expected "${expected}", got "${result}"`);
    console.log(`✅ Passed: "${input}" -> "${result}"`);
    passed++;
  } catch (error) {
    console.error(`❌ Failed: "${input}"`);
    console.error(`   ${error.message}`);
    failed++;
  }
});

// Negative tests (should throw)
errorCases.forEach(({ input, message }) => {
  try {
    sanitizePackageName(input);
    console.error(`❌ Failed: "${input}" should have thrown error but didn't.`);
    failed++;
  } catch (error) {
    if (message.test(error.message)) {
      console.log(`✅ Passed: "${input}" threw expected error.`);
      passed++;
    } else {
      console.error(`❌ Failed: "${input}" threw unexpected error: ${error.message}`);
      failed++;
    }
  }
});

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All tests passed!');
  process.exit(0);
}
