import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { reactLocalStorage } from 'reactjs-localstorage';
import { requestProfile } from '../../requests';
import { setIsLogin, setProfile } from '../../actions/user';
import SignUp from '../SignUp/Signup';
import Login from '../Login/Login';
import MenuBar from '../Menu/Menubar';
import MainCinema from './MainCinema';
import MenuList from '../Menu/MenuList';
import Contents from './Contents';
import SearchList from '../../containers/Search/SearchList';

const { Header, Content } = Layout;

class App extends Component {
   constructor(props) {
      super(props);

      // const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      // requestProfile(accessToken).then((profile) => {
      //    this.props.handleProfileUpdate(profile);
      //    this.props.handleLoginChange(true);
      // });
   }

   render() {
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
                     path="/search"
                     render={({ location }) => (
                        <SearchList location={location.search} />
                     )}
                  />
                  <Route
                     exact
                     path="/contents/:movie_id"
                     render={() => <Contents />}
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
                        <MenuList
                           paramsKey="genre"
                           location={location.search}
                        />
                     )}
                  />
                  <Route
                     path="/series"
                     render={({ location }) => (
                        <MenuList
                           paramsKey="title"
                           location={location.search}
                        />
                     )}
                  />
                  <Route exact path="/" render={() => <MainCinema />} />
               </Switch>
            </Content>
         </div>
      );
   }
}

const mapReduxStateToReactProps = () => {
   return {};
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
export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(App);