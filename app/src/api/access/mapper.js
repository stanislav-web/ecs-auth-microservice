const storage = process.env.STORAGE || 'mongo';

/**
 * Require storage
 */

const dbmapper = require(`./${storage}.mapper`);
module.exports = dbmapper;
