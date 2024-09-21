const collectionService = require('../service/collectionService');

// Fetching Collection
module.exports.getCollectionDetail = async function (req, res, next) {
  try {
    let { id: CollectionId } = req.params;
    let { UserId } = req.data;

    // CollectionId to null if not found
    if (CollectionId == '0' || !CollectionId) CollectionId = null;

    let result = await collectionService.getDetails({
      collectionId: CollectionId,
      userId: UserId,
    });
    res.send({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// Adding collection
module.exports.insertCollectionDetail = async function (req, res, next) {
  try {
    let { CollectionName, CollectionParentId } = req.body;
    let { UserId } = req.data;

    if (!CollectionName)
      return res.send({
        success: false,
        msg: "Invalid details"
      })

    await collectionService.insertUpdateDetails({
      collectionId: 0,
      collectionName: CollectionName,
      collectionParentId: CollectionParentId,
      createdBy: UserId,
    });
    res.send({
      success: true,
      msg: 'Collection added successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Updating collection
module.exports.updateCollection = async function (req, res, next) {
  try {
    let { CollectionId, CollectionName } = req.body;
    let { UserId } = req.data;

    if (!CollectionName || !CollectionId)
      return res.send({
        success: false,
        msg: "Invalid details"
      })
    
    await collectionService.insertUpdateDetails({
      collectionId: CollectionId,
      collectionName: CollectionName,
      createdBy: UserId,
    });
    res.send({
      success: true,
      msg: 'Collection updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Delete Collection
module.exports.deleteCollection = async function (req, res, next) {
  try {
    let { id: CollectionId } = req.params;

    if (!CollectionId)
      return res.send({
        success: false,
        msg: "Invalid details"
      })

    await collectionService.delete({ collectionId: CollectionId });

    res.send({
      success: true,
      msg: 'Collection deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};