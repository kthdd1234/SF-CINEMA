import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spin, Modal, Button, Carousel } from 'antd';
import {
   ZoomInOutlined,
   PlayCircleOutlined,
   CloseOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import ModalPage from './ModalPage';
import RandomMovies from './RandomMovies';
import MovieCardList from './MovieCardList';
import SearchBar from './SearchBar';
import SFCINEMA from '../../SFCINEMA.png';
import MainBackground from './MainBackground';
import './MainCinema.css';
import { seriesList } from './seriesList';
import Trailer from './Trailer';
import $ from 'jquery';
import dotenv from 'dotenv';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://54.180.32.31:5000/main`,
});

class MainCinema extends Component {
   constructor(props) {
      super(props);

      this.state = {
         profile: {},
         isLogin: false,
         backgroundImg: [],
         randomMovies: [],
         highlyRated: [],
         aliensMovies: [],
         superHeroMovies: [],
         operatorMovies: [],
         masterpiece: [],
         series: [],
         modalVisible: false,
         currentMovie: null,
         numberOfLikes: 0,
         imgList: [],
         searchResult: [],
         keyword: '',
         drawerVisible: false,
         tralierShow: false,
         videoId: '',
      };
   }

   async componentDidMount() {
      const {
         axiosRequestHighlyRated,
         axiosRequestReleaseOrder,
         axiosRequestSeries,
         axiosRequestOperatorMovies,
         axiosRequestMasterpiece,
         axiosGenres,
      } = this.props;

      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken) {
         this.setState({
            isLogin: true,
         });
         axios
            .get('http://54.180.32.31:5000/user/profile', {
               headers: {
                  Authorization: 'Bearer ' + accessToken,
               },
            })
            .then(async ({ data }) => {
               const userInfo = await data;
               console.log(userInfo);
               this.setState({
                  profile: userInfo,
               });
            });
      }

      /*  백그라운드 이미지 */
      serverUrl.get('/backgroundImg').then(({ data }) => {
         this.setState({
            backgroundImg: data,
         });
      });

      /* 랜덤 영화 데이터 50개 */
      serverUrl.get('/randomMovies').then(({ data }) => {
         this.setState({
            randomMovies: data,
         });
      });

      /* 별점이 9점 이상인 영화 */
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

      /* 외계인 영화 추천 */
      const aliensMovies = await axiosGenres('/genres', '외계인', 15);
      this.setState({
         aliensMovies: aliensMovies,
      });

      /* 슈퍼히어로 영화 추천 */
      const superHeroMovies = await axiosGenres('/genres', '슈퍼 히어로', 15);
      this.setState({
         superHeroMovies: superHeroMovies,
      });

      /* 운영자가 추천하는 SF 영화*/
      const operatorMovies = await axiosRequestOperatorMovies(
         '/operatorMovies',
         21,
      );
      this.setState({ operatorMovies: operatorMovies });

      /* 주말에 몰아보기 좋은 SF 명작 추천 */
      const masterpiece = await axiosRequestMasterpiece('/masterpiece', 21);
      this.setState({ masterpiece: masterpiece });

      /* SF 시리즈물 강력 추천(Top3) */
      const seriesNames = seriesList();
      const seriesMovieList = await Promise.all(
         seriesNames.map((seriesName) =>
            axiosRequestSeries('/series', seriesName),
         ),
      );

      const resultMovieList = this.handleSeriesList(seriesMovieList).reduce(
         (acc, cur) => {
            return acc.concat(cur);
         },
      );

