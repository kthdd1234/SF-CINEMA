import { combineReducers } from 'redux';
import userReducer from './user';
import movieReducer from './movie';

export default combineReducers({
   userReducer,
   movieReducer,
});
