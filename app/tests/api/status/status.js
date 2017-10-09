const chakram = require('chakram');
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
const requestUri = `${host}/status/${process.env.MICROSERVICE_KEY}`;
let apiResponse;

describe(`Show microservice status: GET ${requestUri}`, () => {

    before(() => {
        apiResponse = chakram.get(requestUri);
        return apiResponse;
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
            expect(json.message.hasOwnProperty('now')).to.equal(true);
            expect(json.message.hasOwnProperty('revision')).to.equal(true);
            expect(json.message.hasOwnProperty('version')).to.equal(true);
            expect(json.message.hasOwnProperty('residentSet')).to.equal(true);
            expect(json.message.hasOwnProperty('totalHeap')).to.equal(true);
            expect(json.message.hasOwnProperty('usedHeap')).to.equal(true);
            expect(json.message.hasOwnProperty('uptime')).to.equal(true);
        });
    });

    it('should return 403 if Access Forbidden', () => {
        apiResponse = chakram.get(`${host}/status/invalidKey`);
        expect(apiResponse).to.have.status(403);
        expect(apiResponse).to.have.json((json) => {
            expect(json.hasOwnProperty('message')).to.equal(true);
        });
        return chakram.wait();
    });
});