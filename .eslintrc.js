/**
 * eslint config
 * @type {{parser: string, extends: string[]}}
 */
const eslintrcConfig = {
    parser: '@babel/eslint-parser',
    extends: ['airbnb'],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'class-methods-use-this': 'off',
        'no-restricted-syntax': 'off',
        'max-len': 'off',
        'no-undef': 'off',
    },
};

module.exports = eslintrcConfig;
