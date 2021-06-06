import React from 'react';
import MovieCard from '../../components/Main/MovieCard';

const List = ({ movies }) => {
   return (
      <div className="search-result-list">
         {movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
         ))}
      </div>
   );
};

export default List;
