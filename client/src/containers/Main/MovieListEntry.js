import MovieListEntry from '../../components/Main/MovieListEntry';
import { setProfile } from '../../actions/user';
import { connect } from 'react-redux';

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
)(MovieListEntry);