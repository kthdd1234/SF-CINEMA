import SearchListEntry from '../../components/Search/SearchListEntry';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ userReducer }) => {
   return {
      isLogin: userReducer.isLogin,
      profile: userReducer.profile,
   };
};

export default connect(mapReduxStateToReactProps)(SearchListEntry);
