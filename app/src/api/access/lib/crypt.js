const bcrypt = require('bcryptjs');

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
const compare = async (str, hash) => {
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
 * @type {
 *          {
 *              hash: (function(*=, *=)),
 *              compare: (function(*=, *=))
 *           }
 *        }
 */
module.exports = {
    hash,
    compare
};