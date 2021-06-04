import Profile from '../../components/Auth/pages/Profile';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer }) => {
   return {
      profile: userReducer.profile,
   };
};

export default connect(mapReduxStateToReactProps)(Profile);
