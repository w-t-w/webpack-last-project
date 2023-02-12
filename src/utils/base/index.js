/**
 * 图片资源模块转换
 */
const assetsImagesTransform = (img) => (img.startsWith('data:image') ? img : `${window.hackPath}${img}`);

export default {
    assetsImagesTransform,
};
