/**
 * 插件(NextPlugin)
 */
class NextPlugin {
    // eslint-disable-next-line
    apply(compiler) {
        compiler.hooks.emit.tapAsync('NextPlugin', (compilation, callback) => {
            callback();
        });
    }
}

module.exports = NextPlugin;
