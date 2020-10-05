import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import axios from 'axios';
import dotenv from 'dotenv';
import { reactLocalStorage } from 'reactjs-localstorage';
import MainBackground from './MainBackground';
import MovieList from './MovieList';

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
            <MainBackground backgroundImg={backgroundImg} />
            {action.length ? (
               <MovieList
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
               <Spin size="large" className="spin" />
            )}
         </div>
      );
   }
}

const mapReduxStateToReactProps = () => {
   return {};
};

const mapReduxDispatchToReactProps = () => {
   return {};
};

// eslint-disable-next-line
export default connect(
   mapReduxStateToReactProps,
   mapReduxDispatchToReactProps,
)(MainCinema);
