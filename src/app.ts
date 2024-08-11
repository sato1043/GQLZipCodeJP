import express from 'express';
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import indexRouter from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

export default app;
