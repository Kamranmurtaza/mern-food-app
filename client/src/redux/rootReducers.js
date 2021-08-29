import { combineReducers } from 'redux';
import userReducer from 'redux/users/reducers';
import mealReducer from 'redux/meals/reducers';
import restaurantReducer from 'redux/restaurants/reducers';

const rootReducers = combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  meals: mealReducer,
});

export default rootReducers;
