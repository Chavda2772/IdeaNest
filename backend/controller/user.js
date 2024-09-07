var pool = require('../config/mysql.db.js');
const { logger } = require('../config/logger.js');

// Add Update User Details
module.exports.AddUser = async (data) => {
  let { UserName, FirstName, MiddleName, LastName, Email, Password, ContactNo, Theme, ProfileUrl } = data;

  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }

      conn.query(
        `call usp_userDetails_UI(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [null, UserName, FirstName, MiddleName, LastName, Email, Password, ContactNo, Theme, ProfileUrl],
        function (error, results, fields) {
          conn.release();
          if (error) {
            reject(error);
          }
          resolve(results[0]);
        }
      );
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
          `call usp_userDetails_UI(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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

// Check UserName already Exits
module.exports.IsUserNameExists = async (username) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_getUserNameCount(?)`,
          [username],
          function (error, results, fields) {
            conn.release();
            if (error) {
              reject(error);
            }
            resolve(results[0][0]?.UserNameCount > 0);
          }
        );
      } else {
        logger.error(err);
        reject(err);
      }
    });
  });
};
