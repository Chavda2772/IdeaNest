const createError = require('http-errors');
const router = require('express').Router();
const {
  generateUrlPreivewDetails,
  getUrlDetailsByLinkPreview,
} = require('../controller/itemOperation');

// Fetching Collection
router.post('/generate', async function (req, res, next) {
  try {
    let { url } = req.body;
    let response = await generateUrlPreivewDetails(url);
    res.send({
      success: true,
      result: response ?? {},
    });
  } catch (error) {
    next(error);
  }
});

// Fetching Collection
router.post('/generateLite', async function (req, res, next) {
  try {
    let { url } = req.body;
    let response = await getUrlDetailsByLinkPreview(url);
    res.send({
      success: true,
      result: response ?? {},
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
