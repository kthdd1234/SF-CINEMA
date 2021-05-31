import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Swiper.css';

const swiperList = [
   [
      '원더우먼 1984',
      '원더우먼 갤 가돗이 돌아온다!',
      '12월 23일 극장 대개봉!',
      '/egg7KFi18TSQc1s24RMmR9i2zO6.jpg',
   ],
   [
      '개봉 예정작',
      '블랙 위도우, 카오스 워킹 등',
      '2021년에 개봉 할 SF 영화들!',
      '/bWmj33Z3MLHiaUO3TvU0OJ1qqNc.jpg',
   ],
   [
      '최신 SF 신작',
      '테넷, 그린랜드, 뉴 뮤턴트 등',
      '최근에 개봉한 SF 작품!',
      '/wzJRB4MKi3yK138bJyuL9nx47y6.jpg',
   ],
   [
      'SF 최고 인기작',
      '터미네이터, 인터스텔라 등',
      '많은 사람들이 높은 평점을 준 작품들!',
      '/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
   ],
   [
      '다양한 외계인 영화',
      '프로메테우스, 컨택트, 우주전쟁 등',
      '외계인을 소재로 한 다양한 영화!',
      '/hO97RyNjBIMfzfFpUjNhsm4zImh.jpg',
   ],

   [
      '최고 인기 시리즈',
      '어벤져스, 스파이더맨 등',
      '인기 있는 시리즈 영화들을 만나보세요!',
      '/9wXPKruA6bWYk2co5ix6fH59Qr8.jpg',
   ],
];

const Direction = ({ setCurrentMovie, setIndex, index }) => {
   return (
      <div>
         <div
            className="swiper-dir-next"
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
            className="swiper-dir-before"
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

const Shadow = () => {
   return <div className="swiper-shadow" />;
};

const Contents = ({ currentMovie }) => {
   return (
      <div className="swiper-contents">
         <h1 className="swiper-contents-sub">{currentMovie[0]}</h1>
         <h3 className="swiper-contents-desc">{currentMovie[1]}</h3>
         <h3 className="swiper-contents-desc">{currentMovie[2]}</h3>
      </div>
   );
};

const Image = ({ path }) => {
   return (
      <img
         className="swiper-images"
         src={`https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces${path}`}
      />
   );
};

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
         <Contents currentMovie={currentMovie} />
         <Image path={currentMovie[3]} />
      </div>
   );
};

export default withRouter(Swiper);
