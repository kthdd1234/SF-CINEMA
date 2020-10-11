import Menubar from '../../components/Menu/MenuBar';
import { connect } from 'react-redux';
import { setIsLogin, setProfile } from '../../actions/user';

const mapReduxStateToReactProps = ({ userReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
   };
};

const mapReduxDispatchToReactProps = (dispatch) => {
   return {
      handleLoginChange: (isLogin) => {
         dispatch(setIsLogin(isLogin));
      },
      handleProfileUpdate: (profile) => {
         dispatch(setProfile(profile));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(Menubar);
