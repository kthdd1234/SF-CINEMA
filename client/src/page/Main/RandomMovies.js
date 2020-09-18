/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import RandomMoviesImg from './RandomMoviesImg';
import './RandomMovies.css';
function RandomMovies({ isLogin, profile, randomMovies }) {
   const settings = {
      infinite: true,
      slidesToShow: 10,
   };

   return (
      <div className="rand-recommend-wrap">
         <h2 className="rand-recommend-title"># 추천 영화</h2>
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
