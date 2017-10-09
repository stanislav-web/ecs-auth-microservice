const serve = require('koa2-static-files');

/**
 * Export Main boundle
 *
 * @param app
 */
module.exports = (app) => {
    //noinspection JSCheckFunctionSignatures
    return app.use(serve.static(`${__dirname}/../../public/`));
};