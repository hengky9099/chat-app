// Action
export const USER_DATA = 'USER_DATA';

export const setDataUser = payload => {
  return {
    type: USER_DATA,
    payload,
  };
};

export const SetLoginEmail = data => {
  return {
    type: 'SET_LOGIN_EMAIL',
    payload: data,
  };
};

export const SetLoginPassword = data => {
  return {
    type: 'SET_LOGIN_PASSWORD',
    payload: data,
  };
};
