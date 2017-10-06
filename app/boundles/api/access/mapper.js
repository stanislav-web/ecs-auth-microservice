const db = require('../db');
const DbError    = require('../exception').DbError;

/**
 * Save user
 *
 * @param data
 * @return {Promise.<*>}
 */
const saveUser = async (data) => {

    try {
        let collection = await db.getCollection('access');
        data.created_at = new Date();
        let result = collection.insertOne(data);
        return await result;

    } catch (err) {
        throw new DbError('DatabaseError', err.toString());
    }
};

/**
 * Find user by email
 *
 * @param email
 * @param exclude { _id: 0, password: 0, created_at: 0}
 * @return {Promise.<*>}
 */
const findUserByEmail = async (email, exclude = { _id: 0, password: 0, created_at: 0}) => {

    try {
        let collection = await db.getCollection('access');
        let result = collection.find({email: email}, exclude).limit(1);
        return await result.toArray();

    } catch (err) {
        throw new DbError('DatabaseError', err.toString());
    }
};

/**
 * Export mapper
 * @type {{saveUser: (function(*=))}}
 */
module.exports = {saveUser, findUserByEmail};
