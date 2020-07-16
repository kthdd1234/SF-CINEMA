require('dotenv').config();
const axios = require('axios');

module.exports = {
  get_kmdb_naver_APIData: (title) => {
    return new Promise((resolve, reject) => {
      const kmdbUrl =
        'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp';
      const naverUrl = 'https://openapi.naver.com/v1/search/movie.json';

      let releaseDts = '';
      let releaseDte = '';

      if (Array.isArray(title)) {
        console.log(title);
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
          // console.log('kmdb 영화 데이터 => ', data.Data[0].Result[0]);
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
                yearto: Number(prodYear),
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
              // console.log(naverMovie_Data);
              data.items[0].userRating === ''
                ? ''
                : (movie_Data.userRating = data.items[0].userRating);
              movie_Data.posters[0] === ''
                ? (movie_Data.posters = data.items[0].image)
                : '';
              movie_Data.titleEng === ''
                ? (movie_Data.titleEng = data.items[0].subtitle)
                : '';

              resolve(movie_Data);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

// let kmdbUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json.jsp?collection=kmdb_new&detail=Y&ServiceKey=5A51R99X9NFA25UJCE7P&type=극영화&title=${title}&listCount=1`;
//       kmdbUrl =
//         kmdbUrl + `&releaseDts=${releaseDts}` + `&releaseDte=${releaseDte}`;
//       console.log(kmdbUrl);
//       fetch(encodeURI(kmdbUrl), {
//         methods: 'GET',
//       })
//         .then((res) => res.json())
