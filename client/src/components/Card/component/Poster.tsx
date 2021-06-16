import React from 'react';

interface IPoster {
   poster?: string
}

const Poster = ({ poster }:IPoster) => {
   return (
      <img
         className="card-poster-img"
         src={`https://image.tmdb.org/t/p/w500${poster}`}
      />
   );
};

export default Poster;
