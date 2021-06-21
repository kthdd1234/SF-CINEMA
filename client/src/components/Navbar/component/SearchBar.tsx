import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

interface ISearchBar {
   onSearch: Function
}

const SearchBar = ({ onSearch }: ISearchBar) => {
   const history = useHistory();
   const search = (value: string) => history.push(`/search?query=${value}`);

   return (
      <Input.Search
         onBlur={() => onSearch(false)}
         placeholder="제목, 감독, 배우로 검색"
         onSearch={(value) => search(value)}
         onChange={({ target }) => search(target.value)}
         style={{ width: 200 }}
      />
   );
};
export default SearchBar;
