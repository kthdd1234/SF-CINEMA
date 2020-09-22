/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Slider from 'react-slick';
import RandomMoviesImg from './RandomMoviesImg';
import './RandomMovies.css';

class RandomMovies extends Component {
   constructor(props) {
      super(props);
      this.state = {
         slideCount: 10,
      };
   }
   render() {
      const { isLogin, profile, randomMovies } = this.props;

      return (
         <div className="rand-recommend-wrap">
            <h2 className="rand-recommend-title"># 추천 영화</h2>
            <Slider
               infinite={true}
               slidesToShow={this.state.slideCount}
               slidesToScroll={this.state.slideCount}
            >
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
}

export default RandomMovies;
