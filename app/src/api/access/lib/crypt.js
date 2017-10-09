const bcrypt = require('bcryptjs');

/**
 * bcrypt.genSalt
 *
 * @param rounds
 * @param seedLength
 * @return {Promise}
 */
const genSalt = (rounds, seedLength) => {
    return new Promise((resolve, reject) => {
        //noinspection JSIgnoredPromiseFromCall
        bcrypt.genSalt(rounds, seedLength, (err, salt) => {
            if (err) {
                reject(err);
            }
            resolve(salt);
        });
    });
};

/**
 * bcrypt.hash
 *
 * @param str
 * @param salt
 * @return {Promise}
 */
const hash = async (str, salt) => {
    return new Promise((resolve, reject) => {
        //noinspection JSIgnoredPromiseFromCall
        bcrypt.hash(str, salt, (err, hashed) => {
            if (err) {
                reject(err);
            }
            resolve(hashed);
        });
    });
};

/**
 * bcrypt.compare
 *
 * @param str
 * @param hash
 * @return {Promise}
 */
const compare = (str, hash) => {
    return new Promise((resolve, reject) => {
        //noinspection JSIgnoredPromiseFromCall
        bcrypt.compare(str, hash, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

/**
 *
 * @type {{genSalt: (function(*=, *=)), hash: (function(*=, *=)), compare: (function(*=, *=))}}
 */
module.exports = {genSalt, hash, compare};