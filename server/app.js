const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/main');
const models = require('./models/index');
const { movie_title } = require('./controller/movie_title');
const { get_kmdb_naver_APIData } = require('./controller/getAPIData');

app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  })
);

app.use('/main', mainRouter);

models.sequelize
  .sync()
  .then(() => {
    console.log('DB 연결 성공!');
  })
  .catch((err) => {
    console.log('DB 연결 실패ㅠㅠ');
    console.log(err);
  });

const port = 5000;
app.listen(port, () => {
  console.log('server listen on 5000!');
});

// let count = 0;
// var timer = setInterval(function () {
//   console.log(count, movie_title.length);
//   if (count === movie_title.length) {
//     clearInterval(timer);
//     console.log('실행 종료!');
//     return;
//   }
//   movie_title[count].forEach(async (title) => {
//     let movie = await get_kmdb_naver_APIData(title);
//     movie.title === '아바타' ? (movie.userRating = '9.07') : null;
//     movie.title === '스타워즈: 깨어난 포스'
//       ? (movie.userRating = '7.75')
//       : null;
//     movie.title === '맨 프럼 어스' ? (movie.releaseDate = '20070610') : null;

//     models.movies.findOrCreate({
//       where: {
//         title: movie.title,
//       },
//       defaults: {
//         titleEng: movie.title,
//         titleEng: movie.titleEng,
//         director: movie.director,
//         nation: movie.nation,
//         plot: movie.plot,
//         posters: JSON.stringify(movie.posters),
//         actors: JSON.stringify(movie.actors),
//         releaseDate: Number(movie.releaseDate),
//         runtime: movie.runtime,
//         ratingGrade: movie.ratingGrade,
//         userRating: Number(movie.userRating),
//       },
//     });
//   });
//   console.log(count + '번째 성공!');
//   count++;
// }, 1000);
