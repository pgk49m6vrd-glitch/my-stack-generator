import { validateProjectName, checkPackageManager } from './index.js';

async function runTests() {
  console.log('🧪 Running Project Name Validation Tests...\n');

  const tests = [
    { input: 'my-project', expected: true },
    { input: 'my_project', expected: true },
    { input: 'my.project', expected: true },
    { input: 'project-123', expected: true },
    { input: '', expected: false },
    { input: ' ', expected: false },
    { input: '.', expected: false },
    { input: '..', expected: false },
    { input: 'con', expected: false },
    { input: 'prn.txt', expected: false },
    { input: 'my project ', expected: false },
    { input: 'my project.', expected: false },
    { input: 'my:project', expected: false },
    { input: 'my[project]', expected: false },
    { input: 'my\\project', expected: false },
    { input: '../outside', expected: false },
    { input: '/absolute', expected: false },
    { input: 'a'.repeat(215), expected: false },
  ];

  let passed = 0;
  let failed = 0;

  for (const { input, expected } of tests) {
    const result = validateProjectName(input);
    if (result === expected) {
      console.log(`✅ Passed: "${input}"`);
      passed++;
    } else {
      console.error(`❌ Failed: "${input}" (Expected ${expected}, got ${result})`);
      failed++;
    }
  }

  console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('✨ All tests passed!');
  }
}

runTests();
