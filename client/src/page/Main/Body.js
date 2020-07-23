import React, { Component } from 'react';
import TopSlideShow from './TopSlideShow';
import DownSlideShow from './DownSlideShow';
import { Modal, Button } from 'antd';
import ModalPage from './ModalPage';
import axios from 'axios';

class Body extends Component {
   constructor(props) {
      super(props);
      this.state = {
         randomMovies: [],
         highlyRated: [],
         recentlyReleased: [],
         operatorMovies: [],
         masterpiece: [],
         series: [],
         modalVisible: false,
         currentMovie: {},
      };
   }
   async componentDidMount() {
      const path_list = [
         'randomMovies',
         'highlyRated',
         'recentlyReleased',
         'operatorMovies',
         'masterpiece',
      ];
      const series_title = ['매트릭스', '어벤져스', '터미네이터'];

      const serverUrl = axios.create({
         baseURL: 'http://localhost:5000/main',
      });

      path_list.forEach((path) => {
         serverUrl.get(`/${path}`).then(({ data }) => {
            this.setState({ [path]: data });
         });
      });

      let series_get_data = series_title.map((title) => {
         return serverUrl
            .get('/series', {
               params: {
                  tilte: title,
               },
            })
            .then((movies) => {
               return movies;
            });
      });
      series_get_data = await Promise.all(series_get_data);
      let series_movies = series_get_data.map((movie) => {
         return movie.data;
      });

      let array = [];
      for (let i = 0; i < 6; i++) {
         for (let j = 0; j < series_movies.length; j++) {
            let obj = series_movies[j][i];
            if (!obj) {
               array.push('');
            } else {
               array.push(obj);
            }
         }
      }
      this.setState({
         series: array,
      });
   }

   setModalVisible = (modalVisible) => {
      this.setState({ modalVisible });
   };

   handleCurrentMovie = (movie) => {
      this.setState({
         currentMovie: movie,
      });
   };

   render() {
      const {
         randomMovies,
         highlyRated,
         recentlyReleased,
         operatorMovies,
         masterpiece,
         series,
         modalVisible,
         currentMovie,
      } = this.state;

      return (
         <div>
            {randomMovies.length ? (
               <TopSlideShow
                  randomMovies={randomMovies}
                  setModalVisible={this.setModalVisible}
                  handleCurrentMovie={this.handleCurrentMovie}
               />
            ) : null}
            {masterpiece.length ? (
               <DownSlideShow
                  highlyRated={highlyRated}
                  recentlyReleased={recentlyReleased}
                  operatorMovies={operatorMovies}
                  masterpiece={masterpiece}
                  series={series}
                  setModalVisible={this.setModalVisible}
                  handleCurrentMovie={this.handleCurrentMovie}
               />
            ) : null}
            <Modal
               title="(로고) SF CINEMA"
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
            >
               {Object.keys(currentMovie).length ? (
                  <ModalPage currentMovie={currentMovie} />
               ) : null}
            </Modal>
         </div>
      );
   }
}

export default Body;
