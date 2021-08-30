import { CART_BEGIN, UPDATE_CART } from 'redux/cart/types';

const initialState = {
  data: null,
  error: null,
  isLoading: false,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_CART:
      let getData = { ...state.data };
      if (payload.data) {
        getData = {
          cartId: payload.data._id,
          restaurantId: payload.data.restaurant,
          items: payload.data.items,
        };
      }
      return {
        ...state,
        data: getData,
        error: payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
