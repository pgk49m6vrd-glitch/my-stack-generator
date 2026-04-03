const { spawn } = require('child_process');

console.log('Starting my-stack-generator...');
const p = spawn('node', ['index.js'], { cwd: 'my-stack-generator', stdio: ['pipe', 'inherit', 'inherit'] });

const answers = [
  'test-project-123\n', // Project name
  '1\n',                // React
  '1\n',                // JavaScript
  '2\n',                // Supabase
  '\n',                 // Vite + Tailwind V4
  'a\n',                // Select all features
  'n\n'                 // Install dependencies? (No, to run manually)
];

let currentStep = 0;

setTimeout(() => {
  const answerInterval = setInterval(() => {
    if (currentStep < answers.length) {
      console.log(`Writing answer: ${answers[currentStep].trim()}`);
      p.stdin.write(answers[currentStep]);
      currentStep++;
    } else {
      clearInterval(answerInterval);
    }
  }, 1500); // Wait 1.5 seconds between inputs
}, 2000); // Wait 2 seconds before starting inputs

p.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
});
