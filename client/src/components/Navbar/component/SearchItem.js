import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import SearchBar from '../component/SearchBar';

const SearchItem = ({ search, onSearch }) => {
   return (
      <div>
         {search ? (
            <SearchBar onSearch={onSearch} />
         ) : (
            <div className="nav-list-item" onClick={() => onSearch(true)}>
               <span className="nav-icon">{<SearchOutlined />}</span>
               <span>검색</span>
            </div>
         )}
      </div>
   );
};

export default SearchItem;
