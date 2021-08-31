import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { explore } from './request/explore';
import { pushList, pushIndex,tagList, tagIndex } from '../Navbar/data';
import { Head, Loding } from './component';
import List from '../Lists/component/List';
import './Explore.css';

interface IMovies {
   // id: number;
   // title: string;
   // titleEng: string;
   // director: string;
   // nation: string;
   // plot: string;
   // posters: string;
   // actors: string;
   // ratingGrade: string;
   // seriesName: any;
   // runtime: string;
   // videoId: string;
   // keywords: string;
   // genre: string;
   // backDrop: string;
   // backgroundImg: any;
   // numberOfLikes: number;
   userRating: number;
   releaseDate: number;
   
}

const Explore = () => {
   const [movies, setMovies] = useState<Array<any>>([]);
   const [selectdBtn, setSelectdBtn] = useState(false);
   const [sub, setSub] = useState('');
   const [icon, setIcon] = useState(<div />);
   const [key, value] = useLocation().search.substring(1).split('=');
   const decoding = decodeURI(value);

   useEffect(() => {
      if(key === 'push') {
         setSub(pushList[pushIndex[decoding]].sub);
         setIcon(pushList[pushIndex[decoding]].icon);
      } else if (key === 'tag') {
         setSub(decoding);
         setIcon(tagList[tagIndex[decoding]].icon);
      } else {
         setSub(decoding);
      }
      
      return () => {
         setIcon(<div />);
      };
   }, [decoding]);

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
   }, [decoding]);

   const onChangeSelect = (selected: string) => {
      let sortMovies:IMovies[] = [...movies];
      sortMovies =
         selected === '평점이 높은 순'
            ? sortMovies.sort((a, b) => b.userRating - a.userRating)
            : sortMovies.sort((a, b) => b.releaseDate - a.releaseDate);
      setMovies(sortMovies);
   };

   return (
      <div className="explore">
         {movies.length ? (
            <div>
               <Head
                  sub={sub}
                  icon={icon}
                  selectdBtn={selectdBtn}
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
