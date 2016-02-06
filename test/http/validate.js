import request from 'supertest';
import hooks from '../webhooks.json';
import handleHttpError from '../helpers/handleHttpError';
import handleHttpSuccess from '../helpers/handleHttpSuccess';
import webhookServer from '../../src/server';

const app = webhookServer.create();
const router = webhookServer.createRouter(hooks);
app.use(router);

describe('HTTP validate', () => {
    describe('jsonBody + exactly', () => {
        it('should pass the validation', (callback) => {
            request(app)
                .post('/test4')
                .send({ foo: 'bar' })
                .set('Accept', 'application/json')
                .expect(200)
                .end(handleHttpSuccess.bind(null, callback));
        });

        it('should fail because the value does not match', (callback) => {
            request(app)
                .post('/test4')
                .send({ foo: 'bla' })
                .set('Accept', 'application/json')
                .expect(400)
                .end(handleHttpError.bind(null, callback));
        });

        it('should fail because the value was not found', (callback) => {
            request(app)
                .post('/test4')
                .send({ bar: 'example' })
                .set('Accept', 'application/json')
                .expect(400)
                .end(handleHttpError.bind(null, callback));
        });
    });

    describe('urlencodedBody + regexp', () => {
        it('should pass the validation', (callback) => {
            request(app)
                .post('/test5')
                .send('foo=bar')
                .set('Accept', 'application/json')
                .expect(200)
                .end(handleHttpSuccess.bind(null, callback));
        });

        it('should fail because the value does not match', (callback) => {
            request(app)
                .post('/test5')
                .send('foo=example')
                .set('Accept', 'application/json')
                .expect(400)
                .end(handleHttpError.bind(null, callback));
        });

        it('should fail because the value was not found', (callback) => {
            request(app)
                .post('/test5')
                .send('bar=example')
                .set('Accept', 'application/json')
                .expect(400)
                .end(handleHttpError.bind(null, callback));
        });
    });

    describe('header + exactly', () => {
        it('should pass the validation', (callback) => {
            request(app)
                .post('/test6')
                .set('x-foo', 'bar')
                .set('Accept', 'application/json')
                .expect(200)
                .end(handleHttpSuccess.bind(null, callback));
        });

        it('should fail because the value does not match', (callback) => {
            request(app)
                .post('/test6')
                .set('x-foo', 'bla')
                .set('Accept', 'application/json')
                .expect(400)
                .end(handleHttpError.bind(null, callback));
        });

        it('should fail because the value was not found', (callback) => {
            request(app)
                .post('/test6')
                .set('x-bar', 'example')
                .set('Accept', 'application/json')
                .expect(400)
                .end(handleHttpError.bind(null, callback));
        });
    });

    describe('header + hmac-sha1', () => {
        it('should pass the validation', (callback) => {
            request(app)
                .post('/test7')
                .send({ foo: 'bar' })
                .set('x-foo', 'sha1=a28e95bb4438893d79ac4b39547785f19e919ae3')
                .set('Accept', 'application/json')
                .expect(200)
                .end(handleHttpSuccess.bind(null, callback));
        });

        it('should fail if the payload and generated HMAC do not match', (callback) => {
            request(app)
                .post('/test7')
                .send({ something: 'modified' })
                .set('x-foo', 'sha1=a28e95bb4438893d79ac4b39547785f19e919ae3')
                .set('Accept', 'application/json')
                .expect(400)
                .end(handleHttpError.bind(null, callback));
        });
    });
});
