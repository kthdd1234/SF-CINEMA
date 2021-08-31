import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
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

const Navbar = () => {
   const [pushHover, onPushHover] = useState(false);
   const [tagHover, onTagHover] = useState(false);
   const [seriesHover, onSeriesHover] = useState(false);
   const [search, onSearch] = useState(false);
   const exploreItems = [
      {
         onHover: onPushHover,
         value: '추천',
         icon: <GiftOutlined />,
         query: 'push',
         lists: pushList,
         hover: pushHover,
      },
      {
         onHover: onTagHover,
         value: '특징',
         icon: <TagOutlined />,
         query: 'tag',
         lists: tagList,
         hover: tagHover,
      },
      {
         onHover: onSeriesHover,
         value: '시리즈',
         icon: <ThunderboltFilled />,
         query: 'series',
         lists: seriesList,
         hover: seriesHover,
      },
   ];
   const isLogin = useSelector((state: RootState) => state.auth.isLogin);
   console.log('navbar state: ', isLogin);

   useEffect(() => {
      let navbar: Element | null = window.document.querySelector('.nav');

      window.addEventListener('scroll', () => {
         let scrollTop = window.pageYOffset;
         if (navbar) {
            const { style }: any = navbar;
            if (scrollTop == 0) {
               style.backgroundColor = 'transparent';
            } else {
               style.backgroundColor = 'rgb(3, 7, 8)';
            }
         }
      });
   }, []);

   return (
      <nav className="nav">
         <div className="nav-list">
            <Logo />
            <HomeItem />
            {exploreItems.map(
               ({ onHover, value, icon, query, lists, hover }, itemsIdx) => (
                  <ExploreItem
                     key={itemsIdx}
                     onHover={onHover}
                     value={value}
                     icon={icon}
                     query={query}
                     lists={lists}
                     hover={hover}
                  />
               ),
            )}
         </div>

         <div className="nav-list">
            <SearchItem search={search} onSearch={onSearch} />
            {!isLogin ? <AuthItems /> : <SettingItems />}
         </div>
      </nav>
   );
};

export default Navbar;
