var express = require('express');
var linkPreview = require('link-preview-js');
var router = express.Router();

router.get('/', function (req, res, next) {
  var { name } = req.query;

  res.json({
    success: true,
    msg: 'GET - ' + name,
  });
});

/* Post home page. */
router.post('/', function (req, res, next) {
  var { name } = req.body;

  res.json({
    success: true,
    msg: 'POST - ' + name,
  });
});

router.post('/generate', async function (req, res, next) {
  try {
    var { url } = req.body;
    var responseData = await linkPreview.getLinkPreview(url);

    res.json({
      success: true,
      ...responseData,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
