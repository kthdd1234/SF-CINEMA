import React from 'react';
import Menu from '../component/Menu';
import Item from './Item';

const ExploreItem = ({ query, lists, onHover, value, icon, hover }) => {
   return (
      <div
         className="nav-list-explore"
         onMouseOver={() => onHover(true)}
         onMouseLeave={() => onHover(false)}
      >
         <Item name={value} icon={icon} onClick={null} />
         {hover ? <Menu query={query} lists={lists} onHover={onHover} /> : null}
      </div>
   );
};

export default ExploreItem;
