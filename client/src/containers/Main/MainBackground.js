import MainBackground from '../../components/Main/MainBackground';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer, movieReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
      background: movieReducer.background,
   };
};

export default connect(mapReduxStateToReactProps)(MainBackground);
