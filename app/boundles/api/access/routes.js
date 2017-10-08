const router = require('koa-router')();
const body = require('koa-body');
const {signupUser, signinUser} = require('./controller');

/**
 * @api {post} /access/signup Register new user
 * @apiName Registration
 * @apiGroup Access API Boundle
 * @apiDescription Register new user
 * @apiPermission user
 * @apiParam {String} email         User email
 * @apiParam {String} password      User password
 *
 * @apiSuccess {Number} status HTTP 200 OK
 * @apiSuccess {Object[]} message  Authentication message
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *          "status": 200,
 *          "message": {
 *              "expires_in": 1507343002,
 *              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTA3Mjk5MTI5LCJleHAiOjE1MDczODU1Mjl9.4Wom95yMQoSLSX_lzfC0oz__TDW6Rrj8pQS0Zwk7Bvs"
 *          }
 *      }
 *
 * @apiError InvalidRequestError Bad credentials
 *
 * @apiErrorExample InvalidRequestError
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "status": 400,
 *          "message": "InvalidRequest: child "email" fails because ["email" must be a valid email]"
 *      }
 *
 * @apiError ConflictRequestError The user already exist
 *
 * @apiErrorExample ConflictRequestError
 *     HTTP/1.1 409 Conflict
 *     {
 *          "status": 409,
 *          "message": "ConflictRequest: The user already exist"
 *      }
 */
router.post('/access/signup', body(), signupUser);

/**
 * @api {post} /access/signin Authorize user by credentials
 * @apiName Authorization
 * @apiGroup Access API Boundle
 * @apiDescription Authorize user by credentials
 * @apiPermission user
 * @apiParam {String} email         User email
 * @apiParam {String} password      User password
 *
 * @apiSuccess {Number} status HTTP 200 OK
 * @apiSuccess {Object[]} message  Authentication message
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *          "status": 200,
 *          "message": {
 *              "expires_in": 1507343002,
 *              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTA3Mjk5MTI5LCJleHAiOjE1MDczODU1Mjl9.4Wom95yMQoSLSX_lzfC0oz__TDW6Rrj8pQS0Zwk7Bvs"
 *          }
 *      }
 *
 * @apiError InvalidRequestError Invalid auth credentials
 *
 * @apiErrorExample InvalidRequestError
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "status": 400,
 *          "message": "InvalidRequest: child "email" fails because ["email" must be a valid email]"
 *      }
 *
 * @apiError NotFoundError User not found
 *
 * @apiErrorExample NotFoundError
 *     HTTP/1.1 404 Not Found
 *     {
 *          "status": 404,
 *          "message": "NotFound: User not found"
 *      }
 *
 * @apiError AccessForbiddenError Invalid auth credentials
 *
 * @apiErrorExample AccessForbiddenError
 *     HTTP/1.1 403 Forbidden
 *     {
 *          "status": 403,
 *          "message": "AccessForbidden: Invalid credentials"
 *      }
 */
router.post('/access/signin', body(), signinUser);

router.allowedMethods({
    throw: true
});

/**
 * Export modules to -> server to use as middleware
 */
module.exports = router.routes();