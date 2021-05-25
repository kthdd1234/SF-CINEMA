import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Button, Popconfirm, Tag } from 'antd';
import {
   LikeOutlined,
   LikeFilled,
   PushpinOutlined,
   PushpinFilled,
   PlayCircleOutlined,
} from '@ant-design/icons';
import {
   // handleUserFavoritedData,
   handlePopconfirmVisible,
   handleSaveCompletedNotification,
   handleSaveCancelNotification,
   handleLikeCompletedNotification,
   handleLikeCancelNotification,
   handleTrailerVisible,
} from '../../utils';
import {
   reqMovie,
   requestSaveCompleted,
   requestSaveCancel,
   requestLikeCompleted,
   requestLikeCancel,
} from '../../requests';
import Trailer from './Trailer';
import './Movie.css';

const BackDrop = ({ backDrop }) => {
   return (
      <div className="movie-img-box">
         <div className="img-shadow" />
         <img
            className="movie-img"
            src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${backDrop}`}
         />
      </div>
   );
};

const Titles = ({ title, titleEng, releaseDate }) => {
   return (
      <div className="movie-title">
         <div className="movie-title-sub">{title}</div>
         <div className="movie-title-eng">
            {`${titleEng} (${String(releaseDate).slice(0, 4)})`}
         </div>
      </div>
   );
};

const Info = ({ userRating, numberOfLikes, genre, ratingGrade, runtime }) => {
   const info = {
      '영화 평점': [userRating, 'success'],
      재밌어요: [numberOfLikes, 'geekblue'],
      장르: [genre, 'magenta'],
      등급: [ratingGrade, 'blue'],
      재생시간: [runtime, 'default'],
   };

   return (
      <div className="item-tag-wrap">
         {Object.entries(info).map((data, i) => (
            <Tag
               key={i}
               className="tag-text"
               color={data[1][1]}
            >{`${data[0]} : ${data[1][0]}`}</Tag>
         ))}
      </div>
   );
};

const Plot = ({ plot }) => {
   return <div className="movie-plot">{plot}</div>;
};

const Details = ({ director, actors }) => {
   return (
      <div className="movie-details">
         <div className="movie-director">
            <strong className="movie-sub">감독</strong>
            {director}
         </div>
         <div className="movie-actors">
            <strong className="movie-sub">출연</strong>
            {actors}
         </div>
      </div>
   );
};

const PopUpBtn = ({
   title,
   mid,
   onVisibleChange,
   onConfirm,
   visible,
   className,
   icon,
   type,
   onClick,
   text,
}) => {
   return (
      <Popconfirm
         title={
            <div>
               {title}
               <div>{mid}</div>
            </div>
         }
         onVisibleChange={onVisibleChange}
         onConfirm={onConfirm}
         visible={visible}
         okText="로그인 하러 가기"
         cancelText="닫기"
      >
         <Button
            className={className}
            icon={icon}
            type={type}
            onClick={onClick}
         >
            {text}
         </Button>
      </Popconfirm>
   );
};

const Btns = ({
   setTrailer,
   history,
   setPopcomfirm,
   setLikePopComfirm,
   setSavePopComfirm,
   likePopComfirm,
   savePopComfirm,
   likedFilled,
   savedFilled,
   setLike,
   setSave,
}) => {
   const PopUpList = [
      [
         '혹시 이 영화를 보셨나요?',
         '로그인을 하여 영화에 대한 평가를 내려주세요.',
         setPopcomfirm(setLikePopComfirm),
         likePopComfirm,
         likedFilled ? 'like-fill btn-color' : 'like-out btn-color',
         likedFilled ? <LikeFilled /> : <LikeOutlined />,
         'ghost',
         setLike,
         '재밌어요',
      ],
      [
         '로그인이 되어 있지 않습니다.',
         '로그인을 하여 영화 정보를 저장해보세요.',
         setPopcomfirm(setSavePopComfirm),
         savePopComfirm,
         savedFilled ? 'pushpin-fill btn-color' : 'pushpin-out btn-color',
         savedFilled ? <PushpinFilled /> : <PushpinOutlined />,
         'ghost',
         setSave,
         '저장하기',
      ],
   ];

   return (
      <div className="movie-btns">
         <Button
            className="trailer-btn"
            icon={<PlayCircleOutlined />}
            type="danger"
            onClick={() => setTrailer(true)}
         >
            예고편 보기
         </Button>
         {PopUpList.map((list, i) => (
            <PopUpBtn
               key={i}
               title={list[0]}
               mid={list[1]}
               onVisibleChange={list[2]}
               onConfirm={() => history.push('/login')}
               visible={list[3]}
               className={list[4]}
               icon={list[5]}
               type={list[6]}
               onClick={list[7]}
               text={list[8]}
            />
         ))}
      </div>
   );
};

const Movie = ({ isLogin, profile, history }) => {
   const [movie, setMovie] = useState([]);
   const [savedFilled, setSavedFilled] = useState(false);
   const [savePopComfirm, setSavePopComfirm] = useState(false);
   const [likedFilled, setLikedFilled] = useState(false);
   const [likePopComfirm, setLikePopComfirm] = useState(false);
   const [trailer, setTrailer] = useState(false);
   const [numberOfLikes, setNumberOfLikes] = useState(0);

   useEffect(() => {
      const req = async () => {
         const movie = await reqMovie();

         if (isLogin) {
            const data = await favorite(profile, movie.id);
            setSavedFilled(data[0]);
            setLikedFilled(data[1]);
         }
         setMovie(movie);
         setNumberOfLikes(movie.numberOfLikes);
      };
      req();
   }, []);

   const setPopcomfirm = (popcomfirm) => (visible) => {
      !isLogin ? (visible ? popcomfirm(true) : popcomfirm(false)) : false;
   };

   const setSave = () => {
      if (isLogin) {
         if (!savedFilled) {
            requestSaveCompleted(profile.id, movie.id);
            handleSaveCompletedNotification('bottomLeft');
         } else {
            requestSaveCancel(profile.id, movie.id);
            handleSaveCancelNotification('bottomLeft');
         }
         setSavedFilled(!savedFilled);
      }
   };

   const setLike = () => {
      if (isLogin) {
         if (!likedFilled) {
            requestLikeCompleted(profile.id, movie.id);
            setNumberOfLikes(numberOfLikes + 1);
            handleLikeCompletedNotification('bottomLeft');
         } else {
            requestLikeCancel(profile.id, movie.id);
            setNumberOfLikes(numberOfLikes - 1);
            handleLikeCancelNotification('bottomLeft');
         }
         setLikedFilled(!likedFilled);
      }
   };

   const {
      title,
      titleEng,
      genre,
      director,
      plot,
      actors,
      releaseDate,
      runtime,
      ratingGrade,
      userRating,
      backDrop,
      videoId,
   } = movie;

   return (
      <div className="movie">
         <BackDrop backDrop={backDrop} />
         <Titles title={title} titleEng={titleEng} releaseDate={releaseDate} />
         <Info
            userRating={userRating}
            numberOfLikes={numberOfLikes}
            genre={genre}
            ratingGrade={ratingGrade}
            runtime={runtime}
         />
         <Plot plot={plot} />
         <Details director={director} actors={actors} />
         <Btns
            setTrailer={setTrailer}
            history={history}
            setPopcomfirm={setPopcomfirm}
            setLikePopComfirm={setLikePopComfirm}
            setSavePopComfirm={setSavePopComfirm}
            likePopComfirm={likePopComfirm}
            savePopComfirm={savePopComfirm}
            likedFilled={likedFilled}
            savedFilled={savedFilled}
            setLike={setLike}
            setSave={setSave}
         />
         {trailer ? (
            <Trailer videoId={videoId} handleSettingTrailer={setTrailer} />
         ) : null}
      </div>
   );
};

export default withRouter(Movie);

// class Movie extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          movie: [],
//          savedFilled: false,
//          savePopComfirm: false,
//          likedFilled: false,
//          likePopComfirm: false,
//          trailer: false,
//          numberOfLikes: 0,
//       };
//    }

// componentDidMount = async () => {
//    const movie = await reqMovie();
//    const { isLogin, profile } = this.props;

//    if (isLogin) {
//       const favoritedData = await handleUserFavoritedData(profile, movie);
//       if (favoritedData) this.setState(favoritedData);
//    }
//    this.setState({ numberOfLikes: movie.numberOfLikes, movie: movie });
// };

// componentDidUpdate = async (prevProps) => {
//    const { isLogin, profile } = this.props;

//    if (prevProps.isLogin !== isLogin) {
//       const movie = await reqMovie();
//       const favoritedData = await handleUserFavoritedData(profile, movie);
//       if (favoritedData) this.setState(favoritedData);
//    }
// };
// handleSettingTrailer = () => {
//    this.setState({ trailer: !this.state.trailer });
// };

// handlePopconfirmChange = (key) => (visible) => {
//    const { isLogin } = this.props;
//    const visibleResult = handlePopconfirmVisible(key, isLogin, visible);
//    this.setState(visibleResult);
// };

// handleSettingSave = async () => {
//    const { isLogin, profile, handleProfileUpdate } = this.props;
//    const { movie, savedFilled } = this.state;
//    const userId = profile.id;
//    const movieId = movie.id;

//    if (isLogin) {
//       if (!savedFilled) {
//          const profile = await requestSaveCompleted(userId, movieId);
//          handleProfileUpdate(profile);
//          handleSaveCompletedNotification('bottomLeft');
//       } else {
//          const profile = await requestSaveCancel(userId, movieId);
//          handleProfileUpdate(profile);
//          handleSaveCancelNotification('bottomLeft');
//       }

//       this.setState({ savedFilled: !savedFilled });
//    }
// };

// handleSettingLike = async () => {
//    const { likedFilled, numberOfLikes, movie } = this.state;
//    const { isLogin, profile, handleProfileUpdate } = this.props;
//    const userId = profile.id;
//    const movieId = movie.id;

//    if (isLogin) {
//       if (!likedFilled) {
//          const profile = await requestLikeCompleted(userId, movieId);
//          handleProfileUpdate(profile);
//          this.setState({ numberOfLikes: numberOfLikes + 1 });
//          handleLikeCompletedNotification('bottomLeft');
//       } else {
//          const profile = await requestLikeCancel(userId, movieId);
//          handleProfileUpdate(profile);
//          this.setState({ numberOfLikes: numberOfLikes - 1 });
//          handleLikeCancelNotification('bottomLeft');
//       }
//       this.setState({ likedFilled: !likedFilled });
//    }
// };

// render() {
// const {
//    movie,
//    savedFilled,
//    savePopComfirm,
//    likedFilled,
//    likePopComfirm,
//    numberOfLikes,
//    trailer,
// } = this.state;

// const {
//    title,
//    titleEng,
//    genre,
//    director,
//    plot,
//    actors,
//    releaseDate,
//    runtime,
//    ratingGrade,
//    userRating,
//    backDrop,
//    videoId,
// } = movie;

// const info = {
//    '영화 평점': [userRating, 'success'],
//    재밌어요: [numberOfLikes, 'geekblue'],
//    장르: [genre, 'magenta'],
//    등급: [ratingGrade, 'blue'],
//    재생시간: [runtime, 'default'],
// };

// const Info = () => {
//    return (
//       <div className="item-tag-wrap">
//          {Object.entries(info).map((data, i) => (
//             <Tag
//                key={i}
//                className="tag-text"
//                color={data[1][1]}
//             >{`${data[0]} : ${data[1][0]}`}</Tag>
//          ))}
//       </div>
//    );
// };

// const PopUpList = [
//    [
//       '혹시 이 영화를 보셨나요?',
//       '로그인을 하여 영화에 대한 평가를 내려주세요.',
//       this.handlePopconfirmChange('likePopComfirm'),
//       likePopComfirm,
//       likedFilled ? 'like-fill btn-color' : 'like-out btn-color',
//       likedFilled ? <LikeFilled /> : <LikeOutlined />,
//       'ghost',
//       this.handleSettingLike,
//       '재밌어요',
//    ],
//    [
//       '로그인이 되어 있지 않습니다.',
//       '로그인을 하여 영화 정보를 저장해보세요.',
//       this.handlePopconfirmChange('savePopComfirm'),
//       savePopComfirm,
//       savedFilled ? 'pushpin-fill btn-color' : 'pushpin-out btn-color',
//       savedFilled ? <PushpinFilled /> : <PushpinOutlined />,
//       'ghost',
//       this.handleSettingSave,
//       '저장하기',
//    ],
// ];

// const Btns = () => {
//    return (
//       <div className="movie-btns">
//          <Button
//             className="trailer-btn"
//             icon={<PlayCircleOutlined />}
//             type="danger"
//             onClick={this.handleSettingTrailer}
//          >
//             예고편 보기
//          </Button>
//          {PopUpList.map((list, i) => (
//             <PopUpBtn
//                key={i}
//                title={list[0]}
//                mid={list[1]}
//                onVisibleChange={list[2]}
//                onConfirm={() => this.props.history.push('/login')}
//                visible={list[3]}
//                className={list[4]}
//                icon={list[5]}
//                type={list[6]}
//                onClick={list[7]}
//                text={list[8]}
//             />
//          ))}
//       </div>
//    );
// };

// return (
//    <div className="movie">
//       <BackDrop backDrop={backDrop} />
//       <Titles
//          title={title}
//          titleEng={titleEng}
//          releaseDate={releaseDate}
//       />
//       <Info />
//       <Plot plot={plot} />
//       <Details director={director} actors={actors} />
//       <Btns />
//       {trailer ? (
//          <Trailer
//             videoId={videoId}
//             handleSettingTrailer={this.handleSettingTrailer.bind(this)}
//          />
//       ) : null}
//    </div>
// );
//    }
// }
