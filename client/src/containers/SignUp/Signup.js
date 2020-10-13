import SignUp from '../../components/SignUp/SignUp';
import { connect } from 'react-redux';
import {
   setLoginID,
   setPassword,
   setConfirmPassword,
   setUsername,
} from '../../actions/user';
import { setBackground } from '../../actions/movie';

const mapReduxStateToReactProps = ({ userReducer, movieReducer }) => {
   return {
      background: movieReducer.background,
      loginID: userReducer.loginID,
      password: userReducer.password,
      confirmPassword: userReducer.confirmPassword,
      username: userReducer.username,
   };
};

const mapReduxDispatchToReactProps = (dispatch) => {
   return {
      handleBackgroundUpdate: (background) => {
         dispatch(setBackground(background));
      },
      handleInputLoginID: (e) => {
         dispatch(setLoginID(e.target.value));
      },
      handleInputPassword: (e) => {
         dispatch(setPassword(e.target.value));
      },
      handleInputConfirmPassword: (e) => {
         dispatch(setConfirmPassword(e.target.value));
      },
      handleInputUsername: (e) => {
         dispatch(setUsername(e.target.value));
      },
   };
};

export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(SignUp);
