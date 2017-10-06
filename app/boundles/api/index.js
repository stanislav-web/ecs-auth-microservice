const logger = require('koa-logger');
const jwt = require('koa-jwt');
const error = require('koa-json-error');
const config = require('./config');
const {routes, allowedMethods} = require('./users/routes');

/**
 * Export API boundle
 *
 * @param app
 */
module.exports =  (app) => {

    app.use(error((err) => {
        return {
            status: err.status,
            message: err.message,
        };
    }));
    app.use(allowedMethods());
    app.use(routes());
    app.use(logger());
};