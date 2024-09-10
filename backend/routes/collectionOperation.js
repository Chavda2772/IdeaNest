const express = require('express');
const router = express.Router();
const {
  getCollectionDetails,
  CollectionDetailsInsertUpdate,
  deleteCollection,
} = require('../controller/collectionOperation');

// Fetching Collection
router.get('/:id?', async function (req, res, next) {
  try {
    let { id: collectionId } = req.params;
    let { UserId } = req.data;

    // CollectionId to null if not found
    if (collectionId == '0' || !collectionId) collectionId = null;

    let result = await getCollectionDetails({
      collectionId: collectionId,
      userId: UserId,
    });
    res.send({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
});

// Adding collection
router.post('/', async function (req, res, next) {
  try {
    let { collectionName, collectionParentId } = req.body;
    let { UserId } = req.data;

    await CollectionDetailsInsertUpdate({
      collectionId: 0,
      collectionName,
      collectionParentId,
      createdBy: UserId,
    });
    res.send({
      success: true,
      msg: 'Collection added successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Updating collection
router.put('/', async function (req, res, next) {
  try {
    let { collectionId, collectionName } = req.body;
    let { UserId } = req.data;

    await CollectionDetailsInsertUpdate({
      collectionId: collectionId,
      collectionName,
      createdBy: UserId,
    });
    res.send({
      success: true,
      msg: 'Collection updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Delete Collection
router.delete('/:id', async function (req, res, next) {
  try {
    let { id: collectionId } = req.params;

    await deleteCollection({ collectionId: collectionId });

    res.send({
      success: true,
      msg: 'Collection deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
