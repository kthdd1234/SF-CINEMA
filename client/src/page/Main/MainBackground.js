import React, { Component } from 'react';
import { Button, Carousel, Tag, Modal } from 'antd';
import {
   ZoomInOutlined,
   PlayCircleOutlined,
   CloseOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import ModalPage from './ModalPage';
import Trailer from './Trailer';

import SFCINEMA from '../../SFCINEMA.png';
import './MainBackground.css';

const serverUrl = axios.create({
   baseURL: `http://54.180.32.31:5000/main`,
});

class MainBackground extends Component {
   constructor(props) {
      super(props);

      this.state = {
         backgroundImg: [],
         modalVisible: false,
         currentMovie: null,
         numberOfLikes: 0,
         tralierShow: false,
         videoId: '',
         likeFilled: false,
      };
   }

   componentDidMount = () => {
      const { isLogin, profile } = this.props;
      const likeMovies = profile.likedMovie;

      if (isLogin) {
         if (likeMovies === undefined) {
            // location.reload(true);
            // window.scrollTo(0, 0);
         } else {
            likeMovies.forEach((movie) => {
               if (movie.id === movieId) {
                  return this.setState({
                     likeFilled: true,
                  });
               }
            });
         }
      }
   };

   handleCurrentMovie = (movie) => {
      this.setState({
         likeFilled: false,
         currentMovie: movie,
         numberOfLikes: movie.numberOfLikes,
      });

      if (this.props.isLogin) {
         const currentLikeMovies = this.props.profile.likedMovie;
         const movieId = movie.id;

         currentLikeMovies.forEach((movie) => {
            if (movie.id === movieId) {
               return this.setState({
                  likeFilled: true,
               });
            }
         });
      }
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
      return (
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
               {this.props.backgroundImg.map((movieData, i) => (
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
               visible={this.state.modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               maskClosable={false}
               footer={null}
            ></Modal>
            <Modal
               title={<img src={SFCINEMA} className="small-logo" />}
               centered
               width={1150}
               visible={this.state.modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               maskClosable={false}
               footer={null}
            >
               <ModalPage
                  isLogin={this.props.isLogin}
                  profile={this.props.profile}
                  likeFilled={this.state.likeFilled}
                  currentMovie={this.state.currentMovie}
                  numberOfLikes={this.state.numberOfLikes}
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
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
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
               />
               <Trailer videoId={this.state.videoId} />
            </Modal>
         </div>
      );
   }
}

export default MainBackground;
