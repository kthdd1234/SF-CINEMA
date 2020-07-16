const { movies } = require('../models/index');
const { movie_title } = require('./movie_title');
const { get_kmdb_naver_APIData } = require('./getAPIData');

let count = 0;
var timer = setInterval(function () {
  movie_title[count].forEach((title) => {
    if (count > movie_title.length) {
      clearInterval(timer);
      console.log('실행 종료!');
      return;
    }
    let movie = get_kmdb_naver_APIData(title);
    movies.findOrCreate({
      where: {
        title: movie.title,
      },
      titleEng: movie.title,
      titleEng: movie.titleEng,
      director: movie.director,
      nation: movie.nation,
      plot: movie.plot,
      posters: JSON.stringify(movie.posters),
      actors: JSON.stringify(movie.actors),
      releaseDate: movie.releaseDate,
      runtime: movie.runtime,
      ratingGrade: movie.ratingGrade,
      userRating: movie.userRating,
    });
  });
  console.log(count + '번째 성공!');
  count++;
}, 1000);
