import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

const Btn = ({ sub, value, icon, setTrailer }) => {
   const history = useHistory();

   const onClick = () => {
      const link = (path) => history.push(path);
      const dict1 = {
         '예고편 보기': setTrailer,
         '자세히 보기': '/movies/245',
      };
      const dict2 = {
         '개봉 예정작': `/explore?push=latest-movies`,
         '최신 SF 신작': '/explore?push=latest-movies',
         'SF 최고 인기작': '/explore?push=highly-rated-movies',
         '다양한 외계인 영화': '/explore?tag=외계인',
         '최고 인기 시리즈': '/explore?tag=슈퍼 히어로',
      };

      value === '목록 보기'
         ? link(dict2[sub])
         : value === '예고편 보기'
         ? dict1[value](true)
         : link(dict1[value]);
   };

   return (
      <Button
         className="swiper-btns-btn"
         type="link"
         icon={icon}
         onClick={onClick}
      >
         {value}
      </Button>
   );
};

export default Btn;
