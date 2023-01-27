const fs = require('fs');

class Command {
    constructor() {
        this.command = [];
        this.commandParams = [];
    }

    /**
     * build a public dependency directory path
     * @param path
     * @param file
     * @returns {*|boolean|boolean}
     */
    commonPath(path, file) {
        if (fs.existsSync(file)) {
            return false;
        }
        // eslint-disable-next-line
        return (function commonPathSplit(path, chunksPath = []) {
            const pathSplit = path.split(/[/|\\]/);
            if (fs.existsSync(path)) {
                if (chunksPath.length > 0) {
                    pathSplit.push(chunksPath.pop());
                    // eslint-disable-next-line
                    path = pathSplit.join('/');
                    fs.mkdirSync(path, { recursive: true });
                    return commonPathSplit(path, chunksPath);
                }
                return true;
            }
            const popPath = pathSplit.pop();
            chunksPath.push(popPath);
            // eslint-disable-next-line
            path = pathSplit.join('/');
            return commonPathSplit(path, chunksPath);
        }(path));
    }

    /**
     * public dependency build package
     * @param path
     * @param file
     * @param command
     * @returns {boolean}
     */
    commonFile(path, file, command) {
        if (this.commonPath(path, file)) {
            return this.command.push(command);
        }
        return true;
    }

    /**
     * process command configuration
     * @returns {Generator<*, void, *>}
     */
    * resolveCommand(...resolves) {
        const resolve = resolves.shift();
        if (yield* this.resolveCommandParams(resolve)) {
            yield* this.resolveCommand(...resolves);
        } else {
            this.command.push(this.commandParams.join(' '));
        }
    }

    /**
     * process command params configuration
     * @param prompt
     * @param config
     * @returns {Transformer<T>}
     */
    * resolveCommandParams([prompt, config]) {
        const { prompt: promptParams } = yield prompt();
        let configParams = config[promptParams]
            || config[promptParams.toUpperCase()]
            || config[Array.from(promptParams, (item, index) => (index === 0 ? item.toUpperCase() : item)).join('')];
        if (typeof configParams === 'function') {
            configParams = configParams.call(config);
        }
        if (configParams.command) {
            this.commandParams.push(configParams.command);
        }
        this.commandParams.push(`--${configParams.key}=${configParams.value}`);
        return configParams.hasNext;
    }

    /**
     * execute command conversion
     * @returns {string}
     */
    exec() {
        return this.command.join(' && ');
    }
}

module.exports = Command;
