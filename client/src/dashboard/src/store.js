/**
 * Created by shenlin on 11/06/2017.
 */
import {applyMiddleware, createStore} from 'redux';
import promise  from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import allReducers from './reducers/allReducers';

const middleware = applyMiddleware(promise(), thunk, logger);

export default createStore(allReducers, middleware)