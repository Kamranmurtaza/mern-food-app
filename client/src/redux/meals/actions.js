import api from 'api';
import { meal } from 'api/endpoints';
import {
  ADD_MEAL,
  DELETE_MEAL,
  EDIT_MEAL,
  // FETCH_MEAL,
  FETCH_MEALS,
  MEAL_BEGIN,
} from 'redux/meals/types';

const {
  getMeals,
  postMeals,
  // getMeal,
  patchMeal,
  deleteMeal,
} = meal;

export const fetchMeals = (restaurantId) => async (dispatch) => {
  dispatch({ type: MEAL_BEGIN });
  const res = await api({ ...getMeals(restaurantId) });
  dispatch({
    type: FETCH_MEALS,
    payload: res,
  });
};

export const addMeal = (restaurantId, data) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: MEAL_BEGIN });
  const res = await api({ ...postMeals(restaurantId), data }, token);
  dispatch({
    type: ADD_MEAL,
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

export const editMeal = (restaurantId, mealId, data) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: MEAL_BEGIN });
  const res = await api({ ...patchMeal(restaurantId, mealId), data }, token);
  dispatch({
    type: EDIT_MEAL,
    payload: res,
  });
};

export const removeMeal = (restaurantId, mealId) => async (dispatch, getState) => {
  const token = getState()?.user?.data?.token;
  dispatch({ type: MEAL_BEGIN });
  const res = await api({ ...deleteMeal(restaurantId, mealId) }, token);
  dispatch({
    type: DELETE_MEAL,
    payload: res,
  });
};
