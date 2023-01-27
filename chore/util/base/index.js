/**
 * resolve object params
 * @param args
 */
const resolveParams = (args) => {
    if (!Array.isArray(args)) throw new TypeError('parameter must be an array!');
    let o = null;
    for (const value of args) {
        if (value === null || typeof value !== 'object' || Object.prototype.toString.call(value) === '[object Array]') throw new TypeError('array element in an array must be an object!');
        o = { ...o, ...value };
    }
    return o;
};

module.exports = {
    resolveParams,
};
