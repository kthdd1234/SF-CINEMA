import React, { Component } from 'react';
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
import 'antd/dist/antd.css';
import './MovieList.css';

class MovieList extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      const {
         recommendation,
         highlyRatedMovies,
         operatorRecommendation,
         sfMasterpiece,
         action,
         aliens,
         superHero,
         history,
      } = this.props;

      const movieList = [
         {
            listTitle: '# 추천 영화',
            icon: null,
            showAll: '/',
            list: recommendation.slice(0, 8),
         },
         {
            listTitle: '평점이 높은 영화',
            icon: <StarFilled className="recommend-icon" />,
            showAll: 'recommendation/highly-rated-movies',
            list: highlyRatedMovies.slice(0, 8),
         },
         {
            listTitle: '외계인 영화 추천',
            icon: <RedditCircleFilled className="recommend-icon" />,
            showAll: '/genre?genre=외계인',
            list: aliens.slice(0, 8),
         },
         {
            listTitle: '운영자가 추천하는 영화',
            icon: <GiftFilled className="recommend-icon" />,
            showAll: '/recommendation/operator-recommendation',
            list: operatorRecommendation.slice(0, 8),
         },
         {
            listTitle: '슈퍼히어로 영화 추천',
            icon: <DingdingOutlined className="recommend-icon" />,
            showAll: '/genre?genre=슈퍼 히어로',
            list: superHero.slice(0, 8),
         },
         {
            listTitle: '주말에 몰아보기 좋은 SF 명작 추천',
            icon: <CrownFilled className="recommend-icon" />,
            showAll: '/recommendation/sf-masterpiece',
            list: sfMasterpiece.slice(0, 8),
         },
         {
            listTitle: '액션 영화 추천',
            icon: <ThunderboltFilled className="recommend-icon" />,
            showAll: '/genre?genre=액션',
            list: action.slice(0, 8),
         },
      ];

      if (action.length) {
         return (
            <div className="recommendation-wrap">
               {movieList.map((section, i) => (
                  <div key={i}>
                     <h2 className="recommendation-list-title">
                        {section.icon} {section.listTitle}
                        <Button
                           className="btn-showall-link"
                           type="ghost"
                           onClick={() => history.push(section.showAll)}
                        >
                           모두 보기
                           <DoubleRightOutlined className="showall-icon" />
                        </Button>
                     </h2>

                     <div className="recommendation-movie-list">
                        {section.list.map((movie, i) => (
                           <MovieListEntry key={i} movie={movie} alt={i} />
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         );
      } else {
         return <Spin size="large" className="spin" />;
      }
   }
}

export default withRouter(MovieList);
