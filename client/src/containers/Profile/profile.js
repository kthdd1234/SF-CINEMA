import Profile from '../../components/Profile/Profile';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer }) => {
   return {
      profile: userReducer.profile,
   };
};

export default connect(mapReduxStateToReactProps)(Profile);
