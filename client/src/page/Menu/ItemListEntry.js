import React from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
import { Button, Popconfirm, Modal, notification, Tag } from 'antd';
import {
   LikeOutlined,
   DislikeOutlined,
   LikeFilled,
   DislikeFilled,
   PushpinOutlined,
   PushpinFilled,
   PlayCircleOutlined,
   CloseOutlined,
   ClockCircleOutlined,
   CheckCircleOutlined,
} from '@ant-design/icons';
import Trailer from '../Main/Trailer';
import './ItemListEntry.css';
import $ from 'jquery';
import dotenv from 'dotenv';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/user`,
});

class ItemListEntry extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         pushpinVisible: false,
         likeVisible: false,
         dislikeVisible: false,
         pushpin: false,
         like: false,
         dislike: false,
         loginID: null,
         tralierShow: false,
         numberOfLikes: 0,
      };
   }

   componentDidMount = () => {
      this.setState({
         numberOfLikes: this.props.numberOfLikes,
      });
      if (this.props.isLogin) {
         const accessToken = reactLocalStorage.get('SFCinemaUserToken');
         if (accessToken) {
            serverUrl
               .get('/profile', {
                  headers: {
                     Authorization: 'Bearer ' + accessToken,
                  },
               })
               .then(({ data }) => {
                  const {
                     loginID,
                     savedMovie,
                     likedMovie,
                     disLikedMovie,
                  } = data;
                  this.setState({
                     loginID: loginID,
                  });
                  this.handleUserFavoritedData(
                     savedMovie,
                     likedMovie,
                     disLikedMovie,
                  );
               });
         }
      }
   };

   componentDidUpdate = (prevProps) => {
      if (this.props.id !== prevProps.id) {
         this.setState({
            numberOfLikes: this.props.numberOfLikes,
         });
         if (this.props.isLogin) {
            this.setState({
               pushpin: false,
               like: false,
               dislike: false,
            });
            const accessToken = reactLocalStorage.get('SFCinemaUserToken');
            if (accessToken) {
               serverUrl
                  .get('/profile', {
                     headers: {
                        Authorization: 'Bearer ' + accessToken,
                     },
                  })
                  .then(({ data }) => {
                     const { savedMovie, likedMovie, disLikedMovie } = data;
                     this.handleUserFavoritedData(
                        savedMovie,
                        likedMovie,
                        disLikedMovie,
                     );
                  });
            }
         }
      }
   };

   handleUserFavoritedData = (...favaritedData) => {
      let favarite = ['pushpin', 'like', 'dislike'];
      for (let i = 0; i < favaritedData.length; i++) {
         for (let j = 0; j < favaritedData[i].length; j++) {
            if (favaritedData[i][j].id === this.props.id) {
               this.setState({
                  [favarite[i]]: true,
               });
            }
         }
      }
   };

   onVisibleChange = (target) => (visible) => {
      if (!this.props.isLogin) {
         if (visible) {
            this.setState({
               [target]: true,
            });
         } else {
            this.setState({
               [target]: false,
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
               movieId: this.props.id,
            });
            this.successPushpinNotification('bottomLeft');
         } else {
            serverUrl.delete('/cancelSavedMovie', {
               data: {
                  loginID: loginID,
                  movieId: this.props.id,
               },
            });
            this.cancelPushpinNotification('bottomLeft');
         }
         this.setState({
            pushpin: !pushpin,
         });
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

   handleLikeButton = () => {
      const { like, loginID, numberOfLikes } = this.state;
      const { isLogin } = this.props;
      if (isLogin) {
         if (!like) {
            serverUrl.post('/likedMovie', {
               loginID: loginID,
               movieId: this.props.id,
            });
            this.successLikeNotification('bottomLeft');
            this.setState({
               numberOfLikes: numberOfLikes + 1,
            });
         } else {
            serverUrl.delete('/cancelLikedMovie', {
               data: {
                  loginID: loginID,
                  movieId: this.props.id,
               },
            });

            this.cancelLikeNotification('bottomLeft');
            this.setState({
               numberOfLikes: numberOfLikes - 1,
            });
         }
         this.setState({
            like: !like,
            dislike: false,
         });
      }
   };

   successLikeNotification = (placement) => {
      notification.success({
         message: `좋아요 완료!`,
         description: '좋아요 목록에 해당 영화 정보가 추가되었습니다.',
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
         message: `좋아요 취소!`,
         description: '좋아요 목록에 해당 영화 정보를 삭제하였습니다.',
         placement,
      });
   };

   navigateToLoginPage = () => {
      this.props.history.push('/login');
   };

   setModalTrailerVisible(tralierShow) {
      if (tralierShow === false) {
         $(`.${this.props.videoId}`)[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
      }
      this.setState({ tralierShow });
   }

   render() {
      const {
         title,
         titleEng,
         genre,
         director,
         plot,
         nation,
         actors,
         releaseDate,
         releaseYear,
         runtime,
         ratingGrade,
         userRating,
         backDrop,
         videoId,
      } = this.props;

      const { pushpin, like, numberOfLikes } = this.state;

      return (
         <div>
            <div className="moive-content">
               <div className="movie-img-box">
                  <div className="img-shadow" />
                  <img
                     className="movie-img"
                     src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${backDrop}`}
                  />
               </div>
               <div className="movie-info">
                  <div className="movie-headers">
                     <div>
                        <Button
                           className="pushpin-btn"
                           icon={
                              pushpin ? (
                                 <PushpinFilled className="pushpin-icon" />
                              ) : (
                                 <PushpinOutlined className="pushpin-icon" />
                              )
                           }
                           shape="circle"
                           onClick={this.handlePushpinButton}
                        />
                     </div>
                     <div className="movie-title-list">
                        <strong className="movie-title">{title}</strong>
                        <div>
                           <strong className="movie-titleEng_year">
                              {`${titleEng} (${releaseYear})`}
                           </strong>
                        </div>
                     </div>
                     <span className="tag-wrap">
                        <Tag
                           color={'success'}
                           icon={<CheckCircleOutlined />}
                        >{`영화 평점: ${userRating}`}</Tag>
                        <Tag
                           color="geekblue"
                           icon={<LikeFilled />}
                        >{`재밌어요: ${numberOfLikes}`}</Tag>
                        <Tag color={'magenta'}>{`장르: ${genre}`}</Tag>
                        <Tag color={'blue'}>{`등급:  ${ratingGrade}`}</Tag>
                        <Tag color="default">{`재생시간: ${runtime}`}</Tag>
                     </span>
                  </div>

                  <div className="movie-body">
                     <div className="movie-plot">{plot}</div>

                     <div className="movie-director_actors">
                        <div className="movie-director">
                           <strong className="movie-sub">감독</strong>
                           {director}
                        </div>
                        <div className="movie-actors">
                           <strong className="movie-sub">출연</strong>
                           {actors}
                        </div>
                     </div>
                  </div>
                  <div className="trailer-like-wrap">
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
                           icon={like ? <LikeFilled /> : <LikeOutlined />}
                           className={
                              like
                                 ? 'like-fill btn-color'
                                 : 'like-out btn-color'
                           }
                           onClick={this.handleLikeButton}
                           type="ghost"
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
                        >
                           저장하기
                        </Button>
                     </Popconfirm>
                     <Button
                        className="trailer-btn"
                        icon={<PlayCircleOutlined />}
                        type="ghost"
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

export default withRouter(ItemListEntry);
