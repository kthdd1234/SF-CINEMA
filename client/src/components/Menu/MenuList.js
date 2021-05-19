import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import * as icons from '@ant-design/icons';
import * as request from '../../requests';
import List from '../Search/List';
import { handleURLSearchParams } from '../../utils';
import './MenuList.css';

const recommendation = [
   {
      pathname: 'highly-rated-movies',
      request: request.requestHighlyRatedMovies,
   },
   {
      pathname: 'latest-movies',
      request: request.requestLatestMovies,
   },
   {
      pathname: 'operator-recommendation',
      request: request.requestOperatorRecommendation,
   },
   {
      pathname: 'sf-masterpiece',
      request: request.requestSFMasterpiece,
   },
];

const genre_series = [
   {
      pathname: 'genre',
      request: request.requestGenre,
   },
   {
      pathname: 'series',
      request: request.requestSeries,
   },
];

const pathList = {
   'latest-movies': ['최신 영화', <icons.VideoCameraFilled />],
   'highly-rated-movies': ['평점이 높은 영화', <icons.StarFilled />],
   'operator-recommendation': ['운영자 추천', <icons.GiftFilled />],
   'sf-masterpiece': ['SF 명작', <icons.CrownFilled />],
};

const genreIcons = {
   '우주 탐사': <icons.RocketFilled />,
   외계인: <icons.RedditCircleFilled />,
   '슈퍼 히어로': <icons.DingdingOutlined />,
   액션: <icons.ThunderboltFilled />,
   몬스터: <icons.GitlabFilled />,
   '가상 현실 또는 AI': <icons.RobotFilled />,
   '시간 여행': <icons.HourglassFilled />,
   드라마: <icons.ReadFilled />,
   좀비: <icons.EyeInvisibleFilled />,
   재난: <icons.FireFilled />,
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

class MenuList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentMovies: [],
         movies: [],
         togglePage: 1,
         movePage: false,
         isLoding: false,
      };
   }

   componentDidMount = async () => {
      const pathname = this.handleURLSearchPathname();
      this.handleDividePathname(pathname);
   };

   componentDidUpdate = async (prevProps, prevState) => {
      const movies = await this.state.movies;

      if (prevProps.location !== this.props.location) {
         const currentMovies = movies.slice(0, 5);
         const pathname = this.handleURLSearchPathname();
         this.handleDividePathname(pathname);
         window.scrollTo(0, 0);

         this.setState({ movePage: false });

         this.setState({
            currentMovies: currentMovies,
            movies: movies,
            togglePage: 1,
            movePage: true,
         });
      }
   };

   handleURLSearchPathname = () => {
      const url = window.location.pathname;
      const lastOfSlashIdx = url.lastIndexOf('/');
      const pathname = url.substring(lastOfSlashIdx + 1);
      console.log(pathname);
      return pathname;
   };

   handleDividePathname = (pathname) => {
      let movies;

      if (pathname === 'series' || pathname === 'genre') {
         const paramsValue = handleURLSearchParams(this.props.paramsKey);
         genre_series.forEach(async (element) => {
            if (element.pathname === pathname) {
               movies = element.request(paramsValue);
               this.handleMenuListUpdate(movies);
            }
         });
      } else {
         recommendation.forEach(async (element) => {
            if (element.pathname === pathname) {
               movies = element.request();
               this.handleMenuListUpdate(movies);
            }
         });
      }
   };

   handleMenuListUpdate = async (movies) => {
      const movieData = await movies;
      const currentMovies = movieData.slice(0, 5);

      this.setState({
         currentMovies: currentMovies,
         movies: movieData,
         movePage: true,
      });
   };

   handleWatingTimeObserver = () => {
      const { movies, currentMovies } = this.state;

      setTimeout(() => {
         this.setState({
            currentMovies: movies.slice(0, currentMovies.length + 5),
            isLoding: false,
         });
      }, 700);
   };

   onChangeSelect = async (selected) => {
      const movies = await this.state.movies;
      const currentMovies = document.querySelectorAll('.movie-content');
      const sortMovies =
         selected === '평점이 높은 순'
            ? movies.sort((a, b) => b.userRating - a.userRating)
            : movies.sort((a, b) => b.releaseDate - a.releaseDate);

      this.setState({
         movies: sortMovies,
         currentMovies: sortMovies.slice(0, currentMovies.length),
      });
   };

   setSub = () => {
      const { location } = this.props;
      const path = location.split('/');
      let icon, sub;

      if (path[1] === 'recommendation') {
         const setting = pathList[path[path.length - 1]];
         [icon, sub] = [setting[1], setting[0]];
      } else {
         const query = location.split('?')[1];
         const decode = decodeURI(query).split('=');

         sub = decode[1];
         if (decode[0] == 'genre') {
            icon = genreIcons[sub];
         }
      }
      return [icon, sub];
   };

   render() {
      const { ...state } = this.state;
      const [icon, sub] = this.setSub();

      return (
         <div className="movie-container">
            {state.movies.length ? (
               <div>
                  <div className="menu-list-head">
                     <div className="menu-title">
                        {icon} {sub}
                     </div>
                     {state.movePage ? (
                        <SelectBtn onChangeSelect={this.onChangeSelect} />
                     ) : null}
                  </div>
                  <List movieList={state.movies} keyword="" />
               </div>
            ) : (
               <div className="loding-spin">
                  <Spin size="large" />
               </div>
            )}
         </div>
      );
   }
}

// eslint-disable-next-line
export default MenuList;

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
