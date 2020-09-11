const { movies, User } = require('./models/index');
const axios = require('axios');
const YOUTUBE_API_KEY = '';
const Sequelize = require('sequelize');

const movieTitleEng = '어벤져스: 에이지 오브 울트론';

// movies
//   .findAll({
//     raw: true,
//   })
//   .then((movieData) => {
//     for (let i = 0; i < movieData.length; i++) {
//       const movieId = movieData[i].id;
//       axios
//         .get('https://api.themoviedb.org/3/search/movie', {
//           params: {
//             api_key: '',
//             query: movieData[i].titleEng,
//             page: 1,
//             language: 'ko',
//           },
//         })
//         .then(async ({ data }) => {
//           const poster_path = data.results[0].poster_path;

//           movies.update(
//             {
//               posters: poster_path,
//             },
//             {
//               where: {
//                 id: movieId,
//               },
//             }
//           );
//         });
//     }
//   });

// movies.update(
//   {
//     backgroundImg: JSON.stringify([
//       'uhYoytlNaq46dG81wLmHqaSuzWu.jpg',
//       '5o88bbqcV5STn56jqOeovaaWbAE.jpg',
//     ]),
//   },
//   {
//     where: {
//       id: 260,
//     },
//   }
// );

// const 블록버스터 = [];
// movies
//   .findAll({
//     where: {
//       id: 블록버스터,
//     },
//     raw: true,
//   })
//   .then((movieData) => {
//     for (let i = 0; i < movieData.length; i++) {
//       const movieId = movieData[i].id;
//       const keyword =
//         movieData[i].keywords === null ? '' : movieData[i].keywords;
//       movies.update(
//         {
//           keywords: keyword + '블록버스터',
//         },
//         {
//           where: {
//             id: movieId,
//           },
//         }
//       );
//     }
//   });

// movies
//   .findAll({
//     where: {
//       runtime: '2시간 2분',
//     },
//     raw: true,
//   })
//   .then((movieData) => {
//     // 169 // 109 // 49
//     for (let i = 0; i < movieData.length; i++) {
//       movies.update(
//         {
//           runtime: '2시간',
//         },
//         {
//           where: {
//             id: movieData[i].id,
//           },
//         }
//       );
//     }
//   });

// let url = 'https://www.googleapis.com/youtube/v3/search';
// const genres = [226];

// for (let i = 0; i < genres.length; i++) {
//   movies.update(
//     {
//       genre: '액션',
//     },
//     {
//       where: {
//         id: genres[i],
//       },
//     }
//   );
// }

// for (let i = 0; i < movieData.length; i++) {
//   let movieId = movieData[i].id;
//   let MoviePlot = '';
//   let plot = movieData[i].plot;
//   let plotofCount = plot.length;

//   if (plotofCount > 300) {
//     MoviePlot = plot.substring(0, 301);
//     let lastStr = '';
//     let check_spc = /[.!,(]/;

//     do {
//       lastStr = MoviePlot[MoviePlot.length - 1];
//       MoviePlot = MoviePlot.slice(0, -1);
//     } while (!check_spc.test(lastStr));

//     MoviePlot = MoviePlot + '...';

//     movies.update(
//       {
//         plot: MoviePlot,
//       },
//       {
//         where: {
//           id: movieId,
//         },
//       }
//     );
//   }
// }

// const 스파이더맨이나오는영화 = '스파이더맨이 나오는 영화,';
// const 외계인또는행성탐사 = '외계인 또는 행성 탐사,';
// const 인류멸망시나리오 = '인류 멸망 시나리오,';
// const 크리스토퍼놀란 = '크리스토퍼 놀란';
// const 로버트다우니주니어 = '로버트 다우니 주니어,';
// const 엑스맨시리즈 = '엑스맨 시리즈,';
// const 생존서바이벌 = '생존 서바이벌,';
// const 스칼렛요한슨 = '스칼렛 요한슨,';

// movies.update(
//   {
//     numberOfLikes: 3,
//   },
//   {
//     where: {
//       id: [33, 151, 243],
//     },
//   }
// );

// movies.update(
//   {
//     backgroundImg: JSON.stringify([
//       'nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg',
//       'v3A0T4fAz8xRugAkfUVkxGLd377.jpg',
//     ]),
//   },
//   {
//     where: {
//       id: 24,
//     },
//   }
// );
// 	&times;
// movies
//   .findAll({
//     where: {
//       videoId: {
//         [Sequelize.Op.is]: null,
//       },
//     },
//     raw: true,
//   })
//   .then((datas) => {
//     console.log(datas.length);
//     datas.forEach((movie) => {
//       const title = movie.title;
//       const movieId = movie.id;

//       axios
//         .get(url, {
//           params: {
//             part: 'snippet',
//             key: YOUTUBE_API_KEY,
//             q: `${title} 예고편`,
//             maxResult: 1,
//             type: 'video',
//             videoEmbeddable: true,
//           },
//         })
//         .then(async ({ data }) => {
//           const videoId = await data.items[0].id.videoId;
//           movies.update(
//             {
//               videoId: videoId,
//             },
//             {
//               where: {
//                 id: movieId,
//               },
//             }
//           );
//         });
//     });
//   });
