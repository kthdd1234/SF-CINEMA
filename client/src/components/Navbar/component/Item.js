import React from 'react';

const Item = ({ name, icon, onClick }) => {
   return (
      <div className="nav-list-item" onClick={onClick}>
         <span className="nav-list-item-icon">{icon}</span>
         <span className="nav-list-item-name">{name}</span>
      </div>
   );
};

export default Item;
