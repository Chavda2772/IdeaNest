const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const {
  addUpdateNestItem,
  getNestItemDetailsById,
  fetchUrlDetails,
  deleteNestItem,
  generateUrlPreivewDetails,
} = require('../controller/itemOperation');

// Fetching Collection
router.get('/:id', async function (req, res, next) {
  try {
    let { id: itemId } = req.params;

    // CollectionId to null if not found
    if (!itemId) createError('Invalid Details');

    let result = await getNestItemDetailsById(itemId);
    res.send({
      success: true,
      result: result ?? {},
    });
  } catch (error) {
    next(error);
  }
});

// Adding collection
router.post('/', async function (req, res, next) {
  try {
    let { title, description, url, parentCollectionId } = req.body;
    let { UserId } = req.data;

    // Data Validation
    if (!title || !description) next(createError('Invalid details'));

    // Default details
    let isPreview = false,
      urlTitle = null,
      urlImage = null,
      urlDescription = null,
      urlDomain = null;

    // Parent collection ID null
    parentCollectionId = parentCollectionId ?? null;

    // Fetch URL Details
    if (url) {
      let urlDetail = await generateUrlPreivewDetails(url);
      if (urlDetail) {
        isPreview = true;
        urlTitle = urlDetail.title;
        urlImage = urlDetail.image;
        urlDescription = urlDetail.description;
        urlDomain = urlDetail.domain;
      }
    }

    await addUpdateNestItem({
      id: null,
      title: title,
      description: description,
      url,
      isPreview,
      urlTitle,
      urlImage,
      urlDescription,
      urlDomain,
      parentCollectionId,
      createdBy: UserId,
    });
    res.send({
      success: true,
      msg: 'Nest item added successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Updating collection
router.put('/', async function (req, res, next) {
  try {
    let { id, title, description, url } = req.body;
    let { UserId } = req.data;

    // Data Validation
    if (!id || !title || !description) next(createError('Invalid details'));

    // Fetch URL From Database
    let nestItemDetails = await getNestItemDetailsById(id);

    // return if not data found for update
    if (!nestItemDetails) {
      next(createError('No data found for update'));
      return;
    }

    // Default details
    let isPreview = nestItemDetails?.IsPreview[0],
      urlTitle = nestItemDetails.UrlTitle,
      urlImage = nestItemDetails.UrlImage,
      urlDescription = nestItemDetails.UrlDescription,
      urlDomain = nestItemDetails.UrlDomain;

    // Fetch URL Details
    if (url && nestItemDetails.Url != url) {
      let urlDetail = await fetchUrlDetails(url);
      if (urlDetail) {
        isPreview = true;
        urlTitle = urlDetail.title;
        urlImage = urlDetail.image;
        urlDescription = urlDetail.description;
        urlDomain = urlDetail.domain;
      }
    }

    await addUpdateNestItem({
      id: id,
      title: title,
      description: description,
      url,
      isPreview,
      urlTitle,
      urlImage,
      urlDescription,
      urlDomain,
      createdBy: UserId,
    });
    res.send({
      success: true,
      msg: 'Nest item updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

// Delete Collection
router.delete('/:id', async function (req, res, next) {
  try {
    let { id } = req.params;
    let { UserId } = req.data;

    await deleteNestItem(id, UserId);
    res.send({
      success: true,
      msg: 'Nest item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
