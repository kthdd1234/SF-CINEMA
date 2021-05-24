const express = require('express');
const app = express();
const cors = require('cors');
const models = require('./models/index');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const backgroundRouter = require('./routes/background');
const moviesRouter = require('./routes/movies');
const searchRouter = require('./routes/search');
const likeRouter = require('./routes/like');
const saveRouter = require('./routes/save');
const exploreRouter = require('./routes/explore');

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

const routers = [
  ['/user', userRouter],
  ['/background', backgroundRouter],
  ['/movies', moviesRouter],
  ['/search', searchRouter],
  ['/like', likeRouter],
  ['/save', saveRouter],
  ['/explore', exploreRouter],
];

routers.forEach((router) => {
  app.use(router[0], router[1]);
});

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
