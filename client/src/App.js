// eslint-disable-next-line
import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Headers from './page/Main/Header';
import MainCinema from './page/Main/MainCinema';
import MenuItems from './page/Menu/MenuItems';
import Login from './page/Login/Login';
import MyInfo from './page/MyInfo/MyInfo';
import SignUp from './page/SignUp/SignUp';
import axios from 'axios';

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/main',
});

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

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
      const queryList = ['key', 'count', 'under', 'moreThen', 'seriesName'];
      const paramsList = queryList.reduce((acc, cur) => {
         acc[cur] = new URLSearchParams(location.search).get(cur);
         return acc;
      }, {});
      return paramsList;
   };

   handleMovieDataUpdate = async (movies) => {
      movies = await movies;
      console.log('서버 데이터 봅시다', movies);
      for (let i = 0; i < movies.length; i++) {
         let poster = JSON.parse(movies[i].posters);
         let actors = JSON.parse(movies[i].actors);
         let convertStrDate = String(movies[i].releaseDate);

         movies[i].posters = Array.isArray(poster) ? poster[0] : poster;
         movies[i].actors = actors.slice(0, 4).join(', ');
         movies[i].releaseYear = convertStrDate.slice(0, 4);
         movies[i].releaseDate = convertStrDate
            .replace(/(.{4})/, '$1.')
            .replace(/(.{7})/, '$1.');
      }
      return movies;
   };

   render() {
      return (
         <div>
            <Headers handleMovieDataUpdate={this.handleMovieDataUpdate} />
            <Switch>
               <Route
                  exact
                  path="/mainCinema"
                  render={() => (
                     <MainCinema
                        axiosRequestHighlyRated={this.axiosRequestHighlyRated}
                        axiosRequestReleaseOrder={this.axiosRequestReleaseOrder}
                        axiosRequestSeries={this.axiosRequestSeries}
                        axiosRequestOperatorMovies={
                           this.axiosRequestOperatorMovies
                        }
                        axiosRequestMasterpiece={this.axiosRequestMasterpiece}
                     />
                  )}
               />
               <Route exact path="/login" render={() => <Login />} />
               <Route exact path="/signUp" render={() => <SignUp />} />
               <Route exact path="/myInfo" render={() => <MyInfo />} />
               <Route
                  path="/highlyRated/rating"
                  render={({ location }) => {
                     const paramsList = this.handleParamsList(location);
                     const { count, under, moreThen, key } = paramsList;
                     const HighlyRated = this.axiosRequestHighlyRated(
                        '/highlyRated',
                        count,
                        under,
                        moreThen,
                     );
                     const MenuItem = this.handleMovieDataUpdate(HighlyRated);

                     return <MenuItems MenuItem={MenuItem} secretKey={key} />;
                  }}
               />
               <Route
                  path="/ReleaseOrder/year"
                  render={({ location }) => {
                     const paramsList = this.handleParamsList(location);
                     const { count, under, moreThen, key } = paramsList;
                     const ReleaseOrder = this.axiosRequestReleaseOrder(
                        '/ReleaseOrder',
                        count,
                        under,
                        moreThen,
                     );
                     const MenuItem = this.handleMovieDataUpdate(ReleaseOrder);

                     return <MenuItems MenuItem={MenuItem} secretKey={key} />;
                  }}
               />
               <Route
                  path="/series/seriesName"
                  render={({ location }) => {
                     const paramsList = this.handleParamsList(location);
                     const { seriesName, key } = paramsList;
                     const series = this.axiosRequestSeries(
                        '/series',
                        seriesName,
                     );
                     const MenuItem = this.handleMovieDataUpdate(series);

                     return <MenuItems MenuItem={MenuItem} secretKey={key} />;
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

                     return <MenuItems MenuItem={MenuItem} secretKey={key} />;
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

                     return <MenuItems MenuItem={MenuItem} secretKey={key} />;
                  }}
               />
               <Route
                  exact
                  path="/"
                  render={() => (
                     <MainCinema
                        axiosRequestHighlyRated={this.axiosRequestHighlyRated}
                        axiosRequestReleaseOrder={this.axiosRequestReleaseOrder}
                        axiosRequestSeries={this.axiosRequestSeries}
                        axiosRequestOperatorMovies={
                           this.axiosRequestOperatorMovies
                        }
                        axiosRequestMasterpiece={this.axiosRequestMasterpiece}
                     />
                  )}
               />
            </Switch>
         </div>
      );
   }
}

// eslint-disable-next-line
export default App;
// eslint-disable-next-line
