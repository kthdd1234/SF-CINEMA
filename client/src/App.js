import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { reactLocalStorage } from 'reactjs-localstorage';
import { requestProfile } from './requests';
import { setIsLogin, setProfile } from './actions/user';
import SignUp from './containers/SignUp/Signup';
import Login from './containers/Login/Login';
import MenuBar from './containers/Menu/Menubar';
import MainCinema from './containers/Main/MainCinema';
import MenuList from './containers/Menu/MenuList';
import Movie from './containers/Main/Movie';
import SearchList from './containers/Search/SearchList';

const { Header, Content } = Layout;

const App = () => {
   useEffect(() => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken)
         requestProfile(accessToken).then((profile) => {
            this.props.handleProfileUpdate(profile);
            this.props.handleLoginChange(true);
         });
   });

   return (
      <div>
         <Header>
            <MenuBar />
         </Header>
         <Content>
            <Switch>
               <Route exact path="/signup" render={() => <SignUp />} />
               <Route exact path="/login" render={() => <Login />} />
               <Route
                  exact
                  path="/contents/:movie_id"
                  render={() => <Movie />}
               />
               <Route exact path="/" render={() => <MainCinema />} />

               <Route
                  exact
                  path="/search"
                  render={({ location }) => (
                     <SearchList location={location.search} />
                  )}
               />

               <Route
                  path="/recommendation/:pathname"
                  render={({ location }) => (
                     <MenuList location={location.pathname} />
                  )}
               />
               <Route
                  path="/genre"
                  render={({ location }) => (
                     <MenuList paramsKey="genre" location={location.search} />
                  )}
               />
               <Route
                  path="/series"
                  render={({ location }) => (
                     <MenuList paramsKey="title" location={location.search} />
                  )}
               />
            </Switch>
         </Content>
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
