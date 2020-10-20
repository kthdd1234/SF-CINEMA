import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Popconfirm, Modal, Tag } from 'antd';
import {
   LikeOutlined,
   LikeFilled,
   PushpinOutlined,
   PushpinFilled,
   PlayCircleOutlined,
   CloseOutlined,
   CheckCircleOutlined,
} from '@ant-design/icons';
import {
   handleUserFavoritedData,
   handlePopconfirmVisible,
   handleSaveCompletedNotification,
   handleSaveCancelNotification,
   handleLikeCompletedNotification,
   handleLikeCancelNotification,
   handleTrailerVisible,
} from '../../utils';
import {
   requestSaveCompleted,
   requestSaveCancel,
   requestLikeCompleted,
   requestLikeCancel,
} from '../../requests';
import SFCINEMA from '../../SFCINEMA.png';
import Trailer from './Trailer';
import 'antd/dist/antd.css';
import './ContentsModal.css';
import './Trailer.css';

class ContentsModal extends Component {
   constructor(props) {
      super(props);
      this.state = {
         savedFilled: false,
         savePopComfirm: false,
         likedFilled: false,
         likePopComfirm: false,
         trailer: false,
         numberOfLikes: 0,
      };
   }

   componentDidMount = async () => {
      const { movie } = this.props;
      const { numberOfLikes } = movie;

      this.setState({
         numberOfLikes: numberOfLikes,
         savedFilled: false,
         likedFilled: false,
      });

      if (this.props.isLogin) {
         const favoritedData = await handleUserFavoritedData(
            this.props.profile,
            movie,
         );

         if (favoritedData) this.setState(favoritedData);
      }
   };

   componentDidUpdate = async (prevProps) => {
      const { movie, numberOfLikes } = this.props;

      if (numberOfLikes !== prevProps.numberOfLikes) {
         this.setState({
            numberOfLikes: numberOfLikes,
            savedFilled: false,
            likedFilled: false,
         });

         if (this.props.isLogin) {
            const favoritedData = await handleUserFavoritedData(
               this.props.profile,
               movie,
            );

            if (favoritedData) this.setState(favoritedData);
         }
      }
   };

   handlePopconfirmChange = (key) => (visible) => {
      const { isLogin } = this.props;
      const visibleResult = handlePopconfirmVisible(key, isLogin, visible);
      this.setState(visibleResult);
   };

   handleSettingSave = async () => {
      const { isLogin, profile, movie, handleProfileUpdate } = this.props;
      const { savedFilled } = this.state;
      const userId = profile.id;
      const movieId = movie.id;

      if (isLogin) {
         if (!savedFilled) {
            const profile = await requestSaveCompleted(userId, movieId);
            handleProfileUpdate(profile);
            handleSaveCompletedNotification('bottomLeft');
         } else {
            const profile = await requestSaveCancel(userId, movieId);
            handleProfileUpdate(profile);
            handleSaveCancelNotification('bottomLeft');
         }
         this.setState({ savedFilled: !savedFilled });
      }
   };

   handleSettingLike = async () => {
      const { likedFilled, numberOfLikes } = this.state;
      const {
         isLogin,
         profile,
         movie,
         handleProfileUpdate,
         handleNumberOfLikesIncrease,
         handleNumberOfLikesDecrease,
      } = this.props;
      const userId = profile.id;
      const movieId = movie.id;

      if (isLogin) {
         if (!likedFilled) {
            const profile = await requestLikeCompleted(userId, movieId);
            handleProfileUpdate(profile);
            this.setState({ numberOfLikes: numberOfLikes + 1 });
            handleLikeCompletedNotification('bottomLeft');
            handleNumberOfLikesIncrease();
         } else {
            const profile = await requestLikeCancel(userId, movieId);
            handleProfileUpdate(profile);
            this.setState({ numberOfLikes: numberOfLikes - 1 });
            handleLikeCancelNotification('bottomLeft');
            handleNumberOfLikesDecrease();
         }
         this.setState({ likedFilled: !likedFilled });
      }
   };

   handleSettingTrailer = (trailer) => {
      handleTrailerVisible(trailer, this.props.movie.videoId);
      this.setState({ trailer: trailer });
   };

