const util = require('util');

/**
 * DbError error exception
 *
 * @param {string} message exception message
 * @constructor
 */
function DbError (message) {

    this.status = 500;
    this.message = message;
}

util.inherits(DbError, Error);

DbError.prototype.name = 'DbError';

/**
 * Exceptions set
 *
 * @type {
 *  {
 *      DbError: DbError,
 *  }
 *}
 */
module.exports = {
    DbError
};