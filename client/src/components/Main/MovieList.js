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
         setModalVisible,
         history,
      } = this.props;

      if (action.length) {
         return (
            <div className="recommend-contents">
               <h2 className="recommend-title"># 추천 영화</h2>
               <div className="recommend-items">
                  {recommendation.map((movie, i) => (
                     <MovieListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                     />
                  ))}
               </div>
               <h2 className="recommend-title">
                  <StarFilled className="recommend-icon" /> 평점이 높은 영화
                  <Button
                     className="btn-showall-link"
                     type="ghost"
                     onClick={() =>
                        history.push('/recommendation/highly-rated-movies')
                     }
                  >
                     모두 보기
                     <DoubleRightOutlined className="showall-icon" />
                  </Button>
               </h2>

               <div className="recommend-items">
                  {highlyRatedMovies.map((movie, i) => (
                     <MovieListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                     />
                  ))}
               </div>

               <h2 className="recommend-title">
                  <RedditCircleFilled className="recommend-icon" /> 외계인 영화
                  추천
                  <Button
                     className="btn-showall-link"
                     type="ghost"
                     onClick={() => history.push('/genre?genre=외계인')}
                  >
                     모두 보기
                     <DoubleRightOutlined className="showall-icon" />
                  </Button>
               </h2>
               <div className="recommend-items">
                  {aliens.map((movie, i) => (
                     <MovieListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                     />
                  ))}
               </div>

               <h2 className="recommend-title">
                  <DingdingOutlined className="recommend-icon" /> 슈퍼히어로
                  영화 추천
                  <Button
                     className="btn-showall-link"
                     type="ghost"
                     onClick={() => history.push('/genre?genre=슈퍼 히어로')}
                  >
                     모두 보기
                     <DoubleRightOutlined className="showall-icon" />
                  </Button>
               </h2>
               <div className="recommend-items">
                  {superHero.map((movie, i) => (
                     <MovieListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                     />
                  ))}
               </div>

               <h2 className="recommend-title">
                  <GiftFilled className="recommend-icon" /> 운영자가 추천하는
                  영화
                  <Button
                     className="btn-showall-link"
                     type="ghost"
                     onClick={() =>
                        history.push('/recommendation/operator-recommendation')
                     }
                  >
                     모두 보기
                     <DoubleRightOutlined className="showall-icon" />
                  </Button>
               </h2>
               <div className="recommend-items">
                  {operatorRecommendation.map((movie, i) => (
                     <MovieListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                     />
                  ))}
               </div>

               <h2 className="recommend-title">
                  <CrownFilled className="recommend-icon" /> 주말에 몰아보기
                  좋은 SF 명작 추천
                  <Button
                     className="btn-showall-link"
                     type="ghost"
                     onClick={() =>
                        history.push('/recommendation/sf-masterpiece')
                     }
                  >
                     모두 보기
                     <DoubleRightOutlined className="showall-icon" />
                  </Button>
               </h2>
               <div className="recommend-items">
                  {sfMasterpiece.map((movie, i) => (
                     <MovieListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                     />
                  ))}
               </div>
               <h2 className="recommend-title">
                  <ThunderboltFilled className="recommend-icon" /> 액션 영화
                  추천
                  <Button
                     className="btn-showall-link"
                     type="ghost"
                     onClick={() => history.push('/genre?genre=액션')}
                  >
                     모두 보기
                     <DoubleRightOutlined className="showall-icon" />
                  </Button>
               </h2>
               <div className="recommend-items">
                  {action.map((movie, i) => (
                     <MovieListEntry
                        key={i}
                        movie={movie}
                        alt={i}
                        setModalVisible={setModalVisible}
                     />
                  ))}
               </div>
            </div>
         );
      } else {
         return <Spin size="large" className="spin" />;
      }
   }
}

export default withRouter(MovieList);
