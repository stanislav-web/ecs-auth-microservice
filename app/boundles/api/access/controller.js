const jwt = require('jsonwebtoken');
const {hash, compare} = require('./lib/crypt');
const HttpStatus = require('http-status-codes');
const {saveUser, updateUser, findUserById, findUserByEmail} = require('./mapper');
const {InvalidRequestError, ConflictRequestError, NotFoundError, AccessForbiddenError, DbError, ApiBoundleError} = require('./exception');
const Joi = require('joi');

/**
 * Register new user
 *
 * @param ctx
 * @param next
 * @throws ConflictRequestError
 * @throws InvalidRequestError
 * @returns {Promise.<void>}
 */
const signupUser = async (ctx, next) => {

    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    let res = Joi.validate(ctx.request.body, schema);

    try {

        if (res.error === null) {
            let user = await findUserByEmail(res.value.email);
            if (user.length <= 0) {

                res.value.expires_in = Math.floor(Date.now() / 1000) + (process.env.TOKEN_EXPIRES * 60);
                res.value.token = jwt.sign(res.value, process.env.TOKEN_SECRET, {
                    expiresIn: res.value.expires_in
                });

                res.value.password = await hash(res.value.password.trim(), 10);
                let last = await saveUser(res.value);
                let response = await findUserById(last.insertedId);
                ctx.body = {
                    status: 200,
                    message: response.shift()
                };
            } else {
                throw new ConflictRequestError('The user already exist');
            }
        } else {
            throw new InvalidRequestError(res.error.message);
        }
    } catch (err) {

        if (err instanceof DbError) {
            let message = HttpStatus.getStatusText(HttpStatus.SERVICE_UNAVAILABLE);
            throw new ApiBoundleError(
                HttpStatus.SERVICE_UNAVAILABLE, message);
        } else if (err instanceof ConflictRequestError) {
            throw new ApiBoundleError(
                HttpStatus.CONFLICT, err.toString()
            );
        } else if (err instanceof InvalidRequestError) {
            throw new ApiBoundleError(
                HttpStatus.BAD_REQUEST, err.toString()
            );
        }
    }

    await next();
};

/**
 * Authorize user by credentials
 *
 * @param ctx
 * @param next
 * @throws DbError
 * @throws AccessForbiddenError
 * @throws NotFoundError
 * @throws InvalidRequestError
 * @returns {Promise.<void>}
 */
const signinUser = async (ctx, next) => {

    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    let res = Joi.validate(ctx.request.body, schema);

    try {

        if (res.error === null) {

            let user = await findUserByEmail(res.value.email, {_id: true, password: true});
            if (user.length > 0) {
                let dbuser = user.shift();
                let isAuth = await compare(res.value.password.trim(), dbuser.password);
                if (isAuth) {
                    // generate new token
                    res.value.expires_in = Math.floor(Date.now() / 1000) + (process.env.TOKEN_EXPIRES * 60);
                    res.value.token = jwt.sign(res.value, process.env.TOKEN_SECRET, {
                        expiresIn: res.value.expires_in
                    });
                    let last = await updateUser(dbuser._id, {token: res.value.token, expires_in: res.value.expires_in});
                    if (last.result.nModified > 0) {
                        ctx.body = {
                            status: 200,
                            message: {
                                expires_in: res.value.expires_in,
                                token: res.value.token
                            }
                        };
                    } else {
                        throw new DbError('Service unavailable');
                    }
                } else {
                    throw new AccessForbiddenError('Invalid credentials');
                }
            } else {
                throw new NotFoundError('User not found');
            }
        } else {
            throw new InvalidRequestError(res.error.message);
        }
    } catch (err) {

        if (err instanceof DbError) {
            let message = HttpStatus.getStatusText(HttpStatus.SERVICE_UNAVAILABLE);
            throw new ApiBoundleError(
                HttpStatus.SERVICE_UNAVAILABLE, message
            );
        } else if (err instanceof AccessForbiddenError) {
            throw new ApiBoundleError(
                HttpStatus.FORBIDDEN, err.toString()
            );
        } else if (err instanceof NotFoundError) {
            throw new ApiBoundleError(
                HttpStatus.NOT_FOUND, err.toString()
            );
        } else if (err instanceof InvalidRequestError) {
            throw new ApiBoundleError(
                HttpStatus.BAD_REQUEST, err.toString()
            );
        }
    }

    await next();
};

/**
 * Get auth user
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const authUser = async (ctx, next) => {

    const token = ctx.request.header['x-access-token'] || ctx.request.body.token;
    console.log(token);
    await next();
};

// Load hash from your password DB.
//bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//    // res == true
//});

/**
 *
 * @type {{signupUser: (function(*, *)), authUser: (function(*, *))}}
 */


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

module.exports = {signupUser, signinUser};
