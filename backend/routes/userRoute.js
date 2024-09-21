// Packages
const express = require('express');
const createError = require('http-errors');

// Imports
const router = express.Router();
const userController = require('../controller/userController');
const { authenticate } = require('../controller/authController');

// Register User
router.post('/register', userController.registerUser);

// Login User
router.post('/login', userController.loginUser);

// Fetch User Details
router.post('/getDetails', authenticate, userController.getDetails);

// Not Implimanted route
router.post('/', function (req, res, next) {
  next(createError('user route not found'));
});

module.exports = router;
