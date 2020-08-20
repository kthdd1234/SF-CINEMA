require('dotenv').config();

const Sequelize = require('sequelize');
const { movies } = require('./models/index');
const axios = require('axios');
const searchMovieUrl = 'https://api.themoviedb.org/3/search/movie';

movies
  .findAll({
    raw: true,
  })
  .then((movieData) => {
    for (let i = 0; i < movieData.length; i++) {
      let movieId = movieData[i].id;
      let titleEng = movieData[i].titleEng;

      axios
        .get(searchMovieUrl, {
          params: {
            api_key: process.env.TMDB_API_KEY,
            query: titleEng,
            page: 1,
            language: 'ko',
          },
        })
        .then(({ data }) => {
          const plot = data.results[0].overview;
          let MoviePlot = '';
          let plotOfCount = plot.length;

          if (plotOfCount > 300) {
            MoviePlot = plot.substring(0, 301);
            let lastStr = '';
            let check_spc = /[.!,(]/;

            do {
              lastStr = MoviePlot[MoviePlot.length - 1];
              MoviePlot = MoviePlot.slice(0, -1);
            } while (!check_spc.test(lastStr));

            MoviePlot = MoviePlot + '...';

            movies.update(
              {
                plot: MoviePlot,
              },
              {
                where: {
                  id: movieId,
                },
              }
            );
          } else {
            movies.update(
              {
                plot: plot,
              },
              {
                where: {
                  id: movieId,
                },
              }
            );
          }
        })
        .catch((err) => {
          console.log(movieData[i].title);
        });
    }
  });

// movies
//   .findAll({
//     where: {
//       backDrop: {
//         [Sequelize.Op.is]: null,
//       },
//     },
//     raw: true,
//   })
//   .then((movieData) => {
//     movieData.forEach((movie) => {
//       const movieId = movie.id;
//       const titleEng = movie.titleEng;
//       axios
//         .get(searchMovieUrl, {
//           params: {
//             api_key: process.env.TMDB_API_KEY,
//             query: movie.title,
//             page: 1,
//             language: 'ko',
//           },
//         })
//         .then(({ data }) => {
//           const backDrop = data.results[0].backdrop_path;
//           movies.update(
//             {
//               backDrop: backDrop,
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

// const findIds = [6];

// movies
//   .findAll({
//     where: {
//       id: findIds,
//     },
//     raw: true,
//   })
//   .then((moviesData) => {
//     moviesData.forEach((movie) => {
//       const movieTitleEng = movie.titleEng;
//       const movieId = movie.id;
//       axios
//         .get(searchMovieUrl, {
//           params: {
//             api_key: process.env.TMDB_API_KEY,
//             query: movieTitleEng,
//             page: 1,
//           },
//         })
//         .then(async ({ data }) => {
//           const imgId = await data.results[0].id;
//           const imgUrl = `https://api.themoviedb.org/3/movie/${imgId}/images`;

//           axios
//             .get(imgUrl, {
//               params: {
//                 api_key: process.env.TMDB_API_KEY,
//               },
//             })
//             .then(async ({ data }) => {
//               const posters = await data.posters.map((obj) => {
//                 return 'https://image.tmdb.org/t/p/w500' + obj.file_path;
//               });
//               const convertJSON = JSON.stringify(posters);
//               await movies.update(
//                 { posters: convertJSON },
//                 {
//                   where: {
//                     id: movieId,
//                   },
//                 }
//               );
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         });
//     });
//   });
