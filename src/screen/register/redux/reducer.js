const initialState = {
  email: '',
  password: '',
  name: '',
  bio: '',
};

export const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REGISTER_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_REGISTER_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
    case 'SET_REGISTER_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_REGISTER_BIO':
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
};
