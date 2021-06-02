require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const path = require('path');
const dbConnect = require('./db/config');

const app = express();
const cors = require('cors');

const categoryRouter = require('./routes/category');
const authRouter = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/auth', authRouter);

dbConnect();

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
  console.log("Сервер работает");
});

module.exports = app;
