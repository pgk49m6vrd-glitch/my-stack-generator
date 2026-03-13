import fs from 'fs';
function getSize(pkg) {
  try {
    const path = require.resolve(pkg);
    const stat = fs.statSync(path);
    console.log(`${pkg}: ${stat.size} bytes`);
  } catch (e) {
    console.log(`${pkg}: Error loading - ${e.message}`);
  }
}
getSize('cross-spawn');
getSize('validate-npm-package-name');
