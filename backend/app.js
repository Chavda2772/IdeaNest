var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser')

// Routes
var indexRouter = require('./routes/index');

// Application configuration
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    success: false,
    msg: 'error',
  });
});

module.exports = app;
