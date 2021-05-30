import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Spin } from 'antd';
import {
   StarFilled,
   GiftFilled,
   CrownFilled,
   RedditCircleFilled,
   DingdingOutlined,
   ThunderboltFilled,
   DoubleRightOutlined,
} from '@ant-design/icons';
import MovieListEntry from '../../containers/Main/MovieListEntry';
import { reqExplore } from '../../requests';
import 'antd/dist/antd.css';
import './MovieList.css';

const ShowAllBtn = ({ history, path }) => {
   return (
      <Button
         className="btn-showall-link"
         type="ghost"
         onClick={() => history.push(path)}
      >
         모두 보기
         <DoubleRightOutlined className="showall-icon" />
      </Button>
   );
};

const MovieList = () => {
   const [push, SetPush] = useState([]);
   const [highlyRatedMovies, SetHighlyRatedMovies] = useState([]);
   const [aliens, SetAliens] = useState([]);
   const [superHero, SetSuperHero] = useState([]);
   const [operatorPush, SetOperatorPush] = useState([]);
   const [sfMasterpiece, SetSfMasterpiece] = useState([]);
   const [action, SetAction] = useState([]);

   useEffect(() => {
      const req = async () => {
         const pushMovies = await reqExplore('push', 'push');
         const ratedMovies = await reqExplore('push', 'highly-rated-movies');
         const aliensMovies = await reqExplore('tag', '외계인');
         const superHeroMovies = await reqExplore('tag', '슈퍼 히어로');
         const operatorPush = await reqExplore('push', 'operator-push');
         const sfMasterpieceMovies = await reqExplore('push', 'sf-masterpiece');
         const actionMovies = await reqExplore('tag', '액션');

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
      ['# 추천 영화', null, '/', push.slice(0, 8)],
      [
         '평점이 높은 영화',
         <StarFilled className="recommend-icon" />,
         '/push=highly-rated-movies',
         highlyRatedMovies.slice(0, 8),
      ],
      [
         '외계인 영화 추천',
         <RedditCircleFilled className="recommend-icon" />,
         '/tag=외계인',
         aliens.slice(0, 8),
      ],
      [
         '운영자가 추천하는 영화',
         <GiftFilled className="recommend-icon" />,
         '/push=operator-push',
         operatorPush.slice(0, 8),
      ],
      [
         '슈퍼 히어로 영화 추천',
         <DingdingOutlined className="recommend-icon" />,
         '/tag=슈퍼 히어로',
         superHero.slice(0, 8),
      ],
      [
         '주말에 몰아보기 좋은 SF 명작 추천',
         <CrownFilled className="recommend-icon" />,
         '/push=sf-masterpiece',
         sfMasterpiece.slice(0, 8),
      ],
      [
         '액션 영화 추천',
         <ThunderboltFilled className="recommend-icon" />,
         '/tag=액션',
         action.slice(0, 8),
      ],
   ];

   if (action.length) {
      return (
         <div className="recommendation-wrap">
            {movieList.map((movies, i) => (
               <div key={i}>
                  <h2 className="recommendation-list-title">
                     {movies[1]} {movies[0]}
                     <ShowAllBtn history={history} path={movies[2]} />
                  </h2>
                  <div className="recommendation-movie-list">
                     {movies[3].map((movie, i) => (
                        <MovieListEntry key={i} movie={movie} />
                     ))}
                  </div>
               </div>
            ))}
         </div>
      );
   } else {
      return <Spin size="large" className="spin" />;
   }
};

export default withRouter(MovieList);
