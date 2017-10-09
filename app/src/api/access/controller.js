const {compare} = require('./lib/crypt');
const {createRecordObject, generateTokenObject, verifyTokenObject} = require('./lib/scheme');
const HttpStatus = require('http-status-codes');
const {saveUser, updateUser, findUserByEmail} = require('./mapper');
const {ApiBoundleError} = require('./exception');
const joi = require('joi');

/**
 * Register new user
 *
 * @param ctx
 * @param next
 * @throws ApiBoundleError
 * @returns {Promise.<void>}
 */
const signupUser = async (ctx, next) => {

    //noinspection Annotator,Annotator,Annotator,Annotator,Annotator
    const schema = joi.object().keys({
        name: joi.string().required().min(3),
        phone: joi.string().required().min(5),
        email: joi.string().required().email(),
        password: joi.string().required().min(3).regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    //noinspection Annotator
    let res = joi.validate(ctx.request.body, schema);
    if (null === res.error) {
        let user = await findUserByEmail(res.value.email);

        if (0 >= user.length) {

            try {

                let recordObject = await createRecordObject(res.value);
                await saveUser(recordObject);
                let tokenObject = await generateTokenObject(res.value);
                ctx.response.status = HttpStatus.CREATED;
                ctx.body = {
                    status: HttpStatus.CREATED,
                    message: {
                        expires_in: tokenObject.expires_in,
                        token: tokenObject.token
                    }
                };
            } catch (err) {
                throw new ApiBoundleError(
                    HttpStatus.SERVICE_UNAVAILABLE, err);
            }
        } else {
            throw new ApiBoundleError(
                HttpStatus.CONFLICT, 'The user already exist');
        }
    } else {
        throw new ApiBoundleError(
            HttpStatus.BAD_REQUEST, res.error.message);
    }

    await next();
};

/**
 * Authorize user by credentials
 *
 * @param ctx
 * @param next
 * @throws ApiBoundleError
 * @returns {Promise.<void>}
 */
const signinUser = async (ctx, next) => {

    //noinspection Annotator,Annotator,Annotator
    const schema = joi.object().keys({
        email: joi.string().email(),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    });

    //noinspection Annotator
    let res = joi.validate(ctx.request.body, schema);

    if (null === res.error) {

        let user = await findUserByEmail(res.value.email, {_id: true, password: true});
        if (0 < user.length) {
            let dbuser = user.shift();
            let isAuth = await compare(res.value.password.trim(), dbuser.password);
            if (isAuth) {
                let obj = await generateTokenObject(res.value);

                try {
                    await updateUser(dbuser._id, {modified_at: new Date()});
                    ctx.body = {
                        status: HttpStatus.OK,
                        message: {
                            expires_in: obj.expires_in,
                            token: obj.token
                        }
                    };
                } catch (err) {
                    throw new ApiBoundleError(
                        HttpStatus.SERVICE_UNAVAILABLE, err
                    );
                }
            } else {
                throw new ApiBoundleError(
                    HttpStatus.FORBIDDEN, 'Invalid credentials'
                );
            }
        } else {
            throw new ApiBoundleError(
                HttpStatus.NOT_FOUND, 'User not found'
            );
        }
    } else {
        throw new ApiBoundleError(
            HttpStatus.BAD_REQUEST, res.error.message
        );
    }

    await next();
};

/**
 * Verify user token
 *
 * @param ctx
 * @param next
 * @throws ApiBoundleError
 * @returns {Promise.<void>}
 */
const verifyUser = async (ctx, next) => {

    const token = ctx.request.header['x-access-token']
        || ctx.request.body.token || ctx.params.token || ctx.query.token;

    if (token) {
        try {
            const verifyObject = await verifyTokenObject(token);
            ctx.body = {
                status: HttpStatus.OK,
                message: {
                    email: verifyObject.email,
                    iat: verifyObject.iat,
                    exp: verifyObject.exp
                }
            };
        } catch (err) {
            throw new ApiBoundleError(
                HttpStatus.FORBIDDEN, 'Invalid or expires token'
            );
        }
    } else {
        throw new ApiBoundleError(
            HttpStatus.BAD_REQUEST, 'No token specified'
        );
    }

    await next();
};

/**
 * Controller actions
 *
 * @type {
 *      {
 *          signupUser: (function(*, *)),
 *          signinUser: (function(*, *)),
 *          verifyUser: (function(*, *)),
 *       }
 *     }
 *
 */
module.exports = {signupUser, signinUser, verifyUser};