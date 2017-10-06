/**
 * @api {post} /access/signup Register new user
 * @apiName Access
 * @apiGroup API Boundle
 *
 * @apiParam {String} email         User email
 * @apiParam {String} password      User password
 *
 * @apiSuccess {Number} status HTTP 200 OK
 * @apiSuccess {Object[]} message  Authentication message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "status": 200,
 *          "message": {
 *              "auth": true,
 *              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTA3Mjk5MTI5LCJleHAiOjE1MDczODU1Mjl9.4Wom95yMQoSLSX_lzfC0oz__TDW6Rrj8pQS0Zwk7Bvs"
 *          }
 *      }
 *
 * @apiError InvalidRequestError Bad credentials
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *          "status": 400,
 *          "message": "Error: child "email" fails because ["email" must be a valid email]"
 *      }
 */