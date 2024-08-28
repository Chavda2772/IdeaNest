const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const secret = 'Mahesh';
const tokenExpireMinutes = 60;

async function generateToken(user) {
  return jwt.sign({ data: user }, secret, {
    expiresIn: tokenExpireMinutes * 60,
  });
}

function authenticate(req, res, next) {
  const token = req.header('Authorization');

  // Token check
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: 'Authorization token is required',
    });
  }

  // validate token
  try {
    const parsedText = token.split(' ')[1];
    const decoded = jwt.verify(parsedText, secret);
    const _request = req;
    _request.data = decoded.data;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorization',
    });
  }
}

module.exports = {
  generateToken,
  authenticate,
};
