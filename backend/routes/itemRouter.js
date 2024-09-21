const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const controller = require('../controller/itemController');

// Fetching Nest Item
router.get('/:id', controller.getItemDetails);

// Adding Nest Item
router.post('/', controller.insertItem);

// Updating Nest Item
router.put('/', controller.updateItem);

// Delete Nest Item
router.delete('/:id', controller.deleteItem);

// Route not found
router.post('/', function (req, res, next) {
  next(createError('item route not found'));
});

module.exports = router;
