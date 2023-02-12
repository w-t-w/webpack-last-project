const glob = require('glob-all');

describe('start html/css/js file test~', () => {
    it('Determine the existence of html/css/js files exported by webpack to build and package~', (done) => {
        const files = glob.sync([
            'build/**/*.html',
            'build/**/*.css',
            'build/**/*.js',
        ]);
        if (files.length > 0) {
            console.log('    html/css/js file test done~');
            done();
        } else done('There is no html/css/js file exported by webpack to build and package');
    });
});
