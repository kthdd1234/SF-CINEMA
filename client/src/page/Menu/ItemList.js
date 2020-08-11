import React, { Component } from 'react';
import { Pagination, Spin } from 'antd';
import ItemListEntry from './ItemListEntry';
import './ItemListEntry.css';

class ItemList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         prev: 1,
         cur: 1,
         currentPage: [],
         movies: [],
      };
   }

   componentDidUpdate = async (prevProps, prevState) => {
      const movies = await this.props.MenuItem;
      // console.log('prevProps', movies);
      // console.log('지금 secretKey', this.props.secretKey);
      // console.log('그전에 키', prevProps.secretKey);

      if (prevProps.secretKey !== this.props.secretKey) {
         const currentPage = movies.slice(0, 10);
         this.setState({ currentPage: currentPage, movies: movies });
      }
   };

   componentDidMount = async () => {
      const movies = await this.props.MenuItem;
      const currentPage = movies.slice(0, 10);
      this.setState({ currentPage: currentPage, movies: movies });
   };

   onChangePage = (page, pageSize) => {
      const { movies } = this.state;
      const startIdx = (page - 1) * pageSize;
      const endIdx = page * pageSize;
      const currentPage = movies.slice(startIdx, endIdx);
      this.setState({
         currentPage: currentPage,
      });
      window.scrollTo(0, 0);
   };

   render() {
      const { currentPage, movies } = this.state;
      const { isLogin } = this.props;

      return (
         <div>
            <center>
               <div className="movie-container">
                  {currentPage.length ? (
                     currentPage.map((movie, i) => (
                        <ItemListEntry
                           key={i}
                           id={movie.id}
                           title={movie.title}
                           titleEng={movie.titleEng}
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
                           isLogin={isLogin}
                        />
                     ))
                  ) : (
                     <Spin size="large" />
                  )}
                  {currentPage.length ? (
                     <Pagination
                        defaultCurrent={1}
                        total={movies.length}
                        onChange={this.onChangePage}
                     />
                  ) : null}
               </div>
            </center>
         </div>
      );
   }
}

// eslint-disable-next-line
export default ItemList;
