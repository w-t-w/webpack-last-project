const { merge } = require('webpack-merge');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { NextPlugin } = require('../plugin');

const config = require('../config');
const baseConfig = require('../base/webpack.base.config');

const { env: { env: { development = '' } } } = config;

/**
 * webpack S/MPA Mobile 配置
 * @param env
 * @returns {{mode, devtool: string, devServer: {static: string, historyApiFallback: boolean, compress: boolean, hot: boolean, open: {app: {name: (string|string[])}}}, output: {chunkFilename: string, path: string, filename: string, publicPath: string}, entry: {}, resolve: {extensions: string[]}, stats: {preset: string}, optimization: {minimizer: (CssMinimizerPlugin<CssNanoOptionsExtended>|ImageMinimizerPlugin<*, *>|string)[], splitChunks: {chunks: string, cacheGroups: {common: {name: string, priority: number}}, minChunks: number, minSize: number}}, plugins: *[], module: {rules: [{test: RegExp, use: [{loader: string},{loader: string, options: {cacheDirectory: boolean}}], exclude: RegExp},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, parser: {dataUrlCondition: {maxSize: number}}, generator: {filename: string, publicPath: string}, type: string},null]}, externals: {jquery: string}}}
 */
module.exports = (env) => {
    const { env: mode } = env;
    const webConfig = {
        target: 'web',
        plugins: [
            mode === development ? new BundleAnalyzerPlugin() : new NextPlugin(),
        ],
    };
    return merge(baseConfig(env), webConfig);
};
