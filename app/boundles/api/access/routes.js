const router = require('koa-router')();
const body = require('koa-body');
const {signupUser} = require('./controller');

/**
 * Sign new user
 *
 * @section Access REST API
 * @type post
 * @url /access/signup
 * @param {string} body
 */
router.post('/access/signup', body(), signupUser);

/**
 * Authentication
 *
 * @section Access REST API
 * @type post
 * @url /access/auth
 * @param {string} body
 */
//router.post('/access/auth', body(), getAuthUser);

/**
 * Logout
 *
 * @section Access REST API
 * @type post
 * @url /access/logout
 * @param {string} body
 */
//router.get('/access/logout', body(), aut);


router.allowedMethods({
    throw: true
});

/**
 * Export modules to -> server to use as middleware
 */
module.exports = router.routes();