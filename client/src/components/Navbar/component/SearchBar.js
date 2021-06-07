import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

const SearchBar = ({ onSearch }) => {
   const history = useHistory();
   const search = (value) => history.push(`/search?query=${value}`);

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
