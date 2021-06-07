import React from 'react';
import { useHistory } from 'react-router-dom';

const Menu = ({ query, onHover, lists }) => {
   const history = useHistory();
   const onClick = (value) => {
      history.push(`/explore?${query}=${value}`);
      onHover(false);
   };

   if (query === 'series') {
      return (
         <div className="nav-detail-series">
            {lists.map((series, i) => (
               <div
                  key={i}
                  className="nav-detail-list-item"
                  onClick={() => onClick(series)}
               >
                  <span>{series}</span>
               </div>
            ))}
         </div>
      );
   } else {
      return (
         <div className="nav-detail-list">
            {Object.entries(lists).map((list, i) => (
               <div
                  key={i}
                  className="nav-detail-list-item"
                  onClick={() => onClick(list[0])}
               >
                  <span className="nav-icon">{list[1][1]}</span>
                  <span>{list[1][0]}</span>
               </div>
            ))}
         </div>
      );
   }
};

export default Menu;
