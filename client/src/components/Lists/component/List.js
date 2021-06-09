import React from 'react';
import Card from './Card';
import '../Lists.css';

const List = ({ movies }) => {
   return (
      <div className="list">
         {movies.map((movie, i) => (
            <Card key={i} movie={movie} />
         ))}
      </div>
   );
};

export default List;
