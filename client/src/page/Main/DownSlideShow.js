import React from 'react';
import Slider from 'react-slick';
import './DownSlideShow.css';
import SlideImgEntry from './SlideImgEntry';
import NextArrow from './NextArrow';
import PrevArrow from './PreArrow';

function DownSlideShow({
   highlyRated,
   releaseOrder,
   operatorMovies,
   masterpiece,
   series,
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
         <h2 className="main-slide-sub">평점이 높은 SF 영화(9점이상)</h2>
         <div className="slider-multiple-items">
            <Slider {...settings} slickNext>
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
            <div className="box-shadow-right" />
         </div>

         <h2 className="main-slide-sub">최근 개봉한 SF 영화(2020~2018)</h2>
         <div className="slider-multiple-items">
            <Slider {...settings}>
               {releaseOrder.map((movie) => (
                  <SlideImgEntry
                     key={id++}
                     movie={movie}
                     alt={id}
                     setModalVisible={setModalVisible}
                     handleCurrentMovie={handleCurrentMovie}
                  />
               ))}
            </Slider>
            <div className="box-shadow-right" />
         </div>

         <h2 className="main-slide-sub">운영자가 추천하는 SF 영화</h2>
         <div className="slider-multiple-items">
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
            <div className="box-shadow-right" />
         </div>

         <h2 className="main-slide-sub">주말에 몰아보기 좋은 SF 명작 추천</h2>
         <div className="slider-multiple-items">
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
            <div className="box-shadow-right" />
         </div>

         <h2 className="main-slide-sub">SF 시리즈물 강력 추천</h2>
         <div className="slider-multiple-items">
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
            <div className="box-shadow-right" />
         </div>
      </div>
   );
}

export default DownSlideShow;
