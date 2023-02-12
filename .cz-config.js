/**
 * cz-custom git commit message 规范化配置
 * @type {{}}
 */
const czConfig = {
    types: [{
        name: '📦️build =>【初始化打包】',
        value: ':package: build'
    }, {
        name: '🏗️chore =>【构建/依赖/工具】',
        value: ':building_construction: chore'
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
        name: '📝 docs =>【变更文档】',
        value: ':memo: docs'
    }, {
        name: '🚀 perf =>【性能优化】',
        value: ':rocket: perf'
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
        name: '🚧 wip =>【建设进程中】',
        value: ':construction: wip'
    }],
    scopes: [{name: 'business           【业务逻辑】'}, {name: 'hooks              【hooks】'}, {name: 'component          【组件】'}],
    messages: {
        type: '请选择本次提交类型:(必选)',
        scope: '请选择本次提交修改范围:',
        customScope: '请输入本次提交自定义的修改范围:',
        subject: '请简要描述一下本次提交:(必填[首字母不可大写;不能以"."为结尾])',
        body: '请对本次提交作详细描述:',
        breaking: '请对本次提交所产生的 BREAKING CHANGE 作详细描述:(必须以 BREAKING CHANGE 为开头)',
        footer: '请对本次提交需要 commit 对应的 issue 作详细描述:',
        confirmCommit: '确认以上对本次提交的选择吗?(y/n)'
    },
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesName: 'custom             【自定义】',
    emptyScopesName: 'empty              【空】',
    subjectLimit: 144,
    allowBreakingChanges: [':sparkles: feat', ':bug: fix']
};

module.exports = czConfig;