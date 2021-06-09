import React from 'react';

const Sub = ({ icon, sub }) => {
   return (
      <div className="movie-list-head-sub">
         {icon} {sub}
      </div>
   );
};

export default Sub;
