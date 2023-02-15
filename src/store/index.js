import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';

import reducers from '../reducers';
import constants from '../constants';

/**
 * redux 中间件根据环境拼装集合
 * @type {(Middleware<ThunkDispatch<any, undefined, AnyAction>, any, ThunkDispatch<any, undefined, AnyAction>> & {withExtraArgument<ExtraThunkArg, State=any, BasicAction=AnyAction extends Action<any>>(extraArgument: ExtraThunkArg): ThunkMiddleware<State, BasicAction, ExtraThunkArg>})[]}
 */
const middleware = [thunkMiddleware].concat((process.env.NODE_ENV === constants.env.mode.development) ? loggerMiddleware : []);

// 添加 @redux-devtools/extensions 增强器
const composeEnhancers = composeWithDevTools({});

const storeApply = compose(composeEnhancers(), applyMiddleware(...middleware))(createStore);

const store = storeApply(reducers, {});

export default store;
