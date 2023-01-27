const glob = require('glob-all');
const path = require('path');

const HTML_DIR = path.resolve(process.cwd(), './build/**/*.html');

describe('start html file test~', () => {
    it(
        'Detect whether the content of the directory where webpack builds and exports generates html files~',
        (done) => {
            const files = glob.sync([
                HTML_DIR,
            ]);
            if (files.length > 0) {
                console.log('    html file test done~');
                done();
            } else {
                done('The html file exported by the build package was not detected~');
            }
        },
    );
});
