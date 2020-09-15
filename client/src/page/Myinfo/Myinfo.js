import React, { Component } from 'react';
import { List, Avatar, Divider, Modal, Button } from 'antd';
import { UserOutlined, PushpinFilled, LikeFilled } from '@ant-design/icons';
import './MyInfo.css';
import ModalPage from '../Main/ModalPage';
import SFCINEMA from '../../SFCINEMA.png';

class MyInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modalVisible: false,
         currentMovie: {},
         numberOfLikes: 0,
         likeFilled: false,
      };
   }

   setModalVisible = (modalVisible) => {
      this.setState({ modalVisible: modalVisible });
   };

   handleCurrentSavedMovie = (currentMovie) => {
      const { likedMovie } = this.props.profile;
      this.setState({
         likeFilled: false,
      });

      likedMovie.forEach((movie) => {
         if (movie.id === currentMovie.id) {
            return this.setState({
               likeFilled: true,
            });
         }
      });

      this.setState({
         modalVisible: true,
         currentMovie: currentMovie,
         numberOfLikes: currentMovie.numberOfLikes,
      });
   };

   handleCurrentLikedMovie = (currentMovie) => {
      const { likedMovie } = this.props.profile;
      this.setState({
         likeFilled: false,
      });
      likedMovie.forEach((movie) => {
         if (movie.id === currentMovie.id) {
            return this.setState({
               likeFilled: true,
            });
         }
      });
      this.setState({
         modalVisible: true,
         currentMovie: currentMovie,
         numberOfLikes: currentMovie.numberOfLikes,
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
      const {
         loginID,
         username,
         profileImg,
         provider,
         savedMovie,
         likedMovie,
      } = this.props.profile;

      const { modalVisible, currentMovie } = this.state;

      return (
         <div>
            <List
               itemLayout="vertical"
               dataSource={[
                  {
                     loginID: loginID,
                     username: username,
                     provider: provider,
                     profileImg: profileImg,
                  },
               ]}
               renderItem={(item) => (
                  <List.Item>
                     <List.Item.Meta
                        avatar={
                           item.profileImg ? (
                              <Avatar src={profileImg} size={92} />
                           ) : (
                              <Avatar size={92} icon={<UserOutlined />} />
                           )
                        }
                        title={
                           <strong className="myInfo-username">
                              {item.username}님
                           </strong>
                        }
                        description={
                           <strong>아이디 또는 이메일: {item.loginID}</strong>
                        }
                     />
                  </List.Item>
               )}
            />

            <Divider orientation="left" plain>
               <strong className="divider-text">
                  {<PushpinFilled />} 저장한 영화 리스트
               </strong>
            </Divider>
            <List
               itemLayout="horizontal"
               dataSource={savedMovie}
               renderItem={(item) => (
                  <List.Item>
                     <List.Item.Meta
                        avatar={
                           <Avatar
                              src={`https://image.tmdb.org/t/p/w500${item.posters}`}
                              size="large"
                              className="myInfo-savedMovie-img"
                              onClick={() => this.handleCurrentSavedMovie(item)}
                           />
                        }
                        title={
                           <strong
                              className="myInfo-savedMovie-title"
                              onClick={() => this.handleCurrentSavedMovie(item)}
                           >
                              {(item.title + item.titleEng).length > 20
                                 ? (
                                      item.title +
                                      '(' +
                                      item.titleEng +
                                      ')'
                                   ).substring(0, 16) + '...'
                                 : item.title + '(' + item.titleEng + ')'}
                           </strong>
                        }
                     />
                     <div>⭐ {item.userRating}</div>
                  </List.Item>
               )}
            />
            <Divider orientation="left" plain>
               <strong className="divider-text">
                  {<LikeFilled />} 재밌어요를 누른 영화 리스트
               </strong>
            </Divider>
            <List
               itemLayout="horizontal"
               dataSource={likedMovie}
               renderItem={(item) => (
                  <List.Item>
                     <List.Item.Meta
                        avatar={
                           <Avatar
                              src={`https://image.tmdb.org/t/p/w500${item.posters}`}
                              size="large"
                              className="myInfo-likedMovie-img"
                              onClick={() => this.handleCurrentLikedMovie(item)}
                           />
                        }
                        title={
                           <strong
                              className="myInfo-likedMovie-title"
                              onClick={() => this.handleCurrentLikedMovie(item)}
                           >
                              {(item.title + item.titleEng).length > 20
                                 ? (
                                      item.title +
                                      '(' +
                                      item.titleEng +
                                      ')'
                                   ).substring(0, 16) + '...'
                                 : item.title + '(' + item.titleEng + ')'}
                           </strong>
                        }
                     />
                     <div>⭐ {item.userRating}</div>
                  </List.Item>
               )}
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
                  isLogin={this.props.isLogin}
                  profile={this.props.profile}
                  currentMovie={currentMovie}
                  likeFilled={this.state.likeFilled}
                  numberOfLikes={currentMovie.numberOfLikes}
                  handleNumberOfLikesIncrease={this.handleNumberOfLikesIncrease}
                  handleNumberOfLikesDecrease={this.handleNumberOfLikesDecrease}
               />
            </Modal>
         </div>
      );
   }
}

// eslint-disable-next-line
export default MyInfo;
// eslint-disable-next-line
