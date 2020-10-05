import { SET_ISLOGIN, SET_PROFILE } from '../actions/setting';

const initialState = {
   isLogin: false,
   profile: {},
};

const settingReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ISLOGIN:
         return Object.assign({}, state, {
            isLogin: action.isLogin,
         });

      case SET_PROFILE:
         return Object.assign({}, state, {
            profile: action.profile,
         });
      default:
         return state;
   }
};

export default settingReducer;
