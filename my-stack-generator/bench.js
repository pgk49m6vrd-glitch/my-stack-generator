const start = performance.now();
import('./src/cli.js').then(() => {
  const end = performance.now();
  console.log(`Startup time: ${end - start}ms`);
  process.exit(0);
});
