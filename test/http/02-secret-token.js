import request from 'supertest';
import hooks from '../webhooks.json';
import handleHttpError from '../helpers/handleHttpError';
import handleHttpSuccess from '../helpers/handleHttpSuccess';
import webhookServer from '../../src/server';

const secretToken = 'mysecret';
const app = webhookServer.create();
const router = webhookServer.createRouter(hooks, secretToken);
app.use(router);

describe('HTTP secret token', () => {
    it('GET /test1', (callback) => {
        request(app)
            .get('/test1')
            .set('Accept', 'application/json')
            .expect(401)
            .end(handleHttpError.bind(null, callback));
    });

    it('POST /test1', (callback) => {
        request(app)
            .post('/test1')
            .send(`HOOKA_SECRET=${secretToken}`)
            .set('Accept', 'application/json')
            .expect(404)
            .end(handleHttpError.bind(null, callback));
    });

    it('GET /test2', (callback) => {
        request(app)
            .get('/test2')
            .set('Accept', 'application/json')
            .expect(401)
            .end(handleHttpError.bind(null, callback));
    });

    it('POST /test2', (callback) => {
        request(app)
            .post('/test2')
            .send(`HOOKA_SECRET=${secretToken}`)
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(handleHttpSuccess.bind(null, callback));
    });

    it('GET /test99', (callback) => {
        request(app)
            .get('/test99')
            .set('Accept', 'application/json')
            .expect(401)
            .end(handleHttpError.bind(null, callback));
    });

    it('POST /test99', (callback) => {
        request(app)
            .post('/test99')
            .send(`HOOKA_SECRET=${secretToken}`)
            .set('Accept', 'application/json')
            .expect(404)
            .end(handleHttpError.bind(null, callback));
    });
});
