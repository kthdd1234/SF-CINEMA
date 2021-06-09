import React from 'react';
import Sub from './Sub';
import ShowAllBtn from './ShowAllBtn';

const Head = ({ icon, sub, path }) => {
   return (
      <div className="movie-list-head">
         <Sub icon={icon} sub={sub} />
         <ShowAllBtn path={path} />
      </div>
   );
};

export default Head;
