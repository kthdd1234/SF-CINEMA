import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
   Spin,
   Input,
   Modal,
   message,
   Drawer,
   Card,
   Row,
   Col,
   Empty,
   Button,
   Carousel,
} from 'antd';
import {
   ZoomInOutlined,
   PlayCircleOutlined,
   CloseOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import ModalPage from './ModalPage';
import TopSlideShow from './TopSlideShow';
import DownSlideShow from './DownSlideShow';
import SFCINEMA from '../../SFCINEMA.png';
import './MainCinema.css';
import { seriesList } from './seriesList';
import Trailer from './Trailer';
import dotenv from 'dotenv';
import $ from 'jquery';
dotenv.config();

const { Search } = Input;
const { Meta } = Card;

const serverUrl = axios.create({
   baseURL: `http://54.180.32.31:5000/main`,
});

class MainCinema extends Component {
   constructor(props) {
      super(props);
      this.state = {
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

      /*  백그라운드 이미지 */
      axios.get('http://localhost:5000/main/backgroundImg').then(({ data }) => {
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
      //////////////////////////////////////////////////////////////////
      // const movieTitleEng = '블랙 위도우';
      // axios
      //    .get('https://api.themoviedb.org/3/search/movie', {
      //       params: {
      //          api_key: '',
      //          query: movieTitleEng,
      //          page: 1,
      //       },
      //    })
      //    .then(async ({ data }) => {
      //       const imgId = data.results[0].id;
      //       console.log(imgId);

      //       axios
      //          .get(`https://api.themoviedb.org/3/movie/${imgId}/images`, {
      //             params: { api_key: '' },
      //          })
      //          .then(({ data }) => {
      //             const imgList = data.backdrops.map((obj, i) => {
      //                console.log(`${i} 번 사진`, obj.file_path);
      //                return `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${obj.file_path}`;
      //             });

      //             this.setState({
      //                imgList: imgList,
      //             });
      //          });
      //    });
   }

   handleUpdateSearchKeyword = (e) => {
      this.setState({
         keyword: e.target.value,
      });
   };

   handleSearchMovieData = () => {
      const { keyword } = this.state;

      if (keyword === '') {
         return message.error('검색어를 입력해주세요.');
      } else {
         serverUrl
            .get('/searchMovie', {
               params: {
                  keyword: keyword,
               },
            })
            .then(({ data }) => {
               if (data === 'Not Found') {
                  return this.setState({
                     searchResult: null,
                     drawerVisible: true,
                  });
               }
               this.setState({
                  searchResult: data,
                  drawerVisible: true,
               });
            });
      }
   };

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
      });
   };

   onClose = (key) => {
      this.setState({
         drawerVisible: false,
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
         searchResult,
         imgList,
         aliensMovies,
         superHeroMovies,
         videoId,
      } = this.state;

      return (
         <div>
            <div className="top-layout">
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
                     <div className="background-left-shadow" />
                     <div className="introduce">
                        <div className="introduce-wrap">
                           <img className="introduce-logo" src={SFCINEMA} />

                           <h2 className="introduce-title">Welcome.</h2>
                           <h3 className="introduce-description">
                              lot of SF movies to discover.{' '}
                              <div>Explore now.</div>
                           </h3>
                        </div>
                     </div>
                     <img
                        className="background-images"
                        src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/yBG2J4dMnUViwfF1crq0b7xystj.jpg`}
                     />
                  </div>
                  {backgroundImg.map((movieData, i) => (
                     <div className="background-container" key={i}>
                        <div className="background-left-shadow" />
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
                                    SF/{movieData.movie.genre}
                                 </span>{' '}
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
                        <img
                           className="background-images"
                           src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${movieData.backgroundImg}`}
                        />
                     </div>
                  ))}
               </Carousel>
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
                  />
                  <Trailer videoId={videoId} />
               </Modal>
            </div>

            <div className="movie-search-bar">
               <Search
                  placeholder="SF 영화, 시리즈물, 명작 검색..."
                  size="large"
                  enterButton
                  onChange={this.handleUpdateSearchKeyword}
                  onSearch={this.handleSearchMovieData}
               />
            </div>
            <Drawer
               title={`검색 결과 총 ${
                  searchResult ? searchResult.length : 0
               }건`}
               height={800}
               onClose={this.onClose}
               visible={this.state.drawerVisible}
               placement="bottom"
            >
               {searchResult ? (
                  <div
                     className="site-card-wrapper"
                     style={{
                        margin: '0 50px 0 50px',
                     }}
                  >
                     <Row gutter={6}>
                        {searchResult.map((movie, i) => (
                           <Col span={3} key={i}>
                              <Card
                                 size="small"
                                 hoverable
                                 style={{
                                    width: 200,
                                    marginBottom: 10,
                                    borderRadius: '7px',
                                    overflow: 'hidden',
                                 }}
                                 cover={
                                    <img
                                       src={JSON.parse(movie.posters)[0]}
                                       style={{
                                          height: '300px',
                                       }}
                                    />
                                 }
                                 onClick={() => {
                                    this.setModalVisible(true);
                                    this.handleCurrentMovie(movie);
                                 }}
                              >
                                 <Meta
                                    title={movie.title}
                                    description={`${movie.releaseDate} ꒐ ⭐ ${movie.userRating}`}
                                 />
                              </Card>
                           </Col>
                        ))}
                     </Row>

                     <Modal
                        title={<img src={SFCINEMA} className="small-logo" />}
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
               ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
               )}
            </Drawer>

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
                  operatorMovies={operatorMovies}
                  masterpiece={masterpiece}
                  series={series}
                  aliensMovies={aliensMovies}
                  superHeroMovies={superHeroMovies}
                  setModalVisible={this.setModalVisible}
                  handleCurrentMovie={this.handleCurrentMovie}
               />
            ) : null}

            <Modal
               title={<img src={SFCINEMA} className="small-logo" />}
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               footer={null}
               maskClosable={false}
            >
               <ModalPage
                  currentMovie={currentMovie}
                  isLogin={this.props.isLogin}
               />
            </Modal>

            {imgList.length
               ? imgList.map((data, i) => (
                    <div
                       key={i}
                       style={{
                          width: '1920px',

                          overflow: 'hidden',
                       }}
                    >
                       <img
                          style={{
                             width: '100%',
                          }}
                          src={data}
                       ></img>
                    </div>
                 ))
               : null}
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
