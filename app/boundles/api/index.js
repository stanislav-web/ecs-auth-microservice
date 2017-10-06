const logger = require('koa-logger');
const error = require('./error');

/**
 * Export API boundle
 *
 * @param app
 */
module.exports =  (app) => {

    app.use(error);
    app.use(require('./access/routes'));
    app.use(logger());
};