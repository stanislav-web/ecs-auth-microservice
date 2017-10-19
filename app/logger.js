const winston = require('winston');

const config = winston.config;

const logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.File)({
            filename: './logs/error.log',
            name: 'file.error',
            maxsize: 1024000,
            maxFiles: 10,
            level: 'error',
            json: true
        })
    ]
});

if ('production' !== process.env.NODE_ENV) {
    logger.add(winston.transports.Console, {
        formatter: function (options) {
            return config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                (options.message ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
        },
        handleExceptions: true
    });
}

module.exports = logger;