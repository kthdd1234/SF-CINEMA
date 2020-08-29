import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ModalImage from './Modal-image';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Button, Popconfirm, Modal, notification, Tag } from 'antd';
import './ModalPage.css';
import 'antd/dist/antd.css';
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
} from '@ant-design/icons';
import $ from 'jquery';
import axios from 'axios';
import Trailer from './Trailer';

const serverUrl = axios.create({
   baseURL: 'http://54.180.32.31:5000/user',
});

class ModalPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: null,
         pushpinVisible: false,
         likeVisible: false,
         dislikeVisible: false,
         pushpin: false,
         like: false,
         dislike: false,
         tralierShow: false,
      };
   }

   componentDidMount = () => {
      if (this.props.isLogin) {
         const accessToken = reactLocalStorage.get('SFCinemaUserToken');
         if (accessToken) {
            axios
               .get('http://54.180.32.31:5000/user/profile', {
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
      if (this.props.isLogin) {
         if (this.props.currentMovie !== prevProps.currentMovie) {
            this.setState({
               pushpin: false,
               like: false,
               dislike: false,
            });
            const accessToken = reactLocalStorage.get('SFCinemaUserToken');
            if (accessToken) {
               axios
                  .get('http://54.180.32.31:5000/user/profile', {
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

   successDisLikeNotification = (placement) => {
      notification.success({
         message: `영화 정보에 노잼 표시를 하였습니다.`,
         placement,
         icon: (
            <DislikeFilled
               style={{
                  color: 'blue',
               }}
            />
         ),
      });
   };

   cancelDisLikeNotification = (placement) => {
      notification.warn({
         message: `영화 정보에 노잼 표시를 취소하였습니다.`,
         placement,
      });
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
               movieId: this.props.currentMovie.id,
            });
            this.successPushpinNotification('topLeft');
         } else {
            serverUrl.post('/cancelSavedMovie', {
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
      const { like, loginID } = this.state;
      const { isLogin } = this.props;
      if (isLogin) {
         if (!like) {
            serverUrl.post('/likedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
            this.successLikeNotification('topLeft');
         } else {
            serverUrl.post('/cancelLikedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
            this.cancelLikeNotification('topLeft');
         }
         this.setState({
            like: !like,
            dislike: false,
         });
      }
   };

   handleDisLikeButton = () => {
      const { dislike, loginID } = this.state;
      const { isLogin } = this.props;

      if (isLogin) {
         if (!dislike) {
            serverUrl.post('/disLikedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
            this.successDisLikeNotification('topLeft');
         } else {
            serverUrl.post('/cancelDisLikedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
            this.cancelDisLikeNotification('topLeft');
         }
         this.setState({
            dislike: !dislike,
            like: false,
         });
      }
   };

   navigateToLoginPage = () => {
      this.props.history.push('/login');
      window.scrollTo(0, 0);
   };

   setModalTrailerVisible = (tralierShow) => {
      if (!tralierShow) {
         $('.movie-trailer')[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
      }
      this.setState({ tralierShow });
   };

   render() {
      let {
         id,
         title,
         titleEng,
         director,
         plot,
         posters,
         nation,
         actors,
         releaseDate,
         runtime,
         ratingGrade,
         genre,
         userRating,
         videoId,
      } = this.props.currentMovie;

      let tagColor = '';
      let releaseYear = String(releaseDate).slice(0, 4);
      actors = JSON.parse(actors).slice(0, 4).join(', ');
      if (ratingGrade === '전체 관람가') tagColor = 'success';
      if (ratingGrade === '12세 관람가') tagColor = 'processing';
      if (ratingGrade === '15세 관람가') tagColor = 'warning';
      if (ratingGrade === '청소년 관람불가') tagColor = 'error';

      const { pushpin, like, dislike } = this.state;

      return (
         <div>
            <div className="modal-container">
               <ModalImage
                  key={id}
                  img={`https://image.tmdb.org/t/p/w500${posters}`}
                  alt={id}
               />
               <div className="modal-content-wrapper">
                  <div>
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
                           shape="circle"
                           onClick={this.handlePushpinButton}
                           danger={true}
                        />
                     </Popconfirm>
                     <span className="tag-wrap">
                        <Tag color={tagColor} className="ratingGrade-tag">
                           {ratingGrade}
                        </Tag>
                        <Tag
                           icon={<ClockCircleOutlined />}
                           color="default"
                           className="runtime-tag"
                        >
                           {runtime}
                        </Tag>
                     </span>
                  </div>

                  <strong className="modal-header-title">{title}</strong>
                  <strong className="modal-header-titleEng_year">
                     {title.length < 11
                        ? `(${titleEng}, ${releaseYear})`
                        : null}
                  </strong>
                  <div>
                     {title.length >= 11 ? (
                        <strong className="modal-header-titleEng_year">
                           {`(${titleEng}, ${releaseYear})`}
                        </strong>
                     ) : null}
                  </div>
                  {/* <hr className="border-bottom-line" /> */}

                  <div>
                     <ul className="modal-rating-list">
                        <li className="modal-user-rating">⭐ {userRating}</li>

                        <li className="modal-my-rating">
                           <Popconfirm
                              title={
                                 <div>
                                    혹시 이 영화를 보셨나요?
                                    <div>
                                       로그인을 하여 영화에 대한 의견을
                                       알려주세요.
                                    </div>
                                 </div>
                              }
                              onVisibleChange={this.onVisibleChange(
                                 'likeVisible',
                              )}
                              onConfirm={this.navigateToLoginPage}
                              visible={this.state.likeVisible}
                              okText="로그인 하러 가기"
                              cancelText="닫기"
                           >
                              <Button
                                 icon={like ? <LikeFilled /> : <LikeOutlined />}
                                 className={like ? 'like-fill' : 'like-out'}
                                 onClick={this.handleLikeButton}
                                 type="ghost"
                              >
                                 좋아요
                              </Button>
                           </Popconfirm>
                           <Popconfirm
                              title={
                                 <div>
                                    혹시 이 영화를 보셨나요?
                                    <div>
                                       로그인을 하여 영화에 대한 의견을
                                       알려주세요.
                                    </div>
                                 </div>
                              }
                              onVisibleChange={this.onVisibleChange(
                                 'dislikeVisible',
                              )}
                              onConfirm={this.navigateToLoginPage}
                              visible={this.state.dislikeVisible}
                              okText="로그인 하러 가기"
                              cancelText="닫기"
                           >
                              <Button
                                 icon={
                                    dislike ? (
                                       <DislikeFilled />
                                    ) : (
                                       <DislikeOutlined />
                                    )
                                 }
                                 className={
                                    dislike ? 'dislike-fill' : 'dislike-out'
                                 }
                                 onClick={this.handleDisLikeButton}
                                 type="ghost"
                              >
                                 노잼
                              </Button>
                           </Popconfirm>
                        </li>
                        <Button
                           icon={<PlayCircleOutlined />}
                           className="trailer-btn"
                           type="primary"
                           onClick={() => this.setModalTrailerVisible(true)}
                        >
                           예고편 보기
                        </Button>
                     </ul>
                  </div>

                  <div className="modal-plot">{plot}</div>

                  <div>
                     <div>
                        <strong className="modal-genre">장르</strong>
                        {genre}
                     </div>
                     <div>
                        <strong className="modal-director">감독</strong>
                        {director}
                     </div>
                     <div>
                        <strong className="modal-actors">출연</strong>
                        {actors}
                     </div>
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
