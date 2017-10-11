const router = require('koa-router')();
const body = require('koa-body');
const {verifyToken} = require('./controller');

//noinspection Annotator,Annotator
/**
 * @api {get} /verify/:token Verify access token
 * @apiName Token Verification
 * @apiGroup Verification
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
 *              "uid": "59dc39a68610ad6ff6e4bf0a",
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
router.all('/verify/:token?', body(), verifyToken);

//noinspection Annotator,Annotator
router.allowedMethods({
    throw: true
});

//noinspection Annotator,Annotator
/**
 * Export modules to -> server to use as middleware
 */
module.exports = router.routes();