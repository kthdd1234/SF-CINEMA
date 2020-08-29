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

// movies.create({
//   title: '인크레더블 2',
//   titleEng: 'Incredibles 2',
//   genre: '슈퍼히어로',
//   director: '브래드 버드',
//   plot:
//     '슈퍼맘 헬렌이 국민 히어로 일라스티걸로 활약하며 세상의 주목을 받자 바쁜 아내의 몫까지 집안일을 하기 위해 육아휴직을 낸 아빠 밥은 질풍노도 시기의 딸 바이올렛, 자기애가 넘치는 아들 대쉬, 어마무시한 능력을 시도때도 없이 방출하는 막내 잭잭까지 전담하며 전쟁같은 하루하루를 보낸다. 그러던 어느 날, 각자의 위치에서 바쁜 일상을 보내던 슈퍼파워 가족 앞에 새로운 악당이 나타났다! 다시 한번 세상을 구하기 위해 나선 가족은 인크레더블한 능력을 발휘할 수 있을까?',
//   posters: JSON.stringify([
//     'https://image.tmdb.org/t/p/w500/eLayVsrnIScNuZRjEiMeJo5Z0Ly.jpg',
//   ]),
//   nation: '미국',
//   actors: JSON.stringify([
//     '크레이그 T.넬슨',
//     '홀리 헌터',
//     '사무엘 L.잭슨',
//     '사라 보웰',
//   ]),
//   releaseDate: 20180718,
//   runtime: '2시간 5분',
//   ratingGrade: '전체 관람가',
//   userRating: 9.23,
//   videoId: 'zON6Mu9_PC0',
//   backDrop: '/mabuNsGJgRuCTuGqjFkWe1xdu19.jpg',
//   keywords: '애니메이션',
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

// movies.update(
//   {
//     keywords: '외계인 또는 행성 탐사',
//   },
//   {
//     where: {
//       id: [2, 5, 13, 14, 8, 21, 22, 23, 24, 26, 28, 29, 31, ],
//     },
//   }
// );

// const 스파이더맨이나오는영화 = '스파이더맨이 나오는 영화,';
// const 외계인또는행성탐사 = '외계인 또는 행성 탐사,';
// const 인류멸망시나리오 = '인류 멸망 시나리오,';
// const 크리스토퍼놀란 = '크리스토퍼 놀란';
// const 로버트다우니주니어 = '로버트 다우니 주니어,';
// const 엑스맨시리즈 = '엑스맨 시리즈,';
// const 생존서바이벌 = '생존 서바이벌,';
// const 스칼렛요한슨 = '스칼렛 요한슨,';

movies.update(
  {
    posters: '/sACyPxUbc9FVR2LTTjjU6wA3Hdd.jpg',
    titleEng: 'El hoyo',
  },
  {
    where: {
      id: 43,
    },
  }
);

// movies.update(
//   {
//     backgroundImg: JSON.stringify([
//       'w4ZYFLJbiqZyvCcGHgvaHD6lTqQ.jpg',
//       'qdd5lrgBYL4fMSwYAhfLUwdJRu1.jpg',
//     ]),
//   },
//   {
//     where: {
//       id: 175,
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
