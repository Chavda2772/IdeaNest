const router = require('express').Router();

// Route not found
router.post('/', function (req, res, next) {
  next(createError('route not found'));
});

module.exports = router;
