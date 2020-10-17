import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
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
import axios from 'axios';

const count = 8;

class MainCinema extends Component {
   constructor(props) {
      super(props);
      this.state = {
         imgList: [],
         currentImg: [],
         isLoding: true,
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
      /////////////////////////////////////////////////
      /////////////////////////////////////////////////
      const movieTitleEng = '토르: 라그나로크';
      axios
         .get('https://api.themoviedb.org/3/search/movie', {
            params: {
               api_key: 'a3f2dd845f961cc6ea8d04c944383159',
               query: movieTitleEng,
               page: 1,
            },
         })
         .then(async ({ data }) => {
            const imgId = data.results[0].id;

            axios
               .get(`https://api.themoviedb.org/3/movie/${imgId}/images`, {
                  params: { api_key: 'a3f2dd845f961cc6ea8d04c944383159' },
               })
               .then(({ data }) => {
                  const imgList = data.backdrops.map((obj, i) => {
                     return `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${obj.file_path}`;
                  });

                  this.setState({
                     imgList: imgList,
                     currentImg: imgList.slice(0, 5),
                  });
               });
         });
   }

   handleWatingTimeObserver = () => {
      const { imgList, currentImg } = this.state;
      setTimeout(() => {
         this.setState({
            currentImg: imgList.slice(0, currentImg.length + 5),
            isLoding: false,
         });
      }, 700);
   };

   componentDidUpdate = (prevProps, preState) => {
      if (preState.currentImg.length !== this.state.currentImg.length) {
         const domElement = document.querySelectorAll('.img-list');
         const lastElement = domElement[domElement.length - 1];

         const observer = new IntersectionObserver(
            (entries, observer) => {
               entries.forEach(async (entry) => {
                  if (entry.isIntersecting) {
                     this.setState({ isLoding: true });
                     await this.handleWatingTimeObserver();
                     observer.unobserve(entry.target);
                  }
               });
            },
            { threshold: 0.5 },
         );
         observer.observe(lastElement);
      }
   };

   render() {
      const { currentImg, isLoding } = this.state;

      return (
         <div>
            <TopBackgroundList />
            <MovieList />
            {currentImg.length ? (
               currentImg.map((data, i) => (
                  <div className="img-list" key={i}>
                     <img className="img-back-drop" src={data} />
                  </div>
               ))
            ) : (
               <div className="loding-spin">
                  <Spin size="large" />
               </div>
            )}
            {isLoding ? (
               <div
                  className="loding-spin"
                  style={{
                     marginBottom: '100px',
                  }}
               >
                  <Spin size="large" />
               </div>
            ) : null}

            {/* {this.state.imgList.length
               ? this.state.imgList.map((data, i) => (
                    <div
                       key={i}
                       className="imgList"
                       style={{
                          width: '1920px',
                          margin: '100px 0 100px 0',
                          overflow: 'hidden',
                       }}
                    >
                       <img
                          style={{
                             width: '100%',
                          }}
                          src={data}
                       />
                    </div>
                 ))
               : null} */}
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
