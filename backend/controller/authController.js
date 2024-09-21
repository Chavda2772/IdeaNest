// Third party
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// imports
const { getMasterConfig } = require("../config/masterConfig")
const Enums = require('../config/Enums')

// Configs
const saltRounds = 10;

// JWT
module.exports.generateToken = async function (user) {
    const tokenSecret = await getMasterConfig(Enums.masterConfigId.tokenSecret);
    const expireTime = await getMasterConfig(Enums.masterConfigId.tokenExpireTime);

    return jwt.sign({ data: user }, tokenSecret, {
        expiresIn: expireTime * 60,
    });
}

module.exports.authenticate = async function (req, res, next) {
    const token = req.header('Authorization');
    const tokenSecret  = await getMasterConfig(Enums.masterConfigId.tokenSecret);

    // Token check
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: 'Authorization token is required',
        });
    }

    // validate token
    try {
        const parsedText = token.split(' ')[1];
        const decoded = jwt.verify(parsedText, tokenSecret);
        req.data = decoded.data;

        return next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: 'Unauthorization',
        });
    }
}

// BCRYPT
module.exports.generateHashPassword = async function (plainTextPassword) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(plainTextPassword, saltRounds, function (err, hash) {
            if (err) return reject(err)
            return resolve(hash)
        });
    });
}

module.exports.comparePassword = async function (plainTextPassword, hashPassword) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(plainTextPassword, hashPassword, function (err, result) {
            if (err) return reject(err)
            return resolve(result)
        });
    });
}
