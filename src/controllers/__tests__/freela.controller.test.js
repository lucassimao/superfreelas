const request = require('supertest');
const app = require('../../server');
const mongoDB = require('../../db');

// testing the Freela restful API as well as the search interface using country, state and city
describe("Freela's API test", () => {

    beforeAll(() => {
        mongoDB.connect();
    });
    afterAll((done) => {
        mongoDB.disconnect(done);
    });

    test('It should answer the GET method to / with the newest available freelas ', () => {
        return request(app).get('/')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res)=>{
                    expect(Array.isArray(res.body.freelas)).toBeTruthy();     
                    expect(res.body.freelas.length).toBeLessThanOrEqual(FreelaController.PAGE_SIZE);   
                });
    });

    test('GET to /freelas/br should return all freelas available in Brazil', ()=>{
        return request(app).get('/freelas/br')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                expect(Array.isArray(res.body.freelas)).toBeTruthy();     
                expect(res.body.freelas.length).toBeLessThanOrEqual(FreelaController.PAGE_SIZE);   
                res.body.freelas.forEach(freela => {
                    expect(freela.country).toBe('Brazil')
                })
            });        
    })
    test('GET to /freelas/:country/:state should return all freelas available for that country in that state', ()=>{
        return request(app).get('/freelas/br/piaui')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            expect(Array.isArray(res.body.freelas)).toBeTruthy();     
            expect(res.body.freelas.length).toBeLessThanOrEqual(FreelaController.PAGE_SIZE);   
            res.body.freelas.forEach(freela => {
                expect(freela.country).toBe('Brazil');
                expect(freela.state).toBe('Piauí')
            })
        });   
    })
    test('GET to /freelas/:country/:state/:city should return all freelas available for that city on that state on that country', ()=>{
        return request(app).get('/freelas/br/piaui/teresina')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                expect(Array.isArray(res.body.freelas)).toBeTruthy();     
                expect(res.body.freelas.length).toBeLessThanOrEqual(FreelaController.PAGE_SIZE);   
                res.body.freelas.forEach(freela => {
                    expect(freela.country).toBe('Brazil');
                    expect(freela.state).toBe('Piauí')
                    expect(freela.city).toBe('Teresina')
                })
            });   

    })
    test('GET to /freelas/:country/:state/:city/:uri should return all freelas available for that city on that state on that country with such uri', ()=>{
        return request(app).get('/freelas/br/piaui/teresina/anuncio-garçon-temporário-churrascaria-123')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect( async (res)=> {
                    const freelaDAO = null;
                    const freelaService = null ;//= new FreelaService();
                    const freela = await freelaService.get(123);
                    expect(res.body).toEqual(freela);
                    expect(res.body.uri).toBe('anuncio-garçon-temporário-churrascaria-123');
                    expect(res.body._id).toBe(123);
                });           
    })
    test('POST to /freelas should return the http status 201 if it was able to insert a new Freela', ()=>{
        const freela = {
            country: 'Brazil',
            state: 'Piauí',
            city: 'Teresina',
            title:  'Paint my apartment doors',
            description:  'I have 6 doors in my apartment which need to be painted',
            priceRangeStart: 100,
            priceRangeEnd: 200,
            currency: 'R$'
        }
        return request(app).post('/freelas')
            .send(freela)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect( async (res)=> {
                    const link = res.header['Link'];
                    const regex = /\/freelas\/(\S+)-(\d+)$/;
                    const match = regex.exec(link);
                    const id = +match[2];

                    const freelaDAO = null;
                    const freelaService = null ;//= new FreelaService();
                    const freela = await freelaService.get(id);
                    expect(freela.uri).toBe(`paint-my-apartment-${id}`);
            });          
    })
    test('PATCH to /freelas/:id should return the status 204 if it was able to fully update a Freela', async ()=>{
        const freela = {
            country: 'Brazil',
            state: 'Piauí',
            city: 'Teresina',
            title:  'Paint my apartment doors',
            description:  'I have 6 doors in my apartment which need to be painted',
            priceRangeStart: 100,
            priceRangeEnd: 200,
            currency: 'R$'
        }
        // when creating a new freela
        const response = await request(app).post('/freelas').send(freela);
        // should return status code 201
        expect(response.status).toBe(201);

        const link = response.header['Link'];
        const regex = /\/freelas\/(\S+)-(\d+)$/;
        const match = regex.exec(link);
        const id = +match[2];

        // when submting a patch
        return request(app).patch(`/freelas/${id}`)
            .send({
                priceRangeStart: 200,
                priceRangeEnd: 300, 
            })
            .expect('Content-Type', /json/)
            .expect(204) // should return a 204 status code
            .expect( async (res)=> {
                    const freelaDAO = null;
                    const freelaService = null ;//= new FreelaService();
                    const freela = await freelaService.get(id);
                    expect(freela.priceRangeStart).toBe(200);
                    expect(freela.priceRangeEnd).toBe(300);
            });    
    })
    test('DELETE to /freelas/:id should return the status 204 if it was able to delete a Freela', async()=>{

        const freela = {
            country: 'Brazil',
            state: 'Piauí',
            city: 'Teresina',
            title:  'Paint my apartment doors',
            description:  'I have 6 doors in my apartment which need to be painted',
            priceRangeStart: 100,
            priceRangeEnd: 200,
            currency: 'R$'
        }
        // when creating a new freela
        const response = await request(app).post('/freelas').send(freela);
        // should return status code 201
        expect(response.status).toBe(201);        
        const link = response.header['Link'];
        const regex = /\/freelas\/(\S+)-(\d+)$/;
        const match = regex.exec(link);
        const id = +match[2];        

        const freelaDAO = null;
        const freelaService = null ;//= new FreelaService();
        expect(freelaService.get(id)).not.toBeNull();

        // submting the delete
        const response2 = await request(app).delete(`/freelas/${id}`);
        expect(response2.status).toBe(204);        
        expect(freelaService.get(id)).toBeNull();
    } )


})