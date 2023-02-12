/**
 * 环境配置
 * @type {{development: {hasNext: boolean, value: string, command: string, key: string}, production: {hasNext: boolean, value: string, command: string, key: string}}}
 */
const envConfig = {
    development: {
        command: 'webpack-dev-server',
        hasNext: true,
        key: 'env',
        value: 'env=development',
    },
    production: {
        command: 'webpack',
        hasNext: true,
        key: 'env',
        value: 'env=production',
    },
};

/**
 * 平台配置
 * @type {{SSR: {value: string, key: string}, Electron: {value: string, key: string}, "S/MPA": {value: string, key: string}, Mobile(): {hasNext: boolean}}}
 */
const platformConfig = {
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
            ...this['S/MPA'],
            hasNext: true,
        };
    },
};
/**
 * 移动端分辨率配置
 * @type {{"vw/vh": {value: string, key: string}, rem: {value: string, key: string}}}
 */
const mobileConfig = {
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
    envConfig,
    platformConfig,
    mobileConfig,
};
