import request from 'supertest';
import hooks from '../webhooks.json';
import handleHttpError from '../helpers/handleHttpError';
import handleHttpSuccess from '../helpers/handleHttpSuccess';
import webhookServer from '../../src/server';

const app = webhookServer.create();
const router = webhookServer.createRouter(hooks);
app.use(router);

describe('HTTP basic', () => {
    it('GET /test1', (callback) => {
        request(app)
            .get('/test1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(handleHttpSuccess.bind(null, callback));
    });

    it('POST /test1', (callback) => {
        request(app)
            .post('/test1')
            .set('Accept', 'application/json')
            .expect(404)
            .end(handleHttpError.bind(null, callback));
    });

    it('GET /test2', (callback) => {
        request(app)
            .get('/test2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(handleHttpSuccess.bind(null, callback));
    });

    it('POST /test2', (callback) => {
        request(app)
            .post('/test2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(handleHttpSuccess.bind(null, callback));
    });

    it('GET /test3', (callback) => {
        request(app)
            .get('/test3')
            .set('Accept', 'application/json')
            .expect(404)
            .end(handleHttpError.bind(null, callback));
    });

    it('POST /test3', (callback) => {
        request(app)
            .post('/test3')
            .set('Accept', 'application/json')
            .expect(404)
            .end(handleHttpError.bind(null, callback));
    });
});
