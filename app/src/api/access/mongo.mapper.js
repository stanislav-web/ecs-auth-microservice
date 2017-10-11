const db = require('./db/mongo');
const DbError = require('./db/exception').DbError;

/**
 * Save user
 *
 * @param data
 * @return {Promise.<*>}
 */
const saveUser = async (data) => {

    try {
        let collection = await db.getCollection('access');
        return await collection.insertOne(data);

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
        let collection = await db.getCollection('access');
        return await collection.updateOne({_id: id},
            {$set: data});
    } catch (err) {
        throw new DbError(err.toString());
    }
};

/**
 * Find user by email
 *
 * @param email
 * @param projection
 * @return {Promise.<*>}
 */
const findUserByEmail = async (email, projection = {_id: true, password: true}) => {

    try {
        let collection = await db.getCollection('access');
        let result = collection.find({email: email}, projection).limit(1);
        return await result.toArray();

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
        let collection = await db.getCollection('access');
        let result = collection.removeOne({email: email});
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
