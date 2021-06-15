import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { IReducer, IUser } from './Navbar'

const mapReduxStateToReactProps = ({ userReducer }: IReducer) => {
   const { profile }: IUser = userReducer

   return {
      profile: profile,
   };
};

export default connect(mapReduxStateToReactProps)(Profile);
