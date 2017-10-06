const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

/**
 * Register user
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
registerUser = async (ctx, next) => {

    const hashedPassword = bcrypt.hashSync(ctx.request.body.password, 8);
    const token = jwt.sign({id: 1 /*userid*/}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    ctx.body = {
        status: 200,
        message: {auth: true, token: token}
    };

    await next();
};

/**
 * Get auth user
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
getAuthUser = async (ctx, next) => {

    const token = ctx.request.header['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (!err) {
                ctx.body = {
                    status: 200,
                    message: {auth: true, token: decoded}
                };
            }
        });
    }

    await next();
};

module.exports = {registerUser, getAuthUser};
