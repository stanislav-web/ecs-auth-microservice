const router = require('koa-router')();
const body = require('koa-body');
const {registerUser, getAuthUser} = require('./controller');

/**
 * Get auth user
 *
 * @section User REST API
 * @type get
 * @url /user
 */
router.get('/user', getAuthUser);

/**
 * Get user by id
 *
 * @section User REST API
 * @type get
 * @url /user/:id
 * @param {int} id
 */
router.get('/user/:id', async (ctx, next) => {
    ctx.body = 'Hello, /user/:id!';
    await next();
});

/**
 * Create user
 *
 * @section User REST API
 * @type post
 * @url /users
 * @param {string} body
 */
router.post('/user', body(), registerUser);

/**
 * Update user
 *
 * @section User REST API
 * @type put
 * @url /users/:id
 * @param {string} body
 */
router.put('/user/:id', body(), async (ctx, next) => {
    ctx.body = 'Hello, /user/:id';
    await next();
});

/**
 * Delete user
 *
 * @section User REST API
 * @type delete
 * @url /users/:id
 * @param {int =} id
 */
router.delete('/user/:id?', async (ctx, next) => {
    ctx.body = 'Hello, /user/:id';
    await next();
});

/**
 * Get a list of users
 *
 * @section Users REST API
 * @type get
 * @url /users
 */
router.get('/users', async (ctx, next) => {
    ctx.body = 'Hello, /users';
    await next();
});

/**
 * Export modules to -> server to use as middleware
 * @type {{routes: (function()), allowedMethods: (function())}}
 */
module.exports = {
    routes () {
        return router.routes();
    },
    allowedMethods () {
        return router.allowedMethods({
            throw: true,
        });
    }
};