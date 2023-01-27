const { merge } = require('webpack-merge');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('../config');
const baseConfig = require('../base/webpack.base.config');
const { NextPlugin } = require('../base/plugin');

/**
 * web config
 * @param mode
 * @param mobile
 * @returns {{mode: *, devtool: string, devServer: {proxy: {}, static: string, historyApiFallback: boolean, compress: boolean, hot: boolean, open: {app: {name: (string|string[])}}}, output: {chunkFilename: string, path: string, filename: string, publicPath: string}, entry: {}, resolve: {extensions: string[]}, stats: {children: boolean, preset: string, colors: boolean}, optimization: {minimizer: (CssMinimizerPlugin<CssNanoOptionsExtended>|ImageMinimizerPlugin<*, *>|string)[], splitChunks: {chunks: string, cacheGroups: {common: {name: string, priority: number}}, minChunks: number, minSize: number}}, plugins: *[], module: {rules: [{test: RegExp, use: {loader: string, options: {cacheDirectory: boolean}}[], exclude: RegExp},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|string),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|string),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|string),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, parser: {dataUrlCondition: {maxSize: number}}, generator: {filename: string, publicPath: string}, type: string},null]}, externals: {jquery: string}}}
 */
module.exports = ({ env: mode, mobile }) => {
    const webConfig = {
        target: 'web',
        plugins: [
            mode === config.env.development ? new BundleAnalyzerPlugin() : new NextPlugin(),
        ],
    };
    return merge(baseConfig({ env: mode, mobile }), webConfig);
};