   render() {
      const { movie, history } = this.props;
      const {
         title,
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
      } = movie;

      const {
         savedFilled,
         likedFilled,
         savePopComfirm,
         likePopComfirm,
         numberOfLikes,
         trailer,
      } = this.state;
      console.log(trailer);

      const tags = [
         {
            tag: '영화 평점',
            data: userRating,
            color: 'success',
            icon: <CheckCircleOutlined className="tag-like" />,
         },
         {
            tag: '재밌어요',
            data: numberOfLikes,
            color: 'geekblue',
            icon: <LikeFilled className="tag-like" />,
         },
         {
            tag: '장르',
            data: genre,
            color: 'magenta',
         },
         {
            tag: '등급',
            data: ratingGrade,
            color: 'blue',
         },
         {
            tag: '재생시간',
            data: runtime,
            color: 'default',
         },
      ];

      return (
         <div>
            <div className="modal-container">
               <div className="modal-img-wrap">
                  <div className="modal-img-left-shadow" />
                  <div className="modal-image-box">
                     <img
                        className="modal-image"
                        src={`https://image.tmdb.org/t/p/w500${posters}`}
                        alt=""
                     />
                  </div>
               </div>
               <img src={SFCINEMA} className="modal-logo" />
               <div className="modal-content-wrapper">
                  <div className="modal-title-wrap">
                     <strong className="modal-header-title">
                        {title}
                        <strong className="modal-header-titleEng_year">
                           {`(${String(releaseDate).slice(0, 4)})`}
                        </strong>
                     </strong>
                  </div>

                  <span className="tag-wrap">
                     {tags.map((element) => (
                        <Tag
                           key={element.tag}
                           className="tag-text"
                           color={element.color}
                           icon={element.icon ? element.icon : null}
                        >{`${element.tag} : ${element.data}`}</Tag>
                     ))}
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
                     <Button
                        icon={<PlayCircleOutlined />}
                        className="trailer-btn"
                        type="danger"
                        size="large"
                        onClick={() => this.handleSettingTrailer(true)}
                     >
                        예고편 보기
                     </Button>
                     <Popconfirm
                        title={
                           <div>
                              혹시 이 영화를 보셨나요?
                              <div>
                                 로그인을 하여 영화에 대한 평가를 내려주세요.
                              </div>
                           </div>
                        }
                        onVisibleChange={this.handlePopconfirmChange(
                           'likePopComfirm',
                        )}
                        onConfirm={() => history.push('/login')}
                        visible={likePopComfirm}
                        okText="로그인 하러 가기"
                        cancelText="닫기"
                     >
                        <Button
                           icon={
                              likedFilled ? <LikeFilled /> : <LikeOutlined />
                           }
                           className={
                              likedFilled
                                 ? 'like-fill btn-color'
                                 : 'like-out btn-color'
                           }
                           onClick={this.handleSettingLike}
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
                        onVisibleChange={this.handlePopconfirmChange(
                           'savePopComfirm',
                        )}
                        onConfirm={() => history.push('/login')}
                        visible={savePopComfirm}
                        okText="로그인 하러 가기"
                        cancelText="닫기"
                     >
                        <Button
                           icon={
                              savedFilled ? (
                                 <PushpinFilled />
                              ) : (
                                 <PushpinOutlined />
                              )
                           }
                           className={
                              savedFilled
                                 ? 'pushpin-fill btn-color'
                                 : 'pushpin-out btn-color'
                           }
                           onClick={this.handleSettingSave}
                           type="ghost"
                           size="large"
                        >
                           저장하기
                        </Button>
                     </Popconfirm>
                  </div>
               </div>
            </div>
            <Modal
               visible={trailer}
               onOk={() => this.handleSettingTrailer(false)}
               onCancel={() => this.handleSettingTrailer(false)}
               footer={null}
               width={1300}
            >
               <Button
                  ghost
                  icon={<CloseOutlined />}
                  className="trailer-close"
                  onClick={() => this.handleSettingTrailer(false)}
               />
               <Trailer videoId={videoId} />
            </Modal>
         </div>
      );
   }
}

// eslint-disable-next-line
export default withRouter(ContentsModal);
// eslint-disable-next-line
