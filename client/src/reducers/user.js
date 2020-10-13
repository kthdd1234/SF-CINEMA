import {
   SET_ISLOGIN,
   SET_PROFILE,
   SET_LOGINID,
   SET_PASSWORD,
   SET_CONFIRMPASSWORD,
   SET_USERNAME,
   SET_PROFILEIMG,
} from '../actions/user';

const initialState = {
   isLogin: false,
   profile: {},
   loginID: '',
   password: '',
   confirmPassword: '',
   username: '',
};

const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ISLOGIN:
         return Object.assign({}, state, {
            isLogin: action.isLogin,
         });

      case SET_PROFILE:
         return Object.assign({}, state, {
            profile: action.profile,
         });

      case SET_LOGINID:
         return Object.assign({}, state, {
            loginID: action.loginID,
         });

      case SET_PASSWORD:
         return Object.assign({}, state, {
            password: action.password,
         });

      case SET_CONFIRMPASSWORD:
         return Object.assign({}, state, {
            confirmPassword: action.confirmPassword,
         });

      case SET_USERNAME:
         return Object.assign({}, state, {
            username: action.username,
         });

      default:
         return state;
   }
};

export default userReducer;
