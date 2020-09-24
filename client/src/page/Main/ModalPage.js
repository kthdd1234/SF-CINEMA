import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom';
import ModalImage from './ModalImg';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Popconfirm, Modal, notification, Tag } from 'antd';
import './ModalPage.css';
import {
   LikeTwoTone,
   LikeOutlined,
   LikeFilled,
   PushpinOutlined,
   PushpinFilled,
   PlayCircleOutlined,
   CloseOutlined,
   ClockCircleOutlined,
   CheckCircleOutlined,
   ExclamationCircleOutlined,
   BellOutlined,
} from '@ant-design/icons';
import $ from 'jquery';
import axios from 'axios';
import Trailer from './Trailer';
import './Trailer.css';
import dotenv from 'dotenv';
import SFCINEMA from '../../SFCINEMA.png';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/user`,
});

class ModalPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: null,
         pushpinVisible: false,
         likeVisible: false,
         pushpin: false,
         like: false,
         tralierShow: false,
         currentMovie: {},
         numberOfLikes: 0,
      };
   }

   componentDidMount = () => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      this.setState({
         numberOfLikes: this.props.numberOfLikes,
         pushpin: false,
         likeFilled: false,
      });
      if (this.props.isLogin) {
         this.setState({
            loginID: this.props.profile.loginID,
         });
         if (accessToken) {
            serverUrl
               .get('/profile', {
                  headers: {
                     Authorization: 'Bearer ' + accessToken,
                  },
               })
               .then(({ data }) => {
                  const { savedMovie, likedMovie } = data;
                  this.handleUserFavoritedData(savedMovie, likedMovie);
               });
         }
      }
   };

   componentDidUpdate = (prevProps) => {
      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (this.props.isLogin) {
         if (this.props.numberOfLikes !== prevProps.numberOfLikes) {
            this.setState({
               numberOfLikes: this.props.numberOfLikes,
            });
         }
      }
      if (this.props.currentMovie !== prevProps.currentMovie) {
         this.setState({
            pushpin: false,
            likeFilled: false,
         });
         serverUrl
            .get('/profile', {
               headers: {
                  Authorization: 'Bearer ' + accessToken,
               },
            })
            .then(({ data }) => {
               const { savedMovie, likedMovie } = data;
               this.handleUserFavoritedData(savedMovie, likedMovie);
            });
      }
   };

   handleUserFavoritedData = (...favaritedData) => {
      let favarite = ['pushpin', 'like'];
      for (let i = 0; i < favaritedData.length; i++) {
         for (let j = 0; j < favaritedData[i].length; j++) {
            if (favaritedData[i][j].id === this.props.currentMovie.id) {
               this.setState({
                  [favarite[i]]: true,
               });
            }
         }
      }
   };
   successPushpinNotification = (placement) => {
      notification.success({
         message: `영화 정보 저장 완료!`,
         description: '프로필 관리 목록에 해당 영화 정보를 저장하였습니다.',
         placement,
         icon: (
            <PushpinFilled
               style={{
                  color: 'red',
               }}
            />
         ),
      });
   };

   cancelPushpinNotification = (placement) => {
      notification.warn({
         message: `영화 정보 저장 취소!`,
         description: '프로필 관리 목록에 해당 영화 정보를 삭제하였습니다.',
         placement,
      });
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

   handlePushpinButton = () => {
      const { pushpin, loginID } = this.state;
      const { isLogin } = this.props;

      if (isLogin) {
         if (!pushpin) {
            serverUrl.post('/savedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
            this.successPushpinNotification('topLeft');
         } else {
            serverUrl.delete('/cancelSavedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
            this.cancelPushpinNotification('topLeft');
         }
         this.setState({
            pushpin: !pushpin,
         });
      }
   };

   handleLikeButton = () => {
      const { like, loginID, numberOfLikes } = this.state;
      const { isLogin, currentMovie } = this.props;
      if (isLogin) {
         if (!like) {
            serverUrl.post('/likedMovie', {
               loginID: loginID,
               movieId: currentMovie.id,
            });
            this.successLikeNotification('topLeft');
            this.setState({
               numberOfLikes: numberOfLikes + 1,
            });
            this.props.handleNumberOfLikesIncrease();
         } else {
            serverUrl.delete('/cancelLikedMovie', {
               data: {
                  loginID: loginID,
                  movieId: this.props.currentMovie.id,
               },
            });
            this.cancelLikeNotification('topLeft');
            this.setState({
               numberOfLikes: numberOfLikes - 1,
            });
            this.props.handleNumberOfLikesDecrease();
         }
         this.setState({
            like: !like,
         });
      }
   };

   navigateToLoginPage = () => {
      this.props.history.push('/login');
      window.scrollTo(0, 0);
   };

   setModalTrailerVisible = (tralierShow) => {
      const { videoId } = this.props.currentMovie;
      if (!tralierShow) {
         $(`.${videoId}`)[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
      }
      this.setState({ tralierShow });
   };

   render() {
      const { currentMovie } = this.props;
      let {
         id,
         title,
         titleEng,
         director,
         plot,
         posters,

         actors,
         releaseDate,
         runtime,
         ratingGrade,
         genre,
         userRating,
         videoId,
      } = currentMovie;

      let releaseYear = String(releaseDate).slice(0, 4);
      actors = JSON.parse(actors).slice(0, 4).join(', ');

      const { pushpin, like, numberOfLikes } = this.state;

      return (
         <div>
            <div className="modal-container">
               <ModalImage
                  key={id}
                  img={`https://image.tmdb.org/t/p/w500${posters}`}
                  alt={id}
               />
               <img src={SFCINEMA} className="modal-logo" />
               <div className="modal-content-wrapper">
                  <div className="modal-title-wrap">
                     <strong className="modal-header-title">
                        {title}
                        <strong className="modal-header-titleEng_year">
                           {`(${releaseYear})`}
                        </strong>
                     </strong>
                  </div>

                  <span className="tag-wrap">
                     <Tag
                        color="success"
                        icon={<CheckCircleOutlined />}
                     >{`영화 평점: ${userRating}`}</Tag>
                     <Tag
                        color="geekblue"
                        icon={<LikeFilled />}
                     >{`재밌어요: ${numberOfLikes}`}</Tag>
                     <Tag color="magenta">{`장르: ${genre}`}</Tag>
                     <Tag color="purple">{`등급:  ${ratingGrade}`}</Tag>
                     <Tag color="default">{`재생시간: ${runtime}`}</Tag>
                  </span>

                  <div className="modal-plot">{plot}</div>

                  <div className="modal-credit">
                     <div className="modal-credit-info">
                        <strong className="modal-credit-text">감독</strong>
                        {director}
                     </div>
                     <div className="modal-credit-info">
                        <strong className="modal-credit-text">출연</strong>
                        {actors}
                     </div>
                  </div>
                  <div className="movie-footer">
                     <Popconfirm
                        title={
                           <div>
                              혹시 이 영화를 보셨나요?
                              <div>
                                 로그인을 하여 영화에 대한 평가를 내려주세요.
                              </div>
                           </div>
                        }
                        onVisibleChange={this.onVisibleChange('likeVisible')}
                        onConfirm={this.navigateToLoginPage}
                        visible={this.state.likeVisible}
                        okText="로그인 하러 가기"
                        cancelText="닫기"
                     >
                        <Button
                           icon={
                              this.props.likeFilled ? (
                                 <LikeFilled />
                              ) : (
                                 <LikeOutlined />
                              )
                           }
                           className={
                              this.props.likeFilled
                                 ? 'like-fill btn-color'
                                 : 'like-out btn-color'
                           }
                           onClick={this.handleLikeButton}
                           type="ghost"
                           size="large"
                        >
                           재밌어요
                        </Button>
                     </Popconfirm>
                     <Popconfirm
                        title={
                           <div>
                              로그인이 되어 있지 않습니다.
                              <div>로그인을 하여 영화 정보를 저장해보세요.</div>
                           </div>
                        }
                        onVisibleChange={this.onVisibleChange('pushpinVisible')}
                        onConfirm={this.navigateToLoginPage}
                        visible={this.state.pushpinVisible}
                        okText="로그인 하러 가기"
                        cancelText="닫기"
                     >
                        <Button
                           icon={
                              pushpin ? <PushpinFilled /> : <PushpinOutlined />
                           }
                           className={
                              pushpin
                                 ? 'pushpin-fill btn-color'
                                 : 'pushpin-out btn-color'
                           }
                           onClick={this.handlePushpinButton}
                           type="ghost"
                           size="large"
                        >
                           저장하기
                        </Button>
                     </Popconfirm>
                     <Button
                        icon={<PlayCircleOutlined />}
                        className="trailer-btn"
                        type="ghost"
                        size="large"
                        onClick={() => this.setModalTrailerVisible(true)}
                     >
                        예고편 보기
                     </Button>
                  </div>
               </div>
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
         </div>
      );
   }
}

// eslint-disable-next-line
export default withRouter(ModalPage);
// eslint-disable-next-line
