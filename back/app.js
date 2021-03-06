require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const logger = require('morgan');
const path = require('path');
const dbConnect = require('./db/config');

const app = express();
const cors = require('cors');

const categoryRouter = require('./routes/category');
const worksRouter = require('./routes/works');
const authRouter = require('./routes/auth');
const searchRouter = require('./routes/search');
const favouritesRouter = require('./routes/favourites');
const artistsRouter = require('./routes/artists');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/works', worksRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/favourites', favouritesRouter);
app.use('/api/v1/artists', artistsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/orders', ordersRouter);

dbConnect();

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
  console.log("Сервер работает");
});
module.exports = app;
