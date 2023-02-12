const JsZip = require('jszip');
const { RawSource } = require('webpack-sources');

const jszip = new JsZip();

/**
 * 插件(zip 构建打包)
 */
class ZipPlugin {
    constructor(filename) {
        this.filename = filename;
    }

    // eslint-disable-next-line
    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const jszipFolder = jszip.folder(`${this.filename}_container`);
            // eslint-disable-next-line
            for (const filename of Object.keys(compilation.assets)) {
                if (/^js\/index\.(.*)\.js/.test(filename)) jszipFolder.file(filename, compilation.assets[filename].source());
            }
            jszip.generateAsync({ type: 'nodebuffer' }).then((content) => {
                // eslint-disable-next-line
                compilation.assets[`zip/${this.filename}.zip`] = new RawSource(content);
                callback();
            });
        });
    }
}

module.exports = ZipPlugin;
