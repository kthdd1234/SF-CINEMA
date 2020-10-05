import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
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
      this.state = {
         slideCount: 8,
      };
   }

   NavigateToHighlyRataedAndReleaseOrder = (
      path,
      key,
      count,
      under,
      moreThen,
   ) => {
      this.props.history.push(
         `${path}?key=${key}&count=${count}&under=${under}&moreThen=${moreThen}`,
      );
   };

   NavigateToGenres = (path, key, genre) => {
      this.props.history.push(`${path}?key=${key}&genre=${genre}`);
   };

   NavigateToOperatorAndMasterpiece = (path, key, count) => {
      this.props.history.push(`${path}?key=${key}&count=${count}`);
   };

   render() {
      const {
         randomMovies,
         highlyRated,
         operatorMovies,
         masterpiece,
         series,
         action,
         aliensMovies,
         superHeroMovies,
         setModalVisible,
         isLogin,
         profile,
      } = this.props;

      return (
         <div className="recommend-contents">
            <h2 className="recommend-title"># 추천 영화</h2>
            <div className="recommend-items">
               {randomMovies.map((movie, i) => (
                  <MovieListEntry
                     key={i}
                     movie={movie}
                     alt={i}
                     setModalVisible={setModalVisible}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </div>
            <h2 className="recommend-title">
               <StarFilled className="recommend-icon" /> 평점이 9점 이상인 영화
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToHighlyRataedAndReleaseOrder(
                        '/highlyRated',
                        '/highlyRated',
                        100,
                        10,
                        8.5,
                     )
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>

            <div className="recommend-items">
               {highlyRated.map((movie, i) => (
                  <MovieListEntry
                     key={i}
                     movie={movie}
                     alt={i}
                     setModalVisible={setModalVisible}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </div>

            <h2 className="recommend-title">
               <RedditCircleFilled className="recommend-icon" /> 외계인 영화
               추천
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToGenres('/genres', '외계인', '외계인')
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               {aliensMovies.map((movie, i) => (
                  <MovieListEntry
                     key={i}
                     movie={movie}
                     alt={i}
                     setModalVisible={setModalVisible}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </div>

            <h2 className="recommend-title">
               <DingdingOutlined className="recommend-icon" /> 슈퍼히어로 영화
               추천
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToGenres(
                        '/genres',
                        '슈퍼 히어로',
                        '슈퍼 히어로',
                     )
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               {superHeroMovies.map((movie, i) => (
                  <MovieListEntry
                     key={i}
                     movie={movie}
                     alt={i}
                     setModalVisible={setModalVisible}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </div>

            <h2 className="recommend-title">
               <GiftFilled className="recommend-icon" /> 운영자가 추천하는 영화
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToOperatorAndMasterpiece(
                        '/operatorMovies',
                        '/operatorMovies',
                        41,
                     )
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               {operatorMovies.map((movie, i) => (
                  <MovieListEntry
                     key={i}
                     movie={movie}
                     alt={i}
                     setModalVisible={setModalVisible}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </div>

            <h2 className="recommend-title">
               <CrownFilled className="recommend-icon" /> 주말에 몰아보기 좋은
               SF 명작 추천
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToOperatorAndMasterpiece(
                        '/masterpiece',
                        '/masterpiece',
                        100,
                     )
                  }
               >
                  모두 보기
                  <DoubleRightOutlined className="showall-icon" />
               </Button>
            </h2>
            <div className="recommend-items">
               {masterpiece.map((movie, i) => (
                  <MovieListEntry
                     key={i}
                     movie={movie}
                     alt={i}
                     setModalVisible={setModalVisible}
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </div>
            <h2 className="recommend-title">
               <ThunderboltFilled className="recommend-icon" /> 액션 영화 추천
               <Button
                  className="btn-showall-link"
                  type="ghost"
                  onClick={() =>
                     this.NavigateToGenres('/genres', '액션', '액션')
                  }
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
                     isLogin={isLogin}
                     profile={profile}
                  />
               ))}
            </div>
         </div>
      );
   }
}

export default withRouter(MovieList);
