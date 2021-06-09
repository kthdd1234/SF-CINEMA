import React from 'react';

const Person = ({ director, actors }) => {
   return (
      <div className="movie-contents-person">
         <div>
            <strong className="movie-contents-person-sub">감독</strong>
            <span>{director}</span>
         </div>
         <div>
            <strong className="movie-contents-person-sub">추연</strong>
            <span>{actors}</span>
         </div>
      </div>
   );
};

export default Person;
