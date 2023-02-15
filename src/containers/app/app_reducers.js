import constants from './constants';

/**
 * 初始化状态
 * @type {{count: number}}
 */
const defaultState = {
    // 计数器
    count: 0,
};

export default function AppReducers(state = defaultState, { type, payload }) {
    switch (type) {
    case constants.type.ADD_COUNT:
    case constants.type.MINUS_COUNT:
        return { ...state, ...payload };
    default:
        return state;
    }
}
