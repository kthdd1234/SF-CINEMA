import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
   GiftOutlined,
   HomeOutlined,
   ThunderboltFilled,
   TagOutlined,
} from '@ant-design/icons';
import { pushList, tagList, seriesList } from './data';
import Logo from './component/Logo';
import HomeItem from './component/HomeItem';
import ExploreItem from './component/ExploreItem';
import SearchItem from './component/SearchItem';
import AuthItems from './component/AuthItems';
import SettingItems from './component/SettingItems';
import './Navbar.css';

const Navbar = ({ history, isLogin }) => {
   const [pushHover, onPushHover] = useState(false);
   const [tagHover, onTagHover] = useState(false);
   const [seriesHover, onSeriesHover] = useState(false);
   const [search, onSearch] = useState(false);
   const items = [
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
            <Logo history={history} />
            <HomeItem history={history} icon={<HomeOutlined />} value="홈" />
            {items.map((items, i) => (
               <ExploreItem
                  key={i}
                  onHover={items[0]}
                  value={items[1]}
                  icon={items[2]}
                  query={items[3]}
                  lists={items[4]}
                  hover={items[5]}
                  history={history}
               />
            ))}
         </div>

         <div className="nav-list">
            <SearchItem search={search} onSearch={onSearch} history={history} />
            {!isLogin ? (
               <AuthItems history={history} />
            ) : (
               <SettingItems history={history} />
            )}
         </div>
      </nav>
   );
};

export default withRouter(Navbar);
