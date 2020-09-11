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
//             api_key: 'a3f2dd845f961cc6ea8d04c944383159',
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

// movies.create({
//   title: '토르: 라그나로크',
//   titleEng: 'Thor: Ragnarok',
//   genre: '슈퍼 히어로',
//   director: '타이카 와이티티',
//   plot:
//     '은하계를 탐험하던 토르는 오딘의 오랜 숙적 수르트와의 대결에서 승리하는데, 수르트는 라그나로크가 이미 시작됐고, 막을 수 없을 것이라는 의미심장한 말을 남긴다. 한편 오딘의 힘이 약해지며 그가 봉인했던 죽음의 여신 헬라가 나타난다. 오딘의 첫째딸인 그녀는 두 동생, 토르와 로키를 가볍게 제압하고 아스가르드를 정복한다. 헬라와의 전쟁에서 묠니르를 잃고 사카아르라는 미지의 행성에 불시착한 토르는 아스가르드 행성으로 돌아가기 위해 고군분투한다. 행성의 통치자 그랜드 마스터는 행성 최고의 투사 챔피언과 싸워 이기면 행성을 떠나게 해주겠다고 토르에게 제안한다.',
//   posters: '/jwswXltzpGaKZCtz1CiDjXHQYAs.jpg',
//   nation: '미국',
//   actors: JSON.stringify([
//     '크리스 햄스워스',
//     '마크 러팔로',
//     '톰 히들스턴',
//     '케이트 블란쳇',
//   ]),
//   releaseDate: 20171025,
//   runtime: '2시간 10분',
//   ratingGrade: '12세 관람가',
//   userRating: 9.03,
//   videoId: 'pxR6cKkPzNo',
//   seriesName: '토르',
//   backDrop: '/6G2fLCVm9fiLyHvBrccq6GSe2ih.jpg',
//   backgroundImg: JSON.stringify([
//     '6G2fLCVm9fiLyHvBrccq6GSe2ih.jpg',
//     'wBzMnQ01R9w58W6ucltdYfOyP4j.jpg',
//   ]),
// });

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
