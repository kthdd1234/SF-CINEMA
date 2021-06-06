import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import {
   GiftOutlined,
   HomeOutlined,
   ThunderboltFilled,
   SearchOutlined,
   TagOutlined,
   UserOutlined,
} from '@ant-design/icons';
import SFCINEMA from '../../SFCINEMA.png';
import { pushList, tagList, seriesList } from '../../utils';
import { reactLocalStorage } from 'reactjs-localstorage';
import './Menu.css';

const SearchBar = ({ onSearch, history }) => {
   const search = (value) => history.push(`/search?query=${value}`);

   return (
      <Input.Search
         onBlur={() => onSearch(false)}
         placeholder="제목, 감독, 배우로 검색"
         onSearch={(value) => search(value)}
         onChange={({ target }) => search(target.value)}
         style={{ width: 200 }}
      />
   );
};

const Hover = ({ query, history, onHover, lists }) => {
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

const Logo = ({ history }) => {
   return (
      <img
         className="nav-list-logo"
         src={SFCINEMA}
         onClick={() => history.push('/')}
      />
   );
};

const Search = ({ search, onSearch, history }) => {
   return (
      <div>
         {search ? (
            <SearchBar onSearch={onSearch} history={history} />
         ) : (
            <div className="nav-list-item" onClick={() => onSearch(true)}>
               <span className="nav-icon">{<SearchOutlined />}</span>
               <span>검색</span>
            </div>
         )}
      </div>
   );
};

const HomeItem = ({ history, icon, value }) => {
   return (
      <div className="nav-list-item" onClick={() => history.push('/')}>
         <span className="nav-icon">{icon}</span>
         <span>{value}</span>
      </div>
   );
};

const ExploreItem = ({
   query,
   lists,
   onHover,
   history,
   value,
   icon,
   hover,
}) => {
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
         {hover ? (
            <Hover
               query={query}
               lists={lists}
               history={history}
               onHover={onHover}
            />
         ) : null}
      </div>
   );
};

const SignItems = ({ history }) => {
   const auth = [
      ['로그인', '/login'],
      ['회원가입', '/signup'],
   ];

   return (
      <>
         {auth.map((item, i) => (
            <div
               key={i}
               className="nav-list-item"
               onClick={() => history.push(item[1])}
            >
               <span>{item[0]}</span>
            </div>
         ))}
      </>
   );
};

const ProfileItems = ({ history }) => {
   const onClick = () => {
      reactLocalStorage.remove('SFCinemaUserToken');
      history.push('/');
      location.reload();
   };

   return (
      <>
         <div
            className="nav-list-item"
            onClick={() => history.push('/profile')}
         >
            <span className="nav-icon">{<UserOutlined />}</span>
            <span>프로필</span>
         </div>
         <div className="nav-list-item" onClick={onClick}>
            <span>로그아웃</span>
         </div>
      </>
   );
};

const Menu = ({ history, isLogin }) => {
   const [pushHover, onPushHover] = useState(false);
   const [tagHover, onTagHover] = useState(false);
   const [seriesHover, onSeriesHover] = useState(false);
   const [search, onSearch] = useState(false);

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
            <Search search={search} onSearch={onSearch} history={history} />
            {!isLogin ? (
               <SignItems history={history} />
            ) : (
               <ProfileItems history={history} />
            )}
         </div>
      </nav>
   );
};

export default withRouter(Menu);
