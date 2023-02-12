const fs = require('fs');

/**
 * 创建 inquirer 配置工厂函数
 */
function createInquirerConfig(args) {
    if (!Array.isArray(args)) throw new TypeError('The args parameter must be an array!');
    let o = {};
    // eslint-disable-next-line
    for (const value of args) {
        if (typeof value !== 'object' || value === null || Object.prototype.toString.call(value) === '[object Array]') throw new TypeError('The array element in the array must be an object!');
        o = { ...o, ...value };
    }
    return o;
}

/**
 * 配置执行命令行类
 */
class Command {
    constructor() {
        this.command = [];
        this.confCmds = [];
    }

    /**
     * Dll 公有依赖抽取至 manifest.json 文件做预编译文件,路径验证
     * @param path
     * @param chunkPath
     * @returns {*|boolean}
     */
    commonPath(path, chunkPath = []) {
        const pathMatch = /\/|\\/;
        const splitPath = path.split(pathMatch);
        if (fs.existsSync(path)) {
            if (chunkPath.length > 0) {
                const chunkPopPath = chunkPath.pop();
                splitPath.push(chunkPopPath);
                const joinPath = splitPath.join('/');
                fs.mkdirSync(joinPath, { recursive: true });
                return this.commonPath(joinPath, chunkPath);
            }
            return true;
        }
        chunkPath.push(splitPath.pop());
        return this.commonPath(splitPath.join('/'), chunkPath);
    }

    /**
     * Dll 公有依赖抽取至 manifest.json 文件做预编译文件,文件验证,并新建 shell 模板,执行 shell 命令
     * @param path
     * @param file
     * @param command
     * @returns {boolean}
     */
    commonFile(path, file, command) {
        if (fs.existsSync(file)) {
            return false;
        }
        if (this.commonPath(path)) {
            this.command.push(command);
            return true;
        }
        return true;
    }

    /**
     * 对各个配置实行转换,组成 shell 编译配置数组
     * @param confCmds
     * @returns {boolean}
     */
    * resolveConfCmd(...confCmds) {
        if (yield* this.compileConfCmd(confCmds.shift())) {
            yield* this.resolveConfCmd(...confCmds);
            return true;
        }
        this.command.push(this.confCmds.join(' '));
        return true;
    }

    /**
     * 组成 shell 编译配置数组
     * @param prompt
     * @param config
     * @returns {Generator<*, void, *>}
     */
    * compileConfCmd([prompt, config]) {
        const { prompt: promptResult = '' } = yield prompt();
        let confCmd = config[promptResult] || config[promptResult.toUpperCase()] || config[promptResult.toLowerCase()] || config[Array.from(promptResult, (item, index) => (index === 0 ? item.toUpperCase() : item)).join('')];
        if (typeof confCmd === 'function') {
            confCmd = confCmd.call(config);
        }
        const {
            command = '', key, value, hasNext,
        } = confCmd;
        if (command) {
            this.confCmds.push(command);
        }
        this.confCmds.push(`--${key}=${value}`);
        return hasNext;
    }

    /**
     * 编译配置完成,输出并合成 shell 命令
     * @returns {string}
     */
    exec() {
        return this.command.join(' && ');
    }
}

module.exports = {
    createInquirerConfig,
    Command,
};
