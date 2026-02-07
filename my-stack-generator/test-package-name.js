import { sanitizePackageName } from './index.js';
import assert from 'assert';
import { builtinModules } from 'module';

const testCases = [
  // Valid names
  { input: 'my-project', expected: 'my-project' },
  { input: 'MyProject', expected: 'myproject' },
  { input: '  my-project  ', expected: 'my-project' },
  { input: 'my.project', expected: 'my-project' }, // Sanitized
  { input: 'my_project', expected: 'my-project' }, // Sanitized
  { input: 'my/project', expected: 'my-project' }, // Sanitized
  { input: '@scope/pkg', expected: 'scope-pkg' }, // Sanitized (stripped leading dash)
  { input: '---test---', expected: 'test' }, // Trimmed dashes

  // Reserved names (Sanitized versions are valid)
  { input: 'node_modules', expected: 'node-modules' }, // _ becomes -
  { input: 'favicon.ico', expected: 'favicon-ico' }, // . becomes -

  // Explicitly checking if we pass "node_modules" directly (e.g. if sanitization didn't change it)
  // But our sanitization replaces _ with -.
  // So we can't easily test the "Reserved package name" error for node_modules unless we bypass sanitization
  // or if we input something that sanitizes TO node_modules (impossible since _ is replaced).
  // But wait, if I input 'node-modules', it stays 'node-modules'.
  // If I input 'node_modules', it becomes 'node-modules'.
  // The only way to trigger the reserved check is if the input IS 'node_modules' after sanitization.
  // But 'node_modules' contains _, which is removed.
  // So effectively 'node_modules' check is dead code?
  // No, if I change the regex to allow _.
  // But currently regex disallows _.

  // Builtins (should throw)
  { input: 'fs', error: /Reserved package name/ },
  { input: 'http', error: /Reserved package name/ },
  { input: 'path', error: /Reserved package name/ },

  // Empty (should throw)
  { input: '', error: /Package name cannot be empty/ },
  { input: '   ', error: /Package name cannot be empty/ },
  { input: '---', error: /Package name cannot be empty/ }, // Becomes empty string

  // Length (should throw)
  { input: 'a'.repeat(215), error: /Package name too long/ },
];

console.log('🧪 Running Package Name Sanitization Tests...\n');

let passed = 0;
let failed = 0;

for (const { input, expected, error } of testCases) {
  try {
    const result = sanitizePackageName(input);
    if (error) {
      console.error(`❌ Failed: "${input}" (Expected error but got "${result}")`);
      failed++;
    } else {
      assert.strictEqual(result, expected, `Expected "${expected}" for input "${input}", but got "${result}"`);
      console.log(`✅ Passed: "${input}" -> "${result}"`);
      passed++;
    }
  } catch (err) {
    if (error) {
      if (error.test(err.message)) {
        console.log(`✅ Passed: "${input}" -> Error: ${err.message}`);
        passed++;
      } else {
        console.error(`❌ Failed: "${input}" (Expected error matching ${error}, got "${err.message}")`);
        failed++;
      }
    } else {
      console.error(`❌ Failed: "${input}" (Unexpected error: ${err.message})`);
      failed++;
    }
  }
}

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All tests passed!');
  process.exit(0);
}
