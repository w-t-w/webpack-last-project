import { combineReducers } from 'redux';
import AppReducers from '../containers/app/app_reducers';

/**
 * combineReducers 合并各个 reducer 并导出
 * @type {Reducer<CombinedState<unknown>>}
 */
const reducers = combineReducers({
    app: AppReducers,
});

export default reducers;
