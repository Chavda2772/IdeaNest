const linkPreviewGenerator = require('../third_party/link-preview-generator');
const createError = require('http-errors')

// Fetch URL Details
module.exports.fetchUrlDetails = async (url) => {
    return new Promise(async function (resolve, reject) {
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
        try {
            let data = await linkPreviewGenerator(url)
            resolve(data);
        } catch (error) {
            reject({ error: 'Failed to fetch preview data' });
        }
    });
};