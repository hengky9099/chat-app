import {combineReducers} from 'redux';
import {LoginReducer} from '../screen/login/redux/reducer';
import {RegisterReducer} from '../screen/register/redux/reducer';
import GlobalReducer from './globalReducer';
// import {globalReducer} from './globalReducer';

export const allReducers = combineReducers({
  global: GlobalReducer,
  login: LoginReducer,
  register: RegisterReducer,
});
