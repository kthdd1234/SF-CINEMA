import React from 'react';
import Shadow from './Shadow';

interface IBackDrop {
   backDrop: string;
}

const BackDrop = ({ backDrop }: IBackDrop) => {
   return (
      <div>
         <Shadow />
         <img
            className="movie-backdrop"
            src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${backDrop}`}
         />
      </div>
   );
};

export default BackDrop;
