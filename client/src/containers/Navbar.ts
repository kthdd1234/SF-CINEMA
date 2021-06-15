import Navbar from '../components/Navbar/Navbar';
import { connect } from 'react-redux';
import { setIsLogin, setProfile } from '../actions/user';

export interface IReducer{
   userReducer: object;
}

export interface IUser  {
   isLogin?: boolean;
   profile?: object;
}

const mapReduxStateToReactProps = ({ userReducer }: IReducer) => {
   const { isLogin,  profile }: IUser = userReducer
   
   return {
      isLogin: isLogin,
      profile: profile,
   };
};

const mapReduxDispatchToReactProps = (dispatch: Function) => {
   return {
      handleLoginChange: (isLogin: boolean) => {
         dispatch(setIsLogin(isLogin));
      },
      handleProfileUpdate: (profile: object) => {
         dispatch(setProfile(profile));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(Navbar);
