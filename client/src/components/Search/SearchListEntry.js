import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Popconfirm, Modal } from 'antd';
import { LikeOutlined, LikeFilled, CloseOutlined } from '@ant-design/icons';
import { requestLikeCompleted, requestLikeCancel } from '../../requests';
import {
   // handleUserFavoritedData,
   handleTrailerVisible,
   handlePopconfirmVisible,
   handleLikeCompletedNotification,
   handleLikeCancelNotification,
} from '../../utils';
import Trailer from '../Main/Trailer';
import './SearchListEntry.css';
import '../Main/MovieListEntry.css';

class SearchListEntry extends Component {
   constructor(props) {
      super(props);
      this.state = {
         likedFilled: false,
         likePopComfirm: false,
         modalVisible: false,
         trailer: false,
         numberOfLikes: 0,
      };
   }

   componentDidMount = async () => {
      const { movie } = this.props;
      const { numberOfLikes } = movie;

      if (this.props.isLogin) {
         const favoritedData = await handleUserFavoritedData(
            this.props.profile,
            movie,
         );

         if (favoritedData) this.setState(favoritedData);
      }
      this.setState({ numberOfLikes: numberOfLikes });
   };

   componentDidUpdate = async (prevProps) => {
      const { movie } = this.props;
      const { numberOfLikes } = movie;

      if (prevProps.movie.id !== movie.id) {
         this.setState({ numberOfLikes: numberOfLikes, likedFilled: false });

         if (this.props.isLogin) {
            const favoritedData = await handleUserFavoritedData(
               this.props.profile,
               movie,
            );

            if (favoritedData) this.setState(favoritedData);
         }
      }
   };

   handleModalVisible = (modalVisible, movie) => {
      this.props.history.push(`/movies/${movie.id}`);
   };

   handleSettingTrailer(trailer) {
      handleTrailerVisible(trailer, this.props.movie.videoId);
      this.setState({ trailer });
   }

   handlePopconfirmChange = (key) => (visible) => {
      const { isLogin } = this.props;
      const visibleResult = handlePopconfirmVisible(key, isLogin, visible);
      this.setState(visibleResult);
   };

   handleLikedFilledVisible = () => {
      const { isLogin } = this.props;
      const { likeFilled } = this.state;

      isLogin ? this.setState({ likedFilled: !likeFilled }) : null;
   };

   handleSettingLike = async () => {
      const { likedFilled, numberOfLikes } = this.state;
      const { isLogin, profile, movie, handleProfileUpdate } = this.props;
      const userId = profile.id;
      const movieId = movie.id;

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

   handleNumberOfLikesIncrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes + 1,
         likedFilled: true,
      });
   };

   handleNumberOfLikesDecrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes - 1,
         likedFilled: false,
      });
   };

   render() {
      const {
         likedFilled,
         numberOfLikes,
         modalVisible,
         likePopComfirm,
         trailer,
      } = this.state;
      const { movie } = this.props;

      return (
         <div className="search-result-item card-container">
            <div
               className="card-like-wrap"
               onClick={this.handleLikedFilledVisible}
            >
               <Popconfirm
                  title={
                     <div>
                        혹시 이 영화를 보셨나요?
                        <div>로그인을 하여 영화에 대한 평가를 내려주세요.</div>
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
                     className="card-like-btn"
                     type="text"
                     size="small"
                     icon={
                        likedFilled ? (
                           <LikeFilled className="like-filled" />
                        ) : (
                           <LikeOutlined className="like-outlied" />
                        )
                     }
                     onClick={this.handleSettingLike}
                  >
                     <span className="like-count">{numberOfLikes}</span>
                  </Button>
               </Popconfirm>
            </div>
            <div className="search-result-box-poster card-box-image">
               <img
                  className="search-result-poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.posters}`}
                  alt={`img${movie.title}`}
                  onClick={() => this.handleModalVisible(true, movie)}
               />
               <div className="fade-box fade">
                  <div className="btn-wrap">
                     <Button
                        className="btn-detail-movie"
                        type="ghost"
                        onClick={() => this.handleModalVisible(true, movie)}
                     >
                        영화상세정보
                     </Button>
                     <Button
                        className="btn-trailer-movie"
                        type="ghost"
                        onClick={() => this.handleSettingTrailer(true)}
                     >
                        예고편 보기
                     </Button>
                  </div>
               </div>
            </div>
            <div className="search-result-title">{movie.title}</div>
         </div>
      );
   }
}

export default withRouter(SearchListEntry);
