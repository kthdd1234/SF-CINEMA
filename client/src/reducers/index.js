import { combineReducers } from 'redux';
import userReducer from './user';
import movieReducer from './movie';
import contentsReducer from './contents';
import searchReducer from './search';

export default combineReducers({
   userReducer,
   movieReducer,
   contentsReducer,
   searchReducer,
});
