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
        'react/jsx-indent': ['error', 4],
        'max-len': 'off',
        'no-undef': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'default-param-last': 'off',
        'react/prop-types': 'off',
    },
};

module.exports = eslintrc;
