import { AUTH_BEGIN, LOGIN, LOGOUT, REGISTER } from 'redux/users/types';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case REGISTER:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        data: null,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
