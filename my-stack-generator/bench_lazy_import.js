const start = performance.now();
import('validate-npm-package-name').then(() => {
    console.log(`import validatePkgName: ${(performance.now() - start).toFixed(2)}ms`);
});
