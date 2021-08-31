import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { setIsLogin, setProfile } from './features/Auth/authSlice';
import { userProfile } from './features/Profile/request/profile';
import {
   Profile,
   Navbar,
   Movie,
   Login,
   SignUp,
   Explore,
   Search,
   Swiper,
   MovieList,
} from './features';

const Screen = () => {
   return (
      <div>
         <Swiper />
         <MovieList />
      </div>
   );
};

interface IRoutes {
   path: string;
   component: any;
}

const App = () => {
   const routes: IRoutes[] = [
      { path: '/', component: Screen },
      { path: '/signup', component: SignUp },
      { path: '/login', component: Login },
      { path: '/movies/:movie_id', component: Movie },
      { path: '/explore', component: Explore },
      { path: '/search', component: Search },
      { path: '/profile', component: Profile },
   ];

   const dispatch = useDispatch();

   useEffect(() => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken)
         userProfile(accessToken).then((profile) => {
            dispatch(setIsLogin(true));
            dispatch(setProfile(profile));
         });
   });

   return (
      <div>
         <Navbar />
         <Switch>
            {routes.map(({ path, component }, i) => (
               <Route exact key={i} path={path} component={component} />
            ))}
            <Route path="/" component={() => <div>Not Found</div>} />
         </Switch>
      </div>
   );
};

export default App;
