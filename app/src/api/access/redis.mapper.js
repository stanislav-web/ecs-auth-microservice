const db = require('./db/redis');
const DbError = require('./db/exception').DbError;

/**
 * Save user
 *
 * @param data
 * @return {Promise.<*>}
 */
const saveUser = async (data) => {

    try {

        let storage = await db.selectDatabase(1);
        let key = data.email.trim();
        return await storage.set(key, JSON.stringify(data));

    } catch (err) {
        throw new DbError(err.toString());
    }
};

/**
 * Update user
 *
 * @param id
 * @param data
 * @return {Promise.<*>}
 */
const updateUser = async (id, data={modified_at: new Date()}) => {

    try {

        let storage = await db.selectDatabase(1);
        let storageData =  await storage.getAsync(id);
        let rewriteData = Object.assign({}, JSON.parse(storageData), data);
        await storage.delAsync(id);
        return await storage.set(id, JSON.stringify(rewriteData));
    } catch (err) {
        throw new DbError(err.toString());
    }
};

/**
 * Find user by email
 *
 * @param email
 * @return {Promise.<*>}
 */
const findUserByEmail = async (email) => {

    try {
        let storage = await db.selectDatabase(1);
        let key = email.trim();
        let result =  await storage.getAsync(key);

        if(result) {
            result = JSON.parse(result);
        }

        return !result ? [] : [result];

    } catch (err) {
        throw new DbError(err.toString());
    }
};

/**
 * Drop user by email
 *
 * @param email
 * @return {Promise.<*>}
 */
const dropUserByEmail = async (email) => {

    try {
        let storage = await db.selectDatabase(1);
        let result = await storage.delAsync(email);
        return await result;

    } catch (err) {
        throw new DbError(err.toString());
    }
};

/**
 * Access mapper
 *
 * @type {
 *      {
 *          saveUser: (function(*=)),
 *          updateUser: (function(*=, *=)),
 *          findUserByEmail: (function(*=, *=)),
 *          dropUserByEmail: (function(*=)),
 *       }
 *     }
 */
module.exports = {
    saveUser,
    updateUser,
    findUserByEmail,
    dropUserByEmail
};
