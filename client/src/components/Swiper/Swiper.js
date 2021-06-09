import React, { useState } from 'react';
import { swiperList } from './data';
import Direction from './component/Direction';
import Shadow from './component/Shadow';
import Contents from './component/Contents';
import Image from './component/Image';
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
         <Contents currentMovie={currentMovie} index={index} />
         <Image path={currentMovie[3]} />
      </div>
   );
};

export default Swiper;
