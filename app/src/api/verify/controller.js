const {verifyTokenObject} = require('./lib/scheme');
const HttpStatus = require('http-status-codes');
const {ApiVerifyBoundleError} = require('./exception');

/**
 * Verify token
 *
 * @param ctx
 * @param next
 * @throws ApiBoundleError
 * @returns {Promise.<void>}
 */
const verifyToken = async (ctx, next) => {

    const token = ctx.request.header['x-access-token']
        || ctx.request.body.token || ctx.params.token || ctx.query.token;

    if (token) {
        try {
            const verifyObject = await verifyTokenObject(token);
            ctx.body = {
                status: HttpStatus.OK,
                message: {
                    uid: verifyObject._id,
                    email: verifyObject.email,
                    iat: verifyObject.iat,
                    exp: verifyObject.exp
                }
            };
        } catch (err) {
            throw new ApiVerifyBoundleError(
                HttpStatus.FORBIDDEN, 'Invalid or expires token'
            );
        }
    } else {
        throw new ApiVerifyBoundleError(
            HttpStatus.BAD_REQUEST, 'No token specified'
        );
    }

    await next();
};

/**
 * Controller actions
 *
 * @type {
 *      {
 *          verifyToken: (function(*, *)),
 *       }
 *     }
 *
 */
module.exports = {verifyToken};