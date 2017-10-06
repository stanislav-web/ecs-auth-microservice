const util = require('util');

/**
 * DbError error exception
 *
 * @param {string} status exception status
 * @param {string} message exception message
 * @constructor
 */
function DbError(status = 'DatabaseError', message) {

    this.status = status;
    this.message = message;
}


util.inherits(DbError, Error);

DbError.prototype.name = 'DbError';

/**
 * Export exceptions
 *
 * @type {{DbError: DbError}}
 */
module.exports = {DbError};