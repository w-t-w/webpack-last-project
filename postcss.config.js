const postcssPresetEnv = require('postcss-preset-env');

/**
 * postcss 编译转换样式文件以兼容浏览器的配置,使更多的 css 新样式、新特性兼容更多的浏览器
 * @type {{plugins: (PluginCreator<pluginOptions>|{pluginOptions: any, readonly default: PluginCreator<pluginOptions>})[]}}
 */
const postcssConfig = {
    plugins: [
        postcssPresetEnv
    ]
};

module.exports = postcssConfig;