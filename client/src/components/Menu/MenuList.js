import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import * as icons from '@ant-design/icons';
import * as request from '../../requests';
import List from '../Search/List';
import { handleURLSearchParams } from '../../utils';
import './MenuList.css';

const {
   requestHighlyRatedMovies,
   requestLatestMovies,
   requestOperatorRecommendation,
   requestSFMasterpiece,
   requestGenre,
   requestSeries,
} = request;

const {
   VideoCameraFilled,
   StarFilled,
   GiftFilled,
   CrownFilled,
   RocketFilled,
   RedditCircleFilled,
   DingdingOutlined,
   ThunderboltFilled,
   GitlabFilled,
   RobotFilled,
   HourglassFilled,
   ReadFilled,
   EyeInvisibleFilled,
   FireFilled,
} = icons;

const reqList = {
   'highly-rated-movies': requestHighlyRatedMovies,
   'latest-movies': requestLatestMovies,
   'operator-recommendation': requestOperatorRecommendation,
   'sf-masterpiece': requestSFMasterpiece,
   genre: requestGenre,
   series: requestSeries,
};

const subList = {
   'latest-movies': ['최신 영화', <VideoCameraFilled />],
   'highly-rated-movies': ['평점이 높은 영화', <StarFilled />],
   'operator-recommendation': ['운영자 추천', <GiftFilled />],
   'sf-masterpiece': ['SF 명작', <CrownFilled />],
};

const genreIcons = {
   '우주 탐사': <RocketFilled />,
   외계인: <RedditCircleFilled />,
   '슈퍼 히어로': <DingdingOutlined />,
   액션: <ThunderboltFilled />,
   몬스터: <GitlabFilled />,
   '가상 현실 또는 AI': <RobotFilled />,
   '시간 여행': <HourglassFilled />,
   드라마: <ReadFilled />,
   좀비: <EyeInvisibleFilled />,
   재난: <FireFilled />,
};

const SelectBtn = ({ onChangeSelect }) => {
   return (
      <div>
         <Select
            className="itemList-select"
            defaultValue="선택해주세요"
            size="large"
            onChange={onChangeSelect}
            suffixIcon={
               <icons.CaretDownFilled style={{ color: 'whitesmoke' }} />
            }
         >
            <Select.Option value="평점이 높은 순">
               ⭐ 평점이 높은 순
            </Select.Option>
            <Select.Option value="최신 작품 순">🎞 최신 작품순</Select.Option>
         </Select>
      </div>
   );
};

const MenuList = () => {
   const [movies, setMovies] = useState([]);
   const { pathname, search, href } = window.location;
   const pathList = pathname.split('/');
   const path = pathList.pop();
   const query = decodeURI(search.substring(1).split('=').pop());

   useEffect(() => {
      const req = async () => {
         const getData = await reqList[path];
         const movies =
            path === 'genre' || path === 'series'
               ? await getData(query)
               : await getData();
         setMovies(movies);
      };
      req();
   }, [href]);

   const onChangeSelect = async (selected) => {
      const movies = await this.state.movies;
      const sortMovies =
         selected === '평점이 높은 순'
            ? movies.sort((a, b) => b.userRating - a.userRating)
            : movies.sort((a, b) => b.releaseDate - a.releaseDate);
      setMovies(sortMovies);
   };

   const setSub = () => {
      let icon, sub;

      if (pathList[1] === 'recommendation') {
         const setting = subList[path];
         [icon, sub] = [setting[1], setting[0]];
      } else {
         sub = query;
         if (path == 'genre') {
            icon = genreIcons[sub];
         }
      }
      return [icon, sub];
   };

   const [icon, sub] = setSub();

   return (
      <div className="movie-container">
         {movies.length ? (
            <div>
               <div className="menu-list-head">
                  <div className="menu-title">
                     {icon} {sub}
                  </div>
                  {pathname ? (
                     <SelectBtn onChangeSelect={onChangeSelect} />
                  ) : null}
               </div>
               <List movieList={movies} keyword="" />
            </div>
         ) : (
            <div className="loding-spin">
               <Spin size="large" />
            </div>
         )}
      </div>
   );
};

export default MenuList;

// class MenuList extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          currentMovies: [],
//          movies: [],
//          movePage: false,
//          isLoding: false,
//          path: '',
//       };
//    }

//    componentDidMount = async () => {

//       this.setState({
//          movies: movies,
//          path: window.location.pathname,
//       });
//    };

//    componentDidUpdate = async (prevProps, prevState) => {
//       // const movies = await this.state.movies;
//       const { pathname } = window.location;
//       const { path } = prevState;
//       console.log(path);
//       console.log(pathname);

//       if (path !== pathname) {
//          const pathList = pathname.split('/');
//          const movies = await reqList[pathList[2]]();

//          this.setState({
//             path: pathname,
//             movies: movies,
//          });
//          window.scrollTo(0, 0);
//       }
//    };

//    render() {
//       const { ...state } = this.state;

//       // return (

//       // );
//    }
// }

// eslint-disable-next-line

// handleWatingTime = () => {
//    const { movies, currentMovies } = this.state;

//    setTimeout(() => {
//       this.setState({
//          currentMovies: movies.slice(0, currentMovies.length + 5),
//          isLoding: false,
//       });
//    }, 700);
// };

// if (prevState.currentMovies.length !== this.state.currentMovies.length) {
//    const domElement = document.querySelectorAll('.moive-content');
//    const lastElement = domElement[domElement.length - 1];

//    const observer = new IntersectionObserver(
//       (entries, observer) => {
//          entries.forEach(async (entry) => {
//             if (entry.isIntersecting) {
//                this.setState({ isLoding: true });
//                await this.handleWatingTimeObserver();
//                observer.unobserve(entry.target);
//             }
//          });
//       },
//       { threshold: 0.5 },
//    );
//    observer.observe(lastElement);
// }