      this.setState({
         series: resultMovieList,
      });
   }

   handleSeriesList = (seriesMovieList) => {
      for (let i = 0; i < seriesMovieList.length; i++) {
         for (let j = 0; j < 7; j++) {
            if (!seriesMovieList[i][j]) {
               seriesMovieList[i].push(null);
            }
         }
      }

      return seriesMovieList;
   };

   setModalVisible = (modalVisible) => {
      if (!modalVisible) {
         this.setState({
            pause: false,
         });
      }
      this.setState({
         modalVisible,
      });
   };

   handleCurrentMovie = (movie) => {
      this.setState({
         currentMovie: movie,
         numberOfLikes: movie.numberOfLikes,
      });
   };

   setModalTrailerVisible(tralierShow) {
      if (tralierShow === false) {
         $(`.${this.state.videoId}`)[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
         this.setState({
            pause: false,
         });
      }
      this.setState({ tralierShow });
   }

   handleNumberOfLikesIncrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes + 1,
         likeFilled: true,
      });
   };

   handleNumberOfLikesDecrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes - 1,
         likeFilled: false,
      });
   };

   render() {
      const {
         backgroundImg,
         randomMovies,
         highlyRated,
         operatorMovies,
         masterpiece,
         series,
         modalVisible,
         currentMovie,
         imgList,
         aliensMovies,
         superHeroMovies,
         videoId,
         numberOfLikes,
         isLogin,
         profile,
      } = this.state;

      return (
         <div>
            <MainBackground
               isLogin={isLogin}
               profile={profile}
               backgroundImg={backgroundImg}
            />
            {/* <div className="top-layout">
               <Carousel
                  effect="fade"
                  infinite={true}
                  dots={false}
                  arrows={false}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  speed={4000}
                  autoplaySpeed={3000}
                  pauseOnHover={false}
               >
                  <div className="background-container">
                     <div className="main-box-background-images">
                        <div className="background-left-shadow" />
                        <img
                           className="main-background-images"
                           src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/yBG2J4dMnUViwfF1crq0b7xystj.jpg`}
                        />
                     </div>
                     <div className="introduce">
                        <div className="introduce-wrap">
                           <img className="introduce-logo" src={SFCINEMA} />

                           <h2 className="introduce-title">Welcome.</h2>
                           <h3 className="introduce-description">
                              lot of SF movies to discover.
                              <div>Explore now.</div>
                           </h3>
                        </div>
                     </div>
                  </div>
                  {backgroundImg.map((movieData, i) => (
                     <div className="background-container" key={i}>
                        <div className="main-box-background-images">
                           <div className="background-left-shadow" />
                           <img
                              className="main-background-images"
                              src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${movieData.backgroundImg}`}
                           />
                        </div>
                        <div className="movie-content">
                           <div className="content-wrap">
                              <h2 className="content-title">
                                 {movieData.movie.title}
                              </h2>
                              <h4 className="content-titleEng">
                                 {movieData.movie.titleEng}
                              </h4>
                           </div>
                           <div className="content-list">
                              <div>
                                 <span className="content-rating">
                                    ⭐ {movieData.movie.userRating}
                                 </span>
                                 <span className="content-genre">
                                    {movieData.movie.genre}
                                 </span>
                                 <span className="content-genre">
                                    {String(movieData.movie.releaseDate).slice(
                                       0,
                                       4,
                                    )}
                                 </span>
                              </div>
                              <div className="content-btn">
                                 <Button
                                    type="ghost"
                                    icon={<ZoomInOutlined />}
                                    className="detail-info-btn"
                                    onClick={() => {
                                       this.setModalVisible(true);
                                       this.handleCurrentMovie(movieData.movie);
                                    }}
                                 >
                                    상세정보
                                 </Button>
                                 <Button
                                    type="ghost"
                                    icon={<PlayCircleOutlined />}
                                    className="show-trailer-btn"
                                    onClick={() => {
                                       this.setModalTrailerVisible(true);
                                       this.setState({
                                          videoId: movieData.movie.videoId,
                                       });
                                    }}
                                 >
                                    예고편
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </Carousel>
               <Modal
                  title={<img src={SFCINEMA} className="small-logo" />}
                  centered
                  width={1150}
                  visible={modalVisible}
                  onOk={() => this.setModalVisible(false)}
                  onCancel={() => this.setModalVisible(false)}
                  maskClosable={false}
                  footer={null}
               >
                  <ModalPage
                     isLogin={isLogin}
                     profile={profile}
                     currentMovie={currentMovie}
                     numberOfLikes={numberOfLikes}
                     handleNumberOfLikesIncrease={
                        this.handleNumberOfLikesIncrease
                     }
                     handleNumberOfLikesDecrease={
                        this.handleNumberOfLikesDecrease
                     }
                  />
               </Modal>

               <Modal
                  visible={this.state.tralierShow}
                  onOk={() => this.setModalTrailerVisible(false)}
                  onCancel={() => this.setModalTrailerVisible(false)}
                  footer={null}
                  width={1300}
               >
                  <Button
                     ghost
                     icon={<CloseOutlined />}
                     className="trailer-close"
                     onClick={() => this.setModalTrailerVisible(false)}
                     handleNumberOfLikesIncrease={
                        this.handleNumberOfLikesIncrease
                     }
                     handleNumberOfLikesDecrease={
                        this.handleNumberOfLikesDecrease
                     }
                  />
                  <Trailer videoId={videoId} />
               </Modal>
            </div> */}
            <SearchBar isLogin={isLogin} profile={profile} />
            {randomMovies.length ? (
               <RandomMovies
                  isLogin={isLogin}
                  profile={profile}
                  randomMovies={randomMovies}
               />
            ) : (
               <center className="movies-spin">
                  <Spin size="large" />
               </center>
            )}

            {series.length ? (
               <MovieCardList
                  highlyRated={highlyRated}
                  operatorMovies={operatorMovies}
                  masterpiece={masterpiece}
                  series={series}
                  aliensMovies={aliensMovies}
                  superHeroMovies={superHeroMovies}
                  setModalVisible={this.setModalVisible}
                  handleCurrentMovie={this.handleCurrentMovie}
                  isLogin={isLogin}
                  profile={profile}
               />
            ) : (
               <center className="movies-spin">
                  <Spin size="large" />
               </center>
            )}
         </div>
      );
   }
}
// eslint-disable-next-line
export default withRouter(MainCinema);
// eslint-disable-next-line
