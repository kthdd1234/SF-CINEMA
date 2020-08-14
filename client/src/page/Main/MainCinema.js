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
} from 'antd';
import axios from 'axios';
import ModalPage from './ModalPage';
import TopSlideShow from './TopSlideShow';
import DownSlideShow from './DownSlideShow';
import SFCINEMA from '../../SFCINEMA.png';
import './MainCinema.css';
import Slider from 'react-slick';
import { seriesList } from './seriesList';

const { Search } = Input;
const { Meta } = Card;

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/main',
});

class MainCinema extends Component {
   constructor(props) {
      super(props);
      this.state = {
         backgroundImg: [],
         randomMovies: [],
         highlyRated: [],
         releaseOrder: [],
         operatorMovies: [],
         masterpiece: [],
         series: [],
         modalVisible: false,
         currentMovie: {},
         imgList: [],
         searchResult: [],
         keyword: '',
         drawerVisible: false,
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

      /*  백그라운드 이미지 */
      serverUrl.get('/backgroundImg').then(({ data }) => {
         this.setState({
            backgroundImg: data[1],
         });
      });

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
      // const movieTitleEng = 'life';
      // axios
      //    .get('https://api.themoviedb.org/3/search/movie', {
      //       params: {
      //          api_key: 'a3f2dd845f961cc6ea8d04c944383159',
      //          query: movieTitleEng,
      //          page: 1,
      //       },
      //    })
      //    .then(async ({ data }) => {
      //       const imgId = data.results[0].id;
      //       console.log(imgId);

      //       axios
      //          .get(`https://api.themoviedb.org/3/movie/${imgId}/images`, {
      //             params: { api_key: 'a3f2dd845f961cc6ea8d04c944383159' },
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
      this.setState({ modalVisible: modalVisible });
   };

   handleCurrentMovie = (movie) => {
      this.setState({
         currentMovie: movie,
      });
   };

   onClose = () => {
      this.setState({
         drawerVisible: false,
      });
   };

   render() {
      const {
         backgroundImg,
         randomMovies,
         highlyRated,
         releaseOrder,
         operatorMovies,
         masterpiece,
         series,
         modalVisible,
         currentMovie,
         searchResult,
         imgList,
      } = this.state;

      return (
         <div>
            <div className="main-content">
               <div className="main-content-wrap">
                  <div className="main-title">
                     <img className="main-logo" src={SFCINEMA} />
                     <h2 className="main-title-welcome">Welcome.</h2>
                     <h3 className="main-description">
                        lot of SF movies to discover. <div>Explore now.</div>
                     </h3>
                  </div>
               </div>
               <div className="box-shadow-top" />
               <Slider
                  fade={true}
                  infinite={true}
                  arrows={false}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  speed={6000}
                  autoplaySpeed={4000}
                  pauseOnHover={false}
               >
                  {backgroundImg.map((img, i) => (
                     <img
                        key={i}
                        className="main-content-background"
                        src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${img}`}
                     />
                  ))}
               </Slider>
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
               height={460}
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
                                    borderRadius: 5,
                                 }}
                                 cover={
                                    <img
                                       src={JSON.parse(movie.posters)[0]}
                                       style={{
                                          height: '300px',
                                          borderRadius: 5,
                                       }}
                                    />
                                 }
                                 onClick={() => {
                                    this.handleCurrentMovie(movie);
                                    this.setModalVisible(true);
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
                  releaseOrder={releaseOrder}
                  operatorMovies={operatorMovies}
                  masterpiece={masterpiece}
                  series={series}
                  setModalVisible={this.setModalVisible}
                  handleCurrentMovie={this.handleCurrentMovie}
               />
            ) : null}
            <Modal
               style={{
                  zIndex: 2,
               }}
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
            {/* {imgList.length
               ? imgList.map((data, i) => (
                    <div
                       key={i}
                       style={{
                          width: '1920px',
                          height: '550px',
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
               : null} */}
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
