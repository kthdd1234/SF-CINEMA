import Menubar from '../../components/Menu/MenuBar';
import { connect } from 'react-redux';

const mapReduxStateToReactProps = ({ settingReducer }) => {
   return {
      isLogin: settingReducer.isLogin,
      profile: settingReducer.profile,
   };
};

export default connect(mapReduxStateToReactProps)(Menubar);
