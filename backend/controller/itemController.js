// Third party
const createError = require('http-errors');


// imports
const itemService = require('../service/itemService');
const { fetchUrlDetails } = require('../common/utilityFunction')

// Fetching Nest Item
module.exports.getItemDetails = async function (req, res, next) {
  try {
    let { id: itemId } = req.params;

    // validate nest item ID
    if (!itemId)
      return res.send({
        success: false,
        msg: "Invalid details"
      })

    let result = await itemService.getNestItemDetailsById(itemId);
    res.send({
      success: true,
      result: result ?? {},
    });
  } catch (error) {
    next(error);
  }
};

// Adding Nest Item
module.exports.insertItem = async function (req, res, next) {
  try {
    let { Title, Description, Url, ParentCollectionId } = req.body;
    let { UserId } = req.data;

    // Data Validation
    if (!Title || !Description)
      return res.send({
        success: false,
        msg: "Invalid details"
      })

    // Default details
    let isPreview = false,
      urlTitle = null,
      urlImage = null,
      urlDescription = null,
      urlDomain = null;

    // Parent collection ID null
    ParentCollectionId = ParentCollectionId ?? null;

    // Fetch URL Details
    if (Url) {
      let urlDetail = await fetchUrlDetails(Url);
      if (urlDetail) {
        isPreview = true;
        urlTitle = urlDetail.title;
        urlImage = urlDetail.image;
        urlDescription = urlDetail.description;
        urlDomain = urlDetail.domain;
      }
    }

    await itemService.addUpdateNestItem({
      id: null,
      title: Title,
      description: Description,
      url: Url,
      isPreview,
      urlTitle,
      urlImage,
      urlDescription,
      urlDomain,
      parentCollectionId: ParentCollectionId,
      createdBy: UserId,
    });
    res.send({
      success: true,
      msg: 'Nest item added successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Updating Nest Item
module.exports.updateItem = async function (req, res, next) {
  try {
    let { Id, Title, Description, Url } = req.body;
    let { UserId } = req.data;

    // Data Validation
    if (!Id || !Title || !Description)
      return res.send({
        success: false,
        msg: "Invalid details"
      })

    // Fetch URL From Database
    let nestItemDetails = await itemService.getNestItemDetailsById(Id);

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
    if (Url && nestItemDetails.Url != Url) {
      let urlDetail = await fetchUrlDetails(Url);
      if (urlDetail) {
        isPreview = true;
        urlTitle = urlDetail.title;
        urlImage = urlDetail.image;
        urlDescription = urlDetail.description;
        urlDomain = urlDetail.domain;
      }
    }

    await itemService.addUpdateNestItem({
      id: Id,
      title: Title,
      description: Description,
      url: Url,
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
};

// Delete Nest Item
module.exports.deleteItem = async function (req, res, next) {
  try {
    let { id } = req.params;
    let { UserId } = req.data;

    await itemService.deleteNestItem(id, UserId);
    res.send({
      success: true,
      msg: 'Nest item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};