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

   handleResize = () => {
      const broswerWidth = window.innerWidth;
      if (broswerWidth > 1550) {
         this.setState({
            slideCount: 10,
         });
      } else if (broswerWidth <= 1500 && broswerWidth > 1450) {
         this.setState({
            slideCount: 9,
         });
      } else if (broswerWidth <= 1450 && broswerWidth > 1400) {
         this.setState({
            slideCount: 8,
         });
      } else if (broswerWidth <= 1400 && broswerWidth > 1350) {
         this.setState({
            slideCount: 7,
         });
      } else if (broswerWidth <= 1350 && broswerWidth > 1300) {
         this.setState({
            slideCount: 6,
         });
      } else if (broswerWidth <= 500 && broswerWidth > 400) {
         this.setState({
            slideCount: 3,
         });
      } else if (broswerWidth <= 400) {
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
