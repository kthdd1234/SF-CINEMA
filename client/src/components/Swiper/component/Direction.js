import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { swiperList } from '../data';

const Direction = ({ setCurrentMovie, setIndex, index }) => {
   return (
      <div>
         <div
            className="swiper-next"
            onClick={() => {
               if (index === 5) {
                  setCurrentMovie(swiperList[0]);
                  setIndex(0);
               } else {
                  setCurrentMovie(swiperList[index + 1]);
                  setIndex(index + 1);
               }
            }}
         >
            <RightOutlined />
         </div>
         <div
            className="swiper-before"
            onClick={() => {
               if (index === 0) {
                  setCurrentMovie(swiperList[5]);
                  setIndex(5);
               } else {
                  setCurrentMovie(swiperList[index - 1]);
                  setIndex(index - 1);
               }
            }}
         >
            <LeftOutlined />
         </div>
      </div>
   );
};

export default Direction;
