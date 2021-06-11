import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { explore } from './request/explore';
import { pushList, tagList } from '../Navbar/data';
import Head from './component/Head';
import Loding from './component/Loding';
import List from '../Lists/component/List';
import './Explore.css';

const Explore = () => {
   const [movies, setMovies] = useState([]);
   const [selectdBtn, setSelectdBtn] = useState(false);
   const [icon, setIcon] = useState('');
   const [sub, setSub] = useState('');
   const [key, value] = useLocation().search.substring(1).split('=');
   const decoding = decodeURI(value);

   useEffect(() => {
      switch (key) {
         case 'push':
            setSub(pushList[value][0]);
            setIcon(pushList[value][1]);
            break;
         case 'tag':
            setSub(decoding);
            setIcon(tagList[decoding][1]);
            break;
         case 'series':
            setSub(decoding);
            break;
      }
      return () => {
         setIcon('');
      };
   });

   useEffect(() => {
      const req = async () => {
         const data = await explore(key, decoding);
         setMovies(data);
         setSelectdBtn(true);
      };
      req();

      return () => {
         setSelectdBtn(false);
      };
   }, [value]);

   const onChangeSelect = useCallback((selected) => {
      let sortMovies = [...movies];
      sortMovies =
         selected === '평점이 높은 순'
            ? sortMovies.sort((a, b) => b.userRating - a.userRating)
            : sortMovies.sort((a, b) => b.releaseDate - a.releaseDate);
      setMovies(sortMovies);
   });

   return (
      <div className="explore">
         {movies.length ? (
            <div>
               <Head
                  sub={sub}
                  icon={icon}
                  selectdBtn={selectdBtn}
                  setSelectdBtn={setSelectdBtn}
                  onChangeSelect={onChangeSelect}
               />
               <List movies={movies} />
            </div>
         ) : (
            <Loding />
         )}
      </div>
   );
};

export default Explore;
