/**
 * inquirer prompt config
 * @type {{filter(*): *, name: string, type: string}}
 */
const prompt = {
    name: 'prompt',
    type: 'list',
    filter(value) {
        return value.toLowerCase();
    },
};

/**
 * env inquirer prompt config
 * @type {{development: {hasNext: boolean, value: string, command: string, key: string}, production: {hasNext: boolean, value: string, command: string, key: string}}}
 */
const envPrompt = {
    development: {
        command: 'webpack-dev-server',
        key: 'env',
        value: 'env=development',
        hasNext: true,
    },
    production: {
        command: 'webpack',
        key: 'env',
        value: 'env=production',
        hasNext: true,
    },
};

/**
 * platform inquirer prompt config
 * @type {{SSR: {value: string, key: string}, Electron: {value: string, key: string}, "S/MPA": {value: string, key: string}, Mobile(): {value: string, key: string}}}
 */
const platformPrompt = {
    'S/MPA': {
        key: 'config',
        value: './chore/env/webpack.web.config.js',
    },
    SSR: {
        key: 'config',
        value: './chore/env/webpack.ssr.config.js',
    },
    Electron: {
        key: 'config',
        value: './chore/env/webpack.electron.config.js',
    },
    Mobile() {
        return {
            hasNext: true,
            ...this['S/MPA'],
        };
    },
};

/**
 * mobile inquirer prompt config
 * @type {{"vw/vh": {value: string, key: string}, rem: {value: string, key: string}}}
 */
const mobilePrompt = {
    rem: {
        key: 'env',
        value: 'mobile=rem',
    },
    'vw/vh': {
        key: 'env',
        value: 'mobile=vw/vh',
    },
};

module.exports = {
    prompt,
    envPrompt,
    platformPrompt,
    mobilePrompt,
};
