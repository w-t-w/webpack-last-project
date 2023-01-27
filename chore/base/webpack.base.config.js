const path = require('path');
const glob = require('glob');
const open = require('open');
const webpack = require('webpack');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgeCSSWebpackPlugin = require('purgecss-webpack-plugin').PurgeCSSPlugin;

const { mobile: mobileConfig } = require('../config');
const util = require('./util');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const VENDORS_DIR = path.resolve(OUTPUT_DIR, 'vendors');
const MANIFEST_DIR = path.resolve(VENDORS_DIR, 'manifest.json');
const CSS_DIR = path.resolve(process.cwd(), 'src/**');
const NEXT_LOADER_DIR = path.resolve(process.cwd(), 'chore/base/loader/next/index.js');

/**
 * webpack base config
 * @param mode
 * @param mobile
 * @returns {{mode: *, devtool: string, devServer: {proxy: {}, static: string, historyApiFallback: boolean, compress: boolean, hot: boolean, open: {app: {name: string | readonly string[]}}}, output: {chunkFilename: string, path: string, filename: string, publicPath: string}, entry: {}, resolve: {extensions: string[]}, stats: {children: boolean, preset: string, colors: boolean}, optimization: {minimizer: (CssMinimizerPlugin<CssNanoOptionsExtended>|ImageMinimizerPlugin<unknown, unknown>|string)[], splitChunks: {chunks: string, cacheGroups: {common: {name: string, priority: number}}, minChunks: number, minSize: number}}, plugins: *[], module: {rules: [{test: RegExp, use: [{loader: string, options: {cacheDirectory: boolean}}], exclude: RegExp},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|string),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|string),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, use: [string,{loader: string, options: {importLoaders: number}},({loader: string, options: {remPrecision: number, remUnit: number}}|string),{loader: string, options: ({postcssOptions: {plugins: {"postcss-px-to-viewport": {viewportWidth: number, unitToConvert: string, viewportUnit: string, unitPrecision: number}}}}|{})},{loader: string}]},{test: RegExp, parser: {dataUrlCondition: {maxSize: number}}, generator: {filename: string, publicPath: string}, type: string},null]}, externals: {jquery: string}}}
 */
module.exports = ({ env: mode, mobile } = {}) => {
    let remConfig = null;
    let vwConfig = null;

    const { entry, htmlWebpackPlugin } = util.sMpa({ mobile });

    /**
     * 移动端分辨率策略(相对像素值 rem + 动态计算元节点绝对像素值的策略)
     * @type {{loader: string, options: {remPrecision: number, remUnit: number}}|string}
     */
    remConfig = mobile === mobileConfig.config.rem ? {
        loader: 'px2rem-loader',
        options: {
            remUnit: 37.5,
            remPrecision: 8,
        },
    } : NEXT_LOADER_DIR;

    /**
     * 移动端分辨率策略(绝对像素值 px 动态转化为 vw/vh 的策略)
     * @type {{postcssOptions: {}}|{}}
     */
    vwConfig = mobile === mobileConfig.config.vw ? {
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
        mode,
        devtool: 'cheap-module-source-map',
        stats: {
            preset: 'minimal',
            children: true,
            colors: true,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        externals: {
            jquery: 'jQuery',
        },
        devServer: {
            static: OUTPUT_DIR,
            historyApiFallback: true,
            hot: true,
            compress: true,
            open: {
                app: {
                    name: open.apps.chrome,
                },
            },
            proxy: {},
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 10 * 1024,
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
        entry,
        output: {
            publicPath: '',
            path: OUTPUT_DIR,
            filename: 'js/[name].[fullhash].js',
            chunkFilename: 'js/[name].[fullhash].js',
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
                test: /\.(jpe?g|png|gif|bmp|webp)$/,
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
                    publicPath: '',
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
            new EslintWebpackPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [
                    '*/*',
                    '!vendors/*',
                ],
            }),
            new PurgeCSSWebpackPlugin({
                paths: glob.sync(CSS_DIR, { nodir: true }),
            }),
            ...htmlWebpackPlugin,
        ],
    };
};
