require('dotenv').config();
const models = require('./models/index');
const axios = require('axios');
const kmdbUrl =
  'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp';
const naverUrl = 'https://openapi.naver.com/v1/search/movie.json';

let title = '더 씽';
let releaseDts = '';
let releaseDte = '';

if (Array.isArray(title)) {
  let divideArg = title;
  title = divideArg[0];
  releaseDts = releaseDte = divideArg[1];
}

axios
  .get(encodeURI(kmdbUrl), {
    params: {
      collection: 'kmdb_new',
      detail: 'Y',
      ServiceKey: process.env.KMDB_SERVICEKEY,
      type: '극영화',
      title: title,
      listCount: 1,
      createDts: 1980,
      releaseDts: releaseDts,
      releaseDte: releaseDte,
    },
  })
  .then(({ data }) => {
    console.log('kmdb 영화 데이터 => ', data.Data[0].Result);
    const prodYear = data.Data[0].Result[0].prodYear;
    const actor = data.Data[0].Result[0].actor;
    const { directorNm } = data.Data[0].Result[0].director[0];
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

    const posters = data.Data[0].Result[0].posters
      .replace(/\|/gi, ' ')
      .split(' ');

    const movie_Data = {
      title: title,
      titleEng: data.Data[0].Result[0].titleEng,
      director: directorNm,
      nation: data.Data[0].Result[0].nation,
      plot: data.Data[0].Result[0].plot,
      posters: posters,
      actors: actorPersons,
      releaseDate:
        movieReleaseDate ||
        data.Data[0].Result[0].repRlsDate ||
        data.Data[0].Result[0].repRatDate,
      runtime: movieRuntime,
      ratingGrade: movieGrade,
    };

    axios
      .get(encodeURI(naverUrl), {
        params: {
          yearfrom: Number(prodYear) - 2,
          yearto: Number(prodYear) + 1,
          display: 1,
          query: title,
        },
        headers: {
          'Content-Type': 'application/json',
          'X-Naver-Client-ID': `${process.env.NAVER_CLIENT_ID}`,
          'X-Naver-Client-Secret': `${process.env.NAVER_CLIENT_SECRET}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        data.items[0].userRating === ''
          ? ''
          : (movie_Data.userRating = data.items[0].userRating);
        movie_Data.posters[0] === ''
          ? (movie_Data.posters = data.items[0].image)
          : '';
        movie_Data.titleEng === ''
          ? (movie_Data.titleEng = data.items[0].subtitle)
          : '';
        // console.log(data.items[0]);
        console.log(movie_Data);

        // models.movies.findOrCreate({
        //   where: {
        //     title: movie_Data.title,
        //   },
        //   defaults: {
        //     titleEng: movie_Data.title,
        //     titleEng: movie_Data.titleEng,
        //     director: movie_Data.director,
        //     nation: movie_Data.nation,
        //     plot: movie_Data.plot,
        //     posters: JSON.stringify(movie_Data.posters),
        //     actors: JSON.stringify(movie_Data.actors),
        //     releaseDate: Number(movie_Data.releaseDate),
        //     runtime: movie_Data.runtime,
        //     ratingGrade: movie_Data.ratingGrade,
        //     userRating: Number(movie_Data.userRating),
        //   },
        // });
      });
  })
  .catch((err) => {
    console.log(err);
  });
