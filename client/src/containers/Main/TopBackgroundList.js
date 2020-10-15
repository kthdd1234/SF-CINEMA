import MainBackground from '../../components/Main/TopBackgroundList';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer, movieReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
      background: movieReducer.background,
   };
};

export default connect(mapReduxStateToReactProps)(MainBackground);
