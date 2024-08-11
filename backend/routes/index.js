var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var { name } = req.body;

  res.json({
    success: true,
    msg: 'Welcome, ' + name,
  });
});

module.exports = router;
