import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { List, Avatar, Divider, Modal } from 'antd';
import {
   UserOutlined,
   PushpinFilled,
   LikeFilled,
   ReloadOutlined,
} from '@ant-design/icons';
import { handleUserFavoritedData } from '../../utils';
// import ContentsModal from '../../containers/Main/ContentsModal';
import './Profile.css';

class Profile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modalVisible: false,
         currentMovie: {},
         numberOfLikes: 0,
         likedFilled: false,
      };
   }

   handleModalVisible = (modalVisible, movie) => {
      this.props.history.push(`/contents/${movie.id}`);
   };

   handleCurrentSavedMovie = (currentMovie) => {
      const { profile } = this.props;
      this.setState({ likedFilled: false });

      const favoritedData = handleUserFavoritedData(profile, currentMovie);
      this.handleModalVisible(true, currentMovie);

      this.setState({
         currentMovie: currentMovie,
         numberOfLikes: currentMovie.numberOfLikes,
         favoritedData,
      });
   };

   handleCurrentLikedMovie = (currentMovie) => {
      const { profile } = this.props;
      this.setState({ likedFilled: false });

      const favoritedData = handleUserFavoritedData(profile, currentMovie);
      this.handleModalVisible(true, currentMovie);

      this.setState({
         currentMovie: currentMovie,
         numberOfLikes: currentMovie.numberOfLikes,
         favoritedData,
      });
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
         loginID,
         username,
         profileImg,
         provider,
         savedMovie,
         likedMovie,
      } = this.props.profile;

      const { modalVisible, currentMovie, likedFilled } = this.state;

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
         </div>
      );
   }
}

// eslint-disable-next-line
export default withRouter(Profile);
// eslint-disable-next-line
