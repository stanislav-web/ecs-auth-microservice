const util = require('util');

/**
 * ApiAccessBoundleError error exception
 *
 * @param {string} status exception status
 * @param {string} message exception message
 * @constructor
 */
function ApiAccessBoundleError (status = 'ApiAccessBoundle', message) {

    this.status = status;
    this.message = message;
}

util.inherits(ApiAccessBoundleError, Error);

ApiAccessBoundleError.prototype.name = 'ApiAccessBoundle';

/**
 * Exceptions set
 *
 * @type {
 *  {
 *      ApiAccessBoundleError: ApiAccessBoundleError
 *  }
 *}
 */
module.exports = {
    ApiAccessBoundleError
};