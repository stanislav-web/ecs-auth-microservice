const util = require('util');

/**
 * ApiVerifyBoundleError error exception
 *
 * @param {string} status exception status
 * @param {string} message exception message
 * @constructor
 */
function ApiVerifyBoundleError (status = 'ApiVerifyBoundle', message) {

    this.status = status;
    this.message = message;
}

util.inherits(ApiVerifyBoundleError, Error);

ApiVerifyBoundleError.prototype.name = 'ApiVerifyBoundle';

/**
 * Exceptions set
 * @type {
 *  {
 *      ApiVerifyBoundleError: ApiVerifyBoundleError
 *  }
 *}
 */
module.exports = {
    ApiVerifyBoundleError
};