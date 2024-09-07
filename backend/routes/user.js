// Packages
const express = require('express');
const createError = require('http-errors');

// Imports
const router = express.Router();
const {
  AddUser,
  GetUserDetails,
  IsUserNameExists,
} = require('../controller/user');
const { generateToken, authenticate } = require('../service/auth');

// Register User
router.post('/register', async function (req, res, next) {
  let {
    UserName,
    FirstName,
    MiddleName,
    LastName,
    Email,
    Password,
    ContactNo,
    Theme,
    ProfileUrl,
  } = req.body;

  // Validate
  if (!UserName || !FirstName || !LastName || !Email || !Password)
    return res.send({ success: false, msg: 'Invalid details' });

  // UserName already Exists
  let isUserExists = await IsUserNameExists(UserName);
  if (isUserExists)
    return res.send({ success: false, msg: 'UserName already exists' });

  try {
    await AddUser({
      UserName,
      FirstName,
      MiddleName,
      LastName,
      Email,
      Password,
      ContactNo,
      Theme,
      ProfileUrl,
    });

    res.send({
      success: true,
      msg: 'User operation success.',
    });
  } catch (error) {
    next(createError('Error in user operation'));
  }
});

// Login User
router.post('/login', async function (req, res, next) {
  try {
    let { Email, Password } = req.body;
    let userData = await GetUserDetails(Email);

    // User found validation
    if (!userData) return res.send({ success: false, msg: 'User not found' });

    // Password verification
    if (Password != userData.Password)
      return res.send({ success: false, msg: 'Invalid Credentials' });

    // Generate JWT Tokken
    let token = await generateToken({
      UserId: userData.UserId,
      Email: userData.Email,
    });

    // Send user details
    return res.send({
      success: true,
      result: {
        UserId: userData.UserId,
        UserName: userData.UserName,
        FirstName: userData.FirstName,
        MiddleName: userData.MiddleName,
        LastName: userData.LastName,
        Email: userData.Email,
        ContactNo: userData.ContactNo,
        Theme: userData.Theme,
        ProfileUrl: userData.ProfileUrl,
      },
      token,
    });
  } catch (error) {
    next(createError('Something went wrong. Try again'));
  }
});

// Fetch User Details
router.post('/getDetails', authenticate, async function (req, res, next) {
  try {
    let { Email } = req.data;
    let userData = await GetUserDetails(Email);

    // Send user details
    return res.send({
      success: true,
      result: {
        UserId: userData.UserId,
        UserName: userData.UserName,
        FirstName: userData.FirstName,
        MiddleName: userData.MiddleName,
        LastName: userData.LastName,
        Email: userData.Email,
        ContactNo: userData.ContactNo,
        Theme: userData.Theme,
        ProfileUrl: userData.ProfileUrl,
      },
    });
  } catch (error) {
    next(createError('Error while getting details.'));
  }
});

router.post('/', function (req, res, next) {
  next(createError('Not Implimanted'));
});

module.exports = router;
