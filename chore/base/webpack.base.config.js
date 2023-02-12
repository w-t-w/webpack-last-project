const webpack = require('webpack');
const path = require('path');
const open = require('open');
const glob = require('glob');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');

const config = require('../config');
const util = require('./util');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const NEXT_LOADER_DIR = path.resolve(process.cwd(), 'chore/loader/next/index.js');
const MANIFEST_DIR = path.resolve(OUTPUT_DIR, 'vendors', 'manifest.json');
const PURGE_CSS_DIR = path.resolve(process.cwd(), 'src/**');

/**
 * webpack base 基础配置
 * @param mode
 * @param mobile
 * @returns {{mode, devtool: string, devServer: {static: string, historyApiFallback: boolean, compress: boolean, hot: boolean, open: {app: {name: string | readonly string[]}}}, output: {chunkFilename: string, path: string, filename: string, publicPath: string}, entry: {}, resolve: {extensions: string[]}, stats: {preset: string}, optimization: {minimizer: (CssMinimizerPlugin<CssNanoOptionsExtended>|ImageMinimizerPlugin<unknown, unknown>|string)[], splitChunks: {chunks: string, cacheGroups: {common: {name: string, priority: number}}, minChunks: number, minSize: number}}, plugins: *[], module: {rules: [{test: RegExp, use: [{loader: string},{loader: string, options: {cacheDirectory: boolean}}], exclude: RegExp},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|{loader: string}),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, parser: {dataUrlCondition: {maxSize: number}}, generator: {filename: string, publicPath: string}, type: string},null]}, externals: {jquery: string}}}
 */
module.exports = ({ env: mode, mobile = '' }) => {
    // S/MPA 单/多页 entry、html-webpack-plugin 配置
    const { entry, htmlWebpackPlugin } = util.sMpa({ mobile });

    const { mobile: { mobile: { rem, 'vw/vh': vw } } } = config;

    // 移动端分辨率适配 rem 配置
    const remConfig = (mobile === rem) ? {
        loader: 'px2rem-loader',
        options: {
            remUnit: 75,
            remPrecision: 8,
        },
    } : {
        loader: NEXT_LOADER_DIR,
    };

    // 移动端分辨率适配 vw/vh 配置
    const vwConfig = (mobile === vw) ? {
        postcssOptions: {
            plugins: {
                'postcss-px-to-viewport': {
                    unitToConvert: 'px',
                    viewportWidth: 750,
                    viewportUnit: 'vw',
                    unitPrecision: 8,
                },
            },
        },
    } : {};

    return {
        entry,
        mode,
        devtool: 'cheap-module-source-map',
        stats: {
            preset: 'minimal',
        },
        devServer: {
            open: {
                app: {
                    name: open.apps.chrome,
                },
            },
            static: OUTPUT_DIR,
            hot: true,
            compress: true,
            historyApiFallback: true,
        },
        output: {
            publicPath: '',
            path: OUTPUT_DIR,
            filename: 'js/[name].[fullhash].js',
            chunkFilename: 'js/[name].[fullhash].js',
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        externals: {
            jquery: 'jQuery',
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 20 * 1024,
                cacheGroups: {
                    common: {
                        name: 'common',
                        priority: 10,
                    },
                },
            },
            minimizer: [
                new CSSMinimizerWebpackPlugin(),
                new ImageMinimizerWebpackPlugin({
                    minimizer: {
                        implementation: ImageMinimizerWebpackPlugin.imageminMinify,
                        options: {
                            plugins: [
                                ['gifsicle', { interlaced: true }],
                                ['jpegtran', { progressive: true }],
                                ['optipng', { optimizationLevel: 5 }],
                                [
                                    'svgo',
                                    {
                                        plugins: [
                                            {
                                                name: 'preset-default',
                                                params: {
                                                    overrides: {
                                                        removeViewBox: false,
                                                        addAttributesToSVGElement: {
                                                            params: {
                                                                attributes: [
                                                                    { xmlns: 'http://www.w3.org/2000/svg' },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                ],
                            ],
                        },
                    },
                }),
                '...',
            ],
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
            }, {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                    },
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vwConfig,
                }],
            }, {
                test: /\.less$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3,
                    },
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vwConfig,
                }, {
                    loader: 'less-loader',
                }],
            }, {
                test: /\.sass$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 3,
                    },
                }, remConfig, {
                    loader: 'postcss-loader',
                    options: vwConfig,
                }, {
                    loader: 'sass-loader',
                }],
            }, {
                test: /\.(jpg|jpeg|png|gif|bmp)$/,
                type: 'asset',
                generator: {
                    publicPath: '',
                    filename: 'assets/images/[name].[contenthash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            }, {
                test: /\.(woff|woff2|otf|tof|otc|ttc|ttf)$/,
                type: 'asset',
                generator: {
                    publicPath: '../',
                    filename: 'assets/fonts/[name].[contenthash:6][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024,
                    },
                },
            }],
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: MANIFEST_DIR,
            }),
            new MiniCSSExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '**/*',
                    '!vendors/**',
                ],
            }),
            new ESLintWebpackPlugin(),
            new PurgeCSSPlugin({
                paths: glob.sync(PURGE_CSS_DIR, { nodir: true }),
            }),
            ...htmlWebpackPlugin,
        ],
    };
};
