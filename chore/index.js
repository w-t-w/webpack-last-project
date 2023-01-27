const inquirer = require('inquirer');
const { exec } = require('shelljs');
const path = require('path');

const config = require('./config');
const util = require('./util');

const OUTPUT_DIR = path.resolve(process.cwd(), 'build');
const VENDORS_DIR = path.resolve(OUTPUT_DIR, 'vendors');
const MANIFEST_DIR = path.resolve(VENDORS_DIR, 'manifest.json');

/**
 * 对于 inquirer 实行 thunk 包装
 * @type {(function(...[*]))|*}
 */
const promptThunk = util.thunk.promptThunk(inquirer.createPromptModule());

/**
 * env inquirer prompt config
 * @type {{}}
 */
const envPromptConfig = config.inquirer.envPrompt;
const envPromptChoices = Object.keys(envPromptConfig);
const env = () => promptThunk({ message: '请您选择项目构建打包所属环境:', choices: envPromptChoices });

/**
 * platform inquirer prompt config
 * @type {{}}
 */
const platformPromptConfig = config.inquirer.platformPrompt;
const platformPromptChoices = Object.keys(platformPromptConfig);
const platform = () => promptThunk({ message: '请您选择项目构建打包所属平台类型:', choices: platformPromptChoices });

/**
 * mobile inquirer prompt config
 * @type {{"vw/vh": {value: string, key: string}, rem: {value: string, key: string}}}
 */
const mobilePromptConfig = config.inquirer.mobilePrompt;
const mobilePromptChoices = Object.keys(mobilePromptConfig);
const mobile = () => promptThunk({ message: '请您选择项目构建打包移动端分辨率适配策略:' }, { choices: mobilePromptChoices });

/**
 * thunk Promise Generator
 */
util.thunk.promiseRun(function* promptGenerator() {
    const command = new util.Command();
    yield command.commonFile(VENDORS_DIR, MANIFEST_DIR, 'yarn run dll');
    yield* command.resolveCommand(
        [env, envPromptConfig],
        [platform, platformPromptConfig],
        [mobile, mobilePromptConfig],
    );
    return command.exec();
}).then((commandResult) => {
    exec(commandResult);
}).catch((reason) => {
    // eslint-disable-next-line
    console.error(reason);
});
