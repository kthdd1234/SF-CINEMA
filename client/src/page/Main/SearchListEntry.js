import React, { Component } from 'react';
import { Modal, notification, Card, Col, Button, Popconfirm } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import ModalPage from './ModalPage';
import SFCINEMA from '../../SFCINEMA.png';
import axios from 'axios';
import './MainCinema.css';

const { Meta } = Card;

const serverUrl = axios.create({
   baseURL: `http://54.180.32.31:5000/user`,
});

class SearchListEnrty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modalVisible: false,
         numberOfLikes: 0,
         profile: {},
         likeFilled: false,
         likeVisible: false,
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

         likeMovies.forEach((movie) => {
            if (movie.id === movieId) {
               return this.setState({
                  likeFilled: true,
               });
            }
         });
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

   handleLikeButton = () => {
      const { likeFilled, loginID, numberOfLikes } = this.state;
      const { isLogin, movie } = this.props;
      if (isLogin) {
         if (!likeFilled) {
            serverUrl.post('/likedMovie', {
               loginID: loginID,
               movieId: movie.id,
            });
            this.handleNumberOfLikesIncrease();
            this.successLikeNotification('bottomLeft');
         } else {
            serverUrl.post('/cancelLikedMovie', {
               loginID: loginID,
               movieId: movie.id,
            });
            this.handleNumberOfLikesDecrease();
            this.cancelLikeNotification('bottomLeft');
         }
         this.setState({
            likeFilled: !likeFilled,
         });
      }
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
      return (
         <Col span={3}>
            <div className="card-like-wrap" onClick={this.handleLikeFilld}>
               <Popconfirm
                  title={
                     <div>
                        혹시 이 영화를 보셨나요?
                        <div>로그인을 하여 영화에 대한 평가를 내려주세요.</div>
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
                        this.state.likeFilled ? (
                           <LikeFilled className="like-filled" />
                        ) : (
                           <LikeOutlined className="like-outlied" />
                        )
                     }
                     onClick={this.handleLikeButton}
                  >
                     <span className="like-count">
                        {this.state.numberOfLikes}
                     </span>
                  </Button>
               </Popconfirm>
            </div>

            <Card
               className="search-result-card"
               size="small"
               hoverable
               cover={
                  <img
                     className="search-result-card-img"
                     src={`https://image.tmdb.org/t/p/w500${this.props.movie.posters}`}
                  />
               }
               onClick={() => {
                  this.setModalVisible(true);
               }}
            >
               <Meta
                  title={this.props.movie.title}
                  description={
                     <div>
                        <div>
                           <strong>장르</strong> {this.props.movie.genre}
                        </div>
                        <div>
                           <strong>평점</strong> ⭐{' '}
                           {this.props.movie.userRating}
                        </div>
                     </div>
                  }
               />
            </Card>
            <Modal
               title={<img src={SFCINEMA} className="small-logo" />}
               centered
               width={1150}
               visible={this.state.modalVisible}
               onOk={() => this.setModalVisible(false)}
               onCancel={() => this.setModalVisible(false)}
               footer={null}
            >
               <ModalPage
                  isLogin={this.props.isLogin}
                  profile={this.props.profile}
                  currentMovie={this.props.movie}
                  likeFilled={this.state.likeFilled}
                  numberOfLikes={this.state.numberOfLikes}
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
               />
            </Modal>
         </Col>
      );
   }
}

export default SearchListEnrty;
