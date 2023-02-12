/**
 * babel 配置
 * @type {{}}
 */
const babelConfig = {
    presets: [[
        '@babel/preset-env',
        {
            modules: false,
            loose: false,
            useBuiltIns: 'usage',
            corejs: {
                version: 3,
                proposal: true
            }
        }
    ], ['@babel/preset-react',
        {
            runtime: 'automatic'
        }
    ]],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        '@babel/plugin-syntax-dynamic-import'
    ]
};

module.exports = babelConfig;