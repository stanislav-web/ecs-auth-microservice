const jwt = require('jsonwebtoken-refresh');

/**
 * JWT Verification
 *
 * @param token
 * @return {Promise.<*>}
 */
const verifyTokenObject = async (token) => {
    return await jwt.verify(token, process.env.TOKEN_SECRET);
};

/**
 * Export
 *
 * @type {
 *          {
 *              verifyTokenObject: (function(*=)),
 *          }
 *       }
 */
module.exports = {
    verifyTokenObject
};