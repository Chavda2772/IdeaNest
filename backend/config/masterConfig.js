const { getMasterConfigByName } = require('../service/authService');

// Cache master configs 
const masterConfig = {};

module.exports.getMasterConfig = async function (configName, isForce = false) {
    if (Object.keys(masterConfig).includes(configName) && isForce == false)
        return masterConfig[configName]

    // fetch master config
    const configVal = await getMasterConfigByName(configName);

    // Update to master config
    masterConfig[configName] = configVal;

    return configVal;
};