import { useCallback } from 'react';
import { connect } from 'react-redux';

import { addCount, minusCount } from './app_actions';

/**
 * App 主入口
 * @returns {JSX.Element}
 * @constructor
 */
function App(props) {
    const { app: { count }, addCount: addCountDispatch, minusCount: minusCountDispatch } = props;

    /**
     * 计数器增加 useCallback
     * @type {(function(*): void)|*}
     */
    const addCountHandler = useCallback((e) => {
        addCountDispatch({
            count: count + 1,
        });
        // 取消冒泡事件
        e.stopPropagation();
    }, [count]);

    /**
     * 计数器减少 useCallback
     * @type {(function(*): void)|*}
     */
    const minusCountHandler = useCallback((e) => {
        minusCountDispatch({
            count: count - 1,
        });
        // 取消冒泡事件
        e.stopPropagation();
    }, [count]);

    return (
        <div className="addCount">
            <button type="button" onClick={(e) => addCountHandler(e)}>+</button>
            <input type="number" value={count} />
            <button type="button" onClick={(e) => minusCountHandler(e)}>-</button>
        </div>
    );
}

export default connect((state) => ({
    app: state.app,
}), (dispatch) => ({
    addCount(payload) {
        return dispatch(addCount(payload));
    },
    minusCount(payload) {
        return dispatch(minusCount(payload));
    },
}))(App);
