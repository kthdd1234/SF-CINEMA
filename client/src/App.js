import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MenuBar from './page/Menu/MenuBar';
import MainCinema from './page/Main/MainCinema';
import MenuItems from './page/Menu/ItemList';
import Login from './page/Login/Login';
import SignUp from './page/SignUp/SignUp';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Layout } from 'antd';
import dotenv from 'dotenv';
dotenv.config();
const { Header, Content, Footer } = Layout;

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/main`,
});

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLogin: false,
         profile: {},
         NumberOfLikes: 0,
      };
   }

   componentDidMount = () => {
      console.log(process.env.REACT_APP_HOST);
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken) {
         this.setState({
            isLogin: true,
         });

         axios
            .get(`http://${process.env.REACT_APP_HOST}:5000/user/profile`, {
               headers: {
                  Authorization: 'Bearer ' + accessToken,
               },
            })
            .then(({ data }) => {
               this.setState({
                  profile: data,
               });
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

   render() {
      const { isLogin, profile, backgroundImg } = this.state;

      return (
         <div>
            <Layout
               style={{
                  background: 'rgb(20, 21, 23)',
               }}
            >
               <div
                  style={{
                     height: '4rem',
                  }}
               />
               <MenuBar
                  profile={profile}
                  isLogin={isLogin}
                  handleMovieDataUpdate={this.handleMovieDataUpdate}
                  handleLoginChange={this.handleLoginChange}
               />

               <Content className="site-layout-background">
                  <Switch>
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
                        path="/signUp"
                        render={() => <SignUp selectKey="signUp" />}
                     />
                     <Route
                        path="/genres"
                        render={({ location }) => {
                           const paramsList = this.handleParamsList(location);
                           const { genre, key } = paramsList;
                           const genres = this.axiosGenres('/genres', genre);
                           const MenuItem = this.handleMovieDataUpdate(genres);

                           return (
                              <MenuItems
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
                              <MenuItems
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
                              <MenuItems
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
                              <MenuItems
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
                              <MenuItems
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
                              <MenuItems
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
                              backgroundImg={backgroundImg}
                           />
                        )}
                     />
                  </Switch>
               </Content>
            </Layout>
         </div>
      );
   }
}

// eslint-disable-next-line
export default App;
// eslint-disable-next-line
