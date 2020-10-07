import { SET_CURRENT_MOVIE } from '../actions/movie';

const movieReducer = (state = {}, action) => {
   switch (action.type) {
      case SET_CURRENT_MOVIE:
         return Object.assign({}, state, {
            currentMovie: action.movie,
         });
      default:
         return state;
   }
};

export default movieReducer;
