const del = require('del');
const path = require('path');
const webpack = require('webpack');
const Mocha = require('mocha');

const webConfig = require('../../chore/env/webpack.web.config');

const HtmlTestFile = path.resolve(process.cwd(), './test/smoke/singleton/html.test.js');
const CSSJSTestFile = path.resolve(process.cwd(), './test/smoke/singleton/css-js.test.js');

const mocha = new Mocha();

const smoke = () => {
    del([
        './build/**/*',
        '!./build/vendors',
        '!./build/vendors/main.js',
        '!./build/vendors/main.js.LICENSE.txt',
        '!./build/vendors/manifest.json',
    ]).then(() => {
        webpack(webConfig({}), (err, stats) => {
            if (err) console.error(err);
            console.log(stats.toString({
                preset: 'minimal',
                colors: true,
                children: true,
            }));
            mocha.addFile(HtmlTestFile);
            mocha.addFile(CSSJSTestFile);
            mocha.run();
        });
    });
};

module.exports = smoke;
