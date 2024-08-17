var express = require('express');
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

module.exports = router;
