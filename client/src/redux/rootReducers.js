import { combineReducers } from 'redux';
import userReducer from 'redux/users/reducers';
import mealReducer from 'redux/meals/reducers';
import restaurantReducer from 'redux/restaurants/reducers';
import cartReducer from 'redux/cart/reducers';

const rootReducers = combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  meals: mealReducer,
  cart: cartReducer,
});

export default rootReducers;
