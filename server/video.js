const { movies, User } = require('./models/index');
const axios = require('axios');
const YOUTUBE_API_KEY = '';
const Sequelize = require('sequelize');

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
//     backDrop: '/hTDAWiohFTwJaKNcCNlsKs64bip.jpg',
//   },
//   {
//     where: {
//       id: 226,
//     },
//   }
// );

// movies.update(
//   {
//     backgroundImg: JSON.stringify([
//       'pbrkL804c8yAv3zBZR4QPEafpAR.jpg',
//       'rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
//       'pZvZjxPFfWWIwtPQodsNygQ6u5Z.jpg',
//     ]),
//   },
//   {
//     where: {
//       id: 2,
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
