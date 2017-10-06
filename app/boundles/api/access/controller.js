const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpStatus = require('http-status-codes');
const {saveUser, findUserByEmail} = require('./mapper');
const {InvalidRequestError, ConflictRequestError, ApiBoundleError} = require('./exception');
const {DbError} = require('../exception');

var Joi = require('joi');

/**
 * Signup new user
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const signupUser = async (ctx, next) => {

    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    const result = Joi.validate(ctx.request.body, schema);

    try {

        if (result.error === null) {
            let user = await findUserByEmail(result.value.email);
            if (user.length <= 0) {
                let response = await saveUser(result.value);
                ctx.body = {
                    status: 200,
                    message: 'GELLO'
                };
            } else {
                throw new ConflictRequestError('ConfilctRequest', 'The user already exist');
            }
        } else {
            throw new InvalidRequestError('InvalidRequest', result.error.message);
        }

    } catch (err) {

        if (err instanceof DbError) {
            throw new ApiBoundleError(
                HttpStatus.SERVICE_UNAVAILABLE,
                HttpStatus.getStatusText(HttpStatus.SERVICE_UNAVAILABLE)
            );
        } else if (err instanceof ConflictRequestError) {
            throw new ApiBoundleError(
                HttpStatus.CONFLICT,
                err.toString()
            );
        } else if (err instanceof InvalidRequestError) {
            throw new ApiBoundleError(
                HttpStatus.BAD_REQUEST,
                err.toString()
            );
        }
    }

    //    const hashedPassword = bcrypt.hashSync(body.password, config.hashLength);
    //    const token = jwt.sign({id: 1 /*userid*/}, config.secret, {
    //        expiresIn: 86400 // expires in 24 hours
    //    });
    //
    //    ctx.body = {
    //        status: 200,
    //        message: {auth: true, token: token}
    //    };

    await next();
};

/**
 * Get auth user
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
//const getAuthUser = async (ctx, next) => {
//
//    const token = ctx.request.header['x-access-token'];
//    if (token) {
//        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//            if (!err) {
//                ctx.body = {
//                    status: 200,
//                    message: {auth: true, token: decoded}
//                };
//            }
//        });
//    }
//
//    await next();
//};

module.exports = {signupUser};
