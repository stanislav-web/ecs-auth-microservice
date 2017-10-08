const util = require('util');

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

util.inherits(DbError, Error);
util.inherits(ApiBoundleError, Error);

DbError.prototype.name = 'DbError';
ApiBoundleError.prototype.name = 'ApiBoundle';

/**
 * Exceptions set
 * @type {
 *  {
 *      DbError: DbError,
 *      ApiBoundleError: ApiBoundleError
 *  }
 *}
 */
module.exports = {
    DbError,
    ApiBoundleError
};