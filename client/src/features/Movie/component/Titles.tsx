import React from 'react';

interface ITitles {
   title: string;
   titleEng: string;
   releaseDate: number;
}

const Titles = ({ title, titleEng, releaseDate }:ITitles) => {
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
