import Movie from '../components/Movie/Movie';
import { setProfile } from '../actions/user';
import { connect } from 'react-redux';
import { IReducer, IUser } from './Navbar'

const mapReduxStateToReactProps = ({ userReducer }: IReducer) => {
   const { isLogin,  profile}: IUser = userReducer

   return {
      isLogin: isLogin,
      profile: profile,
   };
};

const mapReduxDispatchToReactProps = (dispatch: Function) => {
   return {
      handleProfileUpdate: (profile: object) => {
         dispatch(setProfile(profile));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(Movie);
