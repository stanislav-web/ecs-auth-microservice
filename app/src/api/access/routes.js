const router = require('koa-router')();
const body = require('koa-body');
const {signupUser, signinUser, verifyUser} = require('./controller');

//noinspection Annotator,Annotator
/**
 * @api {post} /access/signup Register new user
 * @apiName Registration
 * @apiGroup Access API Boundle
 * @apiDescription Register new user
 * @apiPermission user
 * @apiParam {String} name          User name
 * @apiParam {String} phone         User phone
 * @apiParam {String} email         User email
 * @apiParam {String} password      User password
 *
 * @apiSuccess {Number} status HTTP 201 Created
 * @apiSuccess {Object[]} message  Authentication message
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 201 Created
 *     {
 *          "status": 201,
 *          "message": {
 *              "expires_in": 1507343002,
 *              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTA3Mjk5MTI5LCJleHAiOjE1MDczODU1Mjl9.4Wom95yMQoSLSX_lzfC0oz__TDW6Rrj8pQS0Zwk7Bvs"
 *          }
 *      }
 *
 * @apiError BadRequestError Bad credentials
 *
 * @apiErrorExample BadRequestError
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "status": 400,
 *          "message": "child "email" fails because ["email" must be a valid email]"
 *      }
 *
 * @apiError ConflictRequestError The user already exist
 *
 * @apiErrorExample ConflictRequestError
 *     HTTP/1.1 409 Conflict
 *     {
 *          "status": 409,
 *          "message": "The user already exist"
 *      }
 */
router.post('/access/signup', body(), signupUser);

//noinspection Annotator,Annotator
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
 * @apiError BadRequestError Invalid auth credentials
 *
 * @apiErrorExample BadRequestError
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "status": 400,
 *          "message": "child "email" fails because ["email" must be a valid email]"
 *      }
 *
 * @apiError NotFoundError User not found
 *
 * @apiErrorExample NotFoundError
 *     HTTP/1.1 404 Not Found
 *     {
 *          "status": 404,
 *          "message": "User not found"
 *      }
 *
 * @apiError AccessForbiddenError Invalid auth credentials
 *
 * @apiErrorExample AccessForbiddenError
 *     HTTP/1.1 403 Forbidden
 *     {
 *          "status": 403,
 *          "message": "Invalid credentials"
 *      }
 */
router.post('/access/signin', body(), signinUser);

//noinspection Annotator,Annotator
/**
 * @api {get} /access/verify Verify access token
 * @apiName Verification
 * @apiGroup Access API Boundle
 * @apiDescription Verify access token
 * @apiPermission user
 * @apiParam {String} token         User token
 *
 * @apiSuccess {Number} status HTTP 200 OK
 * @apiSuccess {Object[]} message  Authentication message
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *          "status": 200,
 *          "message": {
 *              "email": "stanisov@gmail.com",
 *              "iat": 1507436214,
 *              "exp": 1507436274
 *          }
 *      }
 *
 * @apiError BadRequestError No token specified
 *
 * @apiErrorExample BadRequestError
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "status": 400,
 *          "message": "No token specified"
 *      }
 *
 * @apiError AccessForbiddenError Invalid or expires token
 *
 * @apiErrorExample AccessForbiddenError
 *     HTTP/1.1 403 Forbidden
 *     {
 *          "status": 403,
 *          "message": "Invalid or expires token"
 *      }
 */
router.all('/access/verify/:token?', body(), verifyUser);

//noinspection Annotator,Annotator
router.allowedMethods({
    throw: true
});

//noinspection Annotator,Annotator
/**
 * Export modules to -> server to use as middleware
 */
module.exports = router.routes();