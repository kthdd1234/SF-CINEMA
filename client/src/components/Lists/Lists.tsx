import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import {
   StarFilled,
   GiftFilled,
   CrownFilled,
   RedditCircleFilled,
   DingdingOutlined,
   ThunderboltFilled,
   VideoCameraOutlined
} from '@ant-design/icons';
import { Head, List } from './component';
import { explore } from '../Explore/request/explore';
import 'antd/dist/antd.css';
import './Lists.css';

const Lists = () => {
   const [push, SetPush] = useState([]);
   const [highlyRatedMovies, SetHighlyRatedMovies] = useState([]);
   const [aliens, SetAliens] = useState([]);
   const [superHero, SetSuperHero] = useState([]);
   const [operatorPush, SetOperatorPush] = useState([]);
   const [sfMasterpiece, SetSfMasterpiece] = useState([]);
   const [action, SetAction] = useState([]);

   useEffect(() => {
      const req = async () => {
         const pushMovies = await explore('push', 'push');
         const ratedMovies = await explore('push', 'highly-rated-movies');
         const aliensMovies = await explore('tag', '외계인');
         const superHeroMovies = await explore('tag', '슈퍼 히어로');
         const operatorPush = await explore('push', 'operator-push');
         const sfMasterpieceMovies = await explore('push', 'sf-masterpiece');
         const actionMovies = await explore('tag', '액션');

         SetPush(pushMovies);
         SetHighlyRatedMovies(ratedMovies);
         SetAliens(aliensMovies);
         SetSuperHero(superHeroMovies);
         SetOperatorPush(operatorPush);
         SetSfMasterpiece(sfMasterpieceMovies);
         SetAction(actionMovies);
      };
      req();
   }, []);

   const movieList = [
      { sub: '추천 영화', icon: <VideoCameraOutlined />, showAllPath: '/', movies: push.slice(0, 7) },
      { sub: '평점이 높은 영화', icon: <StarFilled />, showAllPath: 'push=highly-rated-movies', movies:  highlyRatedMovies.slice(0, 7) },
      { sub: '외계인 영화', icon: <RedditCircleFilled />, showAllPath: 'tag=외계인', movies: aliens.slice(0, 7) },
      { sub: '운영자가 추천하는 영화', icon: <GiftFilled />, showAllPath: 'push=operator-push', movies:  operatorPush.slice(0, 7) },
      { sub: '슈퍼 히어로 영화', icon: <DingdingOutlined />, showAllPath: 'tag=슈퍼 히어로', movies: superHero.slice(0, 7) },
      { sub: '주말에 몰아보기 좋은 SF 명작', icon: <CrownFilled />, showAllPath: 'push=sf-masterpiece', movies: sfMasterpiece.slice(0, 7) },
      { sub: '액션 영화 추천', icon: <ThunderboltFilled />,showAllPath: 'tag=액션', movies: action.slice(0, 7) }
   ];

   if (action.length) {
      return (
         <div>
            {movieList.map((list, i) => (
               <div className="lists" key={i}>
                  <Head sub={list.sub} icon={list.icon} path={list.showAllPath} />
                  <List movies={list.movies} />
               </div>
            ))}
         </div>
      );
   } else {
      return <Spin size="large" className="spin" />;
   }
};

export default withRouter(Lists);
