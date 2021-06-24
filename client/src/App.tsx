import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { setIsLogin, setProfile } from './actions/user';
import { userProfile } from './components/Profile/request/profile';
import { Login, Navbar, Movie, Profile } from './containers'
import SignUp from './components/Auth/pages/SignUp';
import Explore from './components/Explore/Explore';
import Search from './components/Search/Search';
import Swiper from './components/Swiper/Swiper';
import MovieList from './components/Lists/Lists';

export interface IProps {
   handleProfileUpdate: Function;
   handleLoginChange: Function;
}

interface IRoutes {
   path: string;
   component: any;
}

const App = ({ handleProfileUpdate, handleLoginChange }: IProps) => {

   const Screen = () => {
      return (
         <div>
            <Swiper />
            <MovieList />
         </div>
      );
   };

   const routes: IRoutes[] = [
      {path: '/', component:  Screen},
      {path: '/signup', component: SignUp},
      {path: '/login',component: Login},
      {path: '/movies/:movie_id', component:Movie},
      {path: '/explore',component: Explore},
      {path: '/search', component:Search},
      {path: '/profile',component: Profile},
   ];
   


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
               <Route exact key={i} path={route.path} component={route.component} />
            ))}
            <Route path="/" component={() => <div>Not Found</div>} />
         </Switch>
      </div>
   );
};

const mapReduxDispatchToReactProps = (dispatch: Function) => {
   return {
      handleLoginChange: (isLogin: boolean) => {
         dispatch(setIsLogin(isLogin));
      },
      handleProfileUpdate: (profile: object) => {
         dispatch(setProfile(profile));
      },
   };
};

// eslint-disable-next-line
export default connect(null, mapReduxDispatchToReactProps)(App);
