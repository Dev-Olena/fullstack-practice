const {verifyAccessToken} = require ('../service/tokenService');
const TokenError = require ('../errors/TokenError');

module.exports.checkToken = async (req, res, next) => {
    try {
        const {headers: {authorization}} = req;
        if (!authorization) {
            throw new TokenError('Need authorization')
        };
        const [, token] = authorization.split(' ');
        req.payload = await verifyAccessToken(token);
        next();
    } catch (error) {
        next(error)
    }
};