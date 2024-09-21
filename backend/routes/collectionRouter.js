const express = require('express');
const router = express.Router();
const controller = require('../controller/collectionController');

// Fetching Collection
router.get('/:id?', controller.getCollectionDetail);

// Adding collection
router.post('/', controller.insertCollectionDetail);

// Updating collection
router.put('/', controller.updateCollection);

// Delete Collection
router.delete('/:id', controller.deleteCollection);

// Route not found
router.post('/', function (req, res, next) {
  next(createError('collection route not found'));
});

module.exports = router;
