/**
 * 转换静态资源模块
 * @param img
 */
const transformAssets = (img) => (img.startsWith('data:image') ? img : `${window.hackPath}${img}`);

export default {
    transformAssets,
};
