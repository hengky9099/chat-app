import {SET_CHOOSEN_USER} from '../screen/dashboard/redux/action';
import {USER_DATA} from '../screen/login/redux/action';

const initialState = {};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        _user: action.payload,
      };
    case SET_CHOOSEN_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    // case LOG_OUT: {
    //   return {};
    // }
    default:
      return state;
  }
};
export default GlobalReducer;
