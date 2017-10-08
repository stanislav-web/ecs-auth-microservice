const jwt = require('jsonwebtoken');
const {hash} = require('./crypt');

/**
 * createRecordObject
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
 * generateTokenObject
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
 * JWT Verification
 *
 * @param token
 * @return {Promise.<*>}
 */
const verifyTokenObject = async (token) => {
    return await jwt.verify(token, process.env.TOKEN_SECRET);
};

module.exports = {createRecordObject, generateTokenObject, verifyTokenObject};