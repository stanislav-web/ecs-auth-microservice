const winston = require('winston');

const config = winston.config;
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            filename: 'error.log',
            level: 'error'
        }),
        new (winston.transports.Console)({
            formatter: function(options) {
                return config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                    (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
            },
            handleExceptions: true
        })
    ]
});

module.exports = logger;