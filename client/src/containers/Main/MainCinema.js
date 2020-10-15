import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBackgroundList from './TopBackgroundList';
import MovieList from './MovieList';
import {
   requestBackground,
   requestRecommendation,
   requestHighlyRatedMovies,
   requestGenre,
   requestOperatorRecommendation,
   requestSFMasterpiece,
} from '../../requests';
import {
   setBackground,
   setRecommendation,
   setHighlyRatedMovies,
   setAliens,
   setSuperhero,
   setOperatorRecommendation,
   setSFMasterpiece,
   setAction,
} from '../../actions/movie';

const count = 8;

class MainCinema extends Component {
   constructor(props) {
      super(props);
      this.state = {
         imgList: [],
      };
   }

   async componentDidMount() {
      const movieList = {
         background: await requestBackground(),
         recommendation: await requestRecommendation(count),
         highlyRatedMovies: await requestHighlyRatedMovies(count),
         aliens: await requestGenre('외계인', count),
         superHero: await requestGenre('슈퍼 히어로', count),
         operatorRecommendation: await requestOperatorRecommendation(count),
         sfMasterpiece: await requestSFMasterpiece(count),
         action: await requestGenre('액션', count),
      };

      this.props.handleMainMovieList(movieList);
   }

   render() {
      return (
         <div>
            <TopBackgroundList />
            <MovieList />
         </div>
      );
   }
}

const mapReduxDispatchToReactProps = (dispatch) => {
   return {
      handleMainMovieList: ({
         background,
         recommendation,
         highlyRatedMovies,
         aliens,
         superHero,
         operatorRecommendation,
         sfMasterpiece,
         action,
      }) => {
         const dispatchList = {
            background: setBackground(background),
            recommendation: setRecommendation(recommendation),
            highlyRatedMovies: setHighlyRatedMovies(highlyRatedMovies),
            aliens: setAliens(aliens),
            superHero: setSuperhero(superHero),
            operatorRecommendation: setOperatorRecommendation(
               operatorRecommendation,
            ),
            sfMasterpiece: setSFMasterpiece(sfMasterpiece),
            action: setAction(action),
         };
         for (const list in dispatchList) {
            dispatch(dispatchList[list]);
         }
      },
   };
};

// eslint-disable-next-line
export default connect(null, mapReduxDispatchToReactProps)(MainCinema);
