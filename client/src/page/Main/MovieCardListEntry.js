import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './DownSlideShow.css';
import { Card, Button, Popconfirm, notification, Modal } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import SFCINEMA from '../../SFCINEMA.png';
import ModalPage from './ModalPage';
import Trailer from './Trailer';
import $ from 'jquery';
import axios from 'axios';

const { Meta } = Card;

const serverUrl = axios.create({
   baseURL: 'http://54.180.32.31:5000/user',
});

class MovieCardListEntry extends Component {
   constructor(props) {
      super(props);
      this.state = {
         likeFilled: false,
         likeVisible: false,

         modalVisible: false,
         pause: false,
         numberOfLikes: 0,
      };
   }

   componentDidMount = async () => {
      const { isLogin, profile, movie } = this.props;
      const movieId = movie ? movie.id : null;
      const likeMovies = profile.likedMovie;
      const numberOfLikes = movie ? movie.numberOfLikes : null;

      this.setState({
         numberOfLikes: numberOfLikes,
      });
      if (isLogin) {
         this.setState({
            loginID: profile.loginID,
         });

         await likeMovies.forEach((movie) => {
            if (movie.id === movieId) {
               return this.setState({
                  likeFilled: true,
               });
            }
         });
      }
   };

   setModalVisible = (modalVisible) => {
      if (!modalVisible) {
         this.setState({
            pause: false,
         });
      }
      this.setState({
         modalVisible,
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

   navigateToLoginPage = () => {
      this.props.history.push('/login');
      window.scrollTo(0, 0);
   };

   handleLikeFilld = () => {
      const { isLogin } = this.props;
      if (isLogin) {
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
      const { likeFilled, loginID, numberOfLikes } = this.state;
      const { isLogin, movie } = this.props;
      if (isLogin) {
         if (!likeFilled) {
            this.setState({
               numberOfLikes: numberOfLikes + 1,
            });
            serverUrl.post('/likedMovie', {
               loginID: loginID,
               movieId: movie.id,
            });
            this.successLikeNotification('bottomLeft');
         } else {
            this.setState({
               numberOfLikes: numberOfLikes - 1,
            });
            serverUrl.post('/cancelLikedMovie', {
               loginID: loginID,
               movieId: movie.id,
            });
            this.cancelLikeNotification('bottomLeft');
         }
         this.setState({
            likeFilled: !likeFilled,
         });
      }
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

      if (movie !== null) {
         const { title, posters, userRating, genre } = movie;
         return (
            <div className="card-container">
               <div className="card-like-wrap" onClick={this.handleLikeFilld}>
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

               <Card
                  size="small"
                  hoverable
                  className="card-movie-info"
                  onClick={() => this.setModalVisible(true)}
                  cover={
                     <img
                        src={`https://image.tmdb.org/t/p/w500${posters}`}
                        alt={`img${alt}`}
                     />
                  }
               >
                  <Meta
                     title={title}
                     description={
                        <div>
                           <div> ⭐ {userRating}</div>
                           <div>{genre}</div>
                        </div>
                     }
                  />
               </Card>
               <Modal
                  title={<img src={SFCINEMA} className="small-logo" />}
                  centered
                  width={1150}
                  visible={modalVisible}
                  onOk={() => this.setModalVisible(false)}
                  onCancel={() => this.setModalVisible(false)}
                  footer={null}
                  maskClosable={false}
               >
                  <ModalPage
                     isLogin={this.props.isLogin}
                     profile={this.props.profile}
                     currentMovie={movie}
                     numberOfLikes={numberOfLikes}
                     handleNumberOfLikesIncrease={
                        this.handleNumberOfLikesIncrease
                     }
                     handleNumberOfLikesDecrease={
                        this.handleNumberOfLikesDecrease
                     }
                  />
               </Modal>
            </div>
         );
      } else {
         return (
            <div className="noting">
               <div>
                  <img />
               </div>
               <div>
                  없음<strong className="title">없음</strong>
               </div>
               <div>⭐</div>
            </div>
         );
      }
   }
}

export default withRouter(MovieCardListEntry);
