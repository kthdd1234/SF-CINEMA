import React from 'react';

const BackDrop = ({ backDrop }) => {
   return (
      <img
         className="auth-backdrop"
         src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${backDrop}`}
      />
   );
};

export default BackDrop;
