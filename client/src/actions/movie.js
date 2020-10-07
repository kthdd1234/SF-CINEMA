export const SET_CURRENT_MOVIE = 'SET_CURRENT_MOVIE';

export const setCurrentMovie = (movie) => ({
   type: SET_CURRENT_MOVIE,
   movie: movie,
});
