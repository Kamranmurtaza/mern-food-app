import { combineReducers } from 'redux';
import userReducer from 'redux/users/reducers';
import mealReducer from 'redux/meals/reducers';
import restaurantReducer from 'redux/restaurants/reducers';
import cartReducer from 'redux/cart/reducers';
import ordersReducer from 'redux/orders/reducers';
import blockUsersReducer from 'redux/block-users/reducers';

const rootReducers = combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  meals: mealReducer,
  cart: cartReducer,
  orders: ordersReducer,
  blockUsers: blockUsersReducer,
});

export default rootReducers;
