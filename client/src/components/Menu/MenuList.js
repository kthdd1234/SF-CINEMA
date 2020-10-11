import React, { Component } from 'react';
import { Select, Spin, Pagination } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import MenuListEntry from '../../containers/Menu/MenuListEntry';
import {
   requestHighlyRatedMovies,
   requestLatestMovies,
   requestOperatorRecommendation,
   requestSFMasterpiece,
   requestGenre,
   requestSeries,
} from '../../requests';
import { handleMovieDataListUpdate } from '../../utils';
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
         firstPage: [],
         movies: [],
         togglePage: 1,
         movePage: false,
      };
   }

   handleURLSearchPathname = () => {
      const url = window.location.pathname;
      const lastOfSlashIdx = url.lastIndexOf('/');
      const pathname = url.substring(lastOfSlashIdx + 1);
      return pathname;
   };

   handleURLSearchParams = (paramsKey) => {
      const paramsValue = new URLSearchParams(window.location.search).get(
         paramsKey,
      );
      return paramsValue;
   };

   handleDividePathname = (pathname) => {
      let movies;

      if (pathname === 'series' || pathname === 'genre') {
         const paramsValue = this.handleURLSearchParams(this.props.paramsKey);
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
      const updateMovies = await handleMovieDataListUpdate(movies);
      const firstPage = updateMovies.slice(0, 10);

      this.setState({
         firstPage: firstPage,
         movies: updateMovies,
         movePage: true,
      });
   };

   componentDidMount = async () => {
      const pathname = this.handleURLSearchPathname();
      this.handleDividePathname(pathname);
   };

   componentDidUpdate = async (prevProps) => {
      const movies = await this.state.movies;

      if (prevProps.location !== this.props.location) {
         const pathname = this.handleURLSearchPathname();
         this.handleDividePathname(pathname);
         window.scrollTo(0, 0);

         this.setState({
            movePage: false,
         });
         const firstPage = movies.slice(0, 10);

         this.setState({
            firstPage: firstPage,
            movies: movies,
            togglePage: 1,
            movePage: true,
         });
      }
   };

   onChangePage = (page, pageSize) => {
      const { movies } = this.state;
      const startIdx = (page - 1) * pageSize;
      const endIdx = page * pageSize;
      const firstPage = movies.slice(startIdx, endIdx);

      this.setState({
         firstPage: firstPage,
         togglePage: page,
      });
      window.scrollTo(0, 0);
   };

   onChangeSelect = async (value) => {
      const movies = await this.state.movies;

      if (value === '평점이 높은 순') {
         const HighestRating = movies.sort(
            (a, b) => b.userRating - a.userRating,
         );
         this.setState({
            movies: HighestRating,
            firstPage: HighestRating.slice(0, 10),
         });
      } else if (value === '최신 작품 순') {
         const releaseOrder = movies.sort((a, b) => {
            if (b.releaseDate < a.releaseDate) {
               return -1;
            }
            if (b.releaseDate > a.releaseDate) {
               return 1;
            }
            return 0;
         });
         this.setState({
            movies: releaseOrder,
            firstPage: releaseOrder.slice(0, 10),
         });
      }
   };

   render() {
      const { firstPage, movies, movePage } = this.state;

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

            {firstPage.length ? (
               firstPage.map((movie, i) => (
                  <MenuListEntry key={i} movie={movie} />
               ))
            ) : (
               <Spin size="large" />
            )}
            {movePage ? (
               <Pagination
                  defaultCurrent={1}
                  total={movies.length}
                  onChange={this.onChangePage}
               />
            ) : null}
         </div>
      );
   }
}

// eslint-disable-next-line
export default MenuList;
