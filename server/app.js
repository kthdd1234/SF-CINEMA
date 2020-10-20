const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const recommendationRouter = require('./routes/recommendation');
const backgroundRouter = require('./routes/background');
const contentsRouter = require('./routes/contents');
const searchRouter = require('./routes/search');
const genreRouter = require('./routes/genre');
const seriesRouter = require('./routes/series');
const likeRouter = require('./routes/like');
const saveRouter = require('./routes/save');
const models = require('./models/index');

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use('/user', userRouter);
app.use('/background', backgroundRouter);
app.use('/recommendation', recommendationRouter);
app.use('/contents', contentsRouter);
app.use('/search', searchRouter);
app.use('/genre', genreRouter);
app.use('/series', seriesRouter);
app.use('/like', likeRouter);
app.use('/save', saveRouter);

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
