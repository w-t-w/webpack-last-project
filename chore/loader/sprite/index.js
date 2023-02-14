const { getOptions } = require('loader-utils');
const spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(process.cwd(), './build');
const CSS_DIR = path.resolve(OUTPUT_DIR, './css');

/**
 * spritesmith 合并多个图片形成雪碧图的依赖
 * @param source
 */
function sprite(source) {
    // const { filename = '' } = getOptions(this);
    // console.log('filename:', filename);
    // return source;
    // this.callback(null, source);
    // this.cacheable(false);
    // const callback = this.async();
    // callback(null, source);
    // emit
    const { filename = '' } = getOptions(this);
    const callback = this.async();
    // 匹配 css 中的背景图片
    const imageArr = [];
    const imageMatch = /url\((\S+\.jpeg)\)/ug;
    let matchResult = imageMatch.exec(source);
    while (matchResult) {
        imageArr.push(path.resolve(CSS_DIR, matchResult[1]));
        matchResult = imageMatch.exec(source);
    }
    // 合并多个图片形成雪碧图的依赖
    spritesmith.run({ src: imageArr }, (error, { image }) => {
        if (error) callback(error);
        // 检查位置目录是否存在,如果不存在,直接新建
        if (!fs.existsSync(OUTPUT_DIR) || !fs.existsSync(CSS_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
            fs.mkdirSync(CSS_DIR, { recursive: true });
        }
        const replaceSource = `../assets/images/${filename}.png`;
        const expandSource = source.replace(imageMatch, `url(${replaceSource})`);
        // 生成新的图片资源模块
        fs.writeFileSync(path.resolve(CSS_DIR, replaceSource), image, 'utf-8');
        // 生成新的 CSS 样式文件
        fs.writeFile(path.resolve(CSS_DIR, `${filename}.min.css`), expandSource, 'utf-8', () => {
            callback(null, expandSource);
        });
    });
}

module.exports = sprite;
