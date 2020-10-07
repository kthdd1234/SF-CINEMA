import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import MainBackground from './MainBackground';
import MovieList from './MovieList';
import {
   requestBackgroundImg,
   requestRandomMovies,
   requestHighlyRated,
   requestGenres,
   requestOperatorMovies,
   requestMasterpiece,
} from '../../requests';

const count = 8;

class MainCinema extends Component {
   constructor(props) {
      super(props);
      this.state = {
         backgroundImg: [],
         randomMovies: [],
         highlyRated: [],
         aliensMovies: [],
         superHeroMovies: [],
         operatorMovies: [],
         masterpiece: [],
         action: [],
         imgList: [],
      };
   }

   async componentDidMount() {
      const backgroundImg = await requestBackgroundImg();
      const randomMovies = await requestRandomMovies(count);
      const highlyRated = await requestHighlyRated(10, 9, count);
      const aliensMovies = await requestGenres('외계인', count);
      const superHeroMovies = await requestGenres('슈퍼 히어로', count);
      const operatorMovies = await requestOperatorMovies(count);
      const masterpiece = await requestMasterpiece(count);
      const action = await requestGenres('액션', count);

      this.setState({
         backgroundImg: backgroundImg,
         randomMovies: randomMovies,
         highlyRated: highlyRated,
         aliensMovies: aliensMovies,
         superHeroMovies: superHeroMovies,
         operatorMovies: operatorMovies,
         masterpiece: masterpiece,
         action: action,
      });
   }

   render() {
      const {
         backgroundImg,
         randomMovies,
         highlyRated,
         operatorMovies,
         masterpiece,
         action,
         imgList,
         aliensMovies,
         superHeroMovies,
      } = this.state;

      return (
         <div>
            <MainBackground backgroundImg={backgroundImg} />
            {action.length ? (
               <MovieList
                  randomMovies={randomMovies}
                  highlyRated={highlyRated}
                  aliensMovies={aliensMovies}
                  superHeroMovies={superHeroMovies}
                  operatorMovies={operatorMovies}
                  masterpiece={masterpiece}
                  action={action}
               />
            ) : (
               <Spin size="large" className="spin" />
            )}
         </div>
      );
   }
}

const mapReduxStateToReactProps = () => {
   return {};
};

const mapReduxDispatchToReactProps = () => {
   return {};
};

// eslint-disable-next-line
export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(MainCinema);
