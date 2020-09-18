import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './MovieCardList.css';
import './MovieCardListEntry.css';
import { Card, Button, Popconfirm, notification, Modal } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import SFCINEMA from '../../SFCINEMA.png';
import ModalPage from './ModalPage';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const { Meta } = Card;

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/user`,
});

class MovieCardListEntry extends Component {
   constructor(props) {
      super(props);
      this.state = {
         likeFilled: false,
         likeVisible: false,
         modalVisible: false,
         numberOfLikes: 0,
      };
   }

   componentDidMount = () => {
      const { movie, isLogin, profile } = this.props;
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
         if (likeMovies === undefined) {
            if (isLogin) {
               return;
            }
         } else {
            likeMovies.forEach((movie) => {
               if (movie.id === movieId) {
                  return this.setState({
                     likeFilled: true,
                  });
               }
            });
         }
      }
   };

   setModalVisible = (modalVisible) => {
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
            serverUrl.delete('/cancelLikedMovie', {
               data: { loginID: loginID, movieId: movie.id },
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
      const { movie, alt, isLogin, profile } = this.props;
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
                  hoverable
                  className="card-movie-info"
                  size="small"
                  onClick={() => this.setModalVisible(true)}
                  cover={
                     <img
                        className="card-image"
                        src={`https://image.tmdb.org/t/p/w500${posters}`}
                        alt={`img${alt}`}
                     />
                  }
               >
                  <Meta
                     title={title}
                     description={
                        <div>
                           <div>{genre}/액션</div>
                           <div>⭐{' ' + userRating}</div>
                        </div>
                     }
                  />
               </Card>
               <div className="overlay fade">
                  <div className="text">
                     <Button type="ghost" onClick={() => {}}>
                        영화상세정보
                     </Button>
                     <Button type="ghost" onClick={() => {}}>
                        예고편 보기
                     </Button>
                  </div>
               </div>
               <Modal
                  title={<img src={SFCINEMA} className="small-logo" />}
                  centered
                  width={1150}
                  visible={modalVisible}
                  onOk={() => this.setModalVisible(false)}
                  onCancel={() => this.setModalVisible(false)}
                  footer={null}
                  maskClosable={false}
               />
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
                     isLogin={isLogin}
                     profile={profile}
                     currentMovie={movie}
                     likeFilled={likeFilled}
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
