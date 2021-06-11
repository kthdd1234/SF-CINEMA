import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import SearchBar from '../component/SearchBar';
import Item from './Item';

const SearchItem = ({ search, onSearch }) => {
   return (
      <div>
         {search ? (
            <SearchBar onSearch={onSearch} />
         ) : (
            <Item
               name="검색"
               icon={<SearchOutlined />}
               onClick={() => onSearch(true)}
            />
         )}
      </div>
   );
};

export default SearchItem;
