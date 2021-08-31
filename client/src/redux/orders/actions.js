import api from 'api';
import { order } from 'api/endpoints';
import { editCart } from 'redux/cart/actions';
import { ORDERS_BEGIN, FETCH_ORDERS, PLACE_ORDER, UPDATE_ORDER_STATUS } from 'redux/orders/types';

const { getOrders, postOrders, patchOrder } = order;

export const fetchOrders = () => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: ORDERS_BEGIN });
  const res = await api({ ...getOrders }, token);
  dispatch({
    type: FETCH_ORDERS,
    payload: res,
  });
};

export const placeOrder = (data, history) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  const cart = getState()?.cart?.data;
  dispatch({ type: ORDERS_BEGIN });
  const res = await api({ ...postOrders, data }, token);
  dispatch({
    type: PLACE_ORDER,
    payload: res,
  });
  if (!res.error) {
    dispatch(editCart({ cartId: cart.cartId, restaurantId: cart.restaurantId, items: [] }));
    history.push('/orders');
  }
};

export const editOrderStatus = (orderId, data) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: ORDERS_BEGIN });
  const res = await api({ ...patchOrder(orderId), data }, token);
  dispatch({
    type: UPDATE_ORDER_STATUS,
    payload: res,
  });
};
