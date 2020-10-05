import Profile from '../../components/Profile/Profile';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ settingReducer }) => {
   return {
      profile: settingReducer.profile,
   };
};

export default connect(mapReduxStateToReactProps)(Profile);
