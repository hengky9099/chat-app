import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {allReducers} from './allReducers';

const allMiddleWares = applyMiddleware(thunk);

export const store = createStore(allReducers, {}, allMiddleWares);
