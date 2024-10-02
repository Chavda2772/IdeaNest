const linkPreview = require('link-preview-extractor');
const createError = require('http-errors')

// Fetch URL Details
module.exports.fetchUrlDetails = (url) => {
    return new Promise(function (resolve, reject) {
        // validate
        if (!url)
            return reject(createError('URL cannot blank'));

        // Checking for actual URL
        try {
            new URL(url);
        } catch (error) {
            return reject(createError('Invalide URL'));
        }

        // Fetch Details By Link Preview
        linkPreview(url)
            .then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
    });
};