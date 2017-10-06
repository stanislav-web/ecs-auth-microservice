const util = require('util');

/**
 * InvalidRequestError error exception
 *
 * @param {string} status exception status
 * @param {string} message exception message
 * @constructor
 */
function InvalidRequestError (status = 'InvalidRequest', message) {

    this.status = status;
    this.message = message;
}

/**
 * ConflictRequestError error exception
 *
 * @param {string} status exception status
 * @param {string} message exception message
 * @constructor
 */
function ConflictRequestError (status = 'ConflictRequest', message) {

    this.status = status;
    this.message = message;
}

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

util.inherits(InvalidRequestError, Error);
util.inherits(ConflictRequestError, Error);
util.inherits(ApiBoundleError, Error);

InvalidRequestError.prototype.name = 'InvalidRequest';
ConflictRequestError.prototype.name = 'ConflictRequest';
ApiBoundleError.prototype.name = 'ApiBoundle';

/**
 * Export exceptions
 *
 * @type {{InvalidRequestError: InvalidRequestError, ConflictRequestError: ConflictRequestError, ApiBoundleError: ApiBoundleError}}
 */
module.exports = {InvalidRequestError, ConflictRequestError, ApiBoundleError};