const request = require('supertest');
const app = require('../server')

describe("Test the Freela's controller", () => {

    beforeAll(() => {
        // mongoDB.connect();
    });
    afterAll((done) => {
        // mongoDB.disconnect(done);
    });

    test('It should answer the GET method to / with all freelas', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    test('It should answer with 204 code to a DELETE request to /:id if there is a freela with such id', async () => {

    })

    test('It should answer the GET method to /:country/:state/:city with all freelas available for that city on that state', async()=>{})

    test('It should answer the GET method to /:city with all freelas available for that city', async()=>{})

})