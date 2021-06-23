import React from 'react';
import Icon from '../component/Icon';
import Sub from '../component/Sub';

interface IHead {
   keyword: string;
   len: number;
}

const Head = ({ keyword, len }: IHead) => {
   return (
      <div className="search-head">
         <Icon />
         {keyword}
         <Sub sub="검색 결과" />
         {len}
         <Sub sub="건" />
      </div>
   );
};

export default Head;
