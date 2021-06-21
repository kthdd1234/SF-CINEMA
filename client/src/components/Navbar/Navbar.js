import React, { useState, useEffect } from 'react';
import {
   GiftOutlined,
   ThunderboltFilled,
   TagOutlined,
} from '@ant-design/icons';
import { pushList, tagList, seriesList } from './data';
import {
   Logo,
   HomeItem,
   ExploreItem,
   SearchItem,
   AuthItems,
   SettingItems,
} from './component';
import './Navbar.css';

const Navbar = ({ isLogin }) => {
   const [pushHover, onPushHover] = useState(false);
   const [tagHover, onTagHover] = useState(false);
   const [seriesHover, onSeriesHover] = useState(false);
   const [search, onSearch] = useState(false);
   const exploreItems = [
      [onPushHover, '추천', <GiftOutlined />, 'push', pushList, pushHover],
      [onTagHover, '특징', <TagOutlined />, 'tag', tagList, tagHover],
      [
         onSeriesHover,
         '시리즈',
         <ThunderboltFilled />,
         'series',
         seriesList,
         seriesHover,
      ],
   ];

   useEffect(() => {
      let navbar = window.document.querySelector('.nav');

      window.addEventListener('scroll', () => {
         let scrollTop = window.pageYOffset;
         if (scrollTop == 0) {
            navbar.style.backgroundColor = 'transparent';
         } else {
            navbar.style.backgroundColor = 'rgb(3, 7, 8)';
         }
      });
   }, []);

   return (
      <nav className="nav">
         <div className="nav-list">
            <Logo />
            <HomeItem />
            {exploreItems.map((items, i) => (
               <ExploreItem
                  key={i}
                  onHover={items[0]}
                  value={items[1]}
                  icon={items[2]}
                  query={items[3]}
                  lists={items[4]}
                  hover={items[5]}
               />
            ))}
         </div>

         <div className="nav-list">
            <SearchItem search={search} onSearch={onSearch} />
            {!isLogin ? <AuthItems /> : <SettingItems />}
         </div>
      </nav>
   );
};

export default Navbar;
