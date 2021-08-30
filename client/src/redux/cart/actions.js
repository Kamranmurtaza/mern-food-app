import api from 'api';
import { cart } from 'api/endpoints';
import { CART_BEGIN, UPDATE_CART } from 'redux/cart/types';

const { getCart, patchCart } = cart;

export const fetchCart = (cartId) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: CART_BEGIN });
  const res = await api({ ...getCart(cartId) }, token);
  dispatch({
    type: UPDATE_CART,
    payload: res,
  });
};

export const editCart = (data) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: CART_BEGIN });
  const res = await api({ ...patchCart, data }, token);
  dispatch({
    type: UPDATE_CART,
    payload: res,
  });
};
