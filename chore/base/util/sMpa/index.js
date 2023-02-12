const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * S/MPA 单/多页 entry、html-webpack-plugin 配置
 * @param templateParameters
 * @returns {{entry: {}, htmlWebpackPlugin: *[]}}
 */
const sMpa = (templateParameters) => {
    const entry = {};
    const htmlWebpackPlugin = [];

    const templatePaths = glob.sync(path.resolve(process.cwd(), 'src/**/index.ejs'));
    const templateMatch = /src[/|\\]?(.*)[/|\\]index/u;
    templatePaths.forEach((templatePath) => {
        const [entryPath, entryPoint] = templateMatch.exec(templatePath);
        const entryPointArr = entryPoint.split(/[/|\\]/);
        const entryEmpty = entryPointArr[0];
        const { length } = entryPointArr;

        const entryKey = entryEmpty ? entryPointArr.join('_') : 'index';
        entry[entryKey] = `./${entryPath}.js`;

        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            publicPath: entryEmpty ? '../'.repeat(length) : './',
            filename: `./${entryEmpty ? `${entryPoint}/` : ''}index.html`,
            template: templatePath,
            chunks: ['common', entryKey],
            inject: 'body',
            minify: true,
            templateParameters: {
                hackPath: entryEmpty ? '../'.repeat(length) : './',
                ...templateParameters,
            },
        }));
    });

    return {
        entry,
        htmlWebpackPlugin,
    };
};

module.exports = sMpa;
