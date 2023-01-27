/**
 * cz-custom config
 * @type {{}}
 */
const czConfig = {
    types: [{
        name: '📦️build =>【初始化打包】',
        value: ':package: build'
    }, {
        name: '🍻 chore =>【构建/依赖/工具】',
        value: ':beers: chore'
    }, {
        name: '✨  feat =>【新功能】',
        value: ':sparkles: feat'
    }, {
        name: '🐛 fix =>【修复Bug】',
        value: ':bug: fix'
    }, {
        name: '💄 style =>【代码样式美化】',
        value: ':lipstick: style'
    }, {
        name: '🚀️perf =>【性能优化】',
        value: ':rocket: perf'
    }, {
        name: '📝 docs =>【变更文档】',
        value: ':memo: docs'
    }, {
        name: '✅  test =>【测试】',
        value: ':white_check_mark: test'
    }, {
        name: '💥 refactor =>【重构】',
        value: ':boom: refactor'
    }, {
        name: '👷 ci =>【CI related changes】',
        value: ':construction_worker: ci'
    }, {
        name: '⏪️ revert =>【回退】',
        value: ':rewind: revert'
    }, {
        name: '🏗️wip =>【建设进程中】',
        value: ':building_construction: wip'
    }],
    scopes: [{name: 'business          【业务逻辑】'}, {name: 'components        【组件】'}, {name: 'hooks             【hooks】'}],
    messages: {
        type: '请选择本次提交的类型:(必选)',
        scope: '请选择本次提交的修改范围:',
        subject: '请简要描述本次提交:(必填,首字母必须大写且不能以\'.\'为结尾)',
        body: '请对本次提交作详细描述:',
        breaking: '请对本次提交的 BREAKING CHANGES 作详细描述:(必须以 BREAKING CHANGES 为开头)',
        footer: '请对需要 commit 删除对应的 issues 作详细描述:',
        confirmCommit: '确定以上对本次提交的选项吗?(y/n)',
    },
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesName: 'custom            【自定义】',
    emptyScopesName: 'empty             【空值】',
    allowBreakingChanges: [':sparkles: feat', ':bug: fix'],
    subjectLimit: 144
};

module.exports = czConfig;