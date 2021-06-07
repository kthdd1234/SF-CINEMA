import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { requestSearch } from '../../requests';
import List from '../Movies/List';
import './Search.css';

const Icon = () => {
   return <SearchOutlined className="search-icon" />;
};

const Sub = ({ sub }) => {
   return <span className="search-head-sub">{sub}</span>;
};

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

const Loding = () => {
   return (
      <div className="loding-spin">
         <Spin size="large" />
      </div>
   );
};

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
      <div className="search">
         <Head keyword={keyword} len={movies.length} />
         {movies.length ? <List movies={movies} /> : <Loding />}
      </div>
   );
};

export default SearchList;
