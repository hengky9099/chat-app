import {combineReducers} from 'redux';
import {LoginReducer} from '../screen/login/redux/reducer';
import {RegisterReducer} from '../screen/register/redux/reducer';
// import {globalReducer} from './globalReducer';

export const allReducers = combineReducers({
  // global: globalReducer,
  login: LoginReducer,
  register: RegisterReducer,
});
