import { combineReducers } from 'redux';
import settingReducer from './setting';
import videoReducer from './video';

export default combineReducers({
   settingReducer,
   videoReducer,
});
