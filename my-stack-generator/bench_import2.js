console.time('import fs');
import('fs').then(() => {
    console.timeEnd('import fs');
    console.time('import path');
    import('path').then(() => {
        console.timeEnd('import path');
        console.time('import readline');
        import('readline').then(() => {
            console.timeEnd('import readline');
            console.time('import url');
            import('url').then(() => {
                console.timeEnd('import url');
            })
        })
    })
});
