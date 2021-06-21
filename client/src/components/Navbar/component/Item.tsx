import React, { MouseEvent } from 'react';

interface IItem {
   name: string;
   icon: any;
   onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const Item = ({ name, icon, onClick }: IItem) => {
   return (
      <div className="nav-list-item" onClick={onClick}>
         <span className="nav-list-item-icon">{icon}</span>
         <span className="nav-list-item-name">{name}</span>
      </div>
   );
};

export default Item;
