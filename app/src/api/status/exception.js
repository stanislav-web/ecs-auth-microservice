const util = require('util');

/**
 * ApiBoundleError error exception
 *
 * @param {string} status exception status
 * @param {string} message exception message
 * @constructor
 */
function ApiBoundleError (status = 'ApiBoundle', message) {

    this.status = status;
    this.message = message;
}

util.inherits(ApiBoundleError, Error);

ApiBoundleError.prototype.name = 'ApiBoundle';

/**
 * Exceptions set
 * @type {
 *  {
 *      ApiBoundleError: ApiBoundleError
 *  }
 *}
 */
module.exports = {
    ApiBoundleError
};