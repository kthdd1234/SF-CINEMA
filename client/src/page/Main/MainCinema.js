import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spin, Input, Modal } from 'antd';
import axios from 'axios';
import ModalPage from './ModalPage';
import TopSlideShow from './TopSlideShow';
import DownSlideShow from './DownSlideShow';
import SFCINEMA from '../../SFCINEMA.png';
import './MainCinema.css';

const { Search } = Input;

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
      this.setState({ modalVisible: modalVisible });
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
            <div className="main-content-introduce">
               <div
                  style={{
                     position: 'absolute',
                  }}
               >
                  <div
                     className="main-title"
                     style={{
                        padding: '60px',
                     }}
                  >
                     <img
                        src={SFCINEMA}
                        style={{
                           borderRadius: '40px',
                           width: '200px',
                        }}
                     />
                     <h2
                        style={{
                           color: 'whitesmoke',
                           fontSize: '5em',
                           fontWeight: '700',
                           lineHeight: '1',
                           margin: '10px 0 0 0',
                           padding: '0px',
                        }}
                     >
                        Welcome.
                     </h2>
                     <h3
                        style={{
                           color: 'whitesmoke',
                           fontSize: '4em',
                           fontWeight: '600',
                           margin: '0px',
                           padding: '0px',
                        }}
                     >
                        lot of SF movies to discover. Explore now.
                     </h3>
                  </div>
               </div>
            </div>
            <div
               style={{
                  margin: '0 auto',
                  maxWidth: '1000px',
                  paddingTop: '50px',
               }}
            >
               <Search
                  placeholder="SF 영화, 시리즈물, 명작 검색..."
                  size="large"
                  enterButton
               />
            </div>

            {randomMovies.length ? (
               <TopSlideShow
                  randomMovies={randomMovies}
                  setModalVisible={this.setModalVisible}
                  handleCurrentMovie={this.handleCurrentMovie}
               />
            ) : (
               <center className="random-movies-spin">
                  <Spin size="large" />
               </center>
            )}

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
               title="SF CINEMA"
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               footer={null}
            >
               <ModalPage
                  currentMovie={currentMovie}
                  isLogin={this.props.isLogin}
               />
            </Modal>
         </div>
      );
   }
}
{
   /* <Trailer currentMovie={currentMovie} /> */
}
// eslint-disable-next-line
export default withRouter(MainCinema);
// eslint-disable-next-line
