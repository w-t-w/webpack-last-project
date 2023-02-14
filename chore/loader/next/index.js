/**
 * 加载器(next)
 * @param source
 */
function nextLoader(source) {
    this.callback(null, source);
}

module.exports = nextLoader;
