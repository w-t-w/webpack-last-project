const Mocha = require('mocha');
const webpack = require('webpack');
const del = require('del');
const path = require('path');

const webConfig = require('../../chore/env/webpack.web.config');

const webpackTest = path.resolve(process.cwd(), './test/smoke/singleton/webpack.test.js');
const htmlCSSJSTest = path.resolve(process.cwd(), './test/smoke/singleton/html-css-js.test.js');

const smoke = () => {
    del([
        'build/*',
        '!build/vendors',
        '!build/vendors/main.js',
        '!build/vendors/main.js.LICENSE.txt',
        '!build/vendors/manifest.json',
    ]).then(() => {
        webpack(webConfig({ env: 'production' }), (err, stats) => {
            if (err) console.error(err);
            console.log(stats.toString({
                stats: 'minimal',
                children: true,
                colors: true,
            }));
            const mocha = new Mocha();
            mocha.addFile(webpackTest);
            mocha.addFile(htmlCSSJSTest);
            mocha.run();
        });
    });
};

module.exports = smoke;
