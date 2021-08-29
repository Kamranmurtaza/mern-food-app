import {
  ADD_RESTAURANT,
  DELETE_RESTAURANT,
  EDIT_RESTAURANT,
  // FETCH_RESTAURANT,
  FETCH_RESTAURANTS,
  RESTAURANT_BEGIN,
} from 'redux/restaurants/types';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const restaurantReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESTAURANT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_RESTAURANTS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case ADD_RESTAURANT:
      const addData = payload.data ? [...state.data, payload.data] : state.data;
      return {
        ...state,
        data: addData,
        error: payload.error,
        isLoading: false,
      };
    case EDIT_RESTAURANT:
      const editData = [...state.data];
      if (payload.data) {
        editData[state.data.findIndex((el) => el._id === payload.data._id)] = payload.data;
      }
      return {
        ...state,
        data: editData,
        error: payload.error,
        isLoading: false,
      };
    case DELETE_RESTAURANT:
      let deleteData = [...state.data];
      if (payload.data) {
        deleteData = state.data.filter((el) => el._id !== payload.data._id);
      }
      return {
        ...state,
        data: deleteData,
        error: payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
