const glob = require('glob-all');
const path = require('path');

const CSS_DIR = path.resolve(process.cwd(), './build/**/*.css');
const JS_DIR = path.resolve(process.cwd(), './build/**/*.js');

describe('start css/js file test~', () => {
    it(
        'Detect whether the content of the directory where webpack builds and exports generates css/js files~',
        (done) => {
            const files = glob.sync([
                CSS_DIR,
                JS_DIR,
            ]);
            if (files.length > 0) {
                console.log('    css/js file test done~');
                done();
            } else {
                done('The css/js file exported by the build package was not detected~');
            }
        },
    );
});
