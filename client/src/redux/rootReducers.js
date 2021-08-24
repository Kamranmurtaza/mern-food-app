import { combineReducers } from 'redux';
import userReducer from 'redux/users/reducers';

const rootReducers = combineReducers({
  user: userReducer,
});

export default rootReducers;
