const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const mainRouter = require('./routes/main');

app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  })
);

app.use('/main', mainRouter);

const port = 5000;
app.listen(port, () => {
  console.log('server listen on 5000!');
});
