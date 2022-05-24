import {applyMiddleware, createStore} from 'redux';
import {allReducers} from './allReducers';
import storage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const config = {
  key: 'chatapp',
  storage,
  timeout: null,
};

const persistedReducer = persistReducer(config, allReducers);
const allMiddleWares = applyMiddleware();

export const store = createStore(persistedReducer, {}, allMiddleWares);
export const Persistor = persistStore(store);
