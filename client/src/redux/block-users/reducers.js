import { BLOCK_USERS_BEGIN, UPDATE_BLOCK_STATUS, GET_BLOCK_USERS } from 'redux/block-users/types';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const blockUsersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLOCK_USERS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_BLOCK_USERS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case UPDATE_BLOCK_STATUS:
      let editData = [...state.data];
      if (payload.data) {
        editData = editData.map((user) => {
          if (user._id === payload.data._id) {
            return {
              ...user,
              block: payload.data.block,
            };
          }
          return user;
        });
      }
      return {
        ...state,
        data: editData,
        error: payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default blockUsersReducer;
