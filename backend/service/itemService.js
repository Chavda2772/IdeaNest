// Module import
const pool = require('../config/mysql.db.js');
const { logger } = require('../config/logger.js');

// Add Update Item
module.exports.addUpdateNestItem = async (data) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (!err) {
                conn.query(
                    `call usp_nestItem_IU(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        data.id,
                        data.title,
                        data.description,
                        data.url,
                        data.isPreview,
                        data.urlTitle,
                        data.urlImage,
                        data.urlDescription,
                        data.urlDomain,
                        data.parentCollectionId,
                        data.createdBy,
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

// Add Update Item
module.exports.getNestItemDetailsById = async (id) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (!err) {
                conn.query(
                    `call usp_getDetailsByItemId(?)`,
                    [id],
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

// Add Update Item
module.exports.deleteNestItem = async (id, userId) => {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (!err) {
                conn.query(
                    `call usp_deleteNestItem(?, ?)`,
                    [id, userId],
                    function (error, results, fields) {
                        conn.release();
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    }
                );
            } else {
                logger.error(err);
                reject(err);
            }
        });
    });
};
