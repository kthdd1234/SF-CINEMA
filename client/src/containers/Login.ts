import Login from '../components/Auth/pages/Login';
import { setIsLogin, setProfile } from '../actions/user';
import { connect } from 'react-redux';

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

export default connect(null, mapReduxDispatchToReactProps)(Login);

// 오리지널 컴포넌트는 화면에 표시하기 위한 집중 컴포넌트
// 리덕스와 상호 작용하게 만듬
