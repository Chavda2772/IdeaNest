var pool = require('../config/mysql.db.js');
const { logger } = require('../config/logger.js');

module.exports.getMasterConfigByName = async function (configName) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (!err) {
        conn.query(
          `call usp_getConfigValueByName(?);`,
          [configName],
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
}