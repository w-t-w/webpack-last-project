const inquirer = require('inquirer');
const path = require('path');
const { exec } = require('shelljs');

const config = require('./config');
const util = require('./util');

const { envConfig, platformConfig, mobileConfig } = config.base;

const VENDORS_DIR = path.resolve(process.cwd(), 'build', 'vendors');
const MANIFEST_DIR = path.resolve(VENDORS_DIR, 'manifest.json');

const prompt = util.thunk.inquirerThunk(inquirer.createPromptModule({}));
const { Command } = util.base;

/**
 * 环境互动
 */
const env = () => prompt({ choices: Object.keys(envConfig) }, { message: '请您选择项目构建打包的所属环境:' });
/**
 * 平台互动
 */
const platform = () => prompt({ choices: Object.keys(platformConfig) }, { message: '请您选择项目构建打包的所属运行平台:' });
/**
 * 移动端分辨率互动
 */
const mobileMatch = () => prompt({ choices: Object.keys(mobileConfig) }, { message: '请您选择项目构建打包的移动端分辨率适配策略:' });

util.generator.promiseGenerator(function* generator() {
    const command = new Command();
    yield command.commonFile(VENDORS_DIR, MANIFEST_DIR, 'npm run dll');
    yield* command.resolveConfCmd([env, envConfig], [platform, platformConfig], [mobileMatch, mobileConfig]);
    return command.exec();
}).then((command) => {
    if (command) exec(command);
});
