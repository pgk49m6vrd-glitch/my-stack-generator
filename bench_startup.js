console.time('startup');
import('./my-stack-generator/index.js').then(() => {
  console.timeEnd('startup');
  process.exit(0);
});
