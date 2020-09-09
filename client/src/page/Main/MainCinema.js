import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import RandomMovies from './RandomMovies';
import MovieCardList from './MovieCardList';
import SearchBar from './SearchBar';
import MainBackground from './MainBackground';
import './MainCinema.css';
import { seriesList } from './seriesList';
import dotenv from 'dotenv';
dotenv.config();

const serverUrl = axios.create({
   baseURL: `http://54.180.32.31:5000/main`,
});

class MainCinema extends Component {
   constructor(props) {
      super(props);

      this.state = {
         profile: {},
         isLogin: false,
         backgroundImg: [],
         randomMovies: [],
         highlyRated: [],
         aliensMovies: [],
         superHeroMovies: [],
         operatorMovies: [],
         masterpiece: [],
         series: [],
         modalVisible: false,
         currentMovie: null,
         numberOfLikes: 0,
         imgList: [],
         searchResult: [],
         keyword: '',
         drawerVisible: false,
         tralierShow: false,
         videoId: '',
      };
   }

   async componentDidMount() {
      const {
         axiosRequestHighlyRated,
         axiosRequestReleaseOrder,
         axiosRequestSeries,
         axiosRequestOperatorMovies,
         axiosRequestMasterpiece,
         axiosGenres,
      } = this.props;

      const accessToken = reactLocalStorage.get('SFCinemaUserToken');
      if (accessToken) {
         this.setState({
            isLogin: true,
         });
         axios
            .get('http://54.180.32.31:5000/user/profile', {
               headers: {
                  Authorization: 'Bearer ' + accessToken,
               },
            })
            .then(async ({ data }) => {
               const userInfo = await data;

               this.setState({
                  profile: userInfo,
               });
            });
      }

      /*  백그라운드 이미지 */
      serverUrl.get('/backgroundImg').then(({ data }) => {
         this.setState({
            backgroundImg: data,
         });
      });

      /* 랜덤 영화 데이터 50개 */
      serverUrl.get('/randomMovies').then(({ data }) => {
         this.setState({
            randomMovies: data,
         });
      });

      /* 별점이 9점 이상인 영화 */
      const highlyRated = await axiosRequestHighlyRated(
         '/highlyRated',
         100,
         10,
         9,
      );
      this.setState({ highlyRated: highlyRated });

      /* 개봉 영화순 */
      const releaseOrder = await axiosRequestReleaseOrder(
         '/releaseOrder',
         100,
         20210000,
         20180000,
      );
      this.setState({ releaseOrder: releaseOrder });

      /* 외계인 영화 추천 */
      const aliensMovies = await axiosGenres('/genres', '외계인', 15);
      this.setState({
         aliensMovies: aliensMovies,
      });

      /* 슈퍼히어로 영화 추천 */
      const superHeroMovies = await axiosGenres('/genres', '슈퍼 히어로', 15);
      this.setState({
         superHeroMovies: superHeroMovies,
      });

      /* 운영자가 추천하는 SF 영화*/
      const operatorMovies = await axiosRequestOperatorMovies(
         '/operatorMovies',
         21,
      );
      this.setState({ operatorMovies: operatorMovies });

      /* 주말에 몰아보기 좋은 SF 명작 추천 */
      const masterpiece = await axiosRequestMasterpiece('/masterpiece', 21);
      this.setState({ masterpiece: masterpiece });

      /* SF 시리즈물 강력 추천(Top3) */
      const seriesNames = seriesList();
      const seriesMovieList = await Promise.all(
         seriesNames.map((seriesName) =>
            axiosRequestSeries('/series', seriesName),
         ),
      );

      const resultMovieList = this.handleSeriesList(seriesMovieList).reduce(
         (acc, cur) => {
            return acc.concat(cur);
         },
      );

      this.setState({
         series: resultMovieList,
      });
      const movieTitleEng = '아이언맨 2';
      axios
         .get('https://api.themoviedb.org/3/search/movie', {
            params: {
               api_key: 'a3f2dd845f961cc6ea8d04c944383159',
               query: movieTitleEng,
               page: 1,
            },
         })
         .then(async ({ data }) => {
            const imgId = data.results[0].id;
            console.log(imgId);

            axios
               .get(`https://api.themoviedb.org/3/movie/${imgId}/images`, {
                  params: { api_key: 'a3f2dd845f961cc6ea8d04c944383159' },
               })
               .then(({ data }) => {
                  const imgList = data.backdrops.map((obj, i) => {
                     console.log(`${i} 번 사진`, obj.file_path);
                     return `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${obj.file_path}`;
                  });

                  this.setState({
                     imgList: imgList,
                  });
               });
         });
   }

   handleSeriesList = (seriesMovieList) => {
      for (let i = 0; i < seriesMovieList.length; i++) {
         for (let j = 0; j < 7; j++) {
            if (!seriesMovieList[i][j]) {
               seriesMovieList[i].push(null);
            }
         }
      }

      return seriesMovieList;
   };

   render() {
      const {
         backgroundImg,
         randomMovies,
         highlyRated,
         operatorMovies,
         masterpiece,
         series,
         imgList,
         aliensMovies,
         superHeroMovies,
         isLogin,
         profile,
      } = this.state;

      return (
         <div>
            <MainBackground
               isLogin={isLogin}
               profile={profile}
               backgroundImg={backgroundImg}
            />
            <SearchBar isLogin={isLogin} profile={profile} />
            {randomMovies.length ? (
               <RandomMovies
                  isLogin={isLogin}
                  profile={profile}
                  randomMovies={randomMovies}
               />
            ) : (
               <center className="movies-spin">
                  <Spin size="large" />
               </center>
            )}

            {series.length ? (
               <MovieCardList
                  highlyRated={highlyRated}
                  operatorMovies={operatorMovies}
                  masterpiece={masterpiece}
                  series={series}
                  aliensMovies={aliensMovies}
                  superHeroMovies={superHeroMovies}
                  setModalVisible={this.setModalVisible}
                  handleCurrentMovie={this.handleCurrentMovie}
                  isLogin={isLogin}
                  profile={profile}
               />
            ) : (
               <center className="movies-spin">
                  <Spin size="large" />
               </center>
            )}
            {imgList.length
               ? imgList.map((data, i) => (
                    <div
                       key={i}
                       style={{
                          width: '1920px',

                          overflow: 'hidden',
                       }}
                    >
                       <img
                          style={{
                             width: '100%',
                          }}
                          src={data}
                       ></img>
                    </div>
                 ))
               : null}
         </div>
      );
   }
}
// eslint-disable-next-line
export default withRouter(MainCinema);
// eslint-disable-next-line
