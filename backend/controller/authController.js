const jwt = require('jsonwebtoken');
const tokenSecret = "WZhgQujPmWmjY76rxM77aSvpQMrpo8ZXNpcZFFMXdWJt2BfsdfNjF4PN0N4mDaVstGP58F4auFzeC";
const tokenExpireTime = 60;

module.exports.generateToken = async function (user) {
    return jwt.sign({ data: user }, tokenSecret, {
        expiresIn: tokenExpireTime * 60,
    });
}

module.exports.authenticate = function (req, res, next) {
    const token = req.header('Authorization');

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
