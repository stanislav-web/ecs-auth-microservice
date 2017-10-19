const router = require('koa-router')();
const {getStatus} = require('./controller');

//noinspection Annotator,Annotator
/**
 * @api {get} /status/:key Microservice status
 * @apiName Microservice status
 * @apiGroup Status
 * @apiDescription Get microservice status
 * @apiPermission root
 *
 * @apiSuccess {Number} status HTTP 200 OK
 * @apiSuccess {Object[]} message  Status message
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *          "status": 200,
 *          "message": {
 *              "now":"01:52:51 GMT+0300 (EEST)",
 *              "revision":"62b1b88ef48bb3fe859b2bd374e64576f79e6cca",
 *              "version":"v1.0",
 *              "residentSet":"49.8 MB",
 *              "totalHeap":"30.4 MB",
 *              "usedHeap":"16.8 MB",
 *              "uptime":22.969
 *          }
 *      }
 *
 * @apiError AccessForbiddenError Invalid key
 *
 * @apiErrorExample AccessForbiddenError
 *     HTTP/1.1 403 Forbidden
 *     {
 *          "status": 403,
 *          "message": "Invalid key"
 *      }
 */
router.get('/status/:key', getStatus);


//noinspection Annotator,Annotator
router.allowedMethods({
    throw: true
});

//noinspection Annotator,Annotator
/**
 * Export modules to -> server to use as middleware
 */
module.exports = router.routes();