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
  // These are valid according to regex (no path separators) and should not be blocked
  { name: '...', expected: false }, // Ends with dot, so invalid on Windows
  { name: '..foo', expected: true },
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
  console.log('\n✨ All tests passed!');
  process.exit(0);
}
