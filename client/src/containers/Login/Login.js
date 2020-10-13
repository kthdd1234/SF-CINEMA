import Login from '../../components/Login/Login';
import {
   setIsLogin,
   setProfile,
   setLoginID,
   setPassword,
} from '../../actions/user';
import { setBackground } from '../../actions/movie';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ movieReducer, userReducer }) => {
   return {
      background: movieReducer.background,
      loginID: userReducer.loginID,
      password: userReducer.password,
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
      handleBackgroundUpdate: (background) => {
         dispatch(setBackground(background));
      },
      handleInputLoginID: (e) => {
         dispatch(setLoginID(e.target.value));
      },
      handleInputPassword: (e) => {
         dispatch(setPassword(e.target.value));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(Login);

// 오리지널 컴포넌트는 화면에 표시하기 위한 집중 컴포넌트
// 리덕스와 상호 작용하게 만듬
