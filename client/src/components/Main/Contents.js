import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import $ from 'jquery';
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
} from '../../utils';
import { requestContests } from '../../requests';
import Trailer from './Trailer';
import './Contents.css';

dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/user`,
});

class Contents extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: null,
         pushpinVisible: false,
         likeVisible: false,
         pushpin: false,
         like: false,
         tralierShow: false,
         numberOfLikes: 0,
         contensts: {},
      };
   }

   componentDidMount = async () => {
      const contensts = await requestContests();

      this.setState({
         contensts: contensts,
         numberOfLikes: contensts.numberOfLikes,
         pushpin: false,
         like: false,
      });
      if (this.props.isLogin) {
         const favoritedData = await handleUserFavoritedData(
            this.props.profile,
            contensts,
         );
         if (favoritedData) this.setState(favoritedData);
      }
   };

   componentDidUpdate = async (prevProps) => {
      const contensts = await requestContests();

      if (prevProps.isLogin !== this.props.isLogin) {
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

   handlePushpinButton = () => {
      const { pushpin, loginID } = this.state;
      const { isLogin } = this.props;

      if (isLogin) {
         if (!pushpin) {
            serverUrl.post('/savedMovie', {
               loginID: loginID,
               movieId: this.props.id,
            });
            handleSaveCompletedNotification('bottomLeft');
         } else {
            serverUrl.delete('/cancelSavedMovie', {
               data: {
                  loginID: loginID,
                  movieId: this.props.id,
               },
            });
            handleSaveCancelNotification('bottomLeft');
         }
         this.setState({
            pushpin: !pushpin,
         });
      }
   };

   handleLikeButton = async () => {
      const { like, numberOfLikes } = this.state;
      const contensts = await requestContests();

      if (this.props.isLogin) {
         if (!like) {
            serverUrl.post('/likedMovie', {
               loginID: this.props.profile.loginID,
               movieId: contensts.id,
            });
            handleLikeCompletedNotification('bottomLeft');
            this.setState({
               numberOfLikes: numberOfLikes + 1,
            });
         } else {
            serverUrl.delete('/cancelLikedMovie', {
               data: {
                  loginID: this.props.profile.loginID,
                  movieId: contensts.id,
               },
            });

            handleLikeCancelNotification('bottomLeft');
            this.setState({
               numberOfLikes: numberOfLikes - 1,
            });
         }
         this.setState({
            like: !like,
         });
      }
   };

   setModalTrailerVisible(tralierShow) {
      if (tralierShow === false) {
         $(`.${this.state.contensts.videoId}`)[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
      }
      this.setState({ tralierShow });
   }

   render() {
      let {
         title,
         titleEng,
         genre,
         director,
         plot,
         actors,
         releaseYear,
         runtime,
         ratingGrade,
         userRating,
         backDrop,
         videoId,
      } = this.state.contensts;

      const { pushpin, like, numberOfLikes } = this.state;

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
                              {`${titleEng} (${releaseYear})`}
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
                           'likeVisible',
                        )}
                        onConfirm={() => this.props.history.push('/login')}
                        visible={this.state.likeVisible}
                        okText="로그인 하러 가기"
                        cancelText="닫기"
                     >
                        <Button
                           icon={like ? <LikeFilled /> : <LikeOutlined />}
                           className={
                              like
                                 ? 'like-fill btn-color'
                                 : 'like-out btn-color'
                           }
                           onClick={this.handleLikeButton}
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
                           'pushpinVisible',
                        )}
                        onConfirm={this.navigateToLoginPage}
                        visible={this.state.pushpinVisible}
                        okText="로그인 하러 가기"
                        cancelText="닫기"
                     >
                        <Button
                           icon={
                              pushpin ? <PushpinFilled /> : <PushpinOutlined />
                           }
                           className={
                              pushpin
                                 ? 'pushpin-fill btn-color'
                                 : 'pushpin-out btn-color'
                           }
                           onClick={this.handlePushpinButton}
                           type="ghost"
                        >
                           저장하기
                        </Button>
                     </Popconfirm>
                     <Button
                        className="trailer-btn"
                        icon={<PlayCircleOutlined />}
                        type="ghost"
                        onClick={() => this.setModalTrailerVisible(true)}
                     >
                        예고편 보기
                     </Button>
                  </div>
               </div>
               <Modal
                  visible={this.state.tralierShow}
                  onOk={() => this.setModalTrailerVisible(false)}
                  onCancel={() => this.setModalTrailerVisible(false)}
                  footer={null}
                  width={1300}
               >
                  <Button
                     ghost
                     icon={<CloseOutlined />}
                     className="trailer-close"
                     onClick={() => this.setModalTrailerVisible(false)}
                  />
                  <Trailer videoId={videoId} />
               </Modal>
            </div>
         </div>
      );
   }
}

export default withRouter(Contents);
