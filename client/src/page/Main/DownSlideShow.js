import React from 'react';
import Slider from 'react-slick';
import './DownSlideShow.css';
import SlideImgEntry from './SlideImgEntry';
import NextArrow from './NextArrow';
import PrevArrow from './PreArrow';

function DownSlideShow({
   highlyRated,
   operatorMovies,
   masterpiece,
   series,
   aliensMovies,
   superHeroMovies,
   setModalVisible,
   handleCurrentMovie,
}) {
   const settings = {
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 6,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      adaptiveHeight: true,
   };
   const seriesSettings = {
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 7,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      adaptiveHeight: true,
   };

   let id = 0;
   return (
      <div>
         <h2 className="recommend-title">평점이 9점 이상인 영화</h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {highlyRated.map((movie) => (
                  <SlideImgEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">외계인 영화 추천</h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {aliensMovies.map((movie) => (
                  <SlideImgEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">슈퍼히어로 영화 추천</h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {superHeroMovies.map((movie) => (
                  <SlideImgEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">운영자가 추천하는 영화</h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {operatorMovies.map((movie) => (
                  <SlideImgEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">주말에 몰아보기 좋은 SF 명작 추천</h2>
         <div className="recommend-items">
            <Slider {...settings}>
               {masterpiece.map((movie) => (
                  <SlideImgEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                  />
               ))}
            </Slider>
         </div>

         <h2 className="recommend-title">SF 시리즈물 강력 추천</h2>
         <div className="recommend-items">
            <Slider {...seriesSettings}>
               {series.map((movie) => (
                  <SlideImgEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                  />
               ))}
            </Slider>
         </div>
      </div>
   );
}

export default DownSlideShow;
