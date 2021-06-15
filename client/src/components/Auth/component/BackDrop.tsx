import React from 'react';

interface IBackDrop {
   backDrop: string
}

const BackDrop = ({ backDrop }: IBackDrop) => {
   return (
      <img
         className="auth-backdrop"
         src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${backDrop}`}
      />
   );
};

export default BackDrop;
