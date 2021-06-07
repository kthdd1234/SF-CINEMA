import React from 'react';
import Menu from '../component/Menu';

const ExploreItem = ({ query, lists, onHover, value, icon, hover }) => {
   return (
      <div
         className="nav-list-wrap"
         onMouseOver={() => onHover(true)}
         onMouseLeave={() => onHover(false)}
      >
         <div className="nav-list-item">
            <span className="nav-icon">{icon}</span>
            <span>{value}</span>
         </div>
         {hover ? <Menu query={query} lists={lists} onHover={onHover} /> : null}
      </div>
   );
};

export default ExploreItem;
