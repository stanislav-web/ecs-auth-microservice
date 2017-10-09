const chakram = require('chakram');
const {dropUserByEmail} = require('../../../src/api/access/mapper');
const expect = chakram.expect;

/**
 * Testing hostname
 *
 * @type {string}
 */
const host = `${process.env.HTTP_PROTOCOL}${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`;

/**
 * Request uri
 * @type {string}
 */
const requestUri = `${host}/access/verify`;
const requestBody = {
    'name': 'Stanislav',
    'phone': '38 099 999 99 99',
    'email': 'test@email.com',
    'password': 'testPassword'
};
let apiResponse;
let accessToken;

describe(`Verify user: POST ${requestUri}`, () => {

    before(() => {
        apiResponse = chakram.post(`${host}/access/signup`, requestBody);
        return apiResponse.then((response) => {
            accessToken = response.body.message.token;
            apiResponse = chakram.get(`${requestUri}/${accessToken}`);
        });
    });

    beforeEach('Pending...', (done) => { // prevent timeout responses
        setTimeout(done, 1000);
    });

    it('should return 200 on success', () => {
        return expect(apiResponse).to.have.status(200);
    });

    it('should return JSON content type and utf8 charset', () => {
        expect(apiResponse).to.have.header('content-type', /application\/json/);
        expect(apiResponse).to.have.header('content-type', /charset=utf-8/);
        return chakram.wait();
    });

    it('should required valid schema', async () => {
        return expect(apiResponse).to.have.json((json) => {
            expect(json.status).to.equal(200);
            expect(json.message.hasOwnProperty('email')).to.equal(true);
            expect(json.message.hasOwnProperty('iat')).to.equal(true);
            expect(json.message.hasOwnProperty('exp')).to.equal(true);
        });
    });

    it('should return 400 if Bad Request', () => {
        apiResponse = chakram.get(requestUri);
        expect(apiResponse).to.have.status(400);
        expect(apiResponse).to.have.json((json) => {
            expect(json.hasOwnProperty('message')).to.equal(true);
        });
        return chakram.wait();
    });

    it('should return 403 if Access Forbidden', () => {
        apiResponse = chakram.get(`${requestUri}/invalidTOken`);
        expect(apiResponse).to.have.status(403);
        expect(apiResponse).to.have.json((json) => {
            expect(json.hasOwnProperty('message')).to.equal(true);
        });
        return chakram.wait();
    });

    after(async () => {
        await dropUserByEmail(requestBody.email);
        return chakram.wait();
    });
});