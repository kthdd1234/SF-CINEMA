export const SET_BACKGROUND = 'SET_BACKGROUND';
export const SET_RACOMMENDATION = 'SET_RACOMMENDATION';
export const SET_HIGHLYRATEDMOVIES = 'SET_HIGHLYRATEDMOVIES';
export const SET_ALIENS = 'SET_ALIENS';
export const SET_SUPERHERO = 'SET_SUPERHERO';
export const SET_OPERATORRACOMMENDATION = 'SET_OPERATORRACOMMENDATION';
export const SET_SFMASTERPIECE = 'SET_SFMASTERPIECE';
export const SET_ACTION = 'SET_ACTION';

export const setBackground = (background) => ({
   type: SET_BACKGROUND,
   background: background,
});

export const setRecommendation = (recommendation) => ({
   type: SET_RACOMMENDATION,
   recommendation: recommendation,
});

export const setHighlyRatedMovies = (highlyRatedMovies) => ({
   type: SET_HIGHLYRATEDMOVIES,
   highlyRatedMovies: highlyRatedMovies,
});

export const setAliens = (aliens) => ({
   type: SET_ALIENS,
   aliens: aliens,
});

export const setSuperhero = (superHero) => ({
   type: SET_SUPERHERO,
   superHero: superHero,
});

export const setOperatorRecommendation = (operatorRecommendation) => ({
   type: SET_OPERATORRACOMMENDATION,
   operatorRecommendation: operatorRecommendation,
});

export const setSFMasterpiece = (sfMasterpiece) => ({
   type: SET_SFMASTERPIECE,
   sfMasterpiece: sfMasterpiece,
});

export const setAction = (action) => ({
   type: SET_ACTION,
   action: action,
});
