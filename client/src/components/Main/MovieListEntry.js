import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Popconfirm, Modal } from 'antd';
import { LikeOutlined, LikeFilled, CloseOutlined } from '@ant-design/icons';
import { requestLikeCompleted, requestLikeCancel } from '../../requests';
import {
   handleUserFavoritedData,
   handleTrailerVisible,
   handlePopconfirmVisible,
   handleLikeCompletedNotification,
   handleLikeCancelNotification,
} from '../../utils';
import ContentsModal from '../../containers/Main/ContentsModal';
import Trailer from './Trailer';
import './MovieList.css';
import './MovieListEntry.css';

class MovieListEntry extends Component {
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

   handleModalVisible = (modalVisible, movie) => {
      window.innerWidth > 1200
         ? this.setState({ modalVisible })
         : this.props.history.push(`/contents/${movie.id}`);
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
      const { movie, alt, history } = this.props;
      const { title, posters, videoId } = movie;
      const {
         likedFilled,
         likePopComfirm,
         numberOfLikes,
         modalVisible,
         trailer,
      } = this.state;

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
                  onVisibleChange={this.handlePopconfirmChange(
                     'likePopComfirm',
                  )}
                  onConfirm={() => history.push('/login')}
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
            <div className="card-movie-info">
               <div className="card-box-image">
                  <img
                     className="card-image"
                     src={`https://image.tmdb.org/t/p/w500${posters}`}
                     alt={`img${alt}`}
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
               <div className="card-detail">
                  <div className="card-detail-title">{title}</div>
               </div>
            </div>

            <Modal
               centered
               width={1150}
               visible={modalVisible}
               onOk={() => this.handleModalVisible(false)}
               onCancel={() => this.handleModalVisible(false)}
               footer={null}
               maskClosable={false}
            >
               <ContentsModal
                  movie={movie}
                  likedFilled={likedFilled}
                  numberOfLikes={numberOfLikes}
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
               />
            </Modal>
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

export default withRouter(MovieListEntry);