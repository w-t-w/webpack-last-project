/**
 * eslint 代码规范化工具配置
 * @type {{}}
 */
const eslintrc = {
    parser: '@babel/eslint-parser',
    extends: ['airbnb'],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        indent: ['error', 4],
        'max-len': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-indent': ['error', 4],
    },
};

module.exports = eslintrc;
