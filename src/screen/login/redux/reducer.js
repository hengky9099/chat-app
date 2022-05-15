const initialState = {
  email: '',
  password: '',
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_LOGIN_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};
