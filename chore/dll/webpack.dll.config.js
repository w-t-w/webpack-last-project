const webpack = require('webpack');
const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build', 'vendors');
const MANIFEST_DIR = path.resolve(OUTPUT_DIR, 'manifest.json');

/**
 * Dll 抽取公用依赖做预编译文件插件
 * @type {{mode: string, output: {chunkFilename: string, path: string, filename: string, library: string, publicPath: string}, entry: string[], stats: {preset: string}, plugins: webpack.DllPlugin[], module: {rules: [{test: RegExp, use: [{loader: string},{loader: string, options: {cacheDirectory: boolean}}], exclude: RegExp}]}}}
 */
module.exports = {
    mode: 'production',
    entry: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'redux-thunk',
        'redux-logger',
        'redux-saga',
    ],
    output: {
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: OUTPUT_DIR,
        library: '[name]_[fullhash]',
    },
    stats: {
        children: true,
        preset: 'minimal',
        colors: true,
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'thread-loader',
            }, {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            }],
        }],
    },
    plugins: [
        new webpack.DllPlugin({
            context: process.cwd(),
            name: '[name]_[fullhash]',
            path: MANIFEST_DIR,
        }),
    ],
};
