const DbError    = require('./exception').DbError;
const redis    = require('redis');
const bluebird    = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let _connection;

/**
 * Connection to db
 *
 * @return {*}
 */
const connection = async () => {
    if (!_connection) {
        try {
            _connection = await connect();
            _connection.on('error', (err) => {
                throw new DbError(err.message);
            });

        } catch (err) {
            throw new DbError(err);
        }
    }

    return _connection;
};

/**
 * Get redis configuration
 *
 * @return {{host: *, port: *}}
 */
const getConfig =() => {

    let config = {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    };


    config = (!process.env.REDIS_PASSWORD)
        ? config : Object.assign({}, config, {password : process.env.REDIS_PASSWORD});
    redis.debug_mode = ('true' === process.env.REDIS_DEBUG);

    return config;
};

/**
 * Returns a promise of a `db` object. Subsequent calls to this function returns
 * the **same** promise, so it can be called any number of times without setting
 * up a new connection every time.
 */
const connect = async () => {
    if (!process.env.REDIS_SERVER && !process.env.REDIS_PORT) {
        throw new DbError('Environment variable REDIS_HOST & REDIS_PORT must be set to use API.');
    }

    try {
        const config = getConfig();
        return await redis.createClient(config);
    } catch (err) {
        throw new DbError(err);
    }
};

/**
 * Returns a ready-to-use `database` from Redis.
 *
 * @param dbName
 * @return {Promise.<Collection|*>}
 */
const selectDatabase = async (dbName) => {

    try {
        const db = await connection();
        db.select(dbName);
        return db;
    } catch (err) {
        throw new DbError(err.toString());
    }
};

/**
 * Export
 *
 * @type {
 *          {
 *              selectDatabase: (function(*=))
 *           }
 *       }
 */
module.exports = {
    selectDatabase
};