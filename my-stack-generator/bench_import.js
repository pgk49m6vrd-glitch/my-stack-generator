console.time('import validate-npm-package-name');
import('validate-npm-package-name').then(() => {
    console.timeEnd('import validate-npm-package-name');
    console.time('import cross-spawn');
    import('cross-spawn').then(() => {
        console.timeEnd('import cross-spawn');
    })
});
