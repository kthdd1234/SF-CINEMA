import React from 'react';

const Poster = ({ poster }) => {
   return (
      <img
         className="card-poster-img"
         src={`https://image.tmdb.org/t/p/w500${poster}`}
      />
   );
};

export default Poster;
