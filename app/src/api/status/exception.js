const util = require('util');

/**
 * ApiStatusBoundleError error exception
 *
 * @param {string} status exception status
 * @param {string} message exception message
 * @constructor
 */
function ApiStatusBoundleError (status = 'ApiStatusBoundle', message) {

    this.status = status;
    this.message = message;
}

util.inherits(ApiStatusBoundleError, Error);

ApiStatusBoundleError.prototype.name = 'ApiStatusBoundle';

/**
 * Exceptions set
 * @type {
 *  {
 *      ApiStatusBoundleError: ApiStatusBoundleError
 *  }
 *}
 */
module.exports = {
    ApiStatusBoundleError
};