// Third party
const linkPreview = require('link-preview-js');
const linkPreviewGenerator = require('link-preview-generator');
const createError = require('http-errors');


// imports
const itemService = require('../service/itemService');

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

// *****************
// Helper functions
// *****************

// Fetch URL Details
fetchUrlDetails = async (url) => {
  return new Promise(async function (resolve, reject) {
    // validate
    if (!url) reject('URL cannot blank');

    // Checking for actual URL
    try {
      new URL(url);
    } catch (error) {
      reject(createError('Invalide URL'));
    }

    // Fetch Details By Link Preview
    generateUrlPreivewDetails(url)
      .then((responseData) => {
        resolve(responseData);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get URL Details by LinkPreview
getUrlDetailsByLinkPreview = async (url) => {
  return new Promise(function (resolve, reject) {
    linkPreview
      .getLinkPreview(url)
      .then((responseData) => {
        resolve({
          title: responseData.title,
          image: responseData.images[0],
          description: responseData.description ?? '',
          domain: new URL(url)?.host?.replace('www.', ''),
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get URL Details by Link-preview-generator
generateUrlPreivewDetails = async (url) => {
  return new Promise(function (resolve, reject) {
    linkPreviewGenerator(url)
      .then((responseData) => {
        resolve({
          title: responseData.title,
          image: responseData.img,
          description: responseData.description,
          domain: responseData.domain,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};