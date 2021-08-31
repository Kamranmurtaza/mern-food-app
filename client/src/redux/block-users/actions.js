import api from 'api';
import { blockUsers } from 'api/endpoints';
import { BLOCK_USERS_BEGIN, UPDATE_BLOCK_STATUS, GET_BLOCK_USERS } from 'redux/block-users/types';

const { getUsers, patchUsers } = blockUsers;

export const fetchBlockUsers = () => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: BLOCK_USERS_BEGIN });
  const res = await api({ ...getUsers }, token);
  dispatch({
    type: GET_BLOCK_USERS,
    payload: res,
  });
};

export const editBlockUsers = (data) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: BLOCK_USERS_BEGIN });
  const res = await api({ ...patchUsers, data }, token);
  dispatch({
    type: UPDATE_BLOCK_STATUS,
    payload: res,
  });
};
