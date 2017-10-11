const HttpStatus = require('http-status-codes');
const system = require('./lib/system');
const {ApiStatusBoundleError} = require('./exception');

/**
 * Authorize user by credentials
 *
 * @param ctx
 * @param next
 * @throws ApiBoundleError
 * @returns {Promise.<void>}
 */
const getStatus = async (ctx, next) => {

    if (process.env.MICROSERVICE_KEY === ctx.params.key) {
        ctx.body = {
            status: HttpStatus.OK,
            message: {
                now : new Date().toTimeString(),
                revision: system.getCurrentGitRevision(),
                version: system.getCurrentGitTag(),
                residentSet: system.getResidentSet(),
                totalHeap: system.getHeapTotal(),
                usedHeap: system.getHeapUsed(),
                uptime : process.uptime(),
            }
        };
    } else {
        throw new ApiStatusBoundleError(
            HttpStatus.FORBIDDEN, 'Invalid key'
        );
    }

    await next();
};

/**
 * Controller actions
 *
 * @type {
 *      {
 *          getStatus: (function(*, *)),
 *       }
 *     }
 *
 */
module.exports = {
    getStatus
};