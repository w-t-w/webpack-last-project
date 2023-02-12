const config = require('../../config');
const base = require('../base');

// thunk 异步封装方法
const thunk = (fn) => (...args) => (callback) => fn(...args, callback);
// inquirer 异步封装方法
const inquirerThunk = (fn) => (...args) => {
    const inquirerConfig = base.createInquirerConfig(args);
    return fn({ ...config.inquirer, ...inquirerConfig });
};

module.exports = {
    thunk,
    inquirerThunk,
};
