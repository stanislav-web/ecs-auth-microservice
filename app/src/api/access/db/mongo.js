const DbError    = require('./exception').DbError;
const {MongoClient}    = require('mongodb');
const bluebird    = require('bluebird');

let _connection;

/**
 * Connection to db
 *
 * @return {*}
 */
const connection = async () => {
    if (!_connection) {
        _connection = await connect();
    }

    return _connection;
};


/**
 * Returns a promise of a `db` object. Subsequent calls to this function returns
 * the **same** promise, so it can be called any number of times without setting
 * up a new connection every time.
 */
const connect = () => {
    if (!process.env.MONGO_CONNECTION_STRING) {
        throw new DbError('Environment variable MONGO_CONNECTION_STRING must be set to use API.');
    }

    return bluebird.promisify(MongoClient.connect)(process.env.MONGO_CONNECTION_STRING);
};

/**
 * Returns a ready-to-use `collection` object from MongoDB.
 *
 * @param collectionName
 * @return {Promise.<Collection|*>}
 */
const getCollection = async (collectionName) => {

    try {
        const db = await connection();
        return db.collection(collectionName);
    } catch (err) {
        throw new DbError(err.toString());
    }
};

/**
 * Export
 *
 * @type {
 *          {
 *              getCollection: (function(*=))
 *           }
 *       }
 */
module.exports = {
    getCollection
};