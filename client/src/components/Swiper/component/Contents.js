import React from 'react';
import Btns from './Btns';

const Contents = ({ currentMovie, index, setTrailer }) => {
   return (
      <div className="swiper-contents">
         <h1 className="swiper-contents-sub">{currentMovie[0]}</h1>
         <h3 className="swiper-contents-desc">{currentMovie[1]}</h3>
         <h3 className="swiper-contents-desc">{currentMovie[2]}</h3>
         <Btns sub={currentMovie[0]} index={index} setTrailer={setTrailer} />
      </div>
   );
};

export default Contents;
