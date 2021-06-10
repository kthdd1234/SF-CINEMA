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
} from '@ant-design/icons';
import List from './component/List';
import Head from './component/Head';
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
      ['# 추천 영화', null, '/', push.slice(0, 7)],
      [
         '평점이 높은 영화',
         <StarFilled className="recommend-icon" />,
         '/push=highly-rated-movies',
         highlyRatedMovies.slice(0, 7),
      ],
      [
         '외계인 영화 추천',
         <RedditCircleFilled className="recommend-icon" />,
         'tag=외계인',
         aliens.slice(0, 7),
      ],
      [
         '운영자가 추천하는 영화',
         <GiftFilled className="recommend-icon" />,
         'push=operator-push',
         operatorPush.slice(0, 7),
      ],
      [
         '슈퍼 히어로 영화 추천',
         <DingdingOutlined className="recommend-icon" />,
         'tag=슈퍼 히어로',
         superHero.slice(0, 7),
      ],
      [
         '주말에 몰아보기 좋은 SF 명작 추천',
         <CrownFilled className="recommend-icon" />,
         'push=sf-masterpiece',
         sfMasterpiece.slice(0, 7),
      ],
      [
         '액션 영화 추천',
         <ThunderboltFilled className="recommend-icon" />,
         'tag=액션',
         action.slice(0, 7),
      ],
   ];

   if (action.length) {
      return (
         <div>
            {movieList.map((list, i) => (
               <div className="lists" key={i}>
                  <Head icon={list[1]} sub={list[0]} path={list[2]} />
                  <List movies={list[3]} />
               </div>
            ))}
         </div>
      );
   } else {
      return <Spin size="large" className="spin" />;
   }
};

export default withRouter(Lists);
