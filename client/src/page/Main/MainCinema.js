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
   baseURL: `http://${process.env.REACT_APP_HOST}:5000/main`,
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
         action: [],
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
            .get(`http://${process.env.REACT_APP_HOST}:5000/user/profile`, {
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

      const count = 8;

      /*  백그라운드 이미지 */
      serverUrl.get('/backgroundImg').then(({ data }) => {
         this.setState({
            backgroundImg: data,
         });
      });

      /* 추천 영화 */
      serverUrl
         .get('/randomMovies', {
            params: {
               count: count,
            },
         })
         .then(({ data }) => {
            this.setState({
               randomMovies: data,
            });
         });

      /* 별점이 9점 이상인 영화 */
      const highlyRated = await axiosRequestHighlyRated(
         '/highlyRated',
         count,
         10,
         9,
      );
      this.setState({ highlyRated: highlyRated });

      /* 외계인 영화 추천 */
      const aliensMovies = await axiosGenres('/genres', '외계인', count);
      this.setState({
         aliensMovies: aliensMovies,
      });

      /* 슈퍼히어로 영화 추천 */
      const superHeroMovies = await axiosGenres(
         '/genres',
         '슈퍼 히어로',
         count,
      );
      this.setState({
         superHeroMovies: superHeroMovies,
      });

      /* 운영자가 추천하는 SF 영화*/
      const operatorMovies = await axiosRequestOperatorMovies(
         '/operatorMovies',
         count,
      );
      this.setState({ operatorMovies: operatorMovies });

      /* 주말에 몰아보기 좋은 SF 명작 추천 */
      const masterpiece = await axiosRequestMasterpiece('/masterpiece', count);
      this.setState({ masterpiece: masterpiece });

      /* 액션 영화 추천 */
      const action = await axiosGenres('/genres', '액션', count);
      this.setState({
         action: action,
      });

      // const movieTitleEng = '그린랜드';
      // axios
      //    .get('https://api.themoviedb.org/3/search/movie', {
      //       params: {
      //          api_key: 'a3f2dd845f961cc6ea8d04c944383159',
      //          query: movieTitleEng,
      //          page: 1,
      //       },
      //    })
      //    .then(async ({ data }) => {
      //       const imgId = data.results[0].id;
      //       console.log(imgId);

      //       axios
      //          .get(`https://api.themoviedb.org/3/movie/${imgId}/images`, {
      //             params: { api_key: 'a3f2dd845f961cc6ea8d04c944383159' },
      //          })
      //          .then(({ data }) => {
      //             const imgList = data.backdrops.map((obj, i) => {
      //                console.log(`${i} 번 사진`, obj.file_path);
      //                return `https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${obj.file_path}`;
      //             });

      //             this.setState({
      //                imgList: imgList,
      //             });
      //          });
      //    });
   }

   render() {
      const {
         backgroundImg,
         randomMovies,
         highlyRated,
         operatorMovies,
         masterpiece,
         series,
         action,
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
            {/* <SearchBar isLogin={isLogin} profile={profile} /> */}
            {/* {randomMovies.length ? (
               <RandomMovies
                  isLogin={isLogin}
                  profile={profile}
                  randomMovies={randomMovies}
               />
            ) : (
               <center className="movies-spin">
                  <Spin size="large" />
               </center>
            )} */}

            {action.length ? (
               <MovieCardList
                  isLogin={isLogin}
                  profile={profile}
                  randomMovies={randomMovies}
                  highlyRated={highlyRated}
                  operatorMovies={operatorMovies}
                  masterpiece={masterpiece}
                  series={series}
                  action={action}
                  aliensMovies={aliensMovies}
                  superHeroMovies={superHeroMovies}
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
