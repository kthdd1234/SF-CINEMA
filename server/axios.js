require('dotenv').config();
const models = require('./models/index');
const axios = require('axios');
const kmdbUrl =
  'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp';
const naverUrl = 'https://openapi.naver.com/v1/search/movie.json';
const tmdbUrl = 'https://api.themoviedb.org/3/search/movie';
let searchKeywords = [
  ['블랙 위도우', '조나단 글레이저'],
  ['뉴 뮤턴트', '조쉬 분'],
  ['콰이어트 플레이스 2', '존 크래신스키'],
  ['원더우먼 1984', '패티 젠킨스'],
];

for (let i = 0; i < searchKeywords.length; i++) {
  axios
    .get(encodeURI(kmdbUrl), {
      params: {
        collection: 'kmdb_new',
        detail: 'Y',
        ServiceKey: process.env.KMDB_SERVICEKEY,
        type: '극영화',
        title: searchKeywords[i][0],
        listCount: 1,
      },
    })
    .then(({ data }) => {
      console.log('kmdb 영화 데이터 => ', data.Data[0].Result);
      const prodYear = data.Data[0].Result[0].prodYear;
      const actor = data.Data[0].Result[0].actor;

      const {
        ratingGrade,
        releaseDate,
        runtime,
      } = data.Data[0].Result[0].rating[0];
      const movieGrade = ratingGrade.includes('|')
        ? ratingGrade.substring(0, ratingGrade.indexOf('|'))
        : ratingGrade;
      const movieReleaseDate = releaseDate.includes('|')
        ? releaseDate.substring(0, releaseDate.indexOf('|'))
        : releaseDate;
      const movieRuntime = runtime.includes('|')
        ? runtime.substring(0, runtime.indexOf('|'))
        : runtime;
      const actorPersons = actor.map((data) => {
        return data.actorNm;
      });

      const movie_Data = {
        title: searchKeywords[i][0],
        titleEng: data.Data[0].Result[0].titleEng,
        director: searchKeywords[i][1],
        nation: data.Data[0].Result[0].nation,
        plot: data.Data[0].Result[0].plot,
        actors: actorPersons,
        releaseDate:
          movieReleaseDate ||
          data.Data[0].Result[0].repRlsDate ||
          data.Data[0].Result[0].repRatDate,
        runtime: movieRuntime,
        ratingGrade: movieGrade,
        userRating: '',
        videoId: '',
      };

      axios
        .get(encodeURI(naverUrl), {
          params: {
            yearfrom: Number(prodYear),
            yearto: Number(prodYear),
            display: 1,
            query: searchKeywords[i][0],
          },
          headers: {
            'Content-Type': 'application/json',
            'X-Naver-Client-ID': `${process.env.NAVER_CLIENT_ID}`,
            'X-Naver-Client-Secret': `${process.env.NAVER_CLIENT_SECRET}`,
          },
        })
        .then(({ data }) => {
          // data.items[0].userRating === ''
          //   ? ''
          //   : (movie_Data.userRating = data.items[0].userRating);

          // movie_Data.titleEng === ''
          //   ? (movie_Data.titleEng = data.items[0].subtitle)
          //   : '';
          axios
            .get(tmdbUrl, {
              params: {
                api_key: process.env.TMDB_API_KEY,
                page: 1,
                query: searchKeywords[i][0],
                language: 'ko',
              },
            })
            .then(({ data }) => {
              const movieId = data.results[0].id;
              const poster =
                'https://image.tmdb.org/t/p/w500' + data.results[0].poster_path;
              movie_Data.posters = JSON.stringify([poster]);
              movie_Data.plot === '' ? movie_Data.overview : null;

              axios
                .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
                  params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: 'ko',
                  },
                })
                .then(({ data }) => {
                  const videoKey = 'tVR5NvzdkPw';
                  movie_Data.videoId = videoKey === '' ? null : videoKey;

                  // models.movies.findOrCreate({
                  //   where: {
                  //     title: '원더우먼 1984',
                  //   },
                  //   defaults: {
                  //     titleEng: 'Wonder Woman 1984',
                  //     director: '패티 젠킨스',
                  //     nation: '미국',
                  //     plot:
                  //       '아마존 데미스키라 왕국의 공주이자 신이 만든 가장 완벽한 히어로인 원더우먼의 활약을 그린 초대형 액션 블록버스터',
                  //     posters: JSON.stringify([
                  //       'https://image.tmdb.org/t/p/w500/zsLi3dfp7R7uysW1x0LMXF8WcGV.jpg',
                  //     ]),
                  //     actors: JSON.stringify([
                  //       '갤 가돗',
                  //       '크리스 파인',
                  //       '크리스틴 위그',
                  //     ]),
                  //     releaseDate: 20201002,
                  //     runtime: '140',
                  //     ratingGrade: '12세 관람가',
                  //     userRating: 0,
                  //     videoId: 'lTE3zHll7ZY',
                  //   },
                  // });
                });
            });
        })
        .catch((err) => {
          console.log(err, searchKeywords[i][0]);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}
