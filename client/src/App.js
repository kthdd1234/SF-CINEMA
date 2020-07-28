// eslint-disable-next-line
import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
import Main from './page/Main/Main';
import Login from './page/Login/Login';
import Myinfo from './page/Myinfo/Myinfo';
import Subject from './page/Subject/Subject';
import Headers from './page/Main/Header';
import axios from 'axios';

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/main',
});

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   handleAxiosRequest = async (path, count, under, moreThen) => {
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

   handleMovieDataUpdate = async (movies) => {
      movies = await movies;
      console.log('봅시다', movies);
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
            <Headers
               handleMovieDataUpdate={this.handleMovieDataUpdate}
               handleRequestQuerys={this.handleRequestQuerys}
            />
            <Switch>
               <Route exact path="/main" render={() => <Main />} />
               <Route exact path="/login" render={() => <Login />} />
               <Route exact path="/myinfo" render={() => <Myinfo />} />
               <Route
                  path={`/highlyRated/rating`}
                  render={({ location }) => {
                     const queryList = ['key', 'count', 'under', 'moreThen'];
                     const paramsList = queryList.reduce((acc, cur) => {
                        acc[cur] = new URLSearchParams(location.search).get(
                           cur,
                        );
                        return acc;
                     }, {});

                     const { count, under, moreThen, key } = paramsList;

                     let subEachMoiveData = this.handleAxiosRequest(
                        '/highlyRated',
                        count,
                        under,
                        moreThen,
                     );
                     subEachMoiveData = this.handleMovieDataUpdate(
                        subEachMoiveData,
                     );

                     return (
                        <Subject
                           subEachMoiveData={subEachMoiveData}
                           secretKey={key}
                        />
                     );
                  }}
               />
               <Route exact path="/" render={() => <Main />} />
            </Switch>
         </div>
      );
   }
}

// eslint-disable-next-line
export default App;
