import ContentsModal from '../../components/Main/ContentsModal';
import { connect } from 'react-redux';
import { setProfile } from '../../actions/user';

const mapReduxStateToReactProps = ({ userReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
   };
};

const mapReduxDispatchToReactProps = (dispatch) => {
   return {
      handleProfileUpdate: (profile) => {
         dispatch(setProfile(profile));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(ContentsModal);
