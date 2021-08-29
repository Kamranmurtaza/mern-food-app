import api from 'api';
import { restaurant } from 'api/endpoints';
import {
  ADD_RESTAURANT,
  DELETE_RESTAURANT,
  EDIT_RESTAURANT,
  // FETCH_RESTAURANT,
  FETCH_RESTAURANTS,
  RESTAURANT_BEGIN,
} from 'redux/restaurants/types';

const {
  getRestaurants,
  postRestaurants,
  // getRestaurant,
  patchRestaurant,
  deleteRestaurant,
} = restaurant;

export const fetchRestaurants = (ownerId) => async (dispatch) => {
  dispatch({ type: RESTAURANT_BEGIN });
  const res = await api({ ...getRestaurants(ownerId) });
  dispatch({
    type: FETCH_RESTAURANTS,
    payload: res,
  });
};

export const addRestaurant = (data) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: RESTAURANT_BEGIN });
  const res = await api({ ...postRestaurants, data }, token);
  dispatch({
    type: ADD_RESTAURANT,
    payload: res,
  });
};

// export const fetchRestaurant = (restaurantId) => async (dispatch) => {
//   dispatch({ type: RESTAURANT_BEGIN });
//   const res = await api({ ...getRestaurant(restaurantId) });
//   dispatch({
//     type: FETCH_RESTAURANT,
//     payload: res,
//   });
// };

export const editRestaurant = (restaurantId, data) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: RESTAURANT_BEGIN });
  const res = await api({ ...patchRestaurant(restaurantId), data }, token);
  dispatch({
    type: EDIT_RESTAURANT,
    payload: res,
  });
};

export const removeRestaurant = (restaurantId) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: RESTAURANT_BEGIN });
  const res = await api({ ...deleteRestaurant(restaurantId) }, token);
  dispatch({
    type: DELETE_RESTAURANT,
    payload: res,
  });
};
