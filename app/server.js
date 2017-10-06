const http = require('http');
const koa = require('koa');
const json = require('koa-json');
const applogger = require('./logger');
const logger = require('koa-logger');
const app = new koa();

/**
 * Start server
 *
 * @type {Server|*}
 */
const server = http.createServer(app.callback())
    .listen(process.env.HTTP_PORT, () => {
        applogger.info('Server is available at http://%s:%d',process.env.HTTP_HOST,
            process.env.HTTP_PORT);
    }).on('close', () => {
        applogger.info('Server shutdown.');
    });


/**
 * Shutdown server event
 */
process.on('SIGINT', () => {
    server.close(() => {
        process.exit(0);
    });
});

process.on('unhandledRejection', (err) => {
    applogger.error({ err: err }, 'Unhandled Rejection');
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    applogger.error({ err }, 'Unhandled Exception');
    process.exit(1);
});

app.use(logger());
app.use(json);