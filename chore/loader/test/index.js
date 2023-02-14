const loaderRunner = require('loader-runner');
const fs = require('fs');
const path = require('path');

const SPRITE_DIR = path.resolve(process.cwd(), './chore/loader/sprite/index.js');
const CSS_DIR = path.resolve(process.cwd(), './build/css/index.dbb5f43e.css');

/**
 * 使用测试自定义的 loader 而存在的
 */
loaderRunner.runLoaders({
    resource: CSS_DIR,
    loaders: [{
        loader: SPRITE_DIR,
        options: {
            filename: 'wtw_sprite',
        },
    }],
    context: { compress: true },
    readResource: fs.readFile.bind(fs),
}, (err, { result, cacheable }) => {
    if (err) console.error(err);
    console.log('cacheable', cacheable);
    console.log('result', result[0]);
});
