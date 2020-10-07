import MainBackground from '../../components/Main/MainBackground';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
   };
};

export default connect(mapReduxStateToReactProps)(MainBackground);
