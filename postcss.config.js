const postCSSPresetEnv = require('postcss-preset-env');

/**
 * postcss config
 * @type {{plugins: (PluginCreator<pluginOptions>|{pluginOptions: any, readonly default: PluginCreator<pluginOptions>})[]}}
 */
const postcssConfig = {
    plugins: [
        postCSSPresetEnv,
    ],
};

module.exports = postcssConfig;
