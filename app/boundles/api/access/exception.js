const util = require('util');

/**
 * InvalidRequestError error exception
 *
 * @param {string} message exception message
 * @constructor
 */
function InvalidRequestError (message) {

    this.status = 'InvalidRequest';
    this.message = message;
}

/**
 * ConflictRequestError error exception
 *
 * @param {string} message exception message
 * @constructor
 */
function ConflictRequestError (message) {

    this.status = 'ConflictRequest';
    this.message = message;
}

/**
 * NotFoundError error exception
 *
 * @param {string} message exception message
 * @constructor
 */
function NotFoundError (message) {

    this.status = 'NotFound';
    this.message = message;
}

/**
 * AccessForbidden error exception
 *
 * @param {string} message exception message
 * @constructor
 */
function AccessForbiddenError (message) {

    this.status = 'AccessForbidden';
    this.message = message;
}

/**
 * DbError error exception
 *
 * @param {string} message exception message
 * @constructor
 */
function DbError (message) {

    this.status = 'DatabaseError';
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
util.inherits(NotFoundError, Error);
util.inherits(AccessForbiddenError, Error);
util.inherits(DbError, Error);
util.inherits(ApiBoundleError, Error);

InvalidRequestError.prototype.name = 'InvalidRequest';
ConflictRequestError.prototype.name = 'ConflictRequest';
NotFoundError.prototype.name = 'NotFound';
AccessForbiddenError.prototype.name = 'AccessForbidden';
DbError.prototype.name = 'DbError';
ApiBoundleError.prototype.name = 'ApiBoundle';

/**
 * Exceptions set
 * @type {
 *  {
 *      InvalidRequestError: InvalidRequestError,
 *      ConflictRequestError: ConflictRequestError,
 *      NotFoundError: NotFoundError,
 *      AccessForbiddenError: AccessForbiddenError,
 *      DbError: DbError,
 *      ApiBoundleError: ApiBoundleError
 *  }
 *}
 */
module.exports = {
    InvalidRequestError,
    ConflictRequestError,
    NotFoundError,
    AccessForbiddenError,
    DbError,
    ApiBoundleError
};