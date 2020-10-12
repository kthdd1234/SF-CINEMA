import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import dotenv from 'dotenv';
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
   requestContests,
   requestSaveCompleted,
   requestSaveCancel,
   requestLikeCompleted,
   requestLikeCancel,
} from '../../requests';
import Trailer from './Trailer';
import './Contents.css';
dotenv.config();

class Contents extends Component {
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
      const contensts = await requestContests();
      this.props.handleSettingContents(contensts);

      if (this.props.isLogin) {
         const favoritedData = await handleUserFavoritedData(
            this.props.profile,
            contensts,
         );
         if (favoritedData) this.setState(favoritedData);
      }
      this.setState({ numberOfLikes: contensts.numberOfLikes });
   };

   componentDidUpdate = async (prevProps) => {
      if (prevProps.isLogin !== this.props.isLogin) {
         const contensts = await requestContests();
         this.props.handleSettingContents(contensts);
         const favoritedData = await handleUserFavoritedData(
            this.props.profile,
            contensts,
         );
         if (favoritedData) this.setState(favoritedData);
      }
   };

   handlePopconfirmChange = (key) => (visible) => {
      const { isLogin } = this.props;
      const visibleResult = handlePopconfirmVisible(key, isLogin, visible);
      this.setState(visibleResult);
   };

   handleSettingSave = async () => {
      const { isLogin, profile, contents, handleProfileUpdate } = this.props;
      const { savedFilled } = this.state;
      const userId = profile.id;
      const movieId = contents.id;

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
      const { isLogin, profile, contents, handleProfileUpdate } = this.props;
      const userId = profile.id;
      const movieId = contents.id;

      if (isLogin) {
         if (!likedFilled) {
            const profile = await requestLikeCompleted(userId, movieId);
            handleProfileUpdate(profile);
            this.setState({ numberOfLikes: numberOfLikes + 1 });
            handleLikeCompletedNotification('bottomLeft');
         } else {
            const profile = await requestLikeCancel(userId, movieId);
            handleProfileUpdate(profile);
            this.setState({ numberOfLikes: numberOfLikes - 1 });
            handleLikeCancelNotification('bottomLeft');
         }
         this.setState({ likedFilled: !likedFilled });
      }
   };

   handleSettingTrailer(trailer) {
      handleTrailerVisible(trailer, this.props.contensts.videoId);
      this.setState({ trailer });
   }

   render() {
      const {
         title,
         titleEng,
         genre,
         director,
         plot,
         actors,
         releaseDate,
         runtime,
         ratingGrade,
         userRating,
         backDrop,
         videoId,
      } = this.props.contents;

      const {
         savedFilled,
         savePopComfirm,
         likedFilled,
         likePopComfirm,
         numberOfLikes,
      } = this.state;

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
            <div className="contents">
               <div className="movie-img-box">
                  <div className="img-shadow" />
                  <img
                     className="movie-img"
                     src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${backDrop}`}
                  />
               </div>
               <div className="movie-wrap">
                  <div className="contents-headers">
                     <div className="movie-title-list">
                        <strong className="movie-title">{title}</strong>
                        <div>
                           <strong className="movie-titleEng_year">
                              {`${titleEng} (${String(releaseDate).slice(
                                 0,
                                 4,
                              )})`}
                           </strong>
                        </div>
                     </div>
                     <div className="item-tag-wrap">
                        {tags.map((element) => (
                           <Tag
                              key={element.tag}
                              className="tag-text"
                              color={element.color}
                              icon={element.icon ? element.icon : null}
                           >{`${element.tag} : ${element.data}`}</Tag>
                        ))}
                     </div>
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
                        onVisibleChange={this.handlePopconfirmChange(
                           'likePopComfirm',
                        )}
                        onConfirm={() => this.props.history.push('/login')}
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
                        onConfirm={() => this.props.history.push('/login')}
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
                        >
                           저장하기
                        </Button>
                     </Popconfirm>
                     <Button
                        className="trailer-btn"
                        icon={<PlayCircleOutlined />}
                        type="ghost"
                        onClick={() => this.handleSettingTrailer(true)}
                     >
                        예고편 보기
                     </Button>
                  </div>
               </div>
               <Modal
                  visible={this.state.trailer}
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
         </div>
      );
   }
}

export default withRouter(Contents);
