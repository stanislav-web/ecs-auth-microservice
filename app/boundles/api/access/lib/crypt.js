const bcrypt = require('bcryptjs');

/**
 * AsyncBcrypt.genSalt
 *
 * @param rounds
 * @param seedLength
 * @return {Promise}
 */
const genSalt = (rounds, seedLength) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, seedLength, (err, salt) => {
            if (err) {
                reject(err);
            }
            resolve(salt);
        });
    });
};

/**
 * AsyncBcrypt.hash
 *
 * @param str
 * @param salt
 * @return {Promise}
 */
const hash = async (str, salt) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(str, salt, (err, hashed) => {
            if (err) {
                reject(err);
            }
            resolve(hashed);
        });
    });
};

/**
 * AsyncBcrypt.compare
 *
 * @param str
 * @param hash
 * @return {Promise}
 */
const compare = (str, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(str, hash, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {genSalt, hash, compare};