const path = require('path');
const webpack = require('webpack');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const VENDORS_DIR = path.resolve(OUTPUT_DIR, 'vendors');
const MANIFEST_DIR = path.resolve(VENDORS_DIR, 'manifest.json');

/**
 * dll precompiled webpack configuration
 * @type {{}}
 */
const dllConfig = {
    mode: 'production',
    stats: {
        preset: 'minimal',
        children: true,
        colors: true,
    },
    entry: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'redux-thunk',
        'redux-saga',
        'redux-logger',
    ],
    output: {
        publicPath: '',
        path: VENDORS_DIR,
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: '[name]_[fullhash]',
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
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

module.exports = dllConfig;
