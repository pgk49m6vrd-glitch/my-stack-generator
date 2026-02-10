import { getProjectNameValidationError } from './index.js';
import assert from 'assert';

const testCases = [
  // Valid names
  { name: 'my-project', expected: null },
  { name: 'project_123', expected: null },
  { name: 'app.v2', expected: null },

  // Empty
  { name: '', expected: "Project name cannot be empty." },
  { name: '   ', expected: "Project name cannot be empty." },

  // Length
  { name: 'a'.repeat(215), expected: "Project name must be 214 characters or fewer." },

  // Dot / DotDot
  { name: '.', expected: "Project name cannot be '.' or '..'." },
  { name: '..', expected: "Project name cannot be '.' or '..'." },

  // Reserved
  { name: 'con', expected: 'Project name "con" is a reserved system filename.' },
  { name: 'prn.txt', expected: 'Project name "prn.txt" is a reserved system filename.' },
  { name: 'aux', expected: 'Project name "aux" is a reserved system filename.' },

  // Ends with space/dot
  { name: 'test ', expected: "Project name cannot end with a space or period." },
  { name: 'test.', expected: "Project name cannot end with a space or period." },

  // Invalid chars
  { name: 'my:project', expected: "Project name contains invalid characters. Use letters, numbers, dashes, underscores, or periods." },
  { name: 'my/project', expected: "Project name contains invalid characters. Use letters, numbers, dashes, underscores, or periods." },
  { name: 'my\\project', expected: "Project name contains invalid characters. Use letters, numbers, dashes, underscores, or periods." },
];

console.log('🧪 Running Project Name Validation Error Tests...\n');

let passed = 0;
let failed = 0;

testCases.forEach(({ name, expected }) => {
  try {
    const result = getProjectNameValidationError(name);
    assert.strictEqual(result, expected, `Test failed for "${name}": expected "${expected}", got "${result}"`);
    console.log(`✅ Passed: "${name}" -> ${expected === null ? 'null (Valid)' : `"${expected}"`}`);
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
