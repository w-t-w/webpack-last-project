/**
 * 普通生成器
 * @param taskRun
 */
const generator = (taskRun) => {
    const task = taskRun();

    // eslint-disable-next-line
    function next(err, data) {
        if (err) return task.throw(err instanceof Error ? err : new Error(err));
        const { value, done } = task.next(data);
        if (done) return true;
        if (typeof value === 'function') return value(next);
        next(null, value);
    }

    next();
};

/**
 * promise 生成器
 * @param taskRun
 */
const promiseGenerator = (taskRun) => new Promise((resolve, reject) => {
    const task = taskRun();

    // eslint-disable-next-line
    function next(err, data) {
        if (err) return reject(task.throw(err instanceof Error ? err : new Error(err)));
        const { value, done } = task.next(data);
        if (done) return resolve(value);
        if (typeof value === 'function') {
            value(next);
        } else {
            const promise = Promise.resolve(value);
            promise.then((val) => {
                next(null, val);
            }, (reason) => {
                next(reason);
            });
        }
    }

    next();
});

module.exports = {
    generator,
    promiseGenerator,
};
