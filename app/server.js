const http = require('http');
const koa = require('koa');
const applogger = require('./logger');
const docBoundle = require('./src/doc');
const apiBoundle = require('./src/api');
const app = new koa();

/**
 * Start server
 *
 * @type {Server|*}
 */
const server = http.createServer(app.callback())
    .listen(process.env.HTTP_PORT, () => {
        applogger.info('Server is available at %s%s:%d',
            process.env.HTTP_PROTOCOL,
            process.env.HTTP_HOST,
            process.env.HTTP_PORT
        );
    }).on('close', () => {
        applogger.info('Server shutdown.');
    }).on('error', (err) => {
        applogger.error(err.message);
        process.exit(1);
    });

/**
 * Process events
 */
process.on('SIGINT', () => {
    server.close(() => {
        process.exit(0);
    });
}).on('unhandledRejection', (err) => {
    server.emit('error', err);
}).on('uncaughtException', (err) => {
    server.emit('error', err);
});

docBoundle(app);
apiBoundle(app);