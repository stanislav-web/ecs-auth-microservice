const serve = require('koa2-static-files');

/**
 * Export Main boundle
 *
 * @param app
 */
module.exports = (app) => {
    return app.use(serve.static( __dirname + '/../../public/'));
};