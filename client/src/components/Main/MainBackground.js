import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Carousel, Modal } from 'antd';
import $ from 'jquery';
import {
   ZoomInOutlined,
   PlayCircleOutlined,
   CloseOutlined,
} from '@ant-design/icons';
import ContentsModal from '../../containers/Main/ContentsModal';
import Trailer from './Trailer';
import SFCINEMA from '../../SFCINEMA.png';
import './MainBackground.css';

class MainBackground extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modalVisible: false,
         currentMovie: null,
         numberOfLikes: 0,
         tralierShow: false,
         videoId: '',
         likeFilled: false,
      };
   }

   componentDidMount = () => {
      if (this.props.isLogin) {
         if (this.props.profile.likeMovies === undefined) {
            return;
         } else {
            this.props.profile.likeMovies.forEach((movie) => {
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

   setModalVisible = (modalVisible, movie) => {
      const broswerWidth = window.innerWidth;
      if (broswerWidth > 1200) {
         this.setState({
            modalVisible,
         });
      } else {
         if (modalVisible) {
            this.props.history.push(`/contents/${movie.id}`);
         }
      }
   };

   setModalTrailerVisible(tralierShow) {
      if (tralierShow === false) {
         $(`.${this.state.videoId}`)[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
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
         <div>
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
               <div>
                  <div className="main-box-background-images">
                     <div className="background-left-shadow" />
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
                     <img
                        className="main-background-images"
                        src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/yBG2J4dMnUViwfF1crq0b7xystj.jpg`}
                     />
                  </div>
               </div>
               {this.props.backgroundImg.map((movieData, i) => (
                  <div key={i}>
                     <div className="main-box-background-images">
                        <div className="background-left-shadow" />
                        <div className="movie-content">
                           <div className="content-wrap">
                              <h2 className="content-title">
                                 {movieData.movie.title}
                              </h2>
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
                                       this.setModalVisible(
                                          true,
                                          movieData.movie,
                                       );
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
                           className="main-background-images"
                           src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${movieData.backgroundImg}`}
                        />
                     </div>
                  </div>
               ))}
            </Carousel>

            <Modal
               centered
               width={1150}
               visible={this.state.modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               maskClosable={false}
               footer={null}
            />
            <Modal
               centered
               width={1150}
               visible={this.state.modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               maskClosable={false}
               footer={null}
            >
               <ContentsModal
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
               />
               <Trailer videoId={this.state.videoId} />
            </Modal>
         </div>
      );
   }
}

export default withRouter(MainBackground);
