// https://image.tmdb.org/t/p/w500/FBfA7V41ezvP1UTx9BTUS2BLsq.jpg

const { movies } = require('./models/index');
const axios = require('axios');
const searchMovieUrl = 'https://api.themoviedb.org/3/search/movie';

const findIds = [6];

movies
  .findAll({
    where: {
      id: findIds,
    },
    raw: true,
  })
  .then((moviesData) => {
    moviesData.forEach((movie) => {
      const movieTitleEng = movie.titleEng;
      const movieId = movie.id;
      axios
        .get(searchMovieUrl, {
          params: {
            api_key: '',
            query: movieTitleEng,
            page: 1,
          },
        })
        .then(async ({ data }) => {
          const imgId = await data.results[0].id;
          const imgUrl = `https://api.themoviedb.org/3/movie/${imgId}/images`;

          axios
            .get(imgUrl, {
              params: {
                api_key: '',
              },
            })
            .then(async ({ data }) => {
              const posters = await data.posters.map((obj) => {
                return 'https://image.tmdb.org/t/p/w500' + obj.file_path;
              });
              const convertJSON = JSON.stringify(posters);
              await movies.update(
                { posters: convertJSON },
                {
                  where: {
                    id: movieId,
                  },
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        });
    });
  });

//   const findIds = [
//     31,
//     155,
//     99,
//     157,
//     172,
//     86,
//     84,
//     188,
//     61,
//     114,
//     18,
//     19,
//     33,
//     126,
//     192,
//     97,
//     53,
//   ];
