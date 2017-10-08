const db = require('./db');
const DbError    = require('./exception').DbError;

/**
 * Save user
 *
 * @param data
 * @return {Promise.<*>}
 */
const saveUser = async (data) => {

    try {
        let collection = await db.getCollection('access');
        let currentDate = new Date();
        data.created_at = currentDate;
        data.modified_at = currentDate;
        return await collection.insertOne(data);

    } catch (err) {
        throw new DbError('DatabaseError', err.toString());
    }
};

/**
 * Update user
 *
 * @param id
 * @param data
 * @return {Promise.<*>}
 */
const updateUser = async (id, data) => {

    try {
        let collection = await db.getCollection('access');
        data.modified_at = new Date();
        return await collection.updateOne({_id : id},
            { $set: data}, false, true);
    } catch (err) {
        throw new DbError('DatabaseError', err.toString());
    }
};

/**
 * Find user by email
 *
 * @param id
 * @param projection { _id: false, password: false, email: false, created_at: false}
 * @return {Promise.<*>}
 */
const findUserById = async (id, projection = { _id: false, password: false, email: false, created_at : false}) => {

    try {
        let collection = await db.getCollection('access');
        let result = collection.find({ _id: id}, projection);
        return await result.toArray();

    } catch (err) {
        throw new DbError('DatabaseError', err.toString());
    }
};

/**
 * Find user by email
 *
 * @param email
 * @param projection { _id: false, password: false, created_at: false}
 * @return {Promise.<*>}
 */
const findUserByEmail = async (email, projection = { token: false, password: false, created_at: false}) => {

    try {
        let collection = await db.getCollection('access');
        let result = collection.find({email: email}, projection).limit(1);
        return await result.toArray();

    } catch (err) {
        throw new DbError('DatabaseError', err.toString());
    }
};

/**
 * Access mapper
 *
 * @type {{saveUser: (function(*=)), findUserById: (function(*=, *=)), findUserByEmail: (function(*=, *=))}}
 */
module.exports = {saveUser, updateUser, findUserById, findUserByEmail};
