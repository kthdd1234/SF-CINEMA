const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const models = require('./models/index');

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use('/main', mainRouter);
app.use('/user', userRouter);

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

// models.movies
//   .findAll({
//     where: {
//       title: {
//         [Op.like]: '%' + '' + '%',
//       },
//     },
//     attributes: ['title'],
//     raw: true,
//   })
//   .then((movie) => {
//     let titleList = movie.map((obj) => {
//       return obj.title;
//     });
//     for (let i = 0; i < titleList.length; i++) {
//       models.movies.update(
//         { seriesName: '' },
//         { where: { title: titleList[i] } }
//       );
//     }
//   });

// models.movies.update(
//   {
//     posters: JSON.stringify([
//       'https://mblogthumb-phinf.pstatic.net/MjAxOTAzMTFfMTAw/MDAxNTUyMzA5MzAxNzEw.fhlDop4dwmBFr3P0xmX3Y4pXlMD8bklIfcWa1Wg_rMYg.FGIm6a6vXCrvxpyP2QtfvaEwcfXBuDuWsPFP1-OXywcg.JPEG.bonbonfd/%EC%84%B8%EB%A0%88%EB%8B%88%ED%8B%B0.jpg?type=w800',
//     ]),
//   },
//   { where: { title: '세레니티' } }
// );

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

// models.movies.create({
//   title: '에이리언 1',
// title: '에이리언',
//     titleEng: 'Alien',
//     director: '리들리 스콧',
//     nation: '미국',
//     plot:
//       '우주 화물선 노스트로모호(The Nostromo). 외계에서 귀중한 광물과 자원을 나르는 이 거대한 우주선에는 승무원 7명과 광석 2000만톤의 화물을 싣고 지구로 귀환 중이다. 인공 동면을 취하고 있던 대원들은 서서히 프로그램된 컴퓨터에 의해 잠에서 깨어나는데 이들 중엔 2등 항해사인 엘렌 리플리(Ellen Ripley: 시고니 위버 분)도 있다. 혹성 LA-426 옆을 지날 때, 지적 생명체의 것으로 보이는 발신파를 포착한다. 이에 그녀는 승무원을 깨우고 혹성 탐사를 위해 3명의 승무원을 급파한다. 이 이상한 발신원은 거대하고 정체 불명의 우주선이었으나 우주선은 이미 오래전에 파괴되어 썩고 있었으며 탑승 승무원들은 모두 미이라로 변해 있었다. 사고 원인을 찾기위해 좀 더 안으로 들어간 조사반은 여기저기에서 계란 모양의 물체이 있는 산란실을 발견하고 궁금증을 갖는다. 그 중 캐인이 공격을 받고 실신한다. 이 궁금증을 풀기 위하여 실험을 하던 케인은 물체에 충격을 가하고 그 순간 물체로부터 작은 생물이 튀어나와 마스크를 녹이고 케인의 얼굴에 철썩 달라 붙는다. 이들은 이 외계생물이 인간세포로부터 양분을 빨아고 기생하는 존재임을 알게 되는데...',
//     posters:
//       'https://movie.naver.com/movie/bi/mi/photoViewPopup.nhn?movieCode=163813',
//     actors: JSON.stringify(['톰 스커릿', '시고니 위버', '베로니카 캣라이트']),
//     releaseDate: 19871001,
//     runtime: '120',
//     ratingGrade: '15세 관람가',
//     userRating: 9.11,
// });
