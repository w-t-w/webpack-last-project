import constants from './constants';

// 计数器增加 action
export function addCount(payload) {
    return {
        type: constants.type.ADD_COUNT,
        payload,
    };
}

// 计数器减少 action
export function minusCount(payload) {
    return {
        type: constants.type.MINUS_COUNT,
        payload,
    };
}
