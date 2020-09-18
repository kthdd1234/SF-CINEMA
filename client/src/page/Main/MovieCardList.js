import React from 'react';
import Slider from 'react-slick';
import './MovieCardList.css';
import MovieCardListEntry from './MovieCardListEntry';
import NextArrow from './NextArrow';
import PrevArrow from './PreArrow';
import { Button, Radio } from 'antd';
import {
   StarFilled,
   GiftFilled,
   CrownFilled,
   RedditCircleFilled,
   DingdingOutlined,
   ThunderboltFilled,
   DoubleRightOutlined,
} from '@ant-design/icons';

function MovieCardList({
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
}) {
   const settings = {
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 8,
      // nextArrow: <NextArrow />,
      // prevArrow: <PrevArrow />,
   };
   const seriesSettings = {
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 8,
      // nextArrow: <NextArrow />,
      // prevArrow: <PrevArrow />,
      adaptiveHeight: true,
   };

   let id = 0;
   return (
      <div>
         <h2 className="recommend-title">
            <StarFilled
               style={{
                  color: 'whitesmoke',
               }}
            />{' '}
            평점이 9점 이상인 영화
            <Button className="btn-showall-link" type="ghost">
               모두 보기
               <DoubleRightOutlined />
            </Button>
         </h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {highlyRated.map((movie) => (
                  <MovieCardListEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">
            <RedditCircleFilled
               style={{
                  color: 'whitesmoke',
               }}
            />{' '}
            외계인 영화 추천
            <Button className="btn-showall-link" type="ghost">
               모두 보기
               <DoubleRightOutlined />
            </Button>
         </h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {aliensMovies.map((movie) => (
                  <MovieCardListEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">
            <DingdingOutlined
               style={{
                  color: 'whitesmoke',
               }}
            />{' '}
            슈퍼히어로 영화 추천
            <Button className="btn-showall-link" type="ghost">
               모두 보기
               <DoubleRightOutlined />
            </Button>
         </h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {superHeroMovies.map((movie) => (
                  <MovieCardListEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">
            <GiftFilled
               style={{
                  color: 'whitesmoke',
               }}
            />{' '}
            운영자가 추천하는 영화
            <Button className="btn-showall-link" type="ghost">
               모두 보기
               <DoubleRightOutlined />
            </Button>
         </h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {operatorMovies.map((movie) => (
                  <MovieCardListEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">
            <CrownFilled
               style={{
                  color: 'whitesmoke',
               }}
            />{' '}
            주말에 몰아보기 좋은 SF 명작 추천
            <Button className="btn-showall-link" type="ghost">
               모두 보기
               <DoubleRightOutlined />
            </Button>
         </h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {masterpiece.map((movie) => (
                  <MovieCardListEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">
            <ThunderboltFilled
               style={{
                  color: 'whitesmoke',
               }}
            />{' '}
            SF 시리즈물 강력 추천
         </h2>
         <div className="recommend-items">
            <Slider {...seriesSettings}>
               {series.map((movie) => (
                  <MovieCardListEntry
                     key={id++}
                     movie={movie}
                     alt={id}
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

export default MovieCardList;
