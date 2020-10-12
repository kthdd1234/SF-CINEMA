import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Popconfirm, notification, Modal, Spin } from 'antd';
import { LikeOutlined, LikeFilled, CloseOutlined } from '@ant-design/icons';
import ContentsModal from '../../containers/Main/ContentsModal';
import Trailer from './Trailer';
import $ from 'jquery';
import axios from 'axios';
import dotenv from 'dotenv';
import './MovieList.css';
import './MovieListEntry.css';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/user`,
});

class MovieListEntry extends Component {
   constructor(props) {
      super(props);
      this.state = {
         likeFilled: false,
         likeVisible: false,
         modalVisible: false,
         tralierShow: false,
         numberOfLikes: 0,
      };
   }

   componentDidMount = () => {
      const movieId = this.props.movie ? this.props.movie.id : null;
      const likeMovies = this.props.profile.likedMovie;
      const numberOfLikes = this.props.movie
         ? this.props.movie.numberOfLikes
         : null;

      this.setState({
         numberOfLikes: numberOfLikes,
      });
      if (this.props.isLogin) {
         likeMovies.forEach((movie) => {
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
         this.props.history.push(`/contents/${movie.id}`);
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

   onVisibleChange = (onVisible) => (popVisible) => {
      if (!this.props.isLogin) {
         if (popVisible) {
            this.setState({
               [onVisible]: true,
            });
         } else {
            this.setState({
               [onVisible]: false,
            });
         }
      }
   };

   navigateToLoginPage = () => {
      this.props.history.push('/login');
      window.scrollTo(0, 0);
   };

   handleLikeFilld = () => {
      if (this.props.isLogin) {
         this.setState({
            likeFilled: !this.state.likeFilled,
         });
      }
   };

   successLikeNotification = (placement) => {
      notification.success({
         message: `재밌어요 완료!`,
         description: '재밌어요 목록에 해당 영화 정보가 추가되었습니다.',
         placement,
         icon: (
            <LikeFilled
               style={{
                  color: 'blue',
               }}
            />
         ),
      });
   };

   cancelLikeNotification = (placement) => {
      notification.warn({
         message: `재밌어요 취소!`,
         description: '재밌어요 목록에 해당 영화 정보를 삭제하였습니다.',
         placement,
      });
   };

   handleLikeButton = () => {
      const { likeFilled } = this.state;
      if (this.props.isLogin) {
         if (!likeFilled) {
            this.increaseLikedMovie(this.props.movie);
         } else {
            this.decreaseLikedMovie(this.props.movie);
         }
         this.setState({
            likeFilled: !likeFilled,
         });
      }
   };

   increaseLikedMovie = (movie) => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes + 1,
      });
      serverUrl
         .post('/likedMovie', {
            loginID: this.props.profile.loginID,
            movieId: movie.id,
         })
         .then(({ data }) => {
            this.props.handleProfileUpdate(data);
         });
      this.successLikeNotification('bottomLeft');
   };

   decreaseLikedMovie = (movie) => {
      const { loginID, numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes - 1,
      });
      serverUrl
         .delete('/cancelLikedMovie', {
            data: { loginID: this.props.profile.loginID, movieId: movie.id },
         })
         .then(({ data }) => {
            this.props.handleProfileUpdate(data);
         });
      this.cancelLikeNotification('bottomLeft');
   };

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
      const { movie, alt } = this.props;
      const { likeFilled, numberOfLikes, modalVisible } = this.state;
      const { title, posters, videoId } = movie;

      return (
         <div className="card-container">
            <div className="card-like-wrap" onClick={this.handleLikeFilld}>
               <Popconfirm
                  title={
                     <div>
                        혹시 이 영화를 보셨나요?
                        <div>로그인을 하여 영화에 대한 평가를 내려주세요.</div>
                     </div>
                  }
                  onVisibleChange={this.onVisibleChange('likeVisible')}
                  onConfirm={this.navigateToLoginPage}
                  visible={this.state.likeVisible}
                  okText="로그인 하러 가기"
                  cancelText="닫기"
               >
                  <Button
                     className="card-like-btn"
                     type="text"
                     size="small"
                     icon={
                        likeFilled ? (
                           <LikeFilled className="like-filled" />
                        ) : (
                           <LikeOutlined className="like-outlied" />
                        )
                     }
                     onClick={this.handleLikeButton}
                  >
                     <span className="like-count">{numberOfLikes}</span>
                  </Button>
               </Popconfirm>
            </div>
            <div className="card-movie-info">
               <div className="card-box-image">
                  <img
                     className="card-image"
                     src={`https://image.tmdb.org/t/p/w500${posters}`}
                     alt={`img${alt}`}
                     onClick={() => this.setModalVisible(true, movie)}
                  />
                  <div className="fade-box fade">
                     <div className="btn-wrap">
                        <Button
                           className="btn-detail-movie"
                           type="ghost"
                           onClick={() => this.setModalVisible(true, movie)}
                        >
                           영화상세정보
                        </Button>
                        <Button
                           className="btn-trailer-movie"
                           type="ghost"
                           onClick={() => {
                              this.setModalTrailerVisible(true);
                              this.setState({
                                 videoId: videoId,
                              });
                           }}
                        >
                           예고편 보기
                        </Button>
                     </div>
                  </div>
               </div>
               <div className="card-detail">
                  <div className="card-detail-title">{title}</div>
               </div>
            </div>

            <Modal
               className="fake-modal"
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               footer={null}
               maskClosable={false}
            >
               <ContentsModal
                  currentMovie={movie}
                  likeFilled={likeFilled}
                  numberOfLikes={numberOfLikes}
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
               />
            </Modal>
            <Modal
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               footer={null}
               maskClosable={false}
            >
               <ContentsModal
                  currentMovie={movie}
                  likeFilled={likeFilled}
                  numberOfLikes={numberOfLikes}
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

export default withRouter(MovieListEntry);
