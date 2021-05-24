import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBackgroundList from './TopBackgroundList';
import MovieList from './MovieList';
import { requestBackground, reqExplore } from '../../requests';
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
   }

   async componentDidMount() {
      const movieList = {
         background: await requestBackground(),
         recommendation: await reqExplore('push', 'push'),
         highlyRatedMovies: await reqExplore('push', 'highly-rated-movies'),
         aliens: await reqExplore('tag', '외계인'),
         superHero: await reqExplore('tag', '슈퍼 히어로'),
         operatorRecommendation: await reqExplore('push', 'operator-push'),
         sfMasterpiece: await reqExplore('push', 'sf-masterpiece'),
         action: await reqExplore('tag', '액션'),
      };
      this.props.handleMainMovieList(movieList);
   }

   render() {
      return (
         <div>
            {/* <TopBackgroundList /> */}
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
