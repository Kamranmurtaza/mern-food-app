import { ORDERS_BEGIN, FETCH_ORDERS, PLACE_ORDER, UPDATE_ORDER_STATUS } from 'redux/orders/types';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const ordersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDERS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ORDERS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case PLACE_ORDER:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case UPDATE_ORDER_STATUS:
      let editData = [...state.data];
      if (payload.data) {
        editData = editData.map((item) => {
          if (item._id === payload.data._id) {
            return {
              ...item,
              status: payload.data.status,
            };
          }
          return item;
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

export default ordersReducer;
