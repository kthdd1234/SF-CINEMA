import React, { Component } from 'react';
import { Select, Spin, Pagination } from 'antd';
import ItemListEntry from './ItemListEntry';
import './ItemListEntry.css';
import { CaretDownFilled, StarFilled } from '@ant-design/icons';

const { Option } = Select;

class ItemList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentPage: [],
         movies: [],
         togglePage: 1,
         movePage: false,
      };
   }

   componentDidUpdate = async (prevProps, prevState) => {
      const movies = await this.props.MenuItem;
      // console.log('prevProps', movies);
      // console.log('지금 secretKey', this.props.secretKey);
      // console.log('그전에 키', prevProps.secretKey);

      if (prevProps.secretKey !== this.props.secretKey) {
         this.setState({
            movePage: false,
         });
         const currentPage = movies.slice(0, 10);

         this.setState({
            currentPage: currentPage,
            movies: movies,
            togglePage: 1,
            movePage: true,
         });
         window.scrollTo(0, 0);
      }
   };

   componentDidMount = async () => {
      const movies = await this.props.MenuItem;
      const currentPage = movies.slice(0, 10);
      this.setState({
         currentPage: currentPage,
         movies: movies,
         movePage: true,
      });
   };

   onChangePage = (page, pageSize) => {
      const { movies } = this.state;
      const startIdx = (page - 1) * pageSize;
      const endIdx = page * pageSize;
      const currentPage = movies.slice(startIdx, endIdx);

      this.setState({
         currentPage: currentPage,
         togglePage: page,
      });
      window.scrollTo(0, 0);
   };

   onChangeSelect = (value) => {
      const { movies } = this.state;
      if (value === '별점이 높은 순') {
         const HighestRating = movies.sort(
            (a, b) => b.userRating - a.userRating,
         );
         this.setState({
            movies: HighestRating,
            currentPage: HighestRating.slice(0, 10),
         });
      } else if (value === '최신 작품 순') {
         const releaseOrder = movies.sort((a, b) => {
            var first = Number(b.releaseDate.replace(/[.]/gi, ''));
            var sencond = Number(a.releaseDate.replace(/[.]/gi, ''));

            if (first < sencond) {
               return -1;
            }
            if (first > sencond) {
               return 1;
            }
            return 0;
         });
         this.setState({
            movies: releaseOrder,
            currentPage: releaseOrder.slice(0, 10),
         });
      }
   };

   render() {
      const { currentPage, movies, togglePage, movePage } = this.state;
      const { isLogin } = this.props;

      return (
         <div>
            <div
               className="movie-container"
               style={{
                  background: 'rgb(20, 21, 23)',
               }}
            >
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
                     <Option value="별점이 높은 순">⭐ 별점이 높은 순</Option>
                     <Option value="최신 작품 순">🎞 최신 작품순</Option>
                  </Select>
               ) : null}

               {currentPage.length ? (
                  currentPage.map((movie, i) => (
                     <ItemListEntry
                        key={i}
                        id={movie.id}
                        title={movie.title}
                        titleEng={movie.titleEng}
                        genre={movie.genre}
                        director={movie.director}
                        plot={movie.plot}
                        posters={movie.posters}
                        nation={movie.nation}
                        actors={movie.actors}
                        releaseDate={movie.releaseDate}
                        releaseYear={movie.releaseYear}
                        runtime={movie.runtime}
                        ratingGrade={movie.ratingGrade}
                        userRating={movie.userRating}
                        videoId={movie.videoId}
                        backDrop={movie.backDrop}
                        isLogin={isLogin}
                        total={movies.length}
                        onChange={this.onChangePage}
                        onChangeSelect={this.onChangeSelect}
                        index={i}
                        currentPageCount={currentPage.length}
                        togglePage={togglePage}
                     />
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
         </div>
      );
   }
}

// eslint-disable-next-line
export default ItemList;
