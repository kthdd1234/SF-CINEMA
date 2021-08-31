import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
import Item from './Item';

interface ISearchItem {
   search: boolean;
   onSearch: Function;
}

const SearchItem = ({ search, onSearch }: ISearchItem) => {
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
