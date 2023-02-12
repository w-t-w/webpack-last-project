// inquirer 默认配置
const config = {
    name: 'prompt',
    type: 'list',
    filter(value) {
        return value.toLowerCase();
    },
};

module.exports = config;
