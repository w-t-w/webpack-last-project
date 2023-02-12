const glob = require('glob-all');

describe('start webpack file test~', () => {
    it('Determine whether there is a webpack build package file~', (done) => {
        const files = glob.sync([
            'chore/env/webpack.web.config.js',
            'chore/env/webpack.ssr.config.js',
        ]);
        if (files.length > 0) {
            console.log('    webpack file test done~');
            done();
        } else done('There is no webpack build package file');
    });
});
