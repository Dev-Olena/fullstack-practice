const {verifyAccessToken} = require ('../service/tokenService');
const AuthError = require ('../errors/AuthError');

module.exports.checkToken = async (req, res, next) => {
    try {
        const {headers: {authorization}} = req;
        if (!authorization) {
            throw new AuthError('Need authorization')
        };
        const [, token] = authorization.split(' ');
        req.payload = await verifyAccessToken(token);
        console.log(req.payload);
        next();
    } catch (error) {
        next(error)
    }
};