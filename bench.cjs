const { cosmiconfig } = require('cosmiconfig');
console.time('Instantiate inside loop');
for (let i = 0; i < 100; i++) {
  const explorer = cosmiconfig('mystack');
}
console.timeEnd('Instantiate inside loop');

console.time('Reuse instance');
const explorer2 = cosmiconfig('mystack');
for (let i = 0; i < 100; i++) {
  // reusing
}
console.timeEnd('Reuse instance');
