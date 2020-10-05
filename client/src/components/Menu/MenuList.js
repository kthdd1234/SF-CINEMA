import React, { Component } from 'react';
import { Select, Spin, Pagination } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import MenuListEntry from '../../containers/Menu/MenuListEntry';
import './MenuList.css';

const { Option } = Select;

class MenuList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         currentPage: [],
         movies: [],
         togglePage: 1,
         movePage: false,
      };
   }
   componentDidMount = async () => {
      const movies = await this.props.MenuItem;
      const currentPage = movies.slice(0, 10);
      this.setState({
         currentPage: currentPage,
         movies: movies,
         movePage: true,
      });
   };

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
      if (value === '평점이 높은 순') {
         const HighestRating = movies.sort(
            (a, b) => b.userRating - a.userRating,
         );
         this.setState({
            movies: HighestRating,
            currentPage: HighestRating.slice(0, 10),
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
            currentPage: releaseOrder.slice(0, 10),
         });
      }
   };

   render() {
      const { currentPage, movies, movePage } = this.state;

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

            {currentPage.length ? (
               currentPage.map((movie, i) => (
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
