import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { Layout } from 'antd';
import dotenv from 'dotenv';
import SignUp from '../SignUp/Signup';
import Login from '../Login/Login';
import MenuBar from '../Menu/Menubar';
import MainCinema from './MainCinema';
import MenuList from '../Menu/MenuList';
import Contents from './Contents';
import SearchList from '../../containers/Search/SearchList';
import { setIsLogin, setProfile } from '../../actions/setting';
dotenv.config();

const { Header, Content } = Layout;

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/main`,
});

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLogin: false,
         profile: {},
         currentMovie: {},
         searchResult: null,
      };
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
               this.setState({
                  profile: data,
               });
            });
         this.setState({
            isLogin: true,
         });
      }
   };

   handleLoginChange = () => {
      this.setState({ isLogin: !this.state.isLogin });
   };

   handleProfileUpdate = (data) => {
      this.setState({ profile: data });
   };

   axiosGenres = async (path, genre, limit) => {
      return await serverUrl
         .get(`${path}`, {
            params: {
               genre: genre,
               limit: limit,
            },
         })
         .then(({ data }) => {
            return data;
         });
   };

   axiosRequestHighlyRated = async (path, count, under, moreThen) => {
      return await serverUrl
         .get(`${path}`, {
            params: {
               ratedCount: count,
               ratedunder: under,
               ratedmoreThen: moreThen,
            },
         })
         .then(({ data }) => {
            return data;
         });
   };

   axiosRequestReleaseOrder = async (path, count, under, moreThen) => {
      return await serverUrl
         .get(`${path}`, {
            params: {
               yearCount: count,
               yearunder: under,
               yearmoreThen: moreThen,
            },
         })
         .then(({ data }) => {
            return data;
         });
   };

   axiosRequestSeries = async (path, seriesName) => {
      return await serverUrl
         .get(`${path}`, {
            params: {
               seriesName: seriesName,
            },
         })
         .then(({ data }) => {
            return data;
         });
   };
   axiosRequestOperatorMovies = async (path, count) => {
      return await serverUrl
         .get(`${path}`, {
            params: {
               count: count,
            },
         })
         .then(({ data }) => {
            return data;
         });
   };

   axiosRequestMasterpiece = async (path, count) => {
      return await serverUrl
         .get(`${path}`, {
            params: {
               count: count,
            },
         })
         .then(({ data }) => {
            return data;
         });
   };

   handleParamsList = (location) => {
      const queryList = [
         'key',
         'count',
         'under',
         'moreThen',
         'seriesName',
         'genre',
      ];
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

   handleCurrentMovie = () => {
      const url = window.location.pathname;
      const lastOfSlashIdx = url.lastIndexOf('/');
      const movieId = url.substring(lastOfSlashIdx + 1);

      return serverUrl
         .get('/contents', {
            params: {
               movieId: movieId,
            },
         })
         .then(({ data }) => {
            return data;
         });
   };

   handleSearchKeword = (keyword) => {
      return serverUrl
         .get('/searchMovie', {
            params: {
               keyword: keyword,
            },
         })
         .then(({ data }) => {
            if (data === 'Not Found') return;
            return data;
         });
   };

   handleSearchResult = (searchResult) => {
      this.setState({
         searchResult: searchResult,
      });
   };

   render() {
      const { isLogin, profile, backgroundImg } = this.state;
      // const { isLogin } = this.props;

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
                  <Route
                     exact
                     path="/login"
                     render={() => (
                        <Login
                           handleLoginChange={this.handleLoginChange}
                           handleProfileUpdate={this.handleProfileUpdate}
                        />
                     )}
                  />
                  <Route
                     exact
                     path="/search"
                     render={({ location }) => {
                        const keyword = new URLSearchParams(
                           location.search,
                        ).get('query');
                        const search = this.handleSearchKeword(keyword);

                        return (
                           <SearchList
                              keyword={keyword}
                              isLogin={isLogin}
                              profile={profile}
                              searchResult={search}
                           />
                        );
                     }}
                  />

                  <Route
                     exact
                     path={`/contents/:movie_id`}
                     render={() => {
                        const currentMovie = this.handleCurrentMovie();
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
                        const { genre, key } = paramsList;
                        const genres = this.axiosGenres('/genres', genre);
                        const MenuItem = this.handleMovieDataUpdate(genres);

                        return (
                           <MenuList
                              isLogin={isLogin}
                              profile={profile}
                              MenuItem={MenuItem}
                              secretKey={key}
                           />
                        );
                     }}
                  />

                  <Route
                     path="/highlyRated"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { count, under, moreThen, key } = paramsList;
                        const HighlyRated = this.axiosRequestHighlyRated(
                           '/highlyRated',
                           count,
                           under,
                           moreThen,
                        );
                        const MenuItem = this.handleMovieDataUpdate(
                           HighlyRated,
                        );

                        return (
                           <MenuList
                              isLogin={isLogin}
                              profile={profile}
                              MenuItem={MenuItem}
                              secretKey={key}
                           />
                        );
                     }}
                  />
                  <Route
                     path="/ReleaseOrder"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { count, under, moreThen, key } = paramsList;
                        const ReleaseOrder = this.axiosRequestReleaseOrder(
                           '/ReleaseOrder',
                           count,
                           under,
                           moreThen,
                        );
                        const MenuItem = this.handleMovieDataUpdate(
                           ReleaseOrder,
                        );

                        return (
                           <MenuList
                              isLogin={isLogin}
                              profile={profile}
                              MenuItem={MenuItem}
                              secretKey={key}
                           />
                        );
                     }}
                  />
                  <Route
                     path="/series"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { seriesName, key } = paramsList;
                        const series = this.axiosRequestSeries(
                           '/series',
                           seriesName,
                        );
                        const MenuItem = this.handleMovieDataUpdate(series);

                        return (
                           <MenuList
                              isLogin={isLogin}
                              profile={profile}
                              MenuItem={MenuItem}
                              secretKey={key}
                           />
                        );
                     }}
                  />
                  <Route
                     path="/operatorMovies"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { count, key } = paramsList;
                        const series = this.axiosRequestOperatorMovies(
                           '/operatorMovies',
                           count,
                        );
                        const MenuItem = this.handleMovieDataUpdate(series);

                        return (
                           <MenuList
                              isLogin={isLogin}
                              profile={profile}
                              MenuItem={MenuItem}
                              secretKey={key}
                           />
                        );
                     }}
                  />
                  <Route
                     path="/masterpiece"
                     render={({ location }) => {
                        const paramsList = this.handleParamsList(location);
                        const { count, key } = paramsList;
                        const series = this.axiosRequestMasterpiece(
                           '/masterpiece',
                           count,
                        );
                        const MenuItem = this.handleMovieDataUpdate(series);

                        return (
                           <MenuList
                              isLogin={isLogin}
                              profile={profile}
                              MenuItem={MenuItem}
                              secretKey={key}
                           />
                        );
                     }}
                  />
                  <Route
                     exact
                     path="/"
                     render={() => (
                        <MainCinema
                           axiosRequestHighlyRated={
                              this.axiosRequestHighlyRated
                           }
                           axiosRequestReleaseOrder={
                              this.axiosRequestReleaseOrder
                           }
                           axiosRequestSeries={this.axiosRequestSeries}
                           axiosRequestOperatorMovies={
                              this.axiosRequestOperatorMovies
                           }
                           axiosRequestMasterpiece={
                              this.axiosRequestMasterpiece
                           }
                           axiosGenres={this.axiosGenres}
                           handleCurrentMovie={this.handleCurrentMovie}
                           backgroundImg={backgroundImg}
                        />
                     )}
                  />
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
