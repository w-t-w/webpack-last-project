const config = require('../../config');
const base = require('../base');

/**
 * Thunk Generator
 * @param fn
 * @returns {function(...[*]): function(*): *}
 * @constructor
 */
const Thunk = (fn) => (...args) => (callback) => fn(...args, callback);

/**
 * inquirer Thunk Generator
 * @param fn
 * @returns {(function(...[*]))|*}
 */
const promptThunk = (fn) => (...args) => {
    const params = base.resolveParams(args);
    return fn({ ...config.inquirer.prompt, ...params });
};

/**
 * thunk Generator
 * @param taskRun
 */
const run = (taskRun) => {
    const task = taskRun();

    function next(err, data) {
        if (err) return task.throw(err);
        const { done, value } = task.next(data);
        if (done) return true;
        return value(next);
    }

    next();
};

/**
 * thunk Promise Generator
 * @param taskRun
 */
const promiseRun = (taskRun) => new Promise((resolve, reject) => {
    const task = taskRun();

    // eslint-disable-next-line
    function next(err, data) {
        if (err) return reject(task.throw(err));
        const { done, value } = task.next(data);
        if (done) return resolve(value);
        if (typeof value === 'function') {
            return value(next);
        }
        const promise = Promise.resolve(value);
        promise.then((val) => {
            next(null, val);
        }, (reason) => {
            next(reason);
        });
    }

    next();
});

module.exports = {
    Thunk,
    promptThunk,
    run,
    promiseRun,
};
