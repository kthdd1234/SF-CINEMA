import React, { Component } from 'react';
import {
   Spin,
   Input,
   Modal,
   message,
   Drawer,
   Card,
   Row,
   Col,
   Empty,
   Button,
   Carousel,
   Tag,
   Popconfirm,
} from 'antd';
import ModalPage from './ModalPage';
import SFCINEMA from '../../SFCINEMA.png';
import axios from 'axios';
import './MainCinema.css';

const tagKeywords = [
   { color: 'green', keyword: '스파이더맨' },
   { color: 'geekblue', keyword: '외계인 또는 행성 탐사' },
   { color: 'purple', keyword: '인류 멸망 시나리오' },
   { color: 'orange', keyword: '엑스맨 시리즈' },
   { color: 'blue', keyword: '생존 서바이벌' },
   { color: 'magenta', keyword: '애니메이션' },
   { color: 'geekblue', keyword: '크리스토퍼 놀란' },
];

const serverUrl = axios.create({
   baseURL: `http://54.180.32.31:5000/main`,
});

const { Search } = Input;
const { Meta } = Card;

class SearchBar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         keyword: '',
         searchResult: [],
         drawerVisible: false,
         modalVisible: false,
         currentMovie: null,
         numberOfLikes: 0,
         isLogin: false,
         profile: {},
         likeFilled: false,
      };
   }

   setModalVisible = (modalVisible) => {
      if (!modalVisible) {
         this.setState({
            pause: false,
         });
      }
      this.setState({
         modalVisible,
      });
   };

   handleCurrentMovie = (movie) => {
      this.setState({
         currentMovie: movie,
         numberOfLikes: movie.numberOfLikes,
      });
   };

   handleSearchMovieData = () => {
      const { keyword } = this.state;

      if (keyword === '') {
         return message.error('검색어를 입력해주세요.');
      } else {
         serverUrl
            .get('/searchMovie', {
               params: {
                  keyword: keyword,
               },
            })
            .then(({ data }) => {
               if (data === 'Not Found') {
                  return this.setState({
                     searchResult: null,
                     drawerVisible: true,
                  });
               }
               this.setState({
                  searchResult: data,
                  drawerVisible: true,
               });
            });
      }
   };

   handleUpdateSearchKeyword = (e) => {
      this.setState({
         keyword: e.target.value,
      });
   };

   handleNumberOfLikesIncrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes + 1,
         likeFilled: true,
      });
   };

   handleNumberOfLikesDecrease = () => {
      const { numberOfLikes } = this.state;
      this.setState({
         numberOfLikes: numberOfLikes - 1,
         likeFilled: false,
      });
   };

   onClose = () => {
      this.setState({
         drawerVisible: false,
      });
   };
   render() {
      const {
         modalVisible,
         currentMovie,
         searchResult,
         numberOfLikes,
      } = this.state;
      const { isLogin, profile } = this.props;

      return (
         <div className="movie-search-bar">
            <div className="tag-keyword-wrap">
               {tagKeywords.map((tag, i) => (
                  <Tag
                     key={i}
                     color={tag.color}
                     className="tag-keyword"
                     onMouseOver={(e) =>
                        this.setState({
                           keyword: e.currentTarget.innerHTML,
                        })
                     }
                     onClick={this.handleSearchMovieData}
                  >
                     {tag.keyword}
                  </Tag>
               ))}
            </div>
            <Search
               placeholder="영화 제목을 입력해주세요."
               size="large"
               enterButton
               onChange={this.handleUpdateSearchKeyword}
               onSearch={this.handleSearchMovieData}
            />
            <div>
               <Drawer
                  title={`검색 결과 총 ${
                     searchResult ? searchResult.length : 0
                  }건`}
                  height={800}
                  onClose={this.onClose}
                  visible={this.state.drawerVisible}
                  placement="bottom"
               >
                  {searchResult ? (
                     <div className="search-bar-wrap">
                        <Row gutter={6}>
                           {searchResult.map((movie, i) => (
                              <Col span={3} key={i}>
                                 <Card
                                    className="search-result-card"
                                    size="small"
                                    hoverable
                                    cover={
                                       <img
                                          className="search-result-card-img"
                                          src={`https://image.tmdb.org/t/p/w500${movie.posters}`}
                                       />
                                    }
                                    onClick={() => {
                                       this.setModalVisible(true);
                                       this.handleCurrentMovie(movie);
                                    }}
                                 >
                                    <Meta
                                       title={movie.title}
                                       description={
                                          <div>
                                             <div>
                                                <strong>장르</strong>{' '}
                                                {movie.genre}
                                             </div>
                                             <div>
                                                <strong>평점</strong> ⭐{' '}
                                                {movie.userRating}
                                             </div>
                                          </div>
                                       }
                                    />
                                 </Card>
                              </Col>
                           ))}
                        </Row>

                        <Modal
                           title={<img src={SFCINEMA} className="small-logo" />}
                           centered
                           width={1150}
                           visible={modalVisible}
                           onOk={() => this.setModalVisible(false)}
                           onCancel={() => this.setModalVisible(false)}
                           footer={null}
                        >
                           <ModalPage
                              isLogin={isLogin}
                              profile={profile}
                              currentMovie={currentMovie}
                              numberOfLikes={numberOfLikes}
                              handleNumberOfLikesIncrease={
                                 this.handleNumberOfLikesIncrease
                              }
                              handleNumberOfLikesDecrease={
                                 this.handleNumberOfLikesDecrease
                              }
                           />
                        </Modal>
                     </div>
                  ) : (
                     <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
               </Drawer>
            </div>
         </div>
      );
   }
}

export default SearchBar;
