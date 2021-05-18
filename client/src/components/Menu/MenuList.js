import React, { Component } from 'react';
import { Select, Spin, Pagination } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import MenuListEntry from '../../containers/Menu/MenuListEntry';
import List from '../Search/List';
import {
   requestHighlyRatedMovies,
   requestLatestMovies,
   requestOperatorRecommendation,
   requestSFMasterpiece,
   requestGenre,
   requestSeries,
} from '../../requests';
import { handleURLSearchParams } from '../../utils';
import './MenuList.css';

const { Option } = Select;

const recommendation = [
   {
      pathname: 'highly-rated-movies',
      request: requestHighlyRatedMovies,
   },
   {
      pathname: 'latest-movies',
      request: requestLatestMovies,
   },
   {
      pathname: 'operator-recommendation',
      request: requestOperatorRecommendation,
   },
   {
      pathname: 'sf-masterpiece',
      request: requestSFMasterpiece,
   },
];

const genre_series = [
   {
      pathname: 'genre',
      request: requestGenre,
   },
   {
      pathname: 'series',
      request: requestSeries,
   },
];

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

   handleWatingTime = () => {
      const { movies, currentMovies } = this.state;

      setTimeout(() => {
         this.setState({
            currentMovies: movies.slice(0, currentMovies.length + 5),
            isLoding: false,
         });
      }, 700);
   };

   handleURLSearchPathname = () => {
      const url = window.location.pathname;
      const lastOfSlashIdx = url.lastIndexOf('/');
      const pathname = url.substring(lastOfSlashIdx + 1);
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
   };

   handleSelectedHighestRating = (movies) => {
      return movies.sort((a, b) => b.userRating - a.userRating);
   };

   handleSelectedReleaseOrder = (movies) => {
      return movies.sort((a, b) => {
         if (b.releaseDate < a.releaseDate) {
            return -1;
         }
         if (b.releaseDate > a.releaseDate) {
            return 1;
         }
         return 0;
      });
   };

   onChangeSelect = async (value) => {
      const movies = await this.state.movies;

      if (value === '평점이 높은 순') {
         const highestRating = this.handleSelectedHighestRating(movies);
         const currentMovies = document.querySelectorAll('.moive-content');

         this.setState({
            movies: highestRating,
            currentMovies: highestRating.slice(0, currentMovies.length),
         });
      } else if (value === '최신 작품 순') {
         const releaseOrder = this.handleSelectedReleaseOrder(movies);
         const currentMovies = document.querySelectorAll('.moive-content');

         this.setState({
            movies: releaseOrder,
            currentMovies: releaseOrder.slice(0, currentMovies.length),
         });
      }
   };

   render() {
      const { currentMovies, movePage, isLoding, movies } = this.state;

      return (
         <div className="movie-container">
            {movePage ? (
               <Select
                  className="itemList-select"
                  defaultValue="선택해주세요"
                  size="large"
                  onChange={this.onChangeSelect}
                  suffixIcon={
                     <CaretDownFilled
                        style={{
                           color: 'whitesmoke',
                        }}
                     />
                  }
               >
                  <Option value="평점이 높은 순">⭐ 평점이 높은 순</Option>
                  <Option value="최신 작품 순">🎞 최신 작품순</Option>
               </Select>
            ) : null}

            {movies.length ? (
               <List movieList={movies} keyword="" />
            ) : (
               // currentMovies.map((movie, i) => (
               //    <MenuListEntry key={i} movie={movie} />
               // ))
               <div className="loding-spin">
                  <Spin size="large" />
               </div>
            )}
            {/* {isLoding ? (
               <div
                  className="loding-spin"
                  style={{
                     marginBottom: '100px',
                  }}
               >
                  <Spin size="large" />
               </div>
            ) : null} */}
         </div>
      );
   }
}

// eslint-disable-next-line
export default MenuList;
