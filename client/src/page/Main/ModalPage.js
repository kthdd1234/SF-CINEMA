import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ModalImage from './Modal-image';
import ModalSummary from './Modal-summary';
import 'antd/dist/antd.css';
import { Button, Popconfirm, Modal } from 'antd';
import {
   LikeOutlined,
   DislikeOutlined,
   LikeFilled,
   DislikeFilled,
   PushpinOutlined,
   PushpinFilled,
   PlayCircleOutlined,
   CloseOutlined,
} from '@ant-design/icons';
import $ from 'jquery';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import Trailer from './Trailer';
import './ModalPage.css';

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/user',
});

class ModalPage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loginID: null,
         pushpinVisible: false,
         likeVisible: false,
         dislikeVisible: false,
         pushpin: false,
         like: false,
         dislike: false,
         tralierShow: false,
      };
   }

   componentDidUpdate = (prevProps) => {
      if (this.props.isLogin) {
         if (this.props.currentMovie !== prevProps.currentMovie) {
            this.setState({
               pushpin: false,
               like: false,
               dislike: false,
            });
            const accessToken = reactLocalStorage.get('SFCinemaUserToken');
            if (accessToken) {
               axios
                  .get('http://localhost:5000/user/profile', {
                     headers: {
                        Authorization: 'Bearer ' + accessToken,
                     },
                  })
                  .then(({ data }) => {
                     const { savedMovie, likedMovie, disLikedMovie } = data;
                     this.handleUserFavoritedData(
                        savedMovie,
                        likedMovie,
                        disLikedMovie,
                     );
                  });
            }
         }
      }
   };

   handleUserFavoritedData = (...favaritedData) => {
      let favarite = ['pushpin', 'like', 'dislike'];
      for (let i = 0; i < favaritedData.length; i++) {
         for (let j = 0; j < favaritedData[i].length; j++) {
            if (favaritedData[i][j].id === this.props.currentMovie.id) {
               this.setState({
                  [favarite[i]]: true,
               });
            }
         }
      }
   };

   componentDidMount = () => {
      if (this.props.isLogin) {
         const accessToken = reactLocalStorage.get('SFCinemaUserToken');
         if (accessToken) {
            axios
               .get('http://localhost:5000/user/profile', {
                  headers: {
                     Authorization: 'Bearer ' + accessToken,
                  },
               })
               .then(({ data }) => {
                  const {
                     loginID,
                     savedMovie,
                     likedMovie,
                     disLikedMovie,
                  } = data;
                  this.setState({
                     loginID: loginID,
                  });
                  this.handleUserFavoritedData(
                     savedMovie,
                     likedMovie,
                     disLikedMovie,
                  );
               });
         }
      }
   };

   onVisibleChange = (target) => (visible) => {
      if (!this.props.isLogin) {
         if (visible) {
            this.setState({
               [target]: true,
            });
         } else {
            this.setState({
               [target]: false,
            });
         }
      }
   };

   handlePushpinButton = () => {
      const { pushpin, loginID } = this.state;
      const { isLogin } = this.props;

      if (isLogin) {
         if (!pushpin) {
            serverUrl.post('/savedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
         } else {
            serverUrl.post('/cancelSavedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
         }
         this.setState({
            pushpin: !pushpin,
         });
      }
   };

   handleLikeButton = () => {
      const { like, loginID } = this.state;
      const { isLogin } = this.props;
      if (isLogin) {
         if (!like) {
            serverUrl.post('/likedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
         } else {
            serverUrl.post('/cancelLikedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
         }
         this.setState({
            like: !like,
            dislike: false,
         });
      }
   };

   handleDisLikeButton = () => {
      const { dislike, loginID } = this.state;
      const { isLogin } = this.props;

      if (isLogin) {
         if (!dislike) {
            serverUrl.post('/disLikedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
         } else {
            serverUrl.post('/cancelDisLikedMovie', {
               loginID: loginID,
               movieId: this.props.currentMovie.id,
            });
         }
         this.setState({
            dislike: !dislike,
            like: false,
         });
      }
   };

   navigateToLoginPage = () => {
      this.props.history.push('/login');
      window.scrollTo(0, 0);
   };

   setModalTrailerVisible = (tralierShow) => {
      if (!tralierShow) {
         $('.movie-trailer')[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
      }
      this.setState({ tralierShow });
   };

   render() {
      console.log(this.props.currentMovie);

      let {
         id,
         title,
         titleEng,
         director,
         plot,
         posters,
         nation,
         actors,
         releaseDate,
         runtime,
         ratingGrade,
         userRating,
         videoId,
      } = this.props.currentMovie;

      let MoviePlot = '';
      let lengthOfPlot = plot.length;
      if (lengthOfPlot > 310) {
         let check_spc = /[.!,(]/;
         MoviePlot = plot.substring(0, 310);
         let lastStr = '';
         do {
            lastStr = MoviePlot[MoviePlot.length - 1];
            MoviePlot = MoviePlot.slice(0, -1);
         } while (!check_spc.test(lastStr));
         MoviePlot = MoviePlot + '...';
      } else {
         for (let i = lengthOfPlot; i < 310; i++) {
            plot = plot + ' ' + '\u00A0';
         }
         MoviePlot = plot;
      }

      actors = JSON.parse(actors).slice(0, 4);
      actors = actors.join(', ');

      JSON.parse(posters);

      let convertStrDate = String(releaseDate);
      let releaseYear = convertStrDate.slice(0, 4);
      convertStrDate = convertStrDate
         .replace(/(.{4})/, '$1.')
         .replace(/(.{7})/, '$1.');

      let summay_subs = [
         'SF',
         nation,
         convertStrDate + ' 개봉',
         ratingGrade,
         runtime + '분',
      ];

      const { pushpin, like, dislike } = this.state;

      return (
         <div>
            <ModalImage key={id} img={JSON.parse(posters)[0]} alt={id} />

            <div className="modal-container">
               <div>
                  <Popconfirm
                     title={
                        <div>
                           로그인이 되어 있지 않습니다.
                           <div>로그인을 하여 영화 정보를 저장해보세요.</div>
                        </div>
                     }
                     onVisibleChange={this.onVisibleChange('pushpinVisible')}
                     onConfirm={this.navigateToLoginPage}
                     visible={this.state.pushpinVisible}
                     okText="로그인 하러 가기"
                     cancelText="닫기"
                  >
                     <Button
                        icon={pushpin ? <PushpinFilled /> : <PushpinOutlined />}
                        shape="circle"
                        onClick={this.handlePushpinButton}
                        danger={true}
                     ></Button>
                  </Popconfirm>
               </div>

               <strong className="modal-header-title">{title}</strong>
               <strong className="modal-header-titleEng_year">
                  {title.length < 11 ? `(${titleEng}, ${releaseYear})` : null}
               </strong>
               <div>
                  {title.length >= 11 ? (
                     <strong className="modal-header-titleEng_year">
                        {`(${titleEng}, ${releaseYear})`}
                     </strong>
                  ) : null}
               </div>

               <div>
                  <ul className="modal-rating-list">
                     <li className="modal-user-rating">⭐ {userRating}</li>

                     <li className="modal-my-rating">
                        <Popconfirm
                           title={
                              <div>
                                 혹시 이 영화를 보셨나요?
                                 <div>
                                    로그인을 하여 영화에 대한 의견을 알려주세요.
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
                              icon={like ? <LikeFilled /> : <LikeOutlined />}
                              className={like ? 'like-fill' : 'like-out'}
                              onClick={this.handleLikeButton}
                              type="text"
                           >
                              좋아요
                           </Button>
                        </Popconfirm>
                        <Popconfirm
                           title={
                              <div>
                                 혹시 이 영화를 보셨나요?
                                 <div>
                                    로그인을 하여 영화에 대한 의견을 알려주세요.
                                 </div>
                              </div>
                           }
                           onVisibleChange={this.onVisibleChange(
                              'dislikeVisible',
                           )}
                           onConfirm={this.navigateToLoginPage}
                           visible={this.state.dislikeVisible}
                           okText="로그인 하러 가기"
                           cancelText="닫기"
                        >
                           <Button
                              icon={
                                 dislike ? (
                                    <DislikeFilled />
                                 ) : (
                                    <DislikeOutlined />
                                 )
                              }
                              className={
                                 dislike ? 'dislike-fill' : 'dislike-out'
                              }
                              onClick={this.handleDisLikeButton}
                              type="text"
                           >
                              노잼
                           </Button>
                        </Popconfirm>
                     </li>
                     <Button
                        icon={<PlayCircleOutlined />}
                        type="primary"
                        onClick={() => this.setModalTrailerVisible(true)}
                     >
                        예고편 보기
                     </Button>
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
                  </ul>
               </div>

               <hr className="border-bottom-line" />

               <div>
                  <ul className="modal-summary">
                     {summay_subs.map((sub, i) => (
                        <ModalSummary key={i} sub={sub} i={i} />
                     ))}
                  </ul>
               </div>
               <div className="modal-plot">{MoviePlot}</div>
               <hr className="border-bottom-line" />
               <div>
                  <div>
                     <strong className="modal-director">감독</strong>
                     {director}
                  </div>
                  <div>
                     <strong className="modal-actors">출연</strong>
                     {actors}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

// eslint-disable-next-line
export default withRouter(ModalPage);
// eslint-disable-next-line
