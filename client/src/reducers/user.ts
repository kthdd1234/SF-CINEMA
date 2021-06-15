import { SET_ISLOGIN, SET_PROFILE } from '../actions/user';

interface IAction {
   type?: string;
   isLogin?: boolean;
   profile?: object;
}

const initialState = {
   isLogin: false,
   profile: {},
};

const userReducer = (state = initialState, action: object) => {
   const { type, isLogin, profile }: IAction = action;

   switch (type) {
      case SET_ISLOGIN:
         return Object.assign({}, state, {
            isLogin: isLogin,
         });

      case SET_PROFILE:
         return Object.assign({}, state, {
            profile: profile,
         });

      default:
         return state;
   }
};

export default userReducer;
