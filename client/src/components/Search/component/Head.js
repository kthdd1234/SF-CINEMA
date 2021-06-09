import React from 'react';
import Icon from '../component/Icon';
import Sub from '../component/Sub';

const Head = ({ keyword, len }) => {
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
