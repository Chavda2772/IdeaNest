var pool = require('../config/mysql.db.js');
const { logger } = require('../config/logger.js');

// Add Update User Details
module.exports.AddUser = async (data) => {
  let {
    userName,
    firstName,
    middleName,
    lastName,
    email,
    password,
    contactNo,
    theme,
    profileUrl,
  } = data;

  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_UserDetails_UI(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            null,
            userName,
            firstName,
            middleName,
            lastName,
            email,
            password,
            contactNo,
            theme,
            profileUrl,
          ],
          function (error, results, fields) {
            conn.release();
            if (error) {
              reject(error);
            }
            resolve(results[0]);
          }
        );
      } else {
        logger.error(err);
        reject(err);
      }
    });
  });
};

// Add Update User Details
module.exports.UpdateUser = async (data) => {
  let {
    userId,
    userName,
    firstName,
    middleName,
    lastName,
    email,
    password,
    contactNo,
    theme,
    profileUrl,
  } = data;

  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_UserDetails_UI(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            userName,
            firstName,
            middleName,
            lastName,
            email,
            password,
            contactNo,
            theme,
            profileUrl,
          ],
          function (error, results, fields) {
            conn.release();
            if (error) {
              reject(error);
            }
            resolve(results[0]);
          }
        );
      } else {
        logger.error(err);
        reject(err);
      }
    });
  });
};

// Fetching User Details
module.exports.GetUserDetails = async (email) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_getUserDetailsByEmail(?)`,
          [email],
          function (error, results, fields) {
            conn.release();
            if (error) {
              reject(error);
            }
            resolve(results[0][0]);
          }
        );
      } else {
        logger.error(err);
        reject(err);
      }
    });
  });
};
