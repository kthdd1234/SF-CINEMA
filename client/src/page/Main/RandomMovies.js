/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import RandomMoviesImg from './RandomMoviesImg';
import './RandomMovies.css';
function RandomMovies({ isLogin, profile, randomMovies }) {
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
               <RandomMoviesImg
                  key={i}
                  movie={movie}
                  isLogin={isLogin}
                  profile={profile}
               />
            ))}
         </Slider>
      </div>
   );
}

export default RandomMovies;
