import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { requestSearch } from '../../requests';
import List from './List';
import './SearchList.css';

const SearchList = () => {
   const [movies, setMovies] = useState([]);
   const [keyword, setKeword] = useState('');
   const query = new URLSearchParams(window.location.search).get('query');

   useEffect(() => {
      const req = async () => {
         const data = await requestSearch(query);
         setMovies(data);
         setKeword(query);
      };
      req();
   }, [query]);

   return (
      <div>
         <div className="search-result-container">
            <div className="search-result-text">
               <SearchOutlined className="search-icon" />
               {keyword}
               <span className="text-detail">검색 결과 </span>
               {movies.length}
               <span className="text-detail">건</span>
            </div>
            {movies.length ? (
               <List movies={movies} keyword={keyword} />
            ) : (
               <div className="loding-spin">
                  <Spin size="large" />
               </div>
            )}
         </div>
      </div>
   );
};

export default SearchList;
