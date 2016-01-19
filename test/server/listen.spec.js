import listen, { __RewireAPI__ as rewireAPI } from '../../src/server/listen';

describe('server listen', () => {
    const port = 4242;

    let callback = null;
    let createHttpServer = null;
    let createHttpsServer = null;
    let listenInternal = null;
    let mockServer = null;

    beforeEach(() => {
        callback = jasmine.createSpy();
        listenInternal = jasmine.createSpy().and.callFake((port, callback) => callback());
        mockServer = { listen: listenInternal };
        createHttpServer = jasmine.createSpy().and.callFake(() => mockServer);
        createHttpsServer = jasmine.createSpy().and.callFake(() => mockServer);

        rewireAPI.__Rewire__('http', { createServer: createHttpServer });
        rewireAPI.__Rewire__('https', { createServer: createHttpsServer });
        rewireAPI.__Rewire__('readFile', () => {});
    });

    afterEach(() => {
        expect(listenInternal.calls.count()).toBe(1);
        expect(listenInternal.calls.argsFor(0)[0]).toBe(port);
        expect(callback.calls.count()).toBe(1);

        rewireAPI.__ResetDependency__('http');
        rewireAPI.__ResetDependency__('https');
        rewireAPI.__ResetDependency__('readFile');
    });

    it('should listen on a HTTP server', () => {
        listen({}, port, null, callback);
        expect(createHttpServer).toHaveBeenCalled();
        expect(createHttpsServer).not.toHaveBeenCalled();
    });

    it('should listen on a HTTPS server', () => {
        listen({}, port, { tlsCert: 'test.cert', tlsKey: 'test.key' }, callback);
        expect(createHttpServer).not.toHaveBeenCalled();
        expect(createHttpsServer).toHaveBeenCalled();
    });

    it('should listen on a HTTP server if no TLS key is provied', () => {
        listen({}, port, { tlsCert: 'test.cert' }, callback);
        expect(createHttpServer).toHaveBeenCalled();
        expect(createHttpsServer).not.toHaveBeenCalled();
    });

    it('should listen on a HTTP server if no TLS certificate is provied', () => {
        listen({}, port, { tlsKey: 'test.key' }, callback);
        expect(createHttpServer).toHaveBeenCalled();
        expect(createHttpsServer).not.toHaveBeenCalled();
    });
});
