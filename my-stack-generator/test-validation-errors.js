import { getProjectNameValidationError } from './index.js';
import assert from 'assert';

const testCases = [
  // Valid cases
  { name: 'my-project', expected: null },
  { name: 'my_project', expected: null },

  // Invalid cases with specific messages
  {
    name: '',
    expected: 'Project name cannot be empty.'
  },
  {
    name: 'a'.repeat(215),
    expected: 'Project name must be less than 214 characters.'
  },
  {
    name: '.',
    expected: 'Project name cannot be "." or "..".'
  },
  {
    name: '..',
    expected: 'Project name cannot be "." or "..".'
  },
  {
    name: 'con',
    expected: 'Project name "con" is a reserved Windows filename.'
  },
  {
    name: 'prn.txt',
    expected: 'Project name "prn.txt" is a reserved Windows filename.'
  },
  {
    name: 'my project ',
    expected: 'Project name cannot end with a space or a period.'
  },
  {
    name: 'my project.',
    expected: 'Project name cannot end with a space or a period.'
  },
  {
    name: 'my project',
    expected: 'Project name can only contain letters, numbers, hyphens, underscores, and periods.'
  },
  {
    name: 'my:project',
    expected: 'Project name can only contain letters, numbers, hyphens, underscores, and periods.'
  },
  {
    name: '/absolute',
    expected: 'Project name can only contain letters, numbers, hyphens, underscores, and periods.'
  },
];

console.log('🧪 Running Project Name Error Message Validation Tests...\n');

let passed = 0;
let failed = 0;

testCases.forEach(({ name, expected }) => {
  try {
    const result = getProjectNameValidationError(name);
    // For expected string messages, use strictEqual
    if (expected === null) {
        assert.strictEqual(result, null, `Expected null for "${name}", got "${result}"`);
    } else {
        assert.strictEqual(result, expected, `Expected "${expected}" for "${name}", got "${result}"`);
    }

    console.log(`✅ Passed: "${name}" -> ${result === null ? 'Valid' : result}`);
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
  console.log('\n✨ All tests passed!');
  process.exit(0);
}
