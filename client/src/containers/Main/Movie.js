import Movie from '../../components/Main/Movie';
import { setProfile } from '../../actions/user';
import { setContents } from '../../actions/contents';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer, contentsReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
      contents: contentsReducer.contents,
   };
};

const mapReduxDispatchToReactProps = (dispatch) => {
   return {
      handleProfileUpdate: (profile) => {
         dispatch(setProfile(profile));
      },
      handleSettingContents: (contents) => {
         dispatch(setContents(contents));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(Movie);
