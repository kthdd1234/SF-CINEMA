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
   reqMovie,
   requestSaveCompleted,
   requestSaveCancel,
   requestLikeCompleted,
   requestLikeCancel,
} from '../../requests';
import Trailer from './Trailer';
import '../Menu/MenuListEntry.css';
import './Movie.css';
dotenv.config();

class Movie extends Component {
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
      const contensts = await reqMovie();
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

   handleSettingTrailer = () => {
      this.setState({ trailer: !this.state.trailer });
   };

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

      const { history } = this.props;

      const {
         savedFilled,
         savePopComfirm,
         likedFilled,
         likePopComfirm,
         numberOfLikes,
         trailer,
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

      const PopUpList = [
         [
            '혹시 이 영화를 보셨나요?',
            '로그인을 하여 영화에 대한 평가를 내려주세요.',
            this.handlePopconfirmChange('likePopComfirm'),
            likePopComfirm,
            likedFilled ? 'like-fill btn-color' : 'like-out btn-color',
            likedFilled ? <LikeFilled /> : <LikeOutlined />,
            'ghost',
            this.handleSettingLike,
            '재밌어요',
         ],
         [
            '로그인이 되어 있지 않습니다.',
            '로그인을 하여 영화 정보를 저장해보세요.',
            this.handlePopconfirmChange('savePopComfirm'),
            savePopComfirm,
            savedFilled ? 'pushpin-fill btn-color' : 'pushpin-out btn-color',
            savedFilled ? <PushpinFilled /> : <PushpinOutlined />,
            'ghost',
            this.handleSettingSave,
            '저장하기',
         ],
      ];

      const PopUpBtn = ({
         title,
         mid,
         onVisibleChange,
         onConfirm,
         visible,
         className,
         icon,
         type,
         onClick,
         text,
      }) => {
         return (
            <Popconfirm
               title={
                  <div>
                     {title}
                     <div>{mid}</div>
                  </div>
               }
               onVisibleChange={onVisibleChange}
               onConfirm={onConfirm}
               visible={visible}
               okText="로그인 하러 가기"
               cancelText="닫기"
            >
               <Button
                  className={className}
                  icon={icon}
                  type={type}
                  onClick={onClick}
               >
                  {text}
               </Button>
            </Popconfirm>
         );
      };

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
                     <Button
                        className="trailer-btn"
                        icon={<PlayCircleOutlined />}
                        type="danger"
                        onClick={this.handleSettingTrailer}
                     >
                        예고편 보기
                     </Button>
                     {PopUpList.map((list, i) => (
                        <PopUpBtn
                           key={i}
                           title={list[0]}
                           mid={list[1]}
                           onVisibleChange={list[2]}
                           onConfirm={() => history.push('/login')}
                           visible={list[3]}
                           className={list[4]}
                           icon={list[5]}
                           type={list[6]}
                           onClick={list[7]}
                           text={list[8]}
                        />
                     ))}
                  </div>
               </div>

               {trailer ? (
                  <Trailer
                     videoId={videoId}
                     handleSettingTrailer={this.handleSettingTrailer.bind(this)}
                  />
               ) : null}
            </div>
         </div>
      );
   }
}

export default withRouter(Movie);
