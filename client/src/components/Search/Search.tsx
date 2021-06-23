import React, { useEffect, useState } from 'react';
import { search } from './request/search';
import Head from './component/Head';
import Loding from './component/Loding';
import List from '../Lists/component/List';
import './Search.css';

const SearchList = () => {
   const [movies, setMovies] = useState([]);
   const [keyword, setKeword] = useState<string | null>('');
   const query = new URLSearchParams(window.location.search).get('query');

   useEffect(() => {
      const req = async () => {
         const data = await search(query);
         setMovies(data);
         setKeword(query);
      };
      req();
   }, [query]);

   return (
      <div className="search">
         <Head keyword={keyword ? keyword : ''} len={movies.length} />
         {movies.length ? <List movies={movies} /> : <Loding />}
      </div>
   );
};

export default SearchList;
