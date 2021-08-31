import React from 'react';
import Card from '../../Card/Card';
import '../Lists.css';

interface IList {
   movies: Array<object>
}

const List = ({ movies }:IList) => {
   return (
      <div className="lists-list">
         {movies.map((movie, i) => (
            <Card key={i} movie={movie} />
         ))}
      </div>
   );
};

export default List;
