const chakram = require('chakram');
const {dropUserByEmail} = require('../../../../src/api/access/mapper');
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
const requestUri = `${host}/access/signup`;
const requestBody = {
    'name': 'Stanislav',
    'phone': '38 099 999 99 99',
    'email': 'test@email.com',
    'password': 'testPassword'
};
let apiResponse;

describe(`Signup user: POST ${requestUri}`, () => {

    before(() => {
        apiResponse = chakram.post(requestUri, requestBody);

        return apiResponse;
    });

    beforeEach('Pending...', (done) => { // prevent timeout responses
        setTimeout(done, 1000);
    });

    it('should return 201 on success', () => {
        return expect(apiResponse).to.have.status(201);
    });

    it('should return JSON content type and utf8 charset', () => {
        expect(apiResponse).to.have.header('content-type', /application\/json/);
        expect(apiResponse).to.have.header('content-type', /charset=utf-8/);
        return chakram.wait();
    });

    it('should required valid schema', async () => {
        return expect(apiResponse).to.have.json((json) => {
            expect(json.status).to.equal(201);
            expect(json.message.hasOwnProperty('expires_in')).to.equal(true);
            expect(json.message.hasOwnProperty('token')).to.equal(true);
        });
    });

    it('should return 400 if Bad Request', () => {
        apiResponse = chakram.post(requestUri, {
            'name': '',
            'phone': '',
            'email': '',
            'password': ''
        });
        expect(apiResponse).to.have.status(400);
        expect(apiResponse).to.have.json((json) => {
            expect(json.hasOwnProperty('message')).to.equal(true);
        });
        return chakram.wait();
    });

    it('should return 409 if Conflict', () => {
        apiResponse = chakram.post(requestUri, requestBody);
        expect(apiResponse).to.have.status(409);
        expect(apiResponse).to.have.json((json) => {
            expect(json.hasOwnProperty('message')).to.equal(true);
        });
        return chakram.wait();
    });

    it('should return 405 if Method not allowed', () => {
        apiResponse = chakram.patch(requestUri);
        expect(apiResponse).to.have.status(405);
        return chakram.wait();
    });

    after(async () => {
        await dropUserByEmail(requestBody.email);
        return chakram.wait();
    });
});