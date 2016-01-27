import request from 'supertest';
import hooks from '../webhooks.json';
import handleHttpError from '../helpers/handleHttpError';
import handleHttpSuccess from '../helpers/handleHttpSuccess';
import webhookServer from '../../src/server';

const app = webhookServer.create();
const router = webhookServer.createRouter(hooks);
app.use(router);

describe('HTTP parse json', () => {
    it('POST /test3 matches JSON path', (callback) => {
        request(app)
            .post('/test3')
            .send({ items: [{ foo: { bar: 'example' } }] })
            .set('Accept', 'application/json')
            .expect(200)
            .end(handleHttpSuccess.bind(null, callback));
    });

    it('POST /test3 does not match JSON path', (callback) => {
        request(app)
            .post('/test3')
            .send({ items: [] })
            .set('Accept', 'application/json')
            .expect(400)
            .end(handleHttpError.bind(null, callback));
    });
});
