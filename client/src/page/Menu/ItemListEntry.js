import React from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { withRouter } from 'react-router-dom';
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
import ItemSub from './Item-sub';
import Trailer from '../Main/Trailer';
import './ItemListEntry.css';
import $ from 'jquery';

const serverUrl = axios.create({
   baseURL: 'http://localhost:5000/user',
});

class ItemListEntry extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         pushpinVisible: false,
         likeVisible: false,
         dislikeVisible: false,
         pushpin: false,
         like: false,
         dislike: false,
         loginID: null,
         tralierShow: false,
      };
   }

   componentDidUpdate = (prevProps) => {
      if (this.props.isLogin) {
         if (this.props.id !== prevProps.id) {
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
            if (favaritedData[i][j].id === this.props.id) {
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
               movieId: this.props.id,
            });
         } else {
            serverUrl.post('/cancelSavedMovie', {
               loginID: loginID,
               movieId: this.props.id,
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
               movieId: this.props.id,
            });
         } else {
            serverUrl.post('/cancelLikedMovie', {
               loginID: loginID,
               movieId: this.props.id,
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
               movieId: this.props.id,
            });
         } else {
            serverUrl.post('/cancelDisLikedMovie', {
               loginID: loginID,
               movieId: this.props.id,
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
   };

   setModalTrailerVisible(tralierShow) {
      if (tralierShow === false) {
         console.log(tralierShow);
         $(`.${this.props.videoId}`)[0].contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*',
         );
      }
      this.setState({ tralierShow });
   }

   render() {
      const {
         title,
         titleEng,
         director,
         plot,
         posters,
         nation,
         actors,
         releaseDate,
         releaseYear,
         runtime,
         ratingGrade,
         userRating,
         videoId,
      } = this.props;

      const { pushpin, like, dislike } = this.state;

      const sub_list = [
         'SF/모험',
         nation,
         `${releaseDate} 개봉`,
         ratingGrade,
         `${runtime}분`,
      ];

      return (
         <div>
            <div className="moive-content">
               <div className="movie-img-box">
                  <img className="movie-img" src={posters}></img>
               </div>
               <div className="movie-info">
                  <div className="movie-headers">
                     <div>
                        <Popconfirm
                           title={
                              <div>
                                 로그인이 되어 있지 않습니다.
                                 <div>
                                    로그인을 하여 영화 정보를 저장해보세요.
                                 </div>
                              </div>
                           }
                           onVisibleChange={this.onVisibleChange(
                              'pushpinVisible',
                           )}
                           onConfirm={this.navigateToLoginPage}
                           visible={this.state.pushpinVisible}
                           okText="로그인 하러 가기"
                           cancelText="닫기"
                        >
                           <Button
                              icon={
                                 pushpin ? (
                                    <PushpinFilled />
                                 ) : (
                                    <PushpinOutlined />
                                 )
                              }
                              shape="circle"
                              onClick={this.handlePushpinButton}
                              danger={true}
                           ></Button>
                        </Popconfirm>
                     </div>
                     <div className="movie-title-list">
                        <strong className="movie-title">{title}</strong>
                        <div>
                           <strong className="movie-titleEng_year">
                              {`(${titleEng}, ${releaseYear})`}
                           </strong>
                        </div>
                     </div>
                     <ul className="movie-rating-list">
                        <li className="movie-user-rating">
                           <strong className="movie-rating">평점</strong>⭐ ⭐
                           ⭐ ⭐ ⭐ {userRating}
                        </li>
                        <li className="movie-my-rating">
                           <strong className="movie-rating">
                              <Popconfirm
                                 title={
                                    <div>
                                       혹시 이 영화를 보셨나요?
                                       <div>
                                          로그인을 하여 영화에 대한 의견을
                                          알려주세요.
                                       </div>
                                    </div>
                                 }
                                 onVisibleChange={this.onVisibleChange(
                                    'likeVisible',
                                 )}
                                 onConfirm={this.navigateToLoginPage}
                                 visible={this.state.likeVisible}
                                 okText="로그인 하러 가기"
                                 cancelText="닫기"
                              >
                                 <Button
                                    icon={
                                       like ? <LikeFilled /> : <LikeOutlined />
                                    }
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
                                          로그인을 하여 영화에 대한 의견을
                                          알려주세요.
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
                           </strong>
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
                              onCancel={() =>
                                 this.setModalTrailerVisible(false)
                              }
                              footer={null}
                              width={1300}
                           >
                              <Button
                                 ghost
                                 icon={<CloseOutlined />}
                                 className="trailer-close"
                                 onClick={() =>
                                    this.setModalTrailerVisible(false)
                                 }
                              />
                              <Trailer videoId={videoId} />
                           </Modal>
                        </li>
                     </ul>
                  </div>

                  <hr className="border-bottom-line" />

                  <div className="movie-body">
                     <ul className="movie-summary">
                        {sub_list.map((sub, i) => (
                           <ItemSub key={i} sub={sub} i={i} />
                        ))}
                     </ul>
                     <div className="movie-plot">{plot}</div>

                     <hr className="border-bottom-line" />

                     <div className="movie-director_actors_awards">
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
               </div>
            </div>
         </div>
      );
   }
}

export default withRouter(ItemListEntry);

// function SubjectListEntry({
//    title,
//    titleEng,
//    director,
//    plot,
//    posters,
//    nation,
//    actors,
//    releaseDate,
//    releaseYear,
//    runtime,
//    ratingGrade,
//    userRating,
// }) {
//    const sub_list = [
//       'SF/모험',
//       nation,
//       `${releaseDate} 개봉`,
//       ratingGrade,
//       `${runtime}분`,
//    ];
//    return (
//       <div>
//          <div className="moive-content">
//             <div className="movie-img-box">
//                <img className="movie-img" src={posters}></img>
//             </div>
//             <div className="movie-info">
//                <div className="movie-headers">
//                   <div className="movie-title-list">
//                      <strong className="movie-title">{title}</strong>
//                      <div>
//                         <strong className="movie-titleEng_year">
//                            {`(${titleEng}, ${releaseYear})`}
//                         </strong>
//                      </div>
//                   </div>
//                   <ul className="movie-rating-list">
//                      <li className="movie-user-rating">
//                         <strong className="movie-rating">평점</strong>⭐ ⭐ ⭐
//                         ⭐ ⭐ {userRating}
//                      </li>
//                      <li className="movie-my-rating">
//                         <strong className="movie-rating"></strong>
//                      </li>
//                   </ul>
//                </div>

//                <hr className="border-bottom-line" />

//                <div className="movie-body">
//                   <ul className="movie-summary">
//                      {sub_list.map((sub, i) => (
//                         <SubjectSummary key={i} sub={sub} i={i} />
//                      ))}
//                   </ul>
//                   <div className="movie-plot">{plot}</div>

//                   <hr className="border-bottom-line" />

//                   <div className="movie-director_actors_awards">
//                      <div className="movie-director">
//                         <strong className="movie-sub">감독</strong>
//                         {director}
//                      </div>
//                      <div className="movie-actors">
//                         <strong className="movie-sub">출연</strong>
//                         {actors}
//                      </div>
//                      <div className="movie-awards">
//                         <strong className="movie-sub">수상</strong>
//                         아카데미 시각효과상, 엠파이어 영화상, 엠파이어 감독상
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }
// // eslint - disable - next - line;
