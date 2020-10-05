import MovieListEntry from '../../components/Main/MovieListEntry';
import { setProfile } from '../../actions/setting';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = (state) => {
   return {};
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
