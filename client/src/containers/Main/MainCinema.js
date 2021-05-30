import React, { useEffect, useState } from 'react';
import TopBackgroundList from './TopBackgroundList';
import MovieList from '../../components/Main/MovieList';

const MainCinema = () => {
   return (
      <div>
         <TopBackgroundList />
         <MovieList />
      </div>
   );
};

export default MainCinema;
