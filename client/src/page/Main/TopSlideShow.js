/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import TopSlideDetailImg from './TopSlide-detail-Img';
import './TopSlideShow.css';
function TopSlideShow({ randomMovies, setModalVisible, handleCurrentMovie }) {
   const settings = {
      centerMode: true,
      infinite: true,
      slidesToShow: 7,
      speed: 500,
      autoplay: true,
   };

   return (
      <div>
         <Slider {...settings}>
            {randomMovies.map((movie, i) => (
               <TopSlideDetailImg
                  key={i}
                  movie={movie}
                  alt={i}
                  setModalVisible={setModalVisible}
                  handleCurrentMovie={handleCurrentMovie}
               />
            ))}
         </Slider>
      </div>
   );
}

export default TopSlideShow;
