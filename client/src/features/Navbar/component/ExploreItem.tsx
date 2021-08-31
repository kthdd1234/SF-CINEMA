import React from 'react';
import Menu from './Menu';
import Item from './Item';

interface IExploreItem {
   query: string;
   lists: Array<ILists>;
   onHover: Function;
   value: string;
   icon: any;
   hover: boolean;
}

export interface ILists {
   path: string;
   icon: any;
   sub: string;
}

const ExploreItem = ({
   query,
   lists,
   onHover,
   value,
   icon,
   hover,
}: IExploreItem) => {
   return (
      <div
         className="nav-list-explore"
         onMouseOver={() => onHover(true)}
         onMouseLeave={() => onHover(false)}
      >
         <Item name={value} icon={icon} onClick={() => null} />
         {hover ? <Menu query={query} lists={lists} onHover={onHover} /> : null}
      </div>
   );
};

export default ExploreItem;
