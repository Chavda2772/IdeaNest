// Packages
const createError = require('http-errors');

// Imports
const userService = require('../service/userService');
const { generateToken } = require('../controller/authController');

// Register User
module.exports.registerUser = async function (req, res, next) {
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
  let isUserExists = await userService.IsUserNameExists(UserName);
  if (isUserExists)
    return res.send({ success: false, msg: 'UserName already exists' });

  try {
    await userService.AddUser({
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
};

// Login User
module.exports.loginUser = async function (req, res, next) {
  try {
    let { Email, Password } = req.body;
    let userData = await userService.GetUserDetails(Email);

    // User found validation
    if (!userData) 
      return res.send({ success: false, msg: 'User not found' });

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
};

// Fetch User Details
module.exports.getDetails = async function (req, res, next) {
  try {
    let { Email } = req.data;
    let userData = await userService.GetUserDetails(Email);

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
};