const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const TEMPLATE_DIR = path.resolve(process.cwd(), 'src/**/index.ejs');

/**
 * 单/多页应用配置
 * @param templateParams
 */
const sMpa = (templateParams) => {
    const entry = {};
    const htmlWebpackPlugin = [];

    const templatePaths = glob.sync(TEMPLATE_DIR);
    const entryPoint = /src[/|\\]?(.*)[/|\\]index/;

    for (const templatePath of templatePaths) {
        // eslint-disable-next-line
        let [entryValue, entryKey] = entryPoint.exec(templatePath);
        const isRootEntry = !entryKey;
        entryKey = entryKey || 'index';
        const entryKeyArr = entryKey.split(/[/|\\]/);
        const keyArrLength = entryKeyArr.length;
        const transformEntryKey = entryKeyArr.join('_');
        const transformEntryValue = `./${entryValue}.js`;
        entry[transformEntryKey] = transformEntryValue;
        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            publicPath: isRootEntry ? './' : '../'.repeat(keyArrLength),
            filename: `${OUTPUT_DIR}/${isRootEntry ? '' : `${entryKey}/`}index.html`,
            template: templatePath,
            chunks: ['common', transformEntryKey],
            minify: true,
            inject: 'body',
            templateParameters: {
                hackPath: isRootEntry ? './' : '../'.repeat(keyArrLength),
                ...templateParams,
            },
        }));
    }

    return {
        entry,
        htmlWebpackPlugin,
    };
};

module.exports = sMpa;
