const smoke = require('./smoke');

/**
 * 测试入口
 */
describe('start test~', () => {
    it('start smoke test~', (done) => {
        smoke();
        done();
    });
});
