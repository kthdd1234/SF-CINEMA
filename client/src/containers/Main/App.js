import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { Layout } from 'antd';
import dotenv from 'dotenv';
import {
   requestCurrentMovie,
   requestSearchKeword,
   requestHighlyRated,
   requestGenres,
   requestOperatorMovies,
   requestMasterpiece,
   requestSeries,
   requestReleaseOrder,
} from '../../requests';
import SignUp from '../SignUp/Signup';
import Login from '../Login/Login';
import MenuBar from '../Menu/Menubar';
import MainCinema from './MainCinema';
import MenuList from '../Menu/MenuList';
import Contents from './Contents';
import SearchList from '../../containers/Search/SearchList';
import { setIsLogin, setProfile } from '../../actions/user';
dotenv.config();

const { Header, Content } = Layout;

class App extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount = () => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken) {
         axios
            .get(`http://${process.env.REACT_APP_HOST}:5000/user/profile`, {
               headers: {
                  Authorization: 'Bearer ' + accessToken,
               },
            })
            .then(({ data }) => {
               this.props.handleLoginChange(true);
               this.props.handleProfileUpdate(data);
            });
      }
   };

   handleParamsList = (location) => {
      const queryList = ['count', 'under', 'moreThen', 'title', 'genre'];
      const paramsList = queryList.reduce((acc, cur) => {
         acc[cur] = new URLSearchParams(location.search).get(cur);
         return acc;
      }, {});

      return paramsList;
   };

   handleMovieDataUpdate = async (movies) => {
      movies = await movies;

      for (let i = 0; i < movies.length; i++) {
         let actors = JSON.parse(movies[i].actors);
         let convertStrDate = String(movies[i].releaseDate);

         movies[i].actors = actors.slice(0, 4).join(', ');
         movies[i].releaseYear = convertStrDate.slice(0, 4);
      }

      return movies;
   };

   render() {
      return (
         <div>
            <Header>
               <MenuBar />
            </Header>
            <Content>
               <Switch>
                  <Route
                     exact
                     path="/signUp"
                     render={() => <SignUp selectKey="signUp" />}
                  />
                  <Route exact path="/login" render={() => <Login />} />
                  <Route
                     exact
                     path="/search"
                     render={({ location }) => {
                        const keyword = new URLSearchParams(
                           location.search,
                        ).get('query');
                        const searchResult = requestSearchKeword(keyword);

                        return (
                           <SearchList
                              keyword={keyword}
                              searchResult={searchResult}
                           />
                        );
                     }}
                  />

                  <Route
                     exact
                     path="/contents/:movie_id"
                     render={() => {
                        const currentMovie = requestCurrentMovie();
                        const updateMovie = this.handleMovieDataUpdate(
                           currentMovie,
                        );
                        return <Contents currentMovie={updateMovie} />;
                     }}
                  />
                  <Route
                     path="/genres"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { genre } = paramsList;
                        const genres = requestGenres(genre);
                        const MenuItem = this.handleMovieDataUpdate(genres);

                        return <MenuList MenuItem={MenuItem} key={genre} />;
                     }}
                  />

                  <Route
                     path="/rating"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { under, moreThen } = paramsList;
                        const HighlyRated = requestHighlyRated(under, moreThen);
                        const MenuItem = this.handleMovieDataUpdate(
                           HighlyRated,
                        );

                        return (
                           <MenuList MenuItem={MenuItem} key="highlyRated" />
                        );
                     }}
                  />
                  <Route
                     path="/date"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { under, moreThen } = paramsList;
                        const ReleaseOrder = requestReleaseOrder(
                           under,
                           moreThen,
                        );
                        const MenuItem = this.handleMovieDataUpdate(
                           ReleaseOrder,
                        );

                        return (
                           <MenuList MenuItem={MenuItem} key="ReleaseOrder" />
                        );
                     }}
                  />
                  <Route
                     path="/series"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { title } = paramsList;
                        const movieList = requestSeries(title);
                        const MenuItem = this.handleMovieDataUpdate(movieList);

                        return <MenuList MenuItem={MenuItem} key={title} />;
                     }}
                  />
                  <Route
                     path="/operator"
                     render={({ location }) => {
                        const movieList = requestOperatorMovies();
                        const MenuItem = this.handleMovieDataUpdate(movieList);

                        return (
                           <MenuList MenuItem={MenuItem} key="operatorMovies" />
                        );
                     }}
                  />
                  <Route
                     path="/masterpiece"
                     render={({ location }) => {
                        const movieList = requestMasterpiece();
                        const MenuItem = this.handleMovieDataUpdate(movieList);

                        return (
                           <MenuList MenuItem={MenuItem} key="masterpiece" />
                        );
                     }}
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
