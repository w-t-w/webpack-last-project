/**
 * babel 构建打包编译转换配置
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
                proposal: true,
            },
        },
    ], [
        '@babel/preset-react',
        {
            runtime: 'automatic',
        },
    ]],
    plugins: [[
        '@babel/plugin-proposal-decorators',
        {
            legacy: true,
        }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    ],
};

module.exports = babelConfig;
