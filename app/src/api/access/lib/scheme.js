const jwt = require('jsonwebtoken-refresh');
const {hash} = require('./crypt');

/**
 * Create object values for token
 *
 * @param obj
 * @return {Promise.<void>}
 */
const createRecordObject = async (obj) => {

    obj.created_at = new Date();
    obj.score = 0;
    obj.is_admin = false;
    obj.password = await hash(obj.password.trim(), 10);

    return obj;
};

/**
 * Generate Token by object values
 *
 * @param obj
 * @return {Promise.<void>}
 */
const generateTokenObject = async (obj) => {

    obj.expires_in = process.env.TOKEN_EXPIRES;
    obj.token = jwt.sign(obj, process.env.TOKEN_SECRET, {
        expiresIn: obj.expires_in
    });
    obj.modified_at = new Date();

    return obj;
};

/**
 * JWT Refreshing
 *
 * @param token
 * @return {Promise.<*>}
 */
const refreshTokenObject = async (token) => {
    let originalDecoded = jwt.decode(token, {complete: true});
    return await jwt.refresh(originalDecoded, process.env.TOKEN_EXPIRES, process.env.TOKEN_SECRET);
};

/**
 * Export
 *
 * @type {
 *          {
 *              createRecordObject: (function(*)),
 *              generateTokenObject: (function(*=)),
 *              refreshTokenObject: (function(*=))
 *          }
 *       }
 */
module.exports = {
    createRecordObject,
    generateTokenObject,
    refreshTokenObject
};