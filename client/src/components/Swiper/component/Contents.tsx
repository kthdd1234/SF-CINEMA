import React from 'react';
import Btns from './Btns';

interface IContents {
   currentMovie: object;
   index: number;
}

interface ICurrentMovie {
   sub?: string;
   exp1?: string;
   exp2?: string;
}

const Contents = ({ currentMovie, index }: IContents) => {
   const { sub, exp1, exp2 }: ICurrentMovie = currentMovie;

   return (
      <div className="swiper-contents">
         <h1 className="swiper-contents-sub">{sub}</h1>
         <h3 className="swiper-contents-exp">{exp1}</h3>
         <h3 className="swiper-contents-exp">{exp2}</h3>
         <Btns sub={sub ? sub: ''} index={index} />
      </div>
   );
};

export default Contents;
