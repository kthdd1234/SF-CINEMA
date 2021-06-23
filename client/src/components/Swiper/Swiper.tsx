import React, { useState } from 'react';
import { swiperList } from './data';
import { Shadow, Direction, Contents, Image } from './component'
import 'antd/dist/antd.css';
import './Swiper.css';

const Swiper = () => {
   const [currentMovie, setCurrentMovie] = useState(swiperList[0]);
   const [index, setIndex] = useState(0);

   return (
      <div className="swiper">
         <Shadow />
         <Direction
            index={index}
            setCurrentMovie={setCurrentMovie}
            setIndex={setIndex}
         />
         <Contents index={index} currentMovie={currentMovie} />
         <Image path={currentMovie.img} />
      </div>
   );
};

export default Swiper;
