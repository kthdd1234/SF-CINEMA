import React from 'react';
import SearchListEntry from './SearchListEntry';

const List = ({ movieList, keyword }) => {
   return (
      <div className="search-result-list">
         {movieList.map((movie, i) => (
            <SearchListEntry key={i} movie={movie} keyword={keyword} />
         ))}
      </div>
   );
};

export default List;
