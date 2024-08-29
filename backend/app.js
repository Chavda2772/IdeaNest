const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { logger } = require('./config/logger.js');
const { authenticate } = require('./service/auth.js');

// Enviroment Config
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const collectionRoute = require('./routes/collectionOperation.js');
const itemOperationRoute = require('./routes/itemOperation.js');
const { error } = require('console');

// Application configuration
logger.info('Configure Application settings.');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes
app.use('/api/user', userRouter);
app.use('/api/collection', authenticate, collectionRoute);
app.use('/api/items', authenticate, itemOperationRoute);
app.use('/api/', indexRouter);
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  logger.error(err.message, err);
  res.status(err.status || 500);
  res.json({
    success: false,
    msg: err.message,
  });
});

module.exports = app;
