import React from 'react';
import { useHistory } from 'react-router-dom';

const Menu = ({ query, onHover, lists }) => {
   const history = useHistory();
   const onClick = (value) => {
      history.push(`/explore?${query}=${value}`);
      onHover(false);
   };

   return (
      <div
         className={`nav-list-menu ${
            query === 'series' ? 'menu-flex' : 'menu-column'
         }`}
      >
         {lists.map((obj, i) => (
            <div
               key={i}
               className="nav-list-menu-item"
               onClick={() => onClick(obj.path)}
            >
               <span className="nav-list-item-icon">{obj.icon}</span>
               <span>{obj.sub}</span>
            </div>
         ))}
      </div>
   );
};

export default Menu;
