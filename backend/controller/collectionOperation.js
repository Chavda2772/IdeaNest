var pool = require('../config/mysql.db.js');
const { logger } = require('../config/logger.js');

module.exports.getCollectionDetails = async (data) => {
  let { collectionId, userId } = data;

  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_getCollectionDetails(?, ?)`,
          [collectionId, userId],
          function (error, results, fields) {
            conn.release();
            if (error) {
              reject(error);
            }
            resolve({ Collection: results[0], Items: results[1] });
          }
        );
      } else {
        logger.error(err);
        reject(err);
      }
    });
  });
};

module.exports.CollectionDetailsInsertUpdate = async (data) => {
  let { collectionId, collectionName, collectionParentId, createdBy } = data;

  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_collectionDetail_IU(?, ?, ?, ?)`,
          [collectionId, collectionName, collectionParentId, createdBy],
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

module.exports.deleteCollection = async (data) => {
  let { collectionId } = data;

  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_deleteCollection(?)`,
          [collectionId],
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
