import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { setIsLogin, setProfile } from './actions/user';
import { userProfile } from './components/Profile/request/profile';
import Login from './containers/Login';
import Navbar from './containers/Navbar';
import Movie from './containers/Movie';
import Profile from './containers/Profile';
import SignUp from './components/Auth/pages/SignUp';
import Explore from './components/Explore/Explore';
import Search from './components/Search/Search';
import Swiper from './components/Swiper/Swiper';
import MovieList from './components/Lists/Lists';

const NotFound = () => {
   return <div>Not Found</div>;
};

const Screen = () => {
   return (
      <div>
         <Swiper />
         <MovieList />
      </div>
   );
};

const routes = [
   ['/', Screen],
   ['/signup', SignUp],
   ['/login', Login],
   ['/movies/:movie_id', Movie],
   ['/explore', Explore],
   ['/search', Search],
   ['/profile', Profile],
];

const App = ({ handleProfileUpdate, handleLoginChange }) => {
   useEffect(() => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken)
         userProfile(accessToken).then((profile) => {
            handleProfileUpdate(profile);
            handleLoginChange(true);
         });
   });

   return (
      <div>
         <Navbar />
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
