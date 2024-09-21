var pool = require('../config/mysql.db.js');
const { logger } = require('../config/logger.js');

// Get collection and nest item details
module.exports.getDetails = async (data) => {
    let { collectionId, userId } = data;

    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (!err) {
                conn.query(
                    `call usp_getCollectionAndItemsDetails(?, ?)`,
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

// Insert and Update Collection
module.exports.insertUpdateDetails = async (data) => {
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
                        resolve(!!results.affectedRows);
                    }
                );
            } else {
                logger.error(err);
                reject(err);
            }
        });
    });
};

// Delete collection
module.exports.delete = async (data) => {
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
