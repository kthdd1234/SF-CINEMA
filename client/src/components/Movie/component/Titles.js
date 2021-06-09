import React from 'react';

const Titles = ({ title, titleEng, releaseDate }) => {
   return (
      <div>
         <div className="movie-contents-sub">{title}</div>
         <div className="movie-contents-eng">
            {`${titleEng} (${String(releaseDate).slice(0, 4)})`}
         </div>
      </div>
   );
};

export default Titles;
