import Login from '../../components/Login/Login';
import { setIsLogin, setProfile } from '../../actions/setting';
import { connect } from 'react-redux';

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

export default connect(null, mapReduxDispatchToReactProps)(Login);

// 오리지널 컴포넌트는 화면에 표시하기 위한 집중 컴포넌트
// 리덕스와 상호 작용하게 만듬
