import React from 'react';

const Image = ({ path }) => {
   return (
      <img
         className="swiper-images"
         src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${path}`}
      />
   );
};

export default Image;
