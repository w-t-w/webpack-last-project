/**
 * 插件(next)
 */
class NextPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync('NextPlugin', (compilation, callback) => {
            callback();
        });
    }
}

module.exports = NextPlugin;
