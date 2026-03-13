console.time('child_process');
import('child_process').then(() => {
    console.timeEnd('child_process');
    console.time('cross-spawn');
    import('cross-spawn').then(() => {
        console.timeEnd('cross-spawn');
    })
});
