import {
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  // FETCH_MEAL,
  FETCH_MEALS,
  MEAL_BEGIN,
} from 'redux/meals/types';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const mealReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MEAL_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_MEALS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case ADD_MEAL:
      return {
        ...state,
        data: [...state.data, payload.data],
        error: payload.error,
        isLoading: false,
      };
    case EDIT_MEAL:
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
    case DELETE_MEAL:
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

export default mealReducer;
