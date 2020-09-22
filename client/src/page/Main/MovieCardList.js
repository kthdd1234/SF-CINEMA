import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Slider from 'react-slick';
import './MovieCardList.css';
import MovieCardListEntry from './MovieCardListEntry';
import NextArrow from './NextArrow';
import PrevArrow from './PreArrow';
import { Button } from 'antd';
import {
   StarFilled,
   GiftFilled,
   CrownFilled,
   RedditCircleFilled,
   DingdingOutlined,
   ThunderboltFilled,
   DoubleRightOutlined,
} from '@ant-design/icons';

const settings = {
   infinite: true,

   nextArrow: <NextArrow />,
   prevArrow: <PrevArrow />,
};

class MovieCardList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         slideCount: 8,
      };
   }

   handleResize = () => {
      const broswerWidth = window.innerWidth;
      if (broswerWidth > 1330) {
         this.setState({
            slideCount: 8,
         });
      } else if (broswerWidth <= 1330 && broswerWidth > 1130) {
         this.setState({
            slideCount: 7,
         });
      } else if (broswerWidth <= 1130 && broswerWidth > 950) {
         this.setState({
            slideCount: 6,
         });
      } else if (broswerWidth <= 950 && broswerWidth > 810) {
         this.setState({
            slideCount: 5,
         });
      } else if (broswerWidth <= 810 && broswerWidth > 680) {
         this.setState({
            slideCount: 4,
         });
      } else if (broswerWidth <= 680 && broswerWidth > 550) {
         this.setState({
            slideCount: 3,
         });
      } else if (broswerWidth <= 550) {
         this.setState({
            slideCount: 2,
         });
      }
   };

   componentDidMount = () => {
      const broswerWidth = window.innerWidth;
      if (broswerWidth !== 1920) {
         this.handleResize();
      }
      window.addEventListener('resize', this.handleResize);
   };

   NavigateToHighlyRataedAndReleaseOrder = (
      path,
      key,
      count,
      under,
      moreThen,
   ) => {
      this.props.history.push(
         `${path}?key=${key}&count=${count}&under=${under}&moreThen=${moreThen}`,
      );
   };

   NavigateToGenres = (path, key, genre) => {
      this.props.history.push(`${path}?key=${key}&genre=${genre}`);
   };

   NavigateToOperatorAndMasterpiece = (path, key, count) => {
      this.props.history.push(`${path}?key=${key}&count=${count}`);
   };

   render() {
      const {
         highlyRated,
         operatorMovies,
         masterpiece,
         series,
         aliensMovies,
         superHeroMovies,
         setModalVisible,
         handleCurrentMovie,
         isLogin,
         profile,
      } = this.props;

      return (
         <div>
            <div className="recommend-wrap">
               <h2 className="recommend-title">
                  <StarFilled className="recommend-icon" /> 평점이 9점 이상인
                  영화
                  <Button
                     className="btn-showall-link"
                     type="ghost"
                     onClick={() =>
                        this.NavigateToHighlyRataedAndReleaseOrder(
                           '/highlyRated',
                           '/highlyRated',
                           100,
                           10,
                           8.5,
                        )
                     }
                  >
                     모두 보기
                     <DoubleRightOutlined className="showall-icon" />
                  </Button>
               </h2>
            </div>
            <div className="recommend-items">
               <Slider
                  {...settings}
                  slidesToShow={this.state.slideCount}
                  slidesToScroll={this.state.slideCount}
               >
                  {highlyRated.map((movie, i) => (
                     <MovieCardListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                        handleCurrentMovie={handleCurrentMovie}
                        isLogin={isLogin}
                        profile={profile}
                     />
                  ))}
               </Slider>
            </div>

            <h2 className="recommend-title">
               <RedditCircleFilled className="recommend-icon" /> 외계인 영화
               추천
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToGenres('/genres', '41', '외계인')
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               <Slider
                  {...settings}
                  slidesToShow={this.state.slideCount}
                  slidesToScroll={this.state.slideCount}
               >
                  {aliensMovies.map((movie, i) => (
                     <MovieCardListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                        handleCurrentMovie={handleCurrentMovie}
                        isLogin={isLogin}
                        profile={profile}
                     />
                  ))}
               </Slider>
            </div>

            <h2 className="recommend-title">
               <DingdingOutlined className="recommend-icon" /> 슈퍼히어로 영화
               추천
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToGenres('/genres', '42', '슈퍼 히어로')
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               <Slider
                  {...settings}
                  slidesToShow={this.state.slideCount}
                  slidesToScroll={this.state.slideCount}
               >
                  {superHeroMovies.map((movie, i) => (
                     <MovieCardListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                        handleCurrentMovie={handleCurrentMovie}
                        isLogin={isLogin}
                        profile={profile}
                     />
                  ))}
               </Slider>
            </div>

            <h2 className="recommend-title">
               <GiftFilled className="recommend-icon" /> 운영자가 추천하는 영화
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToOperatorAndMasterpiece(
                        '/operatorMovies',
                        '/operatorMovies',
                        41,
                     )
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               <Slider
                  {...settings}
                  slidesToShow={this.state.slideCount}
                  slidesToScroll={this.state.slideCount}
               >
                  {operatorMovies.map((movie, i) => (
                     <MovieCardListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                        handleCurrentMovie={handleCurrentMovie}
                        isLogin={isLogin}
                        profile={profile}
                     />
                  ))}
               </Slider>
            </div>

            <h2 className="recommend-title">
               <CrownFilled className="recommend-icon" /> 주말에 몰아보기 좋은
               SF 명작 추천
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToOperatorAndMasterpiece(
                        '/masterpiece',
                        '/masterpiece',
                        100,
                     )
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               <Slider
                  {...settings}
                  slidesToShow={this.state.slideCount}
                  slidesToScroll={this.state.slideCount}
               >
                  {masterpiece.map((movie, i) => (
                     <MovieCardListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                        handleCurrentMovie={handleCurrentMovie}
                        isLogin={isLogin}
                        profile={profile}
                     />
                  ))}
               </Slider>
            </div>

            <h2 className="recommend-title">
               <ThunderboltFilled className="recommend-icon" /> SF 시리즈물 강력
               추천
            </h2>
            <div className="recommend-items">
               <Slider
                  {...settings}
                  slidesToShow={this.state.slideCount}
                  slidesToScroll={this.state.slideCount}
               >
                  {series.map((movie, i) => (
                     <MovieCardListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                        handleCurrentMovie={handleCurrentMovie}
                        isLogin={isLogin}
                        profile={profile}
                     />
                  ))}
               </Slider>
            </div>
         </div>
      );
   }
}

export default withRouter(MovieCardList);
