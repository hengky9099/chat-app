// Action
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
