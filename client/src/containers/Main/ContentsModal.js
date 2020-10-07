import ContentsModal from '../../components/Main/ContentsModal';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
   };
};

export default connect(mapReduxStateToReactProps)(ContentsModal);
