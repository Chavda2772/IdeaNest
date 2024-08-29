const pool = require('../config/mysql.db.js');
const linkPreview = require('link-preview-js');
const linkPreviewGenerator = require('link-preview-generator');
const { logger } = require('../config/logger.js');
const createError = require('http-errors');

// Add Update Item
addUpdateNestItem = async (data) => {
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
getNestItemDetailsById = async (id) => {
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
deleteNestItem = async (id, userId) => {
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

// Fetch URL Details
fetchUrlDetails = async (url) => {
  return new Promise(async function (resolve, reject) {
    // validate
    if (!url) reject('URL cannot blank');

    // Checking for actual URL
    try {
      new URL(url);
    } catch (error) {
      reject(createError('Invalide URL'));
    }

    // Fetch Details By Link Preview
    generateUrlPreivewDetails(url)
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get URL Details by LinkPreview
getUrlDetailsByLinkPreview = async (url) => {
  return new Promise(function (resolve, reject) {
    linkPreview
      .getLinkPreview(url)
      .then((responseData) => {
        resolve({
          title: responseData.title,
          image: responseData.images[0],
          description: responseData.description ?? '',
          domain: new URL(url)?.host?.replace('www.', ''),
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get URL Details by Link-preview-generator
generateUrlPreivewDetails = async (url) => {
  return new Promise(function (resolve, reject) {
    linkPreviewGenerator(url)
      .then((responseData) => {
        resolve({
          title: responseData.title,
          image: responseData.img,
          description: responseData.description,
          domain: responseData.domain,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  addUpdateNestItem,
  getNestItemDetailsById,
  deleteNestItem,
  fetchUrlDetails,
  getUrlDetailsByLinkPreview,
  generateUrlPreivewDetails,
};
