import React from 'react';
import MovieCard from './MovieCard';
import './List.css';

const List = ({ movies }) => {
   return (
      <div className="list">
         {movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
         ))}
      </div>
   );
};

export default List;
