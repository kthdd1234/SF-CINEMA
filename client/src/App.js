import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { requestProfile } from './requests';
import { setIsLogin, setProfile } from './actions/user';
import SignUp from './components/Auth/pages/SignUp';
import Login from './containers/Login/Login';
import MenuBar from './containers/Menu/Menubar';
import MainCinema from './containers/Main/MainCinema';
import MenuList from './containers/Menu/MenuList';
import Movie from './containers/Main/Movie';
import SearchList from './containers/Search/SearchList';
import Profile from './containers/Profile/profile';

const NotFound = () => {
   return <div>Not Found</div>;
};

const routes = [
   ['/', MainCinema],
   ['/signup', SignUp],
   ['/login', Login],
   ['/movies/:movie_id', Movie],
   ['/explore', MenuList],
   ['/search', SearchList],
   ['/profile', Profile],
];

const App = ({ handleProfileUpdate, handleLoginChange }) => {
   useEffect(() => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken)
         requestProfile(accessToken).then((profile) => {
            handleProfileUpdate(profile);
            handleLoginChange(true);
         });
   });

   return (
      <div>
         <MenuBar />
         <Switch>
            {routes.map((route, i) => (
               <Route exact key={i} path={route[0]} component={route[1]} />
            ))}
            <Route path="/" component={NotFound} />
         </Switch>
      </div>
   );
};

const mapReduxDispatchToReactProps = (dispatch) => {
   return {
      handleLoginChange: (isLogin) => {
         dispatch(setIsLogin(isLogin));
      },
      handleProfileUpdate: (profile) => {
         dispatch(setProfile(profile));
      },
   };
};

// eslint-disable-next-line
export default connect(null, mapReduxDispatchToReactProps)(App);
