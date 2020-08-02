import React, { Component } from 'react';
import TopSlideShow from './TopSlideShow';
import DownSlideShow from './DownSlideShow';
import { Modal, Button } from 'antd';
import ModalPage from './ModalPage';
import axios from 'axios';

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/main',
});

class MainCinema extends Component {
   constructor(props) {
      super(props);
      this.state = {
         randomMovies: [],
         highlyRated: [],
         releaseOrder: [],
         operatorMovies: [],
         masterpiece: [],
         series: [],
         modalVisible: false,
         currentMovie: {},
      };
   }
   async componentDidMount() {
      const {
         axiosRequestHighlyRated,
         axiosRequestReleaseOrder,
         axiosRequestSeries,
         axiosRequestOperatorMovies,
         axiosRequestMasterpiece,
      } = this.props;
      const seriesSeriesNameList = ['매트릭스', '어벤져스', '터미네이터'];

      /* 랜덤 영화 데이터 50개 */
      serverUrl.get('/randomMovies').then(({ data }) => {
         this.setState({
            randomMovies: data,
         });
      });

      /* 평점 높은순 */
      const highlyRated = await axiosRequestHighlyRated(
         '/highlyRated',
         100,
         10,
         9,
      );
      this.setState({ highlyRated: highlyRated });

      /* 개봉 영화순 */
      const releaseOrder = await axiosRequestReleaseOrder(
         '/releaseOrder',
         100,
         20210000,
         20180000,
      );
      this.setState({ releaseOrder: releaseOrder });

      /* 운영자가 추천하는 SF 영화*/
      const operatorMovies = await axiosRequestOperatorMovies(
         '/operatorMovies',
         24,
      );
      this.setState({ operatorMovies: operatorMovies });

      /* 주말에 몰아보기 좋은 SF 명작 추천 */
      const masterpiece = await axiosRequestMasterpiece('/masterpiece', 24);
      this.setState({ masterpiece: masterpiece });

      /* SF 시리즈물 강력 추천(Top3) */
      const seriesMovieList = await Promise.all(
         seriesSeriesNameList.map((seriesName) =>
            axiosRequestSeries('/series', seriesName),
         ),
      );
      const resultMovieList = this.handleSeriesList(seriesMovieList);
      this.setState({
         series: resultMovieList,
      });
   }

   handleSeriesList = (seriesMovieList) => {
      const maxSeriesMovies = seriesMovieList.reduce((acc, cur) => {
         if (acc.length >= cur.length) {
            return acc;
         } else {
            return cur;
         }
      });

      const seriesList = maxSeriesMovies.flatMap((arr, i) => {
         return seriesMovieList.map((obj, j) => {
            const movie = seriesMovieList[j][i];
            return !movie ? '' : movie;
         });
      });
      return seriesList;
   };

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
         releaseOrder,
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
                  releaseOrder={releaseOrder}
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

// eslint-disable-next-line
export default MainCinema;
// eslint-disable-next-line
