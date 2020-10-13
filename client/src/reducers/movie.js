import {
   SET_BACKGROUND,
   SET_RACOMMENDATION,
   SET_HIGHLYRATEDMOVIES,
   SET_ALIENS,
   SET_SUPERHERO,
   SET_OPERATORRACOMMENDATION,
   SET_SFMASTERPIECE,
   SET_ACTION,
} from '../actions/movie';

const initialState = {
   background: [
      {
         backgroundImg: '',
         movie: {},
      },
   ],
   recommendation: [],
   highlyRatedMovies: [],
   aliens: [],
   superHero: [],
   operatorRecommendation: [],
   sfMasterpiece: [],
   action: [],
};

const movieReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_BACKGROUND:
         return Object.assign({}, state, {
            background: action.background,
         });
      case SET_RACOMMENDATION:
         return Object.assign({}, state, {
            recommendation: action.recommendation,
         });
      case SET_HIGHLYRATEDMOVIES:
         return Object.assign({}, state, {
            highlyRatedMovies: action.highlyRatedMovies,
         });
      case SET_ALIENS:
         return Object.assign({}, state, {
            aliens: action.aliens,
         });
      case SET_SUPERHERO:
         return Object.assign({}, state, {
            superHero: action.superHero,
         });
      case SET_OPERATORRACOMMENDATION:
         return Object.assign({}, state, {
            operatorRecommendation: action.operatorRecommendation,
         });
      case SET_SFMASTERPIECE:
         return Object.assign({}, state, {
            sfMasterpiece: action.sfMasterpiece,
         });
      case SET_ACTION:
         return Object.assign({}, state, {
            action: action.action,
         });

      default:
         return state;
   }
};

export default movieReducer;
