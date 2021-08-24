import api from 'api';
import { user } from 'api/endpoints';
import { AUTH_BEGIN, LOGIN, LOGOUT, REGISTER } from 'redux/users/types';

const { postLogin, postRegister } = user;

export const login = (data, history) => async (dispatch) => {
  dispatch({ type: AUTH_BEGIN });
  const res = await api({ ...postLogin, data });
  dispatch({
    type: LOGIN,
    payload: res,
  });
  history.push('/');
};

export const register = (data, history) => async (dispatch) => {
  dispatch({ type: AUTH_BEGIN });
  const res = await api({ ...postRegister, data });
  dispatch({
    type: REGISTER,
    payload: res,
  });
  history.push('/login');
};

export const logout = (history) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  history.push('/');
};
