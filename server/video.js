const { movies, User } = require('./models/index');
const axios = require('axios');
const YOUTUBE_API_KEY = '';
const Sequelize = require('sequelize');

let url = 'https://www.googleapis.com/youtube/v3/search';

movies.update(
  {
    backgroundImg: JSON.stringify([
      'bfS76yEsad1hnhCVJhwweIeyaIZ.jpg',
      'jvUKejL9uZtI0yi2aoQZ2oykRTA.jpg',
    ]),
  },
  {
    where: {
      id: 33,
    },
  }
);
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
