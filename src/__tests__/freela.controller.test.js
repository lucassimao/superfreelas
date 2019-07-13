const request = require('supertest');
const app = require('../server')

describe("Test the Freela's controller", () => {

    beforeAll(() => {
        // mongoDB.connect();
    });
    afterAll((done) => {
        // mongoDB.disconnect(done);
    });

    test('It should answer the GET method to / with the newest available freelas ', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('It should answer the GET method to /:country with all freelas available for that country', async()=>{})
    test('It should answer the GET method to /:country/:state with all freelas available for that country in that state', async()=>{})
    test('It should answer the GET method to /:country/:state/:city with all freelas available for that city on that state on that country', async()=>{})
    test('It should answer the GET method to /:country/:state/:city/:uri with all freelas available for that city on that state on that country with such uri', async()=>{})




})